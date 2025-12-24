-- Enable UUID extension (usually enabled by default)
create extension if not exists "uuid-ossp";

-- Create the user_progress table
create table user_progress (
  user_id uuid references auth.users not null primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table user_progress enable row level security;

-- Create Policy: Users can see their own progress
create policy "Users can view their own progress"
  on user_progress for select
  using ( auth.uid() = user_id );

-- Create Policy: Users can insert/update their own progress
create policy "Users can update their own progress"
  on user_progress for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own progress via update"
  on user_progress for update
  using ( auth.uid() = user_id );
