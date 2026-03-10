-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories table
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  icon text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Tools table
create table tools (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text not null,
  logo_url text not null,
  website_url text not null,
  pricing_type text not null check (pricing_type in ('free', 'freemium', 'paid', 'enterprise')),
  pricing_detail text,
  use_cases text[] not null default '{}',
  category_id uuid not null references categories(id) on delete cascade,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Favorites table
create table favorites (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  tool_id uuid not null references tools(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, tool_id)
);

-- Bookmarks table
create table bookmarks (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  tool_id uuid not null references tools(id) on delete cascade,
  memo text,
  is_done boolean not null default false,
  due_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_tools_category_id on tools(category_id);
create index idx_tools_pricing_type on tools(pricing_type);
create index idx_favorites_user_id on favorites(user_id);
create index idx_bookmarks_user_id on bookmarks(user_id);
