'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { ArrowLeft, Briefcase, Database, FolderGit2, GraduationCap, Layers3, Loader2, Plus, Save, Trash2 } from 'lucide-react'

interface Profile {
  id?: string
  full_name: string
  title: string
  bio: string
  location: string
  avatar_url: string
  resume_url: string
  email: string
  linkedin_url: string
  github_url: string
}

interface Experience {
  id?: string
  company: string
  role: string
  location: string
  start_date: string
  end_date: string
  is_current: boolean
  description: string
  display_order: number
}

interface Project {
  id?: string
  title: string
  description: string
  tags: string
  image_url: string
  live_url: string
  github_url: string
  display_order: number
}

interface Education {
  id?: string
  school: string
  degree: string
  period: string
  description: string
  display_order: number
}

interface Skill {
  id?: string
  category: string
  name: string
  value: number
  display_order: number
}

type TabKey = 'profile' | 'experience' | 'project' | 'education' | 'skill'

const emptyProfile = (): Profile => ({
  full_name: '',
  title: '',
  bio: '',
  location: '',
  avatar_url: '',
  resume_url: '',
  email: '',
  linkedin_url: '',
  github_url: '',
})

const emptyExperience = (): Experience => ({
  company: '',
  role: '',
  location: '',
  start_date: '',
  end_date: '',
  is_current: false,
  description: '',
  display_order: 0,
})

const emptyProject = (): Project => ({
  title: '',
  description: '',
  tags: '',
  image_url: '',
  live_url: '',
  github_url: '',
  display_order: 0,
})

const emptyEducation = (): Education => ({
  school: '',
  degree: '',
  period: '',
  description: '',
  display_order: 0,
})

const emptySkill = (): Skill => ({
  category: '',
  name: '',
  value: 0,
  display_order: 0,
})

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('profile')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [profile, setProfile] = useState<Profile>(emptyProfile())
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [selectedExperience, setSelectedExperience] = useState<Experience>(emptyExperience())
  const [selectedProject, setSelectedProject] = useState<Project>(emptyProject())
  const [selectedEducation, setSelectedEducation] = useState<Education>(emptyEducation())
  const [selectedSkill, setSelectedSkill] = useState<Skill>(emptySkill())
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('')
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [selectedEducationId, setSelectedEducationId] = useState<string>('')
  const [selectedSkillId, setSelectedSkillId] = useState<string>('')

  const supabase = useMemo(() => createClient(), [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [profileRes, expRes, projRes, eduRes, skillRes] = await Promise.all([
        supabase.from('profiles').select('*').maybeSingle(),
        supabase.from('experiences').select('*').order('display_order', { ascending: true }),
        supabase.from('projects').select('*').order('display_order', { ascending: true }),
        supabase.from('education').select('*').order('display_order', { ascending: true }),
        supabase.from('skills').select('*').order('display_order', { ascending: true }),
      ])

      if (profileRes.data) {
        setProfile(profileRes.data as Profile)
      }
      setExperiences((expRes.data || []) as Experience[])
      setProjects((projRes.data || []) as Project[])
      setEducation((eduRes.data || []) as Education[])
      setSkills((skillRes.data || []) as Skill[])
    } catch (err) {
      setMessage('Gagal memuat data dari Supabase.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [supabase])

  const saveProfile = async () => {
    setSaving(true)
    setMessage('')
    try {
      if (profile.id) {
        const { error } = await supabase.from('profiles').update(profile).eq('id', profile.id)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('profiles').insert(profile).select().single()
        if (error) throw error
        setProfile({ ...profile, id: data.id })
      }
      setMessage('Profil berhasil disimpan.')
    } catch (err) {
      setMessage('Gagal menyimpan profil.')
    } finally {
      setSaving(false)
    }
  }

  const saveExperience = async () => {
    setSaving(true)
    setMessage('')
    try {
      const payload = {
        ...selectedExperience,
        display_order: Number(selectedExperience.display_order || 0),
      }
      if (selectedExperienceId) {
        const { error } = await supabase.from('experiences').update(payload).eq('id', selectedExperienceId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('experiences').insert(payload).select().single()
        if (error) throw error
        setSelectedExperienceId(data.id)
      }
      await loadData()
      setMessage('Pengalaman berhasil disimpan.')
    } catch (err) {
      setMessage('Gagal menyimpan pengalaman.')
    } finally {
      setSaving(false)
    }
  }

  const saveProject = async () => {
    setSaving(true)
    setMessage('')
    try {
      const payload = {
        ...selectedProject,
        tags: selectedProject.tags.split(',').map((item) => item.trim()).filter(Boolean),
        display_order: Number(selectedProject.display_order || 0),
      }
      if (selectedProjectId) {
        const { error } = await supabase.from('projects').update(payload).eq('id', selectedProjectId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('projects').insert(payload).select().single()
        if (error) throw error
        setSelectedProjectId(data.id)
      }
      await loadData()
      setMessage('Proyek berhasil disimpan.')
    } catch (err) {
      setMessage('Gagal menyimpan proyek.')
    } finally {
      setSaving(false)
    }
  }

  const saveEducation = async () => {
    setSaving(true)
    setMessage('')
    try {
      const payload = {
        ...selectedEducation,
        display_order: Number(selectedEducation.display_order || 0),
      }
      if (selectedEducationId) {
        const { error } = await supabase.from('education').update(payload).eq('id', selectedEducationId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('education').insert(payload).select().single()
        if (error) throw error
        setSelectedEducationId(data.id)
      }
      await loadData()
      setMessage('Pendidikan berhasil disimpan.')
    } catch (err) {
      setMessage('Gagal menyimpan pendidikan.')
    } finally {
      setSaving(false)
    }
  }

  const saveSkill = async () => {
    setSaving(true)
    setMessage('')
    try {
      const payload = {
        ...selectedSkill,
        value: Number(selectedSkill.value || 0),
        display_order: Number(selectedSkill.display_order || 0),
      }
      if (selectedSkillId) {
        const { error } = await supabase.from('skills').update(payload).eq('id', selectedSkillId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('skills').insert(payload).select().single()
        if (error) throw error
        setSelectedSkillId(data.id)
      }
      await loadData()
      setMessage('Skill berhasil disimpan.')
    } catch (err) {
      setMessage('Gagal menyimpan skill.')
    } finally {
      setSaving(false)
    }
  }

  const deleteExperience = async (id: string) => {
    await supabase.from('experiences').delete().eq('id', id)
    await loadData()
  }

  const deleteProject = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id)
    await loadData()
  }

  const deleteEducation = async (id: string) => {
    await supabase.from('education').delete().eq('id', id)
    await loadData()
  }

  const deleteSkill = async (id: string) => {
    await supabase.from('skills').delete().eq('id', id)
    await loadData()
  }

  const resetExperienceForm = () => {
    setSelectedExperience(emptyExperience())
    setSelectedExperienceId('')
  }

  const resetProjectForm = () => {
    setSelectedProject(emptyProject())
    setSelectedProjectId('')
  }

  const resetEducationForm = () => {
    setSelectedEducation(emptyEducation())
    setSelectedEducationId('')
  }

  const resetSkillForm = () => {
    setSelectedSkill(emptySkill())
    setSelectedSkillId('')
  }

  const renderTabs = () => (
    <div className="flex flex-wrap gap-2">
      {[
        { key: 'profile', label: 'Profil', icon: <Layers3 size={16} /> },
        { key: 'experience', label: 'Pengalaman', icon: <Briefcase size={16} /> },
        { key: 'project', label: 'Proyek', icon: <FolderGit2 size={16} /> },
        { key: 'education', label: 'Pendidikan', icon: <GraduationCap size={16} /> },
        { key: 'skill', label: 'Skill', icon: <Database size={16} /> },
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key as TabKey)}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
            activeTab === tab.key ? 'bg-white text-[#0b0d12]' : 'border border-[#1f2430] bg-[#121826] text-[#9aa4b2] hover:text-white'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#eef2f7]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#9aa4b2] transition hover:text-white">
              <ArrowLeft size={16} />
              Kembali ke portfolio
            </Link>
            <h1 className="mt-2 text-3xl font-semibold text-white">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => loadData()}
            className="inline-flex items-center gap-2 rounded-full border border-[#2a3143] bg-[#121826] px-4 py-2 text-sm text-[#c7d1df]"
          >
            <Loader2 size={16} />
            Refresh
          </button>
        </div>

        {message && (
          <div className="mb-4 rounded-2xl border border-[#2a3143] bg-[#121826] px-4 py-3 text-sm text-[#c7d1df]">
            {message}
          </div>
        )}

        {renderTabs()}

        {loading ? (
          <div className="mt-8 flex items-center justify-center rounded-3xl border border-[#1f2430] bg-[#121826] p-10 text-[#9aa4b2]">
            Memuat data...
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {activeTab === 'profile' && (
              <section className="rounded-3xl border border-[#1f2430] bg-[#121826] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#7a89a4]">Profile</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">Edit profil utama</h2>
                  </div>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12]"
                  >
                    <Save size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </button>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Nama lengkap" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} placeholder="Title / jabatan" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} placeholder="Lokasi" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} placeholder="Email" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.avatar_url} onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })} placeholder="Avatar URL" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.resume_url} onChange={(e) => setProfile({ ...profile, resume_url: e.target.value })} placeholder="Resume URL" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.linkedin_url} onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })} placeholder="LinkedIn URL" />
                  <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={profile.github_url} onChange={(e) => setProfile({ ...profile, github_url: e.target.value })} placeholder="GitHub URL" />
                  <textarea className="min-h-[140px] rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm md:col-span-2" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Bio / deskripsi singkat" />
                </div>
              </section>
            )}

            {activeTab === 'experience' && (
              <section className="space-y-4">
                <div className="rounded-3xl border border-[#1f2430] bg-[#121826] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#7a89a4]">Pengalaman</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">Tambah / edit pengalaman</h2>
                    </div>
                    <button onClick={resetExperienceForm} className="rounded-full border border-[#2a3143] bg-[#0f1320] px-4 py-2 text-sm text-[#c7d1df]">Baru</button>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.company} onChange={(e) => setSelectedExperience({ ...selectedExperience, company: e.target.value })} placeholder="Perusahaan" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.role} onChange={(e) => setSelectedExperience({ ...selectedExperience, role: e.target.value })} placeholder="Jabatan" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.location} onChange={(e) => setSelectedExperience({ ...selectedExperience, location: e.target.value })} placeholder="Lokasi" />
                    <input type="date" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.start_date} onChange={(e) => setSelectedExperience({ ...selectedExperience, start_date: e.target.value })} />
                    <input type="date" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.end_date || ''} onChange={(e) => setSelectedExperience({ ...selectedExperience, end_date: e.target.value })} />
                    <input type="number" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedExperience.display_order} onChange={(e) => setSelectedExperience({ ...selectedExperience, display_order: Number(e.target.value) })} placeholder="Urutan" />
                    <label className="inline-flex items-center gap-2 text-sm text-[#c7d1df]">
                      <input type="checkbox" checked={selectedExperience.is_current} onChange={(e) => setSelectedExperience({ ...selectedExperience, is_current: e.target.checked })} />
                      Sedang bekerja
                    </label>
                    <textarea className="min-h-[140px] rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm md:col-span-2" value={selectedExperience.description} onChange={(e) => setSelectedExperience({ ...selectedExperience, description: e.target.value })} placeholder="Deskripsi pengalaman" />
                  </div>
                  <button onClick={saveExperience} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12]">
                    <Plus size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan pengalaman'}
                  </button>
                </div>

                <div className="space-y-3">
                  {experiences.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{item.role} · {item.company}</h3>
                          <p className="text-sm text-[#9aa4b2]">{item.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedExperience(item); setSelectedExperienceId(item.id || '') }} className="rounded-full bg-[#0f1320] px-3 py-1.5 text-sm text-[#c7d1df]">Edit</button>
                          <button onClick={() => item.id && deleteExperience(item.id)} className="rounded-full bg-[#24131d] px-3 py-1.5 text-sm text-[#f4b5c7]">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'project' && (
              <section className="space-y-4">
                <div className="rounded-3xl border border-[#1f2430] bg-[#121826] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#7a89a4]">Proyek</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">Tambah / edit proyek</h2>
                    </div>
                    <button onClick={resetProjectForm} className="rounded-full border border-[#2a3143] bg-[#0f1320] px-4 py-2 text-sm text-[#c7d1df]">Baru</button>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedProject.title} onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })} placeholder="Judul proyek" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedProject.image_url} onChange={(e) => setSelectedProject({ ...selectedProject, image_url: e.target.value })} placeholder="Image URL" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedProject.live_url} onChange={(e) => setSelectedProject({ ...selectedProject, live_url: e.target.value })} placeholder="Live URL" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedProject.github_url} onChange={(e) => setSelectedProject({ ...selectedProject, github_url: e.target.value })} placeholder="GitHub URL" />
                    <input type="number" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedProject.display_order} onChange={(e) => setSelectedProject({ ...selectedProject, display_order: Number(e.target.value) })} placeholder="Urutan" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm md:col-span-2" value={selectedProject.tags} onChange={(e) => setSelectedProject({ ...selectedProject, tags: e.target.value })} placeholder="Tag (pisahkan dengan koma)" />
                    <textarea className="min-h-[140px] rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm md:col-span-2" value={selectedProject.description} onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })} placeholder="Deskripsi proyek" />
                  </div>
                  <button onClick={saveProject} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12]">
                    <Plus size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan proyek'}
                  </button>
                </div>

                <div className="space-y-3">
                  {projects.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-[#9aa4b2]">{item.tags}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedProject(item); setSelectedProjectId(item.id || '') }} className="rounded-full bg-[#0f1320] px-3 py-1.5 text-sm text-[#c7d1df]">Edit</button>
                          <button onClick={() => item.id && deleteProject(item.id)} className="rounded-full bg-[#24131d] px-3 py-1.5 text-sm text-[#f4b5c7]">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'education' && (
              <section className="space-y-4">
                <div className="rounded-3xl border border-[#1f2430] bg-[#121826] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#7a89a4]">Pendidikan</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">Tambah / edit pendidikan</h2>
                    </div>
                    <button onClick={resetEducationForm} className="rounded-full border border-[#2a3143] bg-[#0f1320] px-4 py-2 text-sm text-[#c7d1df]">Baru</button>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedEducation.school} onChange={(e) => setSelectedEducation({ ...selectedEducation, school: e.target.value })} placeholder="Sekolah / universitas" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedEducation.degree} onChange={(e) => setSelectedEducation({ ...selectedEducation, degree: e.target.value })} placeholder="Program studi / gelar" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedEducation.period} onChange={(e) => setSelectedEducation({ ...selectedEducation, period: e.target.value })} placeholder="Periode (contoh: 2022 — 2025)" />
                    <input type="number" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedEducation.display_order} onChange={(e) => setSelectedEducation({ ...selectedEducation, display_order: Number(e.target.value) })} placeholder="Urutan" />
                    <textarea className="min-h-[140px] rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm md:col-span-2" value={selectedEducation.description} onChange={(e) => setSelectedEducation({ ...selectedEducation, description: e.target.value })} placeholder="Deskripsi pendidikan" />
                  </div>
                  <button onClick={saveEducation} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12]">
                    <Plus size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan pendidikan'}
                  </button>
                </div>

                <div className="space-y-3">
                  {education.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{item.school}</h3>
                          <p className="text-sm text-[#9aa4b2]">{item.degree}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedEducation(item); setSelectedEducationId(item.id || '') }} className="rounded-full bg-[#0f1320] px-3 py-1.5 text-sm text-[#c7d1df]">Edit</button>
                          <button onClick={() => item.id && deleteEducation(item.id)} className="rounded-full bg-[#24131d] px-3 py-1.5 text-sm text-[#f4b5c7]">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'skill' && (
              <section className="space-y-4">
                <div className="rounded-3xl border border-[#1f2430] bg-[#121826] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#7a89a4]">Skill</p>
                      <h2 className="mt-1 text-xl font-semibold text-white">Tambah / edit skill</h2>
                    </div>
                    <button onClick={resetSkillForm} className="rounded-full border border-[#2a3143] bg-[#0f1320] px-4 py-2 text-sm text-[#c7d1df]">Baru</button>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedSkill.category} onChange={(e) => setSelectedSkill({ ...selectedSkill, category: e.target.value })} placeholder="Kategori skill" />
                    <input className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedSkill.name} onChange={(e) => setSelectedSkill({ ...selectedSkill, name: e.target.value })} placeholder="Nama skill" />
                    <input type="number" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedSkill.value} onChange={(e) => setSelectedSkill({ ...selectedSkill, value: Number(e.target.value) })} placeholder="Nilai (%)" />
                    <input type="number" className="rounded-2xl border border-[#1f2430] bg-[#0f1320] px-4 py-3 text-sm" value={selectedSkill.display_order} onChange={(e) => setSelectedSkill({ ...selectedSkill, display_order: Number(e.target.value) })} placeholder="Urutan" />
                  </div>
                  <button onClick={saveSkill} disabled={saving} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b0d12]">
                    <Plus size={16} />
                    {saving ? 'Menyimpan...' : 'Simpan skill'}
                  </button>
                </div>

                <div className="space-y-3">
                  {skills.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-[#1f2430] bg-[#121826] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-white">{item.name}</h3>
                          <p className="text-sm text-[#9aa4b2]">{item.category} · {item.value}%</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setSelectedSkill(item); setSelectedSkillId(item.id || '') }} className="rounded-full bg-[#0f1320] px-3 py-1.5 text-sm text-[#c7d1df]">Edit</button>
                          <button onClick={() => item.id && deleteSkill(item.id)} className="rounded-full bg-[#24131d] px-3 py-1.5 text-sm text-[#f4b5c7]">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
