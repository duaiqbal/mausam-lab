-- =============================================================================
-- MAUSAM LAB — SUPABASE DATABASE SCHEMA
-- Run this entire script once in your Supabase project:
--   Supabase Dashboard → SQL Editor → New Query → paste → Run
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. RESEARCH
-- ---------------------------------------------------------------------------
create table if not exists public.research (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  category    text not null default 'Research & Analysis',
  author      text not null default '',
  date        text not null default '',
  excerpt     text not null default '',
  body        text[] not null default '{}',
  image_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. PUBLICATIONS
-- ---------------------------------------------------------------------------
create table if not exists public.publications (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  type         text not null default 'Policy Briefs',
  author       text not null default '',
  date         text not null default '',
  description  text not null default '',
  download_url text,
  image_url    text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 3. INITIATIVES
-- ---------------------------------------------------------------------------
create table if not exists public.initiatives (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null default '',
  image_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 4. PROJECTS
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  status      text not null default 'Planned',
  focus_area  text not null default '',
  description text not null default '',
  image_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 5. TEAM MEMBERS
-- ---------------------------------------------------------------------------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  position    text not null default '',
  bio         text not null default '',
  expertise   text not null default '',
  department  text not null default 'Executive Team',
  image_url   text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 6. OPPORTUNITIES
-- ---------------------------------------------------------------------------
create table if not exists public.opportunities (
  id               uuid primary key default gen_random_uuid(),
  title            text not null,
  category         text not null default 'Internships',
  eligibility      text not null default '',
  deadline         text not null default '',
  status           text not null default 'Not currently open',
  description      text not null default '',
  application_link text,
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 7. SITE CONFIG  (brand info + about page — one row, id = 'main')
-- ---------------------------------------------------------------------------
create table if not exists public.site_config (
  id              text primary key default 'main',
  brand_name      text not null default 'Mausam Lab',
  brand_tagline   text not null default 'Youth-led climate policy, research & sustainability.',
  contact_email   text not null default '',
  location        text not null default '',
  social_twitter  text not null default '',
  social_instagram text not null default '',
  social_linkedin text not null default '',
  social_facebook text not null default '',
  -- About page
  about_intro     text not null default '',
  about_intro2    text not null default '',
  about_intro3    text not null default '',
  about_approach  text[] not null default '{}',
  about_approach_steps text[] not null default '{"Evidence","Understanding","Communication","Skills","Action"}',
  about_focus_intro    text not null default '',
  about_focus_areas    text[] not null default '{}',
  about_what_we_do     jsonb not null default '[]',
  about_contributions  jsonb not null default '[]',
  about_different_intro    text not null default '',
  about_different_closing  text not null default '',
  about_vision     text not null default '',
  about_collaborations text not null default '',
  updated_at       timestamptz not null default now()
);

-- Insert the default 'main' row so it always exists
insert into public.site_config (id) values ('main')
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- 8. UPDATED_AT TRIGGER (keeps updated_at fresh on every row change)
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array[
    'research','publications','initiatives','projects',
    'team_members','opportunities','site_config'
  ] loop
    execute format(
      'create trigger trg_%s_updated_at
       before update on public.%s
       for each row execute function public.set_updated_at()',
      t, t
    );
  end loop;
exception when duplicate_object then null;
end;
$$;

-- ---------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
-- Enable RLS on every table
alter table public.research         enable row level security;
alter table public.publications     enable row level security;
alter table public.initiatives      enable row level security;
alter table public.projects         enable row level security;
alter table public.team_members     enable row level security;
alter table public.opportunities    enable row level security;
alter table public.site_config      enable row level security;

-- PUBLIC can SELECT (read) everything — needed for the live website
create policy "public_read_research"      on public.research      for select using (true);
create policy "public_read_publications"  on public.publications  for select using (true);
create policy "public_read_initiatives"   on public.initiatives   for select using (true);
create policy "public_read_projects"      on public.projects      for select using (true);
create policy "public_read_team"          on public.team_members  for select using (true);
create policy "public_read_opportunities" on public.opportunities for select using (true);
create policy "public_read_site_config"   on public.site_config   for select using (true);

-- Only authenticated users (the admin) can INSERT / UPDATE / DELETE
create policy "auth_write_research"      on public.research      for all using (auth.role() = 'authenticated');
create policy "auth_write_publications"  on public.publications  for all using (auth.role() = 'authenticated');
create policy "auth_write_initiatives"   on public.initiatives   for all using (auth.role() = 'authenticated');
create policy "auth_write_projects"      on public.projects      for all using (auth.role() = 'authenticated');
create policy "auth_write_team"          on public.team_members  for all using (auth.role() = 'authenticated');
create policy "auth_write_opportunities" on public.opportunities for all using (auth.role() = 'authenticated');
create policy "auth_write_site_config"   on public.site_config   for all using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------------
-- 10. STORAGE BUCKET FOR IMAGES
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('cms-images', 'cms-images', true)
on conflict (id) do nothing;

-- Anyone can read images (they're public)
create policy "public_read_cms_images" on storage.objects
  for select using (bucket_id = 'cms-images');

-- Only authenticated users can upload/delete images
create policy "auth_upload_cms_images" on storage.objects
  for insert with check (bucket_id = 'cms-images' and auth.role() = 'authenticated');

create policy "auth_delete_cms_images" on storage.objects
  for delete using (bucket_id = 'cms-images' and auth.role() = 'authenticated');

create policy "auth_update_cms_images" on storage.objects
  for update using (bucket_id = 'cms-images' and auth.role() = 'authenticated');

-- =============================================================================
-- DONE. Now go to Supabase → Authentication → Users → Invite a user
-- to create your admin account, or use:
--   supabase.auth.signUp({ email: '...', password: '...' })
-- =============================================================================

-- =============================================================================
-- ENABLE REALTIME (run this so public pages auto-update when admin saves)
-- =============================================================================
alter publication supabase_realtime add table public.research;
alter publication supabase_realtime add table public.publications;
alter publication supabase_realtime add table public.initiatives;
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.team_members;
alter publication supabase_realtime add table public.opportunities;
alter publication supabase_realtime add table public.site_config;

-- =============================================================================
-- ADD EXCERPT + ARTICLE_BODY COLUMNS TO PUBLICATIONS
-- Run this in Supabase SQL Editor if your table already exists
-- =============================================================================
alter table public.publications
  add column if not exists excerpt      text not null default '',
  add column if not exists article_body text not null default '';

-- Migrate existing description data to excerpt (keep description for backwards compat)
-- update public.publications set excerpt = description where excerpt = '';

-- =============================================================================
-- MAUSAM SKILLS — 3 new tables
-- Run in Supabase SQL Editor
-- =============================================================================

-- 1. Skill categories (e.g. Research Skills, Policy Skills)
create table if not exists public.skills_categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Individual skills under each category (e.g. Literature Review)
create table if not exists public.skills (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.skills_categories(id) on delete cascade,
  name        text not null,
  description text not null default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 3. Resources/guides under each skill (e.g. a guide, template, article)
create table if not exists public.skill_resources (
  id          uuid primary key default gen_random_uuid(),
  skill_id    uuid not null references public.skills(id) on delete cascade,
  title       text not null,
  resource_type text not null default 'Guide',  -- Guide, Template, Example, Checklist, Article, Video
  description text not null default '',
  content     text not null default '',          -- full content shown when opened
  url         text,                              -- optional external link
  read_time   text not null default '',          -- e.g. "5 min read"
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- updated_at triggers
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

do $$ declare t text;
begin
  foreach t in array array['skills_categories','skills','skill_resources'] loop
    execute format(
      'create trigger trg_%s_updated_at before update on public.%s
       for each row execute function public.set_updated_at()', t, t);
  end loop;
exception when duplicate_object then null;
end; $$;

-- RLS
alter table public.skills_categories  enable row level security;
alter table public.skills              enable row level security;
alter table public.skill_resources     enable row level security;

create policy "public_read_skills_categories"  on public.skills_categories  for select using (true);
create policy "public_read_skills"             on public.skills              for select using (true);
create policy "public_read_skill_resources"    on public.skill_resources     for select using (true);

create policy "auth_write_skills_categories"   on public.skills_categories  for all using (auth.role()='authenticated');
create policy "auth_write_skills"              on public.skills              for all using (auth.role()='authenticated');
create policy "auth_write_skill_resources"     on public.skill_resources     for all using (auth.role()='authenticated');

-- Realtime
alter publication supabase_realtime add table public.skills_categories;
alter publication supabase_realtime add table public.skills;
alter publication supabase_realtime add table public.skill_resources;

-- Seed default categories and skills so the CMS isn't empty
insert into public.skills_categories (name, description, sort_order) values
  ('Research Skills',      'Build the skills to ask better questions, conduct stronger research, and work with evidence.', 1),
  ('Policy Skills',        'Learn how to understand policy, communicate evidence, and develop practical recommendations.', 2),
  ('Communication Skills', 'Learn how to turn complex research and climate issues into clear, accessible communication.', 3),
  ('Career Skills',        'Practical resources for navigating opportunities in research, policy, climate, and development.', 4),
  ('Climate Knowledge',    'Build a stronger understanding of the ideas and systems shaping climate policy and action.', 5)
on conflict do nothing;

-- Seed skills for Research Skills category
with cat as (select id from public.skills_categories where name = 'Research Skills' limit 1)
insert into public.skills (category_id, name, sort_order)
select cat.id, s.name, s.ord from cat,
  (values
    ('Literature Review', 1), ('Research Questions', 2), ('Interviews', 3),
    ('Surveys', 4), ('Field Research', 5), ('Referencing & Citations', 6)
  ) as s(name, ord)
on conflict do nothing;

-- Seed skills for Policy Skills
with cat as (select id from public.skills_categories where name = 'Policy Skills' limit 1)
insert into public.skills (category_id, name, sort_order)
select cat.id, s.name, s.ord from cat,
  (values
    ('Policy Brief Writing', 1), ('Policy Analysis', 2), ('Stakeholder Mapping', 3),
    ('Policy Recommendations', 4), ('Policy Research', 5)
  ) as s(name, ord)
on conflict do nothing;

-- Seed skills for Communication Skills
with cat as (select id from public.skills_categories where name = 'Communication Skills' limit 1)
insert into public.skills (category_id, name, sort_order)
select cat.id, s.name, s.ord from cat,
  (values
    ('Climate Communication', 1), ('Writing for Public Audiences', 2),
    ('Research Storytelling', 3), ('Visual Communication', 4), ('Science Communication', 5)
  ) as s(name, ord)
on conflict do nothing;

-- Seed skills for Career Skills
with cat as (select id from public.skills_categories where name = 'Career Skills' limit 1)
insert into public.skills (category_id, name, sort_order)
select cat.id, s.name, s.ord from cat,
  (values
    ('CV & Profile Building', 1), ('Scholarship Applications', 2),
    ('Conference Applications', 3), ('Professional Networking', 4)
  ) as s(name, ord)
on conflict do nothing;

-- Seed skills for Climate Knowledge
with cat as (select id from public.skills_categories where name = 'Climate Knowledge' limit 1)
insert into public.skills (category_id, name, sort_order)
select cat.id, s.name, s.ord from cat,
  (values
    ('Climate Governance', 1), ('Climate Finance', 2), ('Adaptation & Resilience', 3),
    ('Disaster Risk Reduction', 4), ('Environmental Security', 5)
  ) as s(name, ord)
on conflict do nothing;
