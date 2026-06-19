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
    <div className="bg-[#121318] text-[#e3e2e6] min-h-screen font-sans selection:bg-[#444756] selection:text-[#d0bcff]">
      
      {/* Material You Subtle Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#d0bcff]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#a8c7fa]/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Floating Pill Navigation Bar (M3 Design) */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
        <header className="w-full max-w-2xl backdrop-blur-xl bg-[#1a1b23]/80 border border-[#2f303a] rounded-full shadow-lg px-6 py-3 flex items-center justify-between transition-all duration-300 hover:border-[#444756]">
          <Link href="/" className="font-bold text-[#d0bcff] hover:opacity-90 transition-opacity tracking-tight">
            Daniel.S
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium text-[#c7c6ca]">
            <a href="#about" className="hover:text-[#e3e2e6] transition-colors relative py-1">Tentang</a>
            <a href="#experience" className="hover:text-[#e3e2e6] transition-colors relative py-1">Karir</a>
            <a href="#projects" className="hover:text-[#e3e2e6] transition-colors relative py-1">Proyek</a>
            <a href="#contact" className="hover:text-[#e3e2e6] transition-colors relative py-1">Kontak</a>
            <Link 
              href="/login" 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#2f303a] hover:bg-[#3b3d4f] text-xs text-[#e3e2e6] transition-all duration-200 active:scale-95"
            >
              <Lock size={12} className="text-[#a8c7fa]" />
              Admin
            </Link>
          </nav>
        </header>
      </div>

      {/* Database Warning Banner */}
      {dbError && (
        <div className="pt-20">
          <div className="bg-[#ffd9e2] border border-[#ffb3c4] text-[#ba1a1a] text-xs py-2 px-4 text-center rounded-xl max-w-xl mx-auto my-4 font-medium animate-pulse">
            ⚠️ Mengalami kendala koneksi dengan Supabase. Menampilkan data fallback (cadangan).
          </div>
        </div>
      )}

      {/* Main Content Containers */}
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-20 flex flex-col gap-16">

        {/* Hero / About Section (Material Card Layout) */}
        <section id="about" className="p-8 sm:p-12 rounded-[32px] bg-[#1a1b23] border border-[#2f303a] flex flex-col md:flex-row items-center gap-10 transition-all duration-300 hover:shadow-xl hover:border-[#3b3d4f] group">
          <div className="flex-1 flex flex-col items-start gap-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2f303a] text-xs text-[#a8c7fa] font-semibold border border-[#3b3d4f]">
              <Sparkles size={13} className="text-[#d0bcff] animate-pulse" />
              Open for Opportunities
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#e3e2e6] leading-tight">
              Halo, Saya <span className="text-[#d0bcff]">{profile.full_name}</span>
            </h1>
            
            <h2 className="text-lg sm:text-xl font-bold text-[#c7c6ca]">
              {profile.title}
            </h2>
            
            <p className="text-[#c7c6ca] leading-relaxed text-base sm:text-md whitespace-pre-line">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-3 text-sm text-[#c7c6ca] mt-2">
              {profile.location && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#2f303a]">
                  <MapPin size={14} className="text-[#a8c7fa]" />
                  {profile.location}
                </div>
              )}
              {profile.email && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#121318] border border-[#2f303a]">
                  <Mail size={14} className="text-[#a8c7fa]" />
                  {profile.email}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-full bg-[#d0bcff] hover:bg-[#b59ff5] text-[#381e72] font-bold text-sm flex items-center gap-2 shadow-md transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.03] active:scale-[0.97]"
              >
                Hubungi Saya
                <ArrowRight size={16} />
              </a>
              
              {profile.resume_url && (
                <a 
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#2f303a] hover:bg-[#3b3d4f] border border-[#3b3d4f] text-[#e3e2e6] font-bold text-sm transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.03] active:scale-[0.97]"
                >
                  Unduh CV
                </a>
              )}

              <div className="flex items-center gap-3">
                {profile.linkedin_url && (
                  <a 
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-[#2f303a] hover:bg-[#3b3d4f] border border-[#3b3d4f] text-[#c7c6ca] hover:text-[#d0bcff] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95]"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                {profile.github_url && (
                  <a 
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-full bg-[#2f303a] hover:bg-[#3b3d4f] border border-[#3b3d4f] text-[#c7c6ca] hover:text-[#d0bcff] transition-all duration-200 hover:scale-[1.05] active:scale-[0.95]"
                    aria-label="GitHub"
                  >
                    <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Profile Image (Material Large Rounded Shape) */}
          <div className="relative flex-shrink-0 w-52 h-52 sm:w-60 sm:h-60 rounded-[48px] overflow-hidden bg-[#2a2b36] border border-[#3b3d4f] flex items-center justify-center shadow-md transition-all duration-500 hover:rounded-[36px] hover:scale-102 group">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={profile.avatar_url} 
                alt={profile.full_name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#3b3d4f] to-[#1a1b23] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[#d0bcff] text-[#381e72] flex items-center justify-center text-3xl font-extrabold shadow-inner mb-3">
                  {profile.full_name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-xs font-mono text-[#c7c6ca] uppercase tracking-widest">Daniel Simamora</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121318]/50 via-transparent to-transparent opacity-40"></div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2a2b36] border border-[#3b3d4f] text-[#d0bcff]">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#e3e2e6]">Pengalaman Kerja & Belajar</h2>
              <p className="text-[#c7c6ca] text-xs">Riwayat karir dan kompetensi akademis</p>
            </div>
          </div>

          <div className="grid gap-6">
            {experiences.map((exp) => (
              <div 
                key={exp.id} 
                className="p-6 rounded-[28px] bg-[#1a1b23] border border-[#2f303a] hover:border-[#3b3d4f] hover:shadow-lg transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.01]"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#e3e2e6] hover:text-[#d0bcff] transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-[#a8c7fa]">{exp.company}</p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#2f303a] text-xs text-[#c7c6ca] font-mono w-fit border border-[#3b3d4f]">
                    {formatDate(exp.start_date)} — {exp.is_current ? 'Sekarang' : exp.end_date ? formatDate(exp.end_date) : ''}
                  </span>
                </div>

                {exp.location && (
                  <div className="flex items-center gap-1.5 text-xs text-[#c7c6ca] mb-4">
                    <MapPin size={12} className="text-[#a8c7fa]" />
                    {exp.location}
                  </div>
                )}

                {exp.description && (
                  <p className="text-sm text-[#c7c6ca] leading-relaxed whitespace-pre-line border-t border-[#2f303a]/60 pt-4">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#2a2b36] border border-[#3b3d4f] text-[#d0bcff]">
              <FolderGit2 size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#e3e2e6]">Proyek Unggulan</h2>
              <p className="text-[#c7c6ca] text-xs">Aplikasi dan sistem yang dikembangkan sendiri</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="group p-6 rounded-[28px] bg-[#1a1b23] border border-[#2f303a] hover:border-[#3b3d4f] hover:bg-[#20212a] hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] flex flex-col justify-between"
              >
                <div>
                  {/* Visual Project Header */}
                  <div className="w-full h-40 rounded-2xl bg-[#121318] border border-[#2f303a] overflow-hidden flex items-center justify-center mb-5 relative">
                    {project.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#381e72]/10 to-[#004a77]/10 flex flex-col items-center justify-center p-4">
                        <FolderGit2 size={32} className="text-[#c7c6ca] mb-2 transition-transform duration-300 group-hover:scale-110" />
                        <span className="text-[10px] tracking-widest font-mono text-[#c7c6ca] uppercase">Source Code</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#e3e2e6] group-hover:text-[#d0bcff] transition-colors duration-200 mb-2">
                    {project.title}
                  </h3>
                  
                  {project.description && (
                    <p className="text-sm text-[#c7c6ca] leading-relaxed mb-6">
                      {project.description}
                    </p>
                  )}
                </div>

                <div>
                  {/* Tech Tags (M3 Pill style) */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-[#2a2b36] border border-[#3b3d4f] text-xs font-semibold text-[#a8c7fa]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#2f303a]">
                    {project.github_url && (
                      <a 
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#c7c6ca] hover:text-[#d0bcff] transition-colors flex items-center gap-1.5 text-xs font-bold"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        Source
                      </a>
                    )}
                    {project.live_url && (
                      <a 
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#a8c7fa] hover:text-[#c2e7ff] transition-colors flex items-center gap-1 text-xs font-bold"
                      >
                        <ExternalLink size={14} />
                        Demo Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section (M3 Soft Container style) */}
        <section id="contact" className="p-8 sm:p-12 rounded-[32px] bg-[#1d1e27] border border-[#2f303a] text-center flex flex-col gap-6 items-center">
          <div className="p-3 rounded-full bg-[#2a2b36] border border-[#3b3d4f] text-[#d0bcff] w-fit">
            <Send size={20} />
          </div>
          <h2 className="text-3xl font-black text-[#e3e2e6]">Mari Berkolaborasi!</h2>
          <p className="text-[#c7c6ca] text-sm sm:text-md max-w-lg leading-relaxed">
            Punya ide proyek, diskusi freelance, atau sekadar ingin menyapa? Hubungi saya kapan saja dan saya akan merespon sesegera mungkin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 w-full sm:w-auto">
            {profile.email && (
              <a 
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2f303a] hover:bg-[#3b3d4f] border border-[#3b3d4f] text-[#e3e2e6] hover:text-[#d0bcff] font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] justify-center w-full sm:w-auto"
              >
                <Mail size={16} />
                {profile.email}
              </a>
            )}
            {profile.linkedin_url && (
              <a 
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d0bcff] hover:bg-[#b59ff5] text-[#381e72] font-bold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] justify-center w-full sm:w-auto"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Footer Bar */}
      <footer className="border-t border-[#2f303a] bg-[#121318] py-8 text-[#c7c6ca] text-xs">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.full_name}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-[#e3e2e6] transition-colors">Kembali ke Atas</a>
            <span className="text-[#2f303a]">|</span>
            <Link 
              href="/login" 
              className="flex items-center gap-1 hover:text-[#e3e2e6] transition-colors"
            >
              <Lock size={10} className="text-[#a8c7fa]" />
              Login Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


