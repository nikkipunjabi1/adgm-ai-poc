/**
 * Provider-agnostic generation. Returns a structured search response:
 * - mode "clarify": ONE upfront narrowing question (3 options) — only when the
 *   opening query is very broad and nothing has been chosen yet.
 * - mode "answer": a grounded answer with a card layout + red alerts, PLUS a few
 *   suggested follow-up questions beneath the answer to funnel the user deeper.
 * Cards reference ONLY uids from the retrieved set. Funnel caps at 3 refinements.
 *
 * Switch providers with LLM_PROVIDER=claude|gemini (Claude implemented here).
 */
import Anthropic from "@anthropic-ai/sdk";

export interface GuidedQuestion {
  header: string;
  question: string;
  options: { label: string; value: string }[];
}
export interface LayoutSection {
  type: string; // content_type: firm | fund | person | court | event | news | notice | document | page
  title: string;
  uids: string[];
  emphasis?: "primary" | "normal";
}
export interface Alert {
  uid: string;
  severity: "red" | "amber";
  reason: string;
}
export interface SearchResponse {
  mode: "clarify" | "answer";
  /** One narrowing question (clarify mode only). */
  questions?: GuidedQuestion[];
  answer?: string;
  sections?: LayoutSection[];
  alerts?: Alert[];
  /** Suggested next questions, shown below the answer to drill deeper. */
  followUps?: string[];
}

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    mode: { type: "string", enum: ["clarify", "answer"] },
    questions: {
      type: "array",
      description:
        "clarify mode ONLY: exactly ONE narrowing question with exactly 3 concise options. Omit in answer mode.",
      items: {
        type: "object",
        properties: {
          header: { type: "string", description: "≤12 char chip label" },
          question: { type: "string" },
          options: {
            type: "array",
            items: {
              type: "object",
              properties: { label: { type: "string" }, value: { type: "string" } },
              required: ["label", "value"],
            },
          },
        },
        required: ["header", "question", "options"],
      },
    },
    answer: { type: "string", description: "Grounded markdown answer (2–4 sentences). answer mode only." },
    followUps: {
      type: "array",
      description:
        "answer mode: 2–3 natural follow-up questions the user would likely ask NEXT, to funnel them deeper. Each a full standalone question (≤90 chars), building on the query + any refinements already chosen. Empty when the refinement limit is reached.",
      items: { type: "string" },
    },
    sections: {
      type: "array",
      description: "Card groups, ordered by relevance. uids MUST come from the provided records.",
      items: {
        type: "object",
        properties: {
          type: { type: "string" },
          title: { type: "string" },
          uids: { type: "array", items: { type: "string" } },
          emphasis: { type: "string", enum: ["primary", "normal"] },
        },
        required: ["type", "title", "uids"],
      },
    },
    alerts: {
      type: "array",
      description: "Critical items the user should be aware of (court matters, public notices).",
      items: {
        type: "object",
        properties: {
          uid: { type: "string" },
          severity: { type: "string", enum: ["red", "amber"] },
          reason: { type: "string" },
        },
        required: ["uid", "severity", "reason"],
      },
    },
  },
  required: ["mode"],
} as const;

const SYSTEM = `You are the ADGM (Abu Dhabi Global Market) intelligent search assistant.
You answer questions about ADGM firms, funds, individuals, court cases, hearings, judgments, events, news, public notices, and general ADGM information — using ONLY the retrieved records provided.

Pick the mode:
- "clarify": ONLY when the OPENING query is very broad or ambiguous AND nothing has been refined yet (e.g. "firms", "tell me about ADGM", "court cases"). Ask exactly ONE narrowing question with exactly 3 concise options to scope it down. Do NOT include an answer or cards in this mode.
- "answer": the default. Use it whenever the query is already specific enough, OR once the user has refined at least once. Answer the question directly, then suggest follow-up questions to go deeper.
Prefer "answer" — only use "clarify" for a genuinely broad opening query that you cannot usefully answer yet.

Rules:
- ANSWER STYLE: keep the answer to 2–4 sentences of plain narrative summary. Do NOT put markdown tables, long bullet lists, or "### " sub-headings in the answer — the detailed records belong in CARDS (sections), not in prose. Light **bold** is fine.
- Cards: every uid in sections/alerts MUST be a uid from the provided records. Never invent records or facts.
- Group cards by type with a clear title. Put the most relevant group first with emphasis "primary".
- For a firm query, include its connected people (person) and funds (fund) as their own sections when present in the records.
- ALERTS (severity "red"): flag any court matters (cases/hearings/judgments) and public notices connected to the subject — things a user should be aware of. Use "amber" for less severe.
- If an upcoming event is relevant or connected, include it as a section to promote it.
- Keep the answer tight and factual. Cite nothing the records don't support.

FOLLOW-UP QUESTIONS (answer mode funnel):
- After answering, propose 2–3 follow-up questions the user is most likely to ask NEXT to drill into what they want — phrased as full, natural questions a user would click (e.g. "Which of these firms hold a Category 3A licence?", "Are there any court matters involving NMC Healthcare?").
- They MUST build on the current query AND any refinements already chosen — go deeper / more specific each time. Never repeat a question or dimension already covered.
- The prompt tells you how many refinements have been chosen. After 3 refinements, return an EMPTY followUps array (the funnel is complete).
- ALWAYS return your response by calling the present_results tool.`;

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");
  return new Anthropic({ apiKey });
}

export interface GenerateInput {
  query: string;
  selections?: string[];
  primary: Record<string, unknown>[];
  related: Record<string, unknown>[];
}

const STEPS_SCHEMA = {
  type: "object",
  properties: {
    steps: {
      type: "array",
      description: "4–6 short status phrases.",
      items: { type: "string" },
    },
  },
  required: ["steps"],
} as const;

/**
 * Generate a few short, clean, query-specific "thinking" status phrases for the
 * progress UI (e.g. "Defining ADGM's scope", "Reviewing licensed firms"). Uses
 * a fast/cheap model so it returns almost instantly. Not the raw chain of
 * thought — these are tidy, presentable step labels like ChatGPT/Gemini show.
 */
export async function generateThinkingSteps(
  query: string,
  selections?: string[],
): Promise<string[]> {
  const fallback = ["Searching ADGM records", "Reviewing the results", "Composing the answer"];
  try {
    const client = getClient();
    const model = process.env.CLAUDE_STEPS_MODEL ?? "claude-haiku-4-5-20251001";
    const resp = await client.messages.create({
      model,
      max_tokens: 250,
      system:
        "You produce short status phrases shown while an ADGM search assistant is working — the kind ChatGPT or Gemini show above an answer. " +
        "Return 4–6 phrases, each 2–5 words, present-participle or noun-phrase style and Title Case-ish " +
        "(e.g. \"Defining ADGM's scope\", \"Reviewing licensed firms\", \"Checking court matters\", \"Mapping connected funds\", \"Composing the answer\"). " +
        "Tailor them to the specific query. Keep them clean, simple and high-level — never raw reasoning. End with a 'Composing…'-style phrase.",
      tools: [
        {
          name: "steps",
          description: "Return the ordered status phrases.",
          input_schema: STEPS_SCHEMA as unknown as Anthropic.Tool.InputSchema,
        },
      ],
      tool_choice: { type: "tool", name: "steps" },
      messages: [
        {
          role: "user",
          content: `Query: "${query}"${selections?.length ? ` (refined: ${selections.join("; ")})` : ""}`,
        },
      ],
    });
    const block = resp.content.find((b) => b.type === "tool_use");
    if (block && block.type === "tool_use") {
      const steps = (block.input as { steps?: string[] }).steps;
      if (Array.isArray(steps) && steps.length) {
        return steps.map((s) => String(s).trim()).filter(Boolean).slice(0, 6);
      }
    }
  } catch {
    /* fall through to fallback */
  }
  return fallback;
}

/** Generate the structured search response (forced tool call for reliability). */
export async function generateSearch(input: GenerateInput): Promise<SearchResponse> {
  const provider = process.env.LLM_PROVIDER ?? "claude";
  if (provider !== "claude") {
    throw new Error(`LLM_PROVIDER=${provider} not implemented yet (use 'claude')`);
  }

  const model = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-6";
  const client = getClient();

  const round = input.selections?.length ?? 0;
  let capLine: string;
  if (round === 0) {
    capLine = `This is the opening query (no refinements yet). If it is very broad/ambiguous, you MAY use mode="clarify" with ONE narrowing question (3 options). If it is specific enough, use mode="answer" and suggest 2–3 deeper follow-up questions.`;
  } else if (round >= 3) {
    capLine = `The user has drilled down 3 times — the funnel is complete. Use mode="answer", answer fully, but return an EMPTY followUps array (no more follow-up questions).`;
  } else {
    capLine = `The user has already refined the search (${round} of a maximum 3) — mode MUST be "answer". Answer, then suggest 2–3 deeper follow-up questions that build on the above. Never ask a clarifying question now.`;
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const userPrompt = [
    `Today's date: ${today}. When the user asks for the "latest" / "recent", treat the NEWEST provided record as the most recent (never call an older item the latest), and order the card uids within each section newest-first by date.`,
    `User query: "${input.query}"`,
    input.selections?.length ? `Refinements selected: ${input.selections.join("; ")}` : "",
    capLine,
    "",
    `Top retrieved records (${input.primary.length}):`,
    JSON.stringify(input.primary, null, 1),
    "",
    `Connected records (${input.related.length}):`,
    JSON.stringify(input.related, null, 1),
  ]
    .filter(Boolean)
    .join("\n");

  const resp = await client.messages.create({
    model,
    max_tokens: 2500,
    system: SYSTEM,
    tools: [
      {
        name: "present_results",
        description: "Present the search result as clarifying questions or a grounded answer with cards.",
        input_schema: OUTPUT_SCHEMA as unknown as Anthropic.Tool.InputSchema,
      },
    ],
    tool_choice: { type: "tool", name: "present_results" },
    messages: [{ role: "user", content: userPrompt }],
  });

  const block = resp.content.find((b) => b.type === "tool_use");
  if (!block || block.type !== "tool_use") {
    return { mode: "answer", answer: "Sorry — I couldn't process that. Try rephrasing." };
  }
  return block.input as SearchResponse;
}
