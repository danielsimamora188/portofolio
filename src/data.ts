import { Project, Experience, SkillCategory, ServiceItem } from './types';

export const personalData = {
  fullName: 'Daniel Tulus Parsaoran Simamora',
  shortName: 'Daniel Tulus',
  title: 'Editor & Frontend Web Developer',
  email: 'Daniel.simamora188@gmail.com',
  whatsapp: '+62 895 6131 31263',
  whatsappLink: 'https://api.whatsapp.com/send?phone=+62895613131263&text=Hello,%20i\'m%20interested%20in%20your%20portofolio!',
  instagram: '@danieltulus_',
  instagramLink: 'https://www.instagram.com/danieltulus_/',
  linkedin: 'https://id.linkedin.com/in/daniel-tulus-parsaoran-simamora-208783213',
  githubCV: '#', // Download link for CV
  cvFilename: 'CV-Daniel-Tulus.pdf',
  aboutMe: `I'm a programmer and design enthusiast, 24 years old. I have several portfolios in the field of design that make me more confident in my capabilities. I'm interested in programming and design since college. I was elected to be in the top 5 of a national-level VLOG competition, and I also frequently design materials for various companies—such as logos, product packaging, and corporate identities. Moreover, I am a seasoned video editor with international experience working in Niigata, Japan.`,
  experienceYears: '2 Years',
  projectsCompletedCount: '10+ Projects',
  supportAvailability: 'Online 24/7',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80'
};

export const skillsData: SkillCategory[] = [
  {
    title: 'Web Developer',
    skills: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'Git', level: 'Basic' },
      { name: 'JavaScript', level: 'Basic' },
      { name: 'Bootstrap', level: 'Advanced' },
      { name: 'Laravel', level: 'Advanced' },
      { name: 'PHP', level: 'Basic' },
      { name: 'MySQL', level: 'Basic' }
    ]
  },
  {
    title: 'Design & Editing',
    skills: [
      { name: 'Photoshop', level: 'Advanced' },
      { name: 'Illustrator', level: 'Intermediate' },
      { name: 'Lightroom', level: 'Advanced' },
      { name: 'Canva', level: 'Intermediate' },
      { name: 'After Effects', level: 'Advanced' },
      { name: 'Premiere Pro', level: 'Advanced' },
      { name: 'Capcut', level: 'Intermediate' }
    ]
  },
  {
    title: 'Soft Skills & Others',
    skills: [
      { name: 'Adaptability' },
      { name: 'Fast Learner' },
      { name: 'Team Work' },
      { name: 'Communicative' },
      { name: 'Photography' },
      { name: 'Videography' }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'exp-yukiguni',
    company: 'Yukiguni Maitake Co., Ltd.',
    location: 'Gosen, Niigata, Japan',
    role: 'Staff Production (Internship)',
    period: 'Jun 2022 – Jun 2023',
    description: 'Selected from IPB University for a 1-year internship in Yukiguni Maitake Co., Niigata, Japan.',
    details: [
      'Created video tutorials across various factory divisions covering safety briefings, work regulations, and operation workflows.',
      'Participated in active training setups for production line improvements, agricultural development research, food hygiene/quality assurance protocols, and Japanese corporate culture systems.'
    ]
  },
  {
    id: 'exp-bca',
    company: 'PT Bank Central Asia Tbk',
    location: 'Kelapa Gading, Jakarta, Indonesia',
    role: 'Bakti BCA (Teller Intern)',
    period: 'Oct 2021 – Jan 2022',
    description: 'Served customers as a frontline financial representative for Bank Central Asia (BCA) for 4 months.',
    details: [
      'Assisted bank customers with various daily and routine financial transactions including multi-million cash deposits, checking transactions, and balance withdrawals.',
      'Managed general service operations, balancing ledgers accurately, issuing cashiers checks, and offering standard account servicing workflows with exceptional speed and discipline.'
    ]
  },
  {
    id: 'exp-ipb',
    company: 'Vocational School of IPB University',
    location: 'Bogor, West Java, Indonesia',
    role: 'Full Stack Developer Intern',
    period: 'Jan 2021 – Apr 2021',
    description: 'Conducted a 3-month technology internship within the ICT division of the Vocational School of IPB University.',
    details: [
      'Developed interactive learning and simulator system websites mapping out Management Information System lessons for active college students.',
      'Managed corporate social media assets, generating graphic material designs for official ICT Instagram feeds and online events.'
    ]
  }
];

export const projectsData: Project[] = [
  // WEB CATEGORY
  {
    id: 'web-yamada',
    title: 'Website Yamada Store',
    category: 'web',
    description: 'Tugas kuliah pembuatan website statis mengenai portal otomotif pada semester 2 perkuliahan di Sekolah Vokasi IPB.',
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://danielsimamora188.github.io/web-yamada/'
  },
  {
    id: 'web-sim-sv-ipb',
    title: 'Website SIM SV IPB',
    category: 'web',
    description: 'Sistem Informasi Manajemen di Sekolah Vokasi IPB. Website bimbingan teori dan simulasi pendukung kuliah daring SIM di masa pandemi 2021.',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://github.com/danielsimamora188/Tugas-Akhir'
  },

  // PHOTOGRAPHY CATEGORY
  {
    id: 'photo-candid',
    title: 'Candid Shot (Kota Tua)',
    category: 'photography',
    description: 'Hasil potret candid keceriaan seorang ibu dan anak saat bersantai bermain sore hari di kawasan sejarah Kota Tua, Jakarta.',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.instagram.com/p/CxGELwThaTu/'
  },
  {
    id: 'photo-deer',
    title: "Animal's Shot (Niigata)",
    category: 'photography',
    description: 'Dokumentasi musim dingin di kebun binatang minor daerah Gosen, Niigata, Jepang. Mengabadikan dua ekor rusa yang anggun.',
    imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.instagram.com/p/CoKKL6_LNqU/'
  },
  {
    id: 'photo-moon',
    title: 'Lunar Astro Photography',
    category: 'photography',
    description: 'Mengabadikan permukaan detail kawah bulan (~60%) mengandalkan kamera Fujifilm X-A7 dengan tambahan lensa tele manual 200 - 800mm.',
    imageUrl: 'https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.instagram.com/p/CoKaz9mBFjB/'
  },
  {
    id: 'photo-panorama',
    title: 'Amidase Panorama',
    category: 'photography',
    description: 'Keindahan gradasi pancaran senja bayang cermin danau didokumentasikan di Amidase, Gosen, Prefektur Niigata, Jepang.',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.instagram.com/p/CnmQPu-hW3O/'
  },

  // DESIGN CATEGORY
  {
    id: 'design-wall-coffee',
    title: 'Creative Wall Periodic Table Design',
    category: 'design',
    description: 'Seni mural hias dekorasi dinding coffee shop bertema integrasi tabel periodik kimia & hero franchise game Mobile Legends di Simalungun.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://github.com/danielsimamora188/WARKOP-INGANTARUP/tree/main/kopi'
  },
  {
    id: 'design-video-ojk',
    title: 'Video Opening Webinar OJK',
    category: 'design',
    description: 'Pembuatan video motion komersil pembuka seminar resmi Otoritas Jasa Keuangan (OJK). Berlandaskan desain modern berdurasi optimal.',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'design-olivia-banner',
    title: 'VLOG Banner OLIVIA 2019',
    category: 'design',
    description: 'Desain poster promosi VLOG nasional olahraga vokasi di Universitas Diponegoro Semarang, maju mewakili tim VLOG IPB meraih juara 5 nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.youtube.com/watch?v=z55dUkWexGE'
  },
  {
    id: 'design-logo-pt-agro',
    title: 'Logo PT. Agro Berkat Terpadu',
    category: 'design',
    description: 'Konsep logo brand pupuk cacing lumbricus menggabungkan aspek alam (petani, daun) serta aspek korporasi terintegrasi global.',
    imageUrl: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://github.com/danielsimamora188/Project-Agroberkat-Terpadu/tree/main/logo'
  },
  {
    id: 'design-pack-agro',
    title: 'Packaging Pupuk Lumbricus',
    category: 'design',
    description: 'Desain visual tata letak kemasan produk penjualan pupuk kompos organik cacing lumbricus untuk komersialisasi PT Agro Berkat Terpadu.',
    imageUrl: 'https://images.unsplash.com/photo-1605686819967-94d077e149cb?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://github.com/danielsimamora188/Project-Agroberkat-Terpadu/tree/main/flyer%20cacing'
  },
  {
    id: 'design-flyer-agro',
    title: 'Sales Flyer Lumbricus',
    category: 'design',
    description: 'Brosur media promosi penjualan pupuk cacing lumbricus dengan data komposisi nutrisi, kegunaan lengkap, dan kontak distributor pupuk.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://github.com/danielsimamora188/Project-Agroberkat-Terpadu/tree/main/flyer%20cacing'
  },
  {
    id: 'design-motion-bullying',
    title: 'Motion Graphic Edukasi Sahabat Orang Tua',
    category: 'design',
    description: 'Pengerjaan animasi video motion edukatif bertema dampak trauma psikologis perundungan anak di lingkungan keluarga.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80'
  },

  // CERTIFICATE CATEGORY
  {
    id: 'cert-toefl',
    title: 'TOEFL Certificate Score 557',
    category: 'certificate',
    description: 'Sertifikat resmi kecakapan bahasa Inggris LKPB dengan skor konversi tinggi 557 (Listening: 59, Structure: 50, Reading: 58) tahun 2023.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-symposium-social',
    title: 'Seminar Media Sosial 2019',
    category: 'certificate',
    description: 'Sertifikat keikutsertaan kepanitiaan seminar bertajuk "Cerdas Dalam Menggunakan Media Sosial" diselenggarakan Micro IT Vokasi IPB.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-olivia-rank',
    title: 'Olimpiade Vokasi Nasional OLIVIA 2019',
    category: 'certificate',
    description: 'Sertifikat penghargaan tim VLOG Vokasi IPB sebagai Top 5 Nasional dalam Olimpiade Vokasi Indonesia di Semarang.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    buttonLink: 'https://www.youtube.com/watch?v=z55dUkWexGE'
  },
  {
    id: 'cert-mvp-shukaku',
    title: 'Shukaku MVP (Employee of the Month)',
    category: 'certificate',
    description: 'Sertifikat apresiasi bulanan kinerja kerja terbaik di divisi panen (Shukaku) pada Maret 2023 di Yukiguni Maitake, Jepang.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-mvp-hoso',
    title: 'Hoso MVP (Employee of the Month)',
    category: 'certificate',
    description: 'Sertifikat apresiasi tingkat kerapihan dan disiplin optimal divisi pengemasan (Hoso) pada September di Yukiguni Maitake, Jepang.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-intern-japan',
    title: 'Certificate of Internship Completion Japan',
    category: 'certificate',
    description: 'Sertifikat kelulusan program magang kerja luar negeri selama 1 tahun penuh di Jepang di bawah Yukiguni Maitake Co., Ltd.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-seminar-personal',
    title: 'Talkshow Personal Branding 2018',
    category: 'certificate',
    description: 'Sertifikat kepesertaan Talkshow IT Festival "Be A Smart Citizen Journalism" diselenggarakan oleh Micro IT Community IPB.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-virtual-visit',
    title: 'Sertifikat Webinar Virtual Company Visit 2020',
    category: 'certificate',
    description: 'Sertifikat apresiasi webinar Personal Branding & UI/UX Design and Research diselenggarakan oleh Institut Pertanian Bogor.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-bnsp-programmer',
    title: 'Sertifikat Kompetensi BNSP Web Programmer',
    category: 'certificate',
    description: 'Sertifikat kelulusan lisensi profesional Junior Web Programmer resmi yang diuji dan diterbitkan oleh Badan Nasional Sertifikasi Profesi (BNSP) 2021.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-asdos-1',
    title: 'Sertifikat Asisten Dosen (2020-2021)',
    category: 'certificate',
    description: 'Sertifikat asisten pengajar mata kuliah Agama Kristen Protestan di IPB University selama masa tahun ajaran 2020-2021.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cert-asdos-2',
    title: 'Sertifikat Asisten Dosen (2021-2022)',
    category: 'certificate',
    description: 'Sertifikat pengabdian asisten pengajar mata kuliah Agama Kristen Protestan di IPB University selama masa tahun ajaran 2021-2022.',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
  }
];

export const servicesData: ServiceItem[] = [
  {
    title: 'Frontend Web Developer',
    description: 'Mewujudkan antarmuka website modern berkecepatan tinggi, responsif, dan interaktif sesuai kebutuhan bisnis Anda.',
    icon: 'code',
    checklist: [
      'Slicing desain (Figma/PSD) menjadi kode bersih berbasis Tailwind CSS & React.',
      'Membangun sistem pembelajaran mandiri berteori interaktif (Contoh: SIM-SV IPB).',
      'Implementasi terpercaya menggunakan model framework Laravel / React.',
      'Kapasitas optimasi database relasional, API proxy, dan manajemen kontrol versi Git.'
    ]
  },
  {
    title: 'Professional Video Editor',
    description: 'Mendesain konten video industri, operasional, edukasi, maupun komersial dengan pengalaman berstandar Jepang.',
    icon: 'video',
    checklist: [
      'Pembuatan video tutorial operasional kerja & K3 di lingkungan manufaktur.',
      'Produksi Vlog sinematik berdurasi pendek/panjang (Top 5 Kompetisi Nasional OLIVIA).',
      'Pengerjaan motion graphics penjelas untuk webinar resmi (OJK) serta parenting.',
      'Penyuntingan suara, visual effects, grading warna, serta subtitle dwibahasa.'
    ]
  },
  {
    title: 'Branding & Graphic Designer',
    description: 'Menyusun identitas merek modern terintegrasi, media cetak pemasaran, hingga tata letak dekorasi mural kreatif.',
    icon: 'palette',
    checklist: [
      'Perancangan logo perusahaan dengan filosofi mendalam (Contoh: PT. Agro Berkat Terpadu).',
      'Pembuatan flyer pemasaran produk pertanian dan struktur layout kemasan pupuk cacing.',
      'Desain mural dinding kafe tematik gabungan konsep edukasi tabel periodik & pop-culture.',
      'Penyediaan media promosi media sosial berkualitas tinggi untuk Instagram & digital ad.'
    ]
  }
];
