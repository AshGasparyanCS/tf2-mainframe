-- ============================================================
-- Comments table + security rules for Mann Co. Mainframe
-- Run this once in your Supabase project:
--   Supabase dashboard -> SQL Editor -> New query -> paste -> Run
-- ============================================================

create table if not exists public.comments (
  id          bigint generated always as identity primary key,
  post_id     text not null,
  name        text not null,
  body        text not null,
  created_at  timestamptz not null default now()
);

-- index so loading a post's comments is fast
create index if not exists comments_post_id_idx on public.comments (post_id);

-- Row Level Security: lock the table down, then open only what we need
alter table public.comments enable row level security;

-- Anyone (anonymous visitors) can READ comments
drop policy if exists "Public read comments" on public.comments;
create policy "Public read comments"
  on public.comments for select
  to anon
  using (true);

-- Anyone can INSERT a comment, but only within sane length limits.
-- No UPDATE/DELETE policies exist, so visitors can't edit or remove
-- comments — you moderate from the Supabase Table Editor.
drop policy if exists "Public insert comments" on public.comments;
create policy "Public insert comments"
  on public.comments for insert
  to anon
  with check (
    char_length(name) between 1 and 40
    and char_length(body) between 1 and 2000
  );
