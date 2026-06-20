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
  User,
  Send
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

// Data Cadangan (Fallback) jika Supabase belum terisi
const fallbackProfile: Profile = {
  full_name: "Daniel Tulus Parsaoran Simamora",
  title: "Web Developer & Tech Enthusiast",
  bio: "Saya adalah pengembang web yang berdedikasi membangun solusi digital inovatif dengan performa optimal dan tampilan premium. Fokus saya saat ini adalah Next.js, React, dan integrasi basis data modern.",
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

export default async function Home() {
  let profile = fallbackProfile
  let experiences = fallbackExperiences
  let projects = fallbackProjects
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
  } catch (error) {
    dbError = true
    console.error("Failed to connect to database:", error)
  }

  // Format tanggal untuk pengalaman kerja
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d1117] text-[#eef2ff] selection:bg-[#8b5cf6]/30 selection:text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#8b5cf6]/10 blur-[120px]" />
        <div className="absolute right-[-80px] top-1/3 h-[300px] w-[300px] rounded-full bg-[#06b6d4]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-[#f472b6]/10 blur-[120px]" />
      </div>

      <div className="fixed left-0 right-0 top-4 z-50 px-4">
        <header className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-[#0f172a]/75 px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <Link href="/" className="text-sm font-semibold tracking-[0.3em] text-[#c4b5fd] uppercase">
            Daniel.S
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            <a href="#about" className="transition hover:text-white">Tentang</a>
            <a href="#experience" className="transition hover:text-white">Karir</a>
            <a href="#projects" className="transition hover:text-white">Proyek</a>
            <a href="#contact" className="transition hover:text-white">Kontak</a>
          </nav>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
          >
            <Lock size={12} className="text-[#c4b5fd]" />
            Admin
          </Link>
        </header>
      </div>

      {dbError && (
        <div className="pt-24">
          <div className="mx-auto my-4 max-w-3xl rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-100">
            ⚠️ Mengalami kendala koneksi dengan Supabase. Menampilkan data fallback (cadangan).
          </div>
        </div>
      )}

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section
          id="about"
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] p-8 shadow-2xl shadow-black/30 sm:p-10 lg:p-12"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_18%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.07),transparent_15%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-3.5 py-1.5 text-xs font-semibold text-[#d8b4fe]">
                <Sparkles size={14} className="text-[#f5d0fe]" />
                Open for Opportunities
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Halo, Saya <span className="bg-gradient-to-r from-[#d8b4fe] to-[#67e8f9] bg-clip-text text-transparent">{profile.full_name}</span>
                </h1>
                <p className="text-lg font-semibold text-slate-200 sm:text-xl">
                  {profile.title}
                </p>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {profile.bio}
              </p>

              <div className="flex flex-wrap gap-2">
                {profile.location && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                    <MapPin size={15} className="text-[#67e8f9]" />
                    {profile.location}
                  </span>
                )}
                {profile.email && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                    <Mail size={15} className="text-[#67e8f9]" />
                    {profile.email}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#67e8f9] px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:scale-[1.02]"
                >
                  Hubungi Saya
                  <ArrowRight size={16} />
                </a>
                {profile.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Unduh CV
                  </a>
                )}
                <div className="flex items-center gap-2">
                  {profile.linkedin_url && (
                    <a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {profile.github_url && (
                    <a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white">
                      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Focus</p>
                  <p className="mt-1 text-sm font-semibold text-white">Frontend & Product</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</p>
                  <p className="mt-1 text-sm font-semibold text-white">2+ Years</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Stack</p>
                  <p className="mt-1 text-sm font-semibold text-white">Next.js / React</p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#c4b5fd]/20 via-transparent to-[#67e8f9]/10 blur-2xl" />
              <div className="relative w-full rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#111827] p-4 shadow-2xl shadow-black/30">
                <div className="relative aspect-square overflow-hidden rounded-[26px] bg-[#0b1120]">
                  {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.avatar_url} alt={profile.full_name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#0b1120] text-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#d8b4fe] to-[#67e8f9] text-3xl font-black text-slate-950">
                        {profile.full_name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-xs uppercase tracking-[0.4em] text-slate-300">Portfolio</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#67e8f9]/10 text-[#d8b4fe]">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Pengalaman & Pembelajaran</h2>
              <p className="text-sm text-slate-400">Riwayat karir dan pengalaman yang membentuk skill saya</p>
            </div>
          </div>

          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#8b5cf6] to-transparent" />
                <div className="relative pl-8">
                  <span className="absolute left-[-6px] top-2 h-3 w-3 rounded-full bg-[#67e8f9]" />
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-sm font-medium text-[#c4b5fd]">{exp.company}</p>
                    </div>
                    <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                      {formatDate(exp.start_date)} — {exp.is_current ? 'Sekarang' : exp.end_date ? formatDate(exp.end_date) : ''}
                    </span>
                  </div>
                  {exp.location && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                      <MapPin size={14} className="text-[#67e8f9]" />
                      {exp.location}
                    </div>
                  )}
                  {exp.description && (
                    <p className="mt-4 text-sm leading-7 text-slate-300">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-10 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#67e8f9]/10 text-[#d8b4fe]">
              <FolderGit2 size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Proyek Unggulan</h2>
              <p className="text-sm text-slate-400">Aplikasi dan karya yang pernah saya bangun</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.id} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:border-[#8b5cf6]/30 hover:bg-white/[0.08]">
                <div className="relative h-48 overflow-hidden bg-[#0a1020]">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image_url} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b]">
                      <div className="flex flex-col items-center gap-2 text-slate-300">
                        <FolderGit2 size={36} className="text-[#c4b5fd]" />
                        <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Portfolio Project</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.description && (
                      <p className="mt-2 text-sm leading-7 text-slate-300">{project.description}</p>
                    )}
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Source
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#67e8f9] transition hover:text-cyan-300">
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-10 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#111827] to-[#0f172a] p-8 text-center shadow-2xl shadow-black/30 sm:p-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#67e8f9]/10 text-[#d8b4fe]">
            <Send size={20} />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-white">Mari Berkolaborasi</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Punya ide proyek, butuh partner freelance, atau sekadar ingin ngobrol tentang teknologi? Saya senang mendengar dari Anda.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                <Mail size={16} />
                {profile.email}
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#67e8f9] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#0b1020] py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 text-center text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.full_name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#about" className="transition hover:text-white">Kembali ke Atas</a>
            <Link href="/login" className="inline-flex items-center gap-1 transition hover:text-white">
              <Lock size={12} className="text-[#c4b5fd]" />
              Login Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


