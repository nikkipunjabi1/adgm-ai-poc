/**
 * Ingestion CLI.
 *
 *   npm run ingest -- --source firms              crawl one source
 *   npm run ingest -- --source firms --limit 20   crawl, capped (quick dev run)
 *   npm run ingest -- --all                       crawl every registered source
 *   npm run ingest -- --source firms --normalize-only   re-normalize stored raw
 *   npm run ingest -- --list                      list registered sources
 */
import { runAdapter } from "./core/runner.js";
import { resolveRelations } from "./core/resolve.js";
import { printStatus } from "./core/status.js";
import { adapters, allSourceIds, getAdapter } from "./adapters/index.js";

interface Args {
  source?: string;
  all: boolean;
  list: boolean;
  limit: number;
  normalizeOnly: boolean;
  force: boolean;
  resolve: boolean;
  status: boolean;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    all: false,
    list: false,
    limit: 0,
    normalizeOnly: false,
    force: false,
    resolve: false,
    status: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case "--source":
        args.source = argv[++i];
        break;
      case "--all":
        args.all = true;
        break;
      case "--list":
        args.list = true;
        break;
      case "--limit":
        args.limit = Number(argv[++i] ?? 0) || 0;
        break;
      case "--normalize-only":
        args.normalizeOnly = true;
        break;
      case "--force":
        args.force = true;
        break;
      case "--resolve":
        args.resolve = true;
        break;
      case "--status":
        args.status = true;
        break;
      default:
        console.warn(`(ignoring unknown arg: ${a})`);
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.list) {
    console.log("Registered sources:");
    for (const id of allSourceIds()) console.log(`  - ${id}: ${adapters[id]!.label}`);
    return;
  }

  if (args.status) {
    await printStatus();
    return;
  }

  if (args.resolve) {
    await resolveRelations();
    return;
  }

  const ids = args.all ? allSourceIds() : args.source ? [args.source] : [];
  if (ids.length === 0) {
    console.error("Specify --source <id>, --all, or --list. Run with --list to see sources.");
    process.exitCode = 1;
    return;
  }

  for (const id of ids) {
    const adapter = getAdapter(id);
    if (!adapter) {
      console.error(`Unknown source: ${id}. Run --list to see registered sources.`);
      process.exitCode = 1;
      continue;
    }
    await runAdapter(adapter, {
      limit: args.limit,
      normalizeOnly: args.normalizeOnly,
      force: args.force,
    });
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
