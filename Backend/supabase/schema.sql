create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  display_name text,
  bio text,
  profile_image text,
  niche text,
  creator_level text default 'Beginner',
  youtube_url text,
  instagram_url text,
  tiktok_url text,
  verified boolean default false,
  rank_points integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists lore_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

create table if not exists lore_likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  post_id uuid references lore_posts(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, post_id)
);

create table if not exists lore_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references lore_posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table lore_posts enable row level security;
alter table lore_likes enable row level security;
alter table lore_comments enable row level security;

drop policy if exists "public read profiles" on profiles;
drop policy if exists "public write profiles" on profiles;
drop policy if exists "public update profiles" on profiles;
drop policy if exists "public read posts" on lore_posts;
drop policy if exists "public write posts" on lore_posts;
drop policy if exists "public read likes" on lore_likes;
drop policy if exists "public write likes" on lore_likes;
drop policy if exists "public read comments" on lore_comments;
drop policy if exists "public write comments" on lore_comments;

create policy "public read profiles" on profiles for select using (true);
create policy "public write profiles" on profiles for insert with check (true);
create policy "public update profiles" on profiles for update using (true) with check (true);

create policy "public read posts" on lore_posts for select using (true);
create policy "public write posts" on lore_posts for insert with check (true);

create policy "public read likes" on lore_likes for select using (true);
create policy "public write likes" on lore_likes for insert with check (true);

create policy "public read comments" on lore_comments for select using (true);
create policy "public write comments" on lore_comments for insert with check (true);