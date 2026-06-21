-- Schema untuk portfolio
-- Jalankan di SQL Editor Supabase

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text not null,
  bio text,
  location text,
  avatar_url text,
  resume_url text,
  email text,
  linkedin_url text,
  github_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  location text,
  start_date date not null,
  end_date date,
  is_current boolean default false,
  description text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tags text[] default '{}',
  image_url text,
  live_url text,
  github_url text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  degree text not null,
  period text,
  description text,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  value integer default 0,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pastikan row-level security tidak mengganggu read di public site
alter table public.profiles enable row level security;
alter table public.experiences enable row level security;
alter table public.projects enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;

drop policy if exists "Allow public read access to profiles" on public.profiles;
drop policy if exists "Allow public read access to experiences" on public.experiences;
drop policy if exists "Allow public read access to projects" on public.projects;
drop policy if exists "Allow public read access to education" on public.education;
drop policy if exists "Allow public read access to skills" on public.skills;

drop policy if exists "Allow authenticated users full access to profiles" on public.profiles;
drop policy if exists "Allow authenticated users full access to experiences" on public.experiences;
drop policy if exists "Allow authenticated users full access to projects" on public.projects;
drop policy if exists "Allow authenticated users full access to education" on public.education;
drop policy if exists "Allow authenticated users full access to skills" on public.skills;

create policy "Allow public read access to profiles"
  on public.profiles for select
  using (true);

create policy "Allow public read access to experiences"
  on public.experiences for select
  using (true);

create policy "Allow public read access to projects"
  on public.projects for select
  using (true);

create policy "Allow public read access to education"
  on public.education for select
  using (true);

create policy "Allow public read access to skills"
  on public.skills for select
  using (true);

create policy "Allow authenticated users full access to profiles"
  on public.profiles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users full access to experiences"
  on public.experiences for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users full access to projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users full access to education"
  on public.education for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Allow authenticated users full access to skills"
  on public.skills for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Data demo / default untuk portfolio
insert into public.profiles (
  full_name,
  title,
  bio,
  location,
  email,
  linkedin_url,
  github_url
)
values (
  'Daniel Tulus Parsaoran Simamora',
  'Web Developer & Tech Enthusiast',
  'Saya adalah pengembang web yang berdedikasi membangun solusi digital inovatif dengan performa optimal dan tampilan premium. Fokus saya saat ini adalah Next.js, React, dan integrasi basis data modern.',
  'Indonesia',
  'daniel.simamora@example.com',
  'https://www.linkedin.com/in/daniel-tulus-parsaoran-simamora-208783213/',
  'https://github.com'
)
on conflict do nothing;

insert into public.experiences (
  company,
  role,
  location,
  start_date,
  end_date,
  is_current,
  description,
  display_order
)
values
  (
    'Proyek Independen (Freelance)',
    'Junior Web Developer',
    'Remote',
    '2024-01-01',
    null,
    true,
    'Mendesain dan memprogram aplikasi web interaktif menggunakan ekosistem React/Next.js dan basis data PostgreSQL. Berkolaborasi langsung dengan klien untuk menerjemahkan kebutuhan bisnis menjadi interface siap pakai.',
    1
  ),
  (
    'Universitas / Pelatihan Mandiri',
    'Student of Software Engineering & Web Development',
    'Indonesia',
    '2022-09-01',
    '2023-12-31',
    false,
    'Mempelajari dasar rekayasa perangkat lunak, algoritma, pemodelan database relational, serta teknologi frontend modern seperti Tailwind CSS, JavaScript, dan integrasi API.',
    2
  )
on conflict do nothing;

insert into public.projects (
  title,
  description,
  tags,
  image_url,
  live_url,
  github_url,
  display_order
)
values
  (
    'E-Commerce App (Proyek Portofolio)',
    'Aplikasi toko online modern dengan sistem manajemen produk, keranjang belanja, proses pembayaran simulasi, dan integrasi Supabase Database.',
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    null,
    '#',
    '#',
    1
  ),
  (
    'Sistem Manajemen Tugas Real-time',
    'Aplikasi produktivitas berbasis Kanban Board dengan fungsionalitas kolaborasi instan, drag-and-drop antarmuka, dan sinkronisasi real-time.',
    ARRAY['React.js', 'Node.js', 'Express', 'WebSockets'],
    null,
    '#',
    '#',
    2
  )
on conflict do nothing;

insert into public.education (
  school,
  degree,
  period,
  description,
  display_order
)
values
  (
    'Universitas / Sekolah Tinggi',
    'Program Studi / Jurusan',
    '2022 — 2025',
    'Fokus pada pengembangan perangkat lunak, sistem informasi, dan kemampuan analisis problem solving digital.',
    1
  ),
  (
    'SMK / SMA',
    'Bidang yang relevan dengan teknologi',
    '2020 — 2022',
    'Dasar-dasar pemrograman, logika komputer, dan minat besar terhadap pengembangan web serta teknologi modern.',
    2
  )
on conflict do nothing;

insert into public.skills (
  category,
  name,
  value,
  display_order
)
values
  ('Frontend', 'Next.js', 93, 1),
  ('Frontend', 'React', 90, 2),
  ('Frontend', 'TypeScript', 88, 3),
  ('Frontend', 'Tailwind CSS', 91, 4),
  ('Backend & Database', 'Node.js', 82, 5),
  ('Backend & Database', 'Express', 80, 6),
  ('Backend & Database', 'PostgreSQL', 78, 7),
  ('Backend & Database', 'Supabase', 85, 8),
  ('UI/UX & Design', 'Figma', 84, 9),
  ('UI/UX & Design', 'Wireframing', 80, 10),
  ('UI/UX & Design', 'Design System', 86, 11),
  ('UI/UX & Design', 'Responsive UI', 92, 12),
  ('Tools & Workflow', 'Git', 90, 13),
  ('Tools & Workflow', 'GitHub', 88, 14),
  ('Tools & Workflow', 'Vercel', 84, 15),
  ('Tools & Workflow', 'VS Code', 91, 16)
on conflict do nothing;
