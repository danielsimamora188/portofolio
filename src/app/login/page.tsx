'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Mail, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      setErrorMsg('Konfigurasi Supabase belum lengkap. Silakan cek variabel environment di Vercel.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setErrorMsg('Email atau password salah. Silakan coba lagi.')
      } else {
        router.refresh() // Refresh middleware state
        router.push('/admin')
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#121318] text-[#e3e2e6] min-h-screen flex flex-col justify-center items-center px-6 relative selection:bg-[#444756] selection:text-[#d0bcff]">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 w-80 h-80 bg-[#d0bcff]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-[#c7c6ca] hover:text-[#e3e2e6] transition-colors px-4 py-2 rounded-full hover:bg-[#2f303a]"
        >
          <ArrowLeft size={16} />
          Kembali ke Portofolio
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-[#1a1b23] border border-[#2f303a] shadow-xl flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-4 rounded-3xl bg-[#2a2b36] border border-[#3b3d4f] text-[#d0bcff] shadow-inner">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-black text-[#e3e2e6] tracking-tight">Login Admin</h1>
          <p className="text-sm text-[#c7c6ca]">Masuk untuk mengelola data portofolio Anda</p>
        </div>

        {errorMsg && (
          <div className="bg-[#ffd9e2] border border-[#ffb3c4] text-[#ba1a1a] text-xs py-3 px-4 rounded-2xl font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#c7c6ca] ml-1 uppercase tracking-wider">Email</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c6ca]">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#121318] border border-[#2f303a] focus:border-[#d0bcff] focus:outline-none text-sm text-[#e3e2e6] transition-all duration-300 placeholder-[#909095]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#c7c6ca] ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c7c6ca]">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#121318] border border-[#2f303a] focus:border-[#d0bcff] focus:outline-none text-sm text-[#e3e2e6] transition-all duration-300 placeholder-[#909095]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c7c6ca] hover:text-[#e3e2e6] transition-colors p-1"
                aria-label="Tampilkan sandi"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-4 rounded-full bg-[#d0bcff] hover:bg-[#b59ff5] text-[#381e72] font-bold text-sm transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? 'Memproses...' : 'Masuk ke Dashboard'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  )
}
