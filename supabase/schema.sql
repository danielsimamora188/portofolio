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

-- Optional: sample data
insert into public.profiles (full_name, title, bio, location, email, linkedin_url, github_url)
values (
  'Daniel Tulus Parsaoran Simamora',
  'Web Developer & Tech Enthusiast',
  'Saya adalah pengembang web yang berdedikasi membangun solusi digital inovatif.',
  'Indonesia',
  'daniel.simamora@example.com',
  'https://www.linkedin.com/in/daniel-tulus-parsaoran-simamora-208783213/',
  'https://github.com'
)
on conflict do nothing;

insert into public.experiences (company, role, location, start_date, end_date, is_current, description, display_order)
values
  ('Proyek Independen (Freelance)', 'Junior Web Developer', 'Remote', '2024-01-01', null, true, 'Mendesain dan memprogram aplikasi web interaktif menggunakan React/Next.js.', 1),
  ('Universitas / Pelatihan Mandiri', 'Student of Software Engineering & Web Development', 'Indonesia', '2022-09-01', '2023-12-31', false, 'Mempelajari rekayasa perangkat lunak dan teknologi frontend modern.', 2)
on conflict do nothing;

insert into public.projects (title, description, tags, live_url, github_url, display_order)
values
  ('E-Commerce App (Proyek Portofolio)', 'Aplikasi toko online modern dengan sistem manajemen produk dan pembayaran simulasi.', '{Next.js,TypeScript,Tailwind CSS,Supabase}', '#', '#', 1),
  ('Sistem Manajemen Tugas Real-time', 'Aplikasi produktivitas berbasis Kanban Board dengan fitur kolaborasi.', '{React.js,Node.js,Express,WebSockets}', '#', '#', 2)
on conflict do nothing;
