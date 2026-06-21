import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { 
  Briefcase, 
  FolderGit2, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Lock, 
  GraduationCap,
  Sparkles,
  ArrowRight,
  Send,
  Code2,
  Database,
  Workflow,
  Layers3,
  PenTool
} from 'lucide-react'

export const dynamic = 'force-dynamic'

// Tipe Data untuk Type Safety
interface Profile {
  full_name: string
  title: string
  bio: string | null
  location: string | null
  avatar_url: string | null
  resume_url: string | null
  email: string | null
  linkedin_url: string | null
  github_url: string | null
}

interface Experience {
  id: string
  company: string
  role: string
  location: string | null
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
}

interface Project {
  id: string
  title: string
  description: string | null
  tags: string[] | null
  image_url: string | null
  live_url: string | null
  github_url: string | null
}

interface Education {
  id: string
  school: string
  degree: string
  period: string
  description: string | null
  display_order: number | null
}

interface SkillItem {
  id: string
  category: string
  name: string
  value: number
  display_order: number | null
}

// Data Cadangan (Fallback) jika Supabase belum terisi
const fallbackProfile: Profile = {
  full_name: "Daniel Tulus Parsaoran Simamora",
  title: "Frontend Developer • UI Engineer • Problem Solver",
  bio: "Saya menyukai membangun web yang tidak hanya terlihat bagus, tetapi juga cepat, jelas, dan mudah digunakan. Fokus saya pada pengalaman pengguna, arsitektur yang rapi, dan solusi digital yang benar-benar membantu bisnis berkembang.",
  location: "Indonesia",
  avatar_url: null,
  resume_url: null,
  email: "daniel.simamora@example.com",
  linkedin_url: "https://www.linkedin.com/in/daniel-tulus-parsaoran-simamora-208783213/",
  github_url: "https://github.com"
}

const fallbackExperiences: Experience[] = [
  {
    id: "fb-exp-1",
    company: "Proyek Independen (Freelance)",
    role: "Junior Web Developer",
    location: "Remote",
    start_date: "2024-01-01",
    end_date: null,
    is_current: true,
    description: "Mendesain dan memprogram aplikasi web interaktif menggunakan ekosistem React/Next.js dan basis data PostgreSQL. Berkolaborasi langsung dengan klien untuk menerjemahkan kebutuhan bisnis menjadi interface siap pakai."
  },
  {
    id: "fb-exp-2",
    company: "Universitas / Pelatihan Mandiri",
    role: "Student of Software Engineering & Web Development",
    location: "Indonesia",
    start_date: "2022-09-01",
    end_date: "2023-12-31",
    is_current: false,
    description: "Mempelajari dasar rekayasa perangkat lunak, algoritma, pemodelan database relational, serta teknologi frontend modern seperti Tailwind CSS, JavaScript, dan integrasi API."
  }
]

const fallbackProjects: Project[] = [
  {
    id: "fb-proj-1",
    title: "E-Commerce App (Proyek Portofolio)",
    description: "Aplikasi toko online modern dengan sistem manajemen produk, keranjang belanja, proses pembayaran simulasi, dan integrasi Supabase Database.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    image_url: null,
    live_url: "#",
    github_url: "#"
  },
  {
    id: "fb-proj-2",
    title: "Sistem Manajemen Tugas Real-time",
    description: "Aplikasi produktivitas berbasis Kanban Board dengan fungsionalitas kolaborasi instan, drag-and-drop antarmuka, dan sinkronisasi real-time.",
    tags: ["React.js", "Node.js", "Express", "WebSockets"],
    image_url: null,
    live_url: "#",
    github_url: "#"
  }
]

const fallbackEducation: Education[] = [
  {
    id: 'fb-edu-1',
    school: 'Universitas / Sekolah Tinggi',
    degree: 'Program Studi / Jurusan',
    period: '2022 — 2025',
    description: 'Fokus pada pengembangan perangkat lunak, sistem informasi, dan kemampuan analisis problem solving digital.',
    display_order: 1
  },
  {
    id: 'fb-edu-2',
    school: 'SMK / SMA',
    degree: 'Bidang yang relevan dengan teknologi',
    period: '2020 — 2022',
    description: 'Dasar-dasar pemrograman, logika komputer, dan minat besar terhadap pengembangan web serta teknologi modern.',
    display_order: 2
  }
]

const fallbackSkillGroups = [
  {
    title: 'Frontend',
    items: [
      { name: 'Next.js', value: 93 },
      { name: 'React', value: 90 },
      { name: 'TypeScript', value: 88 },
      { name: 'Tailwind CSS', value: 91 }
    ]
  },
  {
    title: 'Backend & Database',
    items: [
      { name: 'Node.js', value: 82 },
      { name: 'Express', value: 80 },
      { name: 'PostgreSQL', value: 78 },
      { name: 'Supabase', value: 85 }
    ]
  },
  {
    title: 'UI/UX & Design',
    items: [
      { name: 'Figma', value: 84 },
      { name: 'Wireframing', value: 80 },
      { name: 'Design System', value: 86 },
      { name: 'Responsive UI', value: 92 }
    ]
  },
  {
    title: 'Tools & Workflow',
    items: [
      { name: 'Git', value: 90 },
      { name: 'GitHub', value: 88 },
      { name: 'Vercel', value: 84 },
      { name: 'VS Code', value: 91 }
    ]
  }
]

export default async function Home() {
  let profile = fallbackProfile
  let experiences = fallbackExperiences
  let projects = fallbackProjects
  let education = fallbackEducation
  let skillGroups = fallbackSkillGroups
  let dbError = false

  try {
    const supabase = await createClient()

    // Ambil Data Profil
    const { data: dbProfile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .maybeSingle()

    if (dbProfile && !profileError) {
      profile = dbProfile
    }

    // Ambil Data Pengalaman
    const { data: dbExperiences, error: expError } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true })
      .order('start_date', { ascending: false })

    if (dbExperiences && dbExperiences.length > 0 && !expError) {
      experiences = dbExperiences
    }

    // Ambil Data Pendidikan
    const { data: dbEducation, error: eduError } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true })

    if (dbEducation && dbEducation.length > 0 && !eduError) {
      education = dbEducation
    }

    // Ambil Data Skill
    const { data: dbSkills, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true })

    if (dbSkills && dbSkills.length > 0 && !skillError) {
      const grouped = new Map<string, { title: string; items: { name: string; value: number }[] }>()

      dbSkills.forEach((skill) => {
        const key = skill.category || 'General'
        if (!grouped.has(key)) {
          grouped.set(key, { title: key, items: [] })
        }
        grouped.get(key)?.items.push({
          name: skill.name,
          value: Number(skill.value) || 0,
        })
      })

      skillGroups = Array.from(grouped.values())
    }

    // Ambil Data Proyek
    const { data: dbProjects, error: projError } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })

    if (dbProjects && dbProjects.length > 0 && !projError) {
      projects = dbProjects
    }

    if (profileError || expError || projError) {
      dbError = true
      console.error("Supabase load error:", { profileError, expError, projError })
    }

    if (eduError || skillError) {
      console.warn("Optional portfolio tables unavailable, using fallback values:", { eduError, skillError })
    }
  } catch (error) {
    dbError = true
    console.error("Failed to connect to database:", error)
  }

  // Format tanggal untuk pengalaman kerja
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
  }

  const getSkillIcon = (title: string) => {
    if (title.includes('Frontend')) return <Code2 size={18} />
    if (title.includes('Backend') || title.includes('Database')) return <Database size={18} />
    if (title.includes('UI') || title.includes('Design')) return <PenTool size={18} />
    return <Workflow size={18} />
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#eef2f7]">
      <header className="sticky top-0 z-50 border-b border-[#1f2430] bg-[#0b0d12]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-sm font-semibold tracking-[0.38em] text-[#eef2f7] uppercase">
            Daniel.S
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[#9aa4b2] md:flex">
            <a href="#about" className="transition duration-300 hover:text-white">Tentang</a>
            <a href="#education" className="transition duration-300 hover:text-white">Pendidikan</a>
            <a href="#experience" className="transition duration-300 hover:text-white">Karir</a>
            <a href="#projects" className="transition duration-300 hover:text-white">Proyek</a>
            <a href="#contact" className="transition duration-300 hover:text-white">Kontak</a>
          </nav>
          <Link href="/login" className="inline-flex items-center gap-1.5 rounded-full border border-[#1f2430] bg-[#121826] px-3 py-1.5 text-sm text-[#c7d1df] transition duration-300 hover:border-[#2a3143] hover:text-white">
            <Lock size={14} />
            Admin
          </Link>
        </div>
      </header>

      {dbError && (
        <div className="px-6 pt-6">
          <div className="mx-auto max-w-6xl rounded-2xl border border-[#3b2435] bg-[#24131d] px-4 py-3 text-center text-sm text-[#f4b5c7]">
            ⚠️ Menampilkan data cadangan karena koneksi ke Supabase sedang bermasalah.
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-16">
        <section id="about" className="grid gap-12 border-b border-[#1f2430] pb-16 pt-3 sm:grid-cols-[1.08fr_0.92fr] sm:items-center transition duration-300 hover:border-[#2a3143]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a3143] bg-[#121826] px-3.5 py-1.5 text-xs font-medium tracking-[0.18em] text-[#c7d1df] uppercase">
              <Sparkles size={14} />
              Building thoughtful digital experiences
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Saya membangun web yang <span className="text-[#f5f7fb]">cepat</span>, <span className="text-[#f5f7fb]">rapi</span>, dan terasa <span className="text-[#f5f7fb]">premium</span>.
            </h1>
            <p className="mt-3 text-base font-medium text-[#c7d1df] sm:text-lg">{profile.title}</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#9aa4b2] sm:text-[15px]">{profile.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {profile.location && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#121826] px-3 py-1.5 text-sm text-[#c7d1df]">
                  <MapPin size={14} />
                  {profile.location}
                </span>
              )}
              {profile.email && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#121826] px-3 py-1.5 text-sm text-[#c7d1df]">
                  <Mail size={14} />
                  {profile.email}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'UI Design'].map((tag) => (
                <span key={tag} className="rounded-full border border-[#1f2430] bg-[#0f1320] px-3 py-1 text-xs text-[#9aa4b2]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Focus', value: 'Clean UI' },
                { label: 'Approach', value: 'User-first' },
                { label: 'Style', value: 'Minimal & Fast' }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[#7a89a4]">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b0d12] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f1f3f7]">
                Mari ngobrol
                <ArrowRight size={16} />
              </a>
              {profile.resume_url && (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-[#2a3143] bg-[#121826] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#172033]">
                  Unduh CV
                </a>
              )}
              <div className="flex items-center gap-2">
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2a3143] bg-[#121826] text-[#c7d1df] transition duration-300 hover:-translate-y-0.5 hover:text-white">
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2a3143] bg-[#121826] text-[#c7d1df] transition duration-300 hover:-translate-y-0.5 hover:text-white">
                    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <div className="relative w-full max-w-[430px]">
              <div className="absolute -right-3 -top-3 hidden h-24 w-24 rounded-3xl bg-[#121826] opacity-60 blur-2xl sm:block" />
              <div className="relative overflow-hidden rounded-[32px] border border-[#1f2430] bg-[#0f1320] p-3 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-[#2a3143] hover:shadow-lg">
                <div className="relative overflow-hidden rounded-[28px] bg-[#121826]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.08),transparent_25%)]" />
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {profile.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={profile.avatar_url} alt={profile.full_name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#0f1320] text-6xl font-semibold tracking-[0.25em] text-white">
                        {profile.full_name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                  </div>

                  <div className="relative border-t border-[#1f2430] bg-[#0f1320]/80 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a89a4]">Profile</p>
                        <h3 className="mt-1 text-xl font-semibold text-white">{profile.full_name}</h3>
                      </div>
                      <span className="rounded-full border border-[#2a3143] bg-[#121826] px-3 py-1 text-[11px] text-[#c7d1df]">
                        Available
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#9aa4b2]">{profile.title}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121826] px-3 py-1.5 text-xs text-[#c7d1df]">
                          <MapPin size={13} />
                          {profile.location}
                        </span>
                      )}
                      {profile.email && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#121826] px-3 py-1.5 text-xs text-[#c7d1df]">
                          <Mail size={13} />
                          {profile.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="border-b border-[#1f2430] py-16 transition duration-300 hover:border-[#2a3143]">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#121826]">
              <GraduationCap size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Pendidikan</h2>
              <p className="text-sm text-[#9aa4b2]">Fondasi belajar yang membentuk cara saya berpikir dan membangun produk</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#2a3143] hover:bg-[#14203a]">
                <p className="text-xs uppercase tracking-[0.3em] text-[#7a89a4]">{item.period}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{item.school}</h3>
                <p className="mt-1 text-sm text-[#c7d1df]">{item.degree}</p>
                {item.description && (
                  <p className="mt-4 text-sm leading-7 text-[#9aa4b2]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="border-b border-[#1f2430] py-16 transition duration-300 hover:border-[#2a3143]">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#121826]">
              <Layers3 size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Skill yang saya kuasai</h2>
              <p className="text-sm text-[#9aa4b2]">Kemampuan utama yang saya pakai untuk mengerjakan proyek nyata</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-[#1f2430] bg-[#121826] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#2f3a52] hover:bg-[#14203a]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f1320] text-[#c7d1df] transition duration-300 group-hover:text-white">
                    {getSkillIcon(group.title)}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                </div>
                <div className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between text-xs text-[#9aa4b2]">
                        <span>{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#0f1320]">
                        <div
                          className="h-full rounded-full bg-[#7c9cff] transition-all duration-700 ease-out"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-16">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#121826]">
              <Briefcase size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Pengalaman</h2>
              <p className="text-sm text-[#9aa4b2]">Perjalanan kerja dan pembelajaran yang membentuk cara saya berkarya</p>
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#2a3143] hover:bg-[#14203a]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                    <p className="text-sm text-[#c7d1df]">{exp.company}</p>
                  </div>
                  <span className="text-xs text-[#9aa4b2]">
                    {formatDate(exp.start_date)} — {exp.is_current ? 'Sekarang' : exp.end_date ? formatDate(exp.end_date) : ''}
                  </span>
                </div>
                {exp.location && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-[#9aa4b2]">
                    <MapPin size={14} />
                    {exp.location}
                  </div>
                )}
                {exp.description && (
                  <p className="mt-4 text-sm leading-7 text-[#c7d1df]">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="border-t border-[#1f2430] py-16">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#121826]">
              <FolderGit2 size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Proyek</h2>
              <p className="text-sm text-[#9aa4b2]">Karya yang saya bangun dengan fokus pada kualitas, performa, dan pengalaman pengguna</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#2a3143] hover:bg-[#14203a]">
                <div className="h-44 overflow-hidden rounded-xl bg-[#0f1320]">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#4a5875]">
                      <FolderGit2 size={36} />
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{project.title}</h3>
                {project.description && (
                  <p className="mt-2 text-sm leading-6 text-[#c7d1df]">{project.description}</p>
                )}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="rounded-full bg-[#0f1320] px-3 py-1 text-xs text-[#9aa4b2]">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex items-center gap-4 border-t border-[#1f2430] pt-4">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#9aa4b2] transition duration-300 hover:-translate-y-0.5 hover:text-white">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      Source
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white transition duration-300 hover:-translate-y-0.5 hover:text-[#c7d1df]">
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-[#1f2430] py-16">
          <div className="relative overflow-hidden rounded-[32px] border border-[#1f2430] bg-[#0f1320] p-8 shadow-sm transition duration-300 hover:border-[#2a3143]">
            <div className="absolute inset-0 bg-[#0f1320]" />
            <div className="absolute right-6 top-6 hidden h-24 w-24 rounded-full bg-[#121826] opacity-40 sm:block" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#2a3143] bg-[#121826] px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#c7d1df]">
                  <Send size={14} />
                  Contact
                </div>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">Siap membangun sesuatu yang benar-benar worth it?</h2>
                <p className="mt-3 text-sm leading-7 text-[#9aa4b2] sm:text-[15px]">
                  Saya terbuka untuk proyek, kolaborasi, atau ide yang butuh eksekusi cepat, rapi, dan berorientasi hasil.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Freelance', 'Kolaborasi', 'Startup', 'Website'].map((item) => (
                    <span key={item} className="rounded-full border border-[#1f2430] bg-[#121826] px-3 py-1 text-xs text-[#9aa4b2]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:min-w-[280px] sm:items-end">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0b0d12] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f1f3f7] sm:w-auto">
                    <Mail size={16} />
                    {profile.email}
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#2a3143] bg-[#121826] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#172033] sm:w-auto">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1f2430] bg-[#0b0d12] py-8 transition duration-300 hover:border-[#2a3143]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm text-[#9aa4b2] sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-medium text-[#eef2f7]">{profile.full_name}</p>
            <p className="mt-1">© {new Date().getFullYear()} — Crafted with intention.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#about" className="transition duration-300 hover:text-white">Kembali ke Atas</a>
            <span className="inline-block h-1 w-1 rounded-full bg-[#2a3143]" />
            <a href={`mailto:${profile.email || ''}`} className="transition duration-300 hover:text-white">{profile.email}</a>
            <span className="inline-block h-1 w-1 rounded-full bg-[#2a3143]" />
            <Link href="/login" className="inline-flex items-center gap-1 transition duration-300 hover:text-white">
              <Lock size={14} />
              Login Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


