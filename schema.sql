-- ==========================================
-- 1. TABEL PROFIL UTAMA (profiles)
-- ==========================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT,
    location TEXT,
    avatar_url TEXT,
    resume_url TEXT,
    email TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy agar semua orang bisa membaca data profil (SELECT)
CREATE POLICY "Allow public read access to profiles" 
ON public.profiles FOR SELECT 
USING (true);

-- Policy agar hanya pengguna terautentikasi (admin) yang bisa mengubah data profil (ALL)
CREATE POLICY "Allow authenticated users full access to profiles" 
ON public.profiles FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- ==========================================
-- 2. TABEL PENGALAMAN (experiences)
-- Pekerjaan / Organisasi / Pendidikan
-- ==========================================
CREATE TABLE public.experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL jika masih bekerja di sana
    is_current BOOLEAN DEFAULT false,
    description TEXT,
    display_order INT DEFAULT 0, -- Untuk mengurutkan tampilan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Policy agar semua orang bisa membaca data pengalaman (SELECT)
CREATE POLICY "Allow public read access to experiences" 
ON public.experiences FOR SELECT 
USING (true);

-- Policy agar hanya pengguna terautentikasi (admin) yang bisa CRUD data pengalaman (ALL)
CREATE POLICY "Allow authenticated users full access to experiences" 
ON public.experiences FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- ==========================================
-- 3. TABEL PROYEK (projects)
-- ==========================================
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[], -- Array tag teknologi seperti ['React', 'Next.js', 'PostgreSQL']
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    display_order INT DEFAULT 0, -- Untuk mengurutkan tampilan
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mengaktifkan Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy agar semua orang bisa membaca data proyek (SELECT)
CREATE POLICY "Allow public read access to projects" 
ON public.projects FOR SELECT 
USING (true);

-- Policy agar hanya pengguna terautentikasi (admin) yang bisa CRUD data proyek (ALL)
CREATE POLICY "Allow authenticated users full access to projects" 
ON public.projects FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- ==========================================
-- 4. MEMASUKKAN DATA PROFIL AWAL (SEED DATA)
-- ==========================================
INSERT INTO public.profiles (full_name, title, bio, location, email, linkedin_url)
VALUES (
    'Daniel Tulus Parsaoran Simamora',
    'Web Developer & Tech Enthusiast',
    'Halo! Saya Daniel. Saya berfokus pada pengembangan aplikasi web modern dengan performa tinggi dan desain yang intuitif.',
    'Indonesia',
    'daniel.simamora@example.com', -- Silakan sesuaikan email Anda nanti
    'https://linkedin.com/in/daniel-simamora' -- Silakan sesuaikan link LinkedIn Anda nanti
);
