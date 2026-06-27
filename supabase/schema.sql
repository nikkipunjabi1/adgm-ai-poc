-- ADGM AI Search — Supabase schema (run once in the Supabase SQL Editor).
-- pgvector + full-text, with a hybrid search function.

create extension if not exists vector;

create table if not exists documents (
  uid          text primary key,
  source_id    text not null,
  content_type text not null,
  title        text not null,
  summary      text,
  body         text,
  url          text,
  date         text,
  fields       jsonb default '{}'::jsonb,
  relations    jsonb default '{}'::jsonb,
  embedding    vector(384),
  fts tsvector generated always as (
    to_tsvector('english', coalesce(title,'') || ' ' || coalesce(body,''))
  ) stored
);

create index if not exists documents_embedding_idx
  on documents using hnsw (embedding vector_cosine_ops);
create index if not exists documents_fts_idx on documents using gin (fts);
create index if not exists documents_type_idx on documents (content_type);
create index if not exists documents_source_idx on documents (source_id);

-- Hybrid search: blend cosine similarity (semantic) with full-text rank (keyword).
create or replace function match_documents (
  query_embedding vector(384),
  query_text      text,
  match_count     int default 12,
  filter_types    text[] default null
)
returns table (
  uid text, source_id text, content_type text, title text, summary text,
  url text, date text, fields jsonb, relations jsonb, score float
)
language sql stable
as $$
  with vec as (
    select d.uid, 1 - (d.embedding <=> query_embedding) as vscore
    from documents d
    where d.embedding is not null
      and (filter_types is null or d.content_type = any(filter_types))
    order by d.embedding <=> query_embedding
    limit match_count * 4
  ),
  kw as (
    select d.uid,
           ts_rank(d.fts, websearch_to_tsquery('english', query_text)) as kscore
    from documents d
    where (filter_types is null or d.content_type = any(filter_types))
      and query_text <> ''
      and d.fts @@ websearch_to_tsquery('english', query_text)
    limit match_count * 4
  )
  select d.uid, d.source_id, d.content_type, d.title, d.summary,
         d.url, d.date, d.fields, d.relations,
         (coalesce(v.vscore, 0) * 0.7 + coalesce(k.kscore, 0) * 0.3)::float as score
  from documents d
  left join vec v on v.uid = d.uid
  left join kw  k on k.uid = d.uid
  where v.uid is not null or k.uid is not null
  order by score desc
  limit match_count;
$$;

-- Fetch specific records by uid (used to expand the relationship graph).
create or replace function get_documents (uids text[])
returns table (
  uid text, source_id text, content_type text, title text, summary text,
  url text, date text, fields jsonb, relations jsonb
)
language sql stable
as $$
  select uid, source_id, content_type, title, summary, url, date, fields, relations
  from documents where uid = any(uids);
$$;
