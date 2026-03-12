-- Create lead_magnet_submissions table
create table if not exists public.lead_magnet_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  magnet_type text not null,
  payload_data jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.lead_magnet_submissions enable row level security;

-- Create policy to allow anonymous inserts
create policy "Allow anonymous inserts to lead_magnet_submissions"
  on public.lead_magnet_submissions
  for insert
  to anon
  with check (true);

-- Create policy to allow service_role to manage everything (optional but recommended for internal visibility)
create policy "Allow service_role full access to lead_magnet_submissions"
  on public.lead_magnet_submissions
  for all
  to service_role
  using (true)
  with check (true);
