-- ============================================================
-- Tables for Hat Battles + Pixel Canvas
-- Run once: Supabase dashboard -> SQL Editor -> New query -> paste -> Run
-- ============================================================

-- ---------- HAT BATTLES ----------
create table if not exists public.hat_stats (
  name    text primary key,
  wins    int not null default 0,
  battles int not null default 0
);

alter table public.hat_stats enable row level security;

-- anyone can read the leaderboard
drop policy if exists "read hats" on public.hat_stats;
create policy "read hats" on public.hat_stats for select to anon using (true);

-- voting only happens through this function (no direct writes), so it can't be abused
create or replace function public.vote_hat(w text, l text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if w is null or l is null or w = l then return; end if;
  if char_length(w) > 120 or char_length(l) > 120 then return; end if;
  insert into hat_stats(name, wins, battles) values (w, 1, 1)
    on conflict (name) do update set wins = hat_stats.wins + 1, battles = hat_stats.battles + 1;
  insert into hat_stats(name, wins, battles) values (l, 0, 1)
    on conflict (name) do update set battles = hat_stats.battles + 1;
end;
$$;

revoke all on function public.vote_hat(text, text) from public;
grant execute on function public.vote_hat(text, text) to anon;

-- ---------- PIXEL CANVAS (40 x 40) ----------
create table if not exists public.pixels (
  x          int not null,
  y          int not null,
  color      text not null,
  updated_at timestamptz not null default now(),
  primary key (x, y)
);

alter table public.pixels enable row level security;

drop policy if exists "read pixels" on public.pixels;
create policy "read pixels" on public.pixels for select to anon using (true);

-- place a pixel (insert), bounded to the grid + valid hex color
drop policy if exists "insert pixels" on public.pixels;
create policy "insert pixels" on public.pixels for insert to anon
  with check (x between 0 and 39 and y between 0 and 39 and color ~ '^#[0-9a-fA-F]{6}$');

-- overwrite an existing pixel (update)
drop policy if exists "update pixels" on public.pixels;
create policy "update pixels" on public.pixels for update to anon
  using (true)
  with check (x between 0 and 39 and y between 0 and 39 and color ~ '^#[0-9a-fA-F]{6}$');
