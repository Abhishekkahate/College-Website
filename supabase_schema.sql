-- Create folders table
create table public.folders (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  parent_id uuid references public.folders(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add folder_id to notes table
alter table public.notes 
add column folder_id uuid references public.folders(id) on delete cascade;

-- Create practicals table
create table public.practicals (
  id uuid default gen_random_uuid() primary key,
  subject text not null,
  title text not null,
  group_id text not null check (group_id in ('J1', 'J2', 'J3')),
  date date not null,
  time time not null,
  room text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add practical_group to users table (assuming users table exists and is public.users or similar)
-- If you are using Supabase Auth, you might need to add this to a 'profiles' table instead.
-- Checking if 'profiles' exists or if we should add to 'users' in public schema if you have one.
-- For now, assuming a 'profiles' table linked to auth.users, or just adding to wherever user data is stored.
-- If you don't have a profiles table, create one:
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text default 'student',
  full_name text,
  section text,
  practical_group text check (practical_group in ('J1', 'J2', 'J3')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- If profiles already exists, just add the column:
-- alter table public.profiles add column practical_group text check (practical_group in ('J1', 'J2', 'J3'));

-- Enable RLS (Row Level Security) - Optional but recommended
alter table public.folders enable row level security;
alter table public.practicals enable row level security;

-- Create policies (simplified for now, allow all for authenticated users)
create policy "Enable all access for authenticated users" on public.folders
  for all using (auth.role() = 'authenticated');

create policy "Enable all access for authenticated users" on public.practicals
  for all using (auth.role() = 'authenticated');
