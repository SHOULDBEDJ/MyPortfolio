-- ============================================================
-- Dheeraj Katwe Portfolio — Supabase Schema
-- Run this SQL in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Drop existing table if re-running
drop table if exists portfolio_kv;

-- Single key-value table stores ALL portfolio data as JSON
create table portfolio_kv (
  key        text primary key,
  value      jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table portfolio_kv enable row level security;

-- Public can read everything (portfolio is public)
create policy "Public read"
  on portfolio_kv for select
  using (true);

-- Public can insert (new entries, e.g. first admin save)
create policy "Public insert"
  on portfolio_kv for insert
  with check (true);

-- Public can update (admin saves from browser)
create policy "Public update"
  on portfolio_kv for update
  using (true);

-- Confirm setup
select 'portfolio_kv table created successfully' as status;
