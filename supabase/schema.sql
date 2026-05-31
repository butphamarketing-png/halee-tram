-- Chạy trong Supabase → SQL Editor

create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text not null,
  date text not null,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'done')),
  created_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
alter table public.bookings enable row level security;

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
  on public.site_content for select
  using (true);

drop policy if exists "bookings_public_insert" on public.bookings;
create policy "bookings_public_insert"
  on public.bookings for insert
  with check (true);

-- Storage bucket cho ảnh admin (tùy chọn)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');
