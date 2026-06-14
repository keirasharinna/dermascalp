// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
export type Severity = 'ringan' | 'sedang' | 'parah'

export interface TreatmentPlan {
  urgencyLabel: string
  urgencyColor: string
  glowColor: string
  heatmapInsight: string
  products: { name: string; type: string; reason: string }[]
  dos: string[]
  donts: string[]
}

// ─────────────────────────────────────────────
// CONDITION DATA
// ─────────────────────────────────────────────

// Variabel penampung kondisi sehat agar bisa di-reuse tanpa duplikasi kode
const HEALTHY_PLAN: TreatmentPlan = {
  urgencyLabel: 'Kondisi Optimal',
  urgencyColor: 'text-green-500',
  glowColor: 'bg-green-500',
  heatmapInsight: 'AI mendeteksi folikel yang bersih, sebaran rambut merata, dan tidak adanya tanda inflamasi atau penumpukan sebum. Kondisi kulit kepala Anda sehat.',
  products: [{ name: 'Sampo Mild/Natural', type: 'Pemeliharaan', reason: 'Menjaga kelembapan alami tanpa bahan kimia keras.' }],
  dos: ['Pertahankan rutinitas keramas yang sudah baik', 'Konsumsi makanan bergizi tinggi protein dan zinc', 'Lakukan pemeriksaan berkala setiap 6 bulan'],
  donts: ['Jangan terlalu sering menggunakan alat styling panas', 'Hindari produk kimia keras yang tidak perlu'],
};

export const CONDITION_DATA: Record<string, Record<Severity, TreatmentPlan>> = {
  // Menggunakan HEALTHY_PLAN untuk semua tingkatan di Healthy_Scalp
  Healthy_Scalp: {
    ringan: HEALTHY_PLAN,
    sedang: HEALTHY_PLAN,
    parah: HEALTHY_PLAN,
  },
  
  // Menambahkan Healthy_Hair dengan isi HEALTHY_PLAN agar aman dari crash
  Healthy_Scalp: {
    ringan: HEALTHY_PLAN,
    sedang: HEALTHY_PLAN,
    parah: HEALTHY_PLAN,
  },

  Dandruff: {
    ringan: {
      urgencyLabel: 'Perawatan Mandiri (Self-Care)',
      urgencyColor: 'text-[#20B2AA]',
      glowColor: 'bg-[#20B2AA]',
      heatmapInsight:
        'AI mendeteksi sedikit serpihan putih di area permukaan tanpa adanya inflamasi merah. Ini adalah ketombe ringan akibat kulit kepala kering atau jamur Malassezia fase awal.',
      products: [
        { name: 'Selsun Blue 5 / Clear', type: 'Daily Shampoo', reason: 'Mengandung Selenium Sulfide ringan untuk mengontrol jamur.' },
        { name: 'Erhair Scalperfect', type: 'Scalp Exfoliator', reason: 'Membantu mengangkat sel kulit mati tanpa iritasi.' },
      ],
      dos: ['Keramas 2-3 hari sekali secara rutin', 'Gunakan sisir silikon saat keramas untuk pijatan ringan'],
      donts: ['Jangan tidur dalam keadaan rambut masih basah'],
    },
    sedang: {
      urgencyLabel: 'Perawatan Intensif (Needs Attention)',
      urgencyColor: 'text-yellow-400',
      glowColor: 'bg-yellow-400',
      heatmapInsight:
        'AI mendeteksi penumpukan kerak kekuningan yang menyatu dengan kemerahan ringan pada folikel. Mengindikasikan Dermatitis Seboroik tingkat sedang.',
      products: [
        { name: 'Ketomed / Nizoral 1%', type: 'Medicated Shampoo', reason: 'Mengandung Ketoconazole untuk membunuh jamur penyebab ketombe.' },
        { name: 'Sebamed Anti-Dandruff', type: 'pH Balancer', reason: 'Mengembalikan pH 5.5 kulit kepala agar jamur tidak berkembang.' },
      ],
      dos: [
        'Diamkan sampo medis selama 3-5 menit di kulit kepala sebelum dibilas',
        'Keringkan rambut segera dengan angin sejuk (cool setting)',
      ],
      donts: [
        'Hindari menggaruk kulit kepala dengan kuku agar tidak infeksi',
        'Hentikan penggunaan hair spray/pomade sementara',
      ],
    },
    parah: {
      urgencyLabel: 'Butuh Intervensi Medis (Consult Doctor)',
      urgencyColor: 'text-red-400',
      glowColor: 'bg-red-400',
      heatmapInsight:
        'AI mendeteksi plak tebal dengan inflamasi parah (merah pekat) yang meluas hingga batas rambut. Risiko tinggi infeksi sekunder.',
      products: [
        { name: 'T/Gel Therapeutic Shampoo', type: 'Coal Tar', reason: 'Menekan pergantian sel kulit kepala yang terlalu cepat.' },
        { name: 'Resep Dokter (Kortikosteroid)', type: 'Obat Topikal', reason: 'Meredakan peradangan berat yang tidak mempan produk bebas.' },
      ],
      dos: [
        'SEGERA jadwalkan konsultasi dengan Sp.KK / Dermatolog',
        'Gunakan handuk bersih setiap kali selesai keramas',
      ],
      donts: ['DILARANG KERAS mengelupas kerak secara paksa (memicu luka dan kebotakan)'],
    },
  },

  Alopecia_Areata: {
    ringan: {
      urgencyLabel: 'Perawatan Awal (Early Intervention)',
      urgencyColor: 'text-[#20B2AA]',
      glowColor: 'bg-[#20B2AA]',
      heatmapInsight:
        'AI mendeteksi penipisan folikel terpusat pada 1-2 area kecil (patch) dengan batas tegas. Area folikel sekitarnya masih aktif.',
      products: [
        { name: 'Somethinc Hair Grow Serum', type: 'Serum Penumbuh', reason: 'Mengandung Kopexil & Biotin untuk merangsang akar rambut.' },
        { name: 'Natur Extract Ginseng', type: 'Shampoo Perawatan', reason: 'Memperkuat kekuatan akar rambut yang tersisa.' },
      ],
      dos: ['Pijat area yang menipis 5 menit setiap hari', 'Konsumsi makanan tinggi Zinc dan Vitamin D'],
      donts: ['Hindari mengikat rambut terlalu kencang (tight ponytail)'],
    },
    sedang: {
      urgencyLabel: 'Perawatan Medis (Medical Treatment)',
      urgencyColor: 'text-yellow-400',
      glowColor: 'bg-yellow-400',
      heatmapInsight:
        'AI mendeteksi pelebaran area kebotakan (patch) yang mulai menyatu. Aktivitas inflamasi di sekitar folikel menekan pertumbuhan rambut baru.',
      products: [
        { name: 'Regrou Minoxidil 2%', type: 'Topikal Stimulan', reason: 'Vasodilator medis untuk memperlebar pembuluh darah di folikel.' },
        { name: 'Erhair HairGrow Tonic', type: 'Tonik Intensif', reason: 'Kombinasi Kopexil dan Panax Ginseng Extract.' },
      ],
      dos: [
        'Konsisten menggunakan Minoxidil 2x sehari',
        'Kelola stres dengan baik (Alopecia sangat dipengaruhi stres)',
      ],
      donts: ['Hindari pewarnaan atau proses kimia pada rambut sama sekali'],
    },
    parah: {
      urgencyLabel: 'Butuh Penanganan Spesialis (Consult Doctor)',
      urgencyColor: 'text-red-400',
      glowColor: 'bg-red-400',
      heatmapInsight:
        'AI mendeteksi kerontokan difus yang meluas (Alopecia Totalis fase awal). Sebagian besar folikel di area mahkota terpantau inaktif.',
      products: [
        { name: 'Injeksi Kortikosteroid', type: 'Tindakan Medis', reason: 'Menekan sistem imun yang menyerang folikel rambut.' },
        { name: 'Immunotherapy Topikal', type: 'Resep Dermatolog', reason: 'Mengalihkan respon imun dari folikel.' },
      ],
      dos: [
        'Konsultasikan opsi injeksi atau terapi oral dengan dokter kulit',
        'Gunakan penutup kepala lembut untuk melindungi dari UV',
      ],
      donts: ['Jangan buang uang untuk sampo penumbuh rambut pasaran (tidak akan efektif di fase ini)'],
    },
  },

  Hair_Loss_General: {
    ringan: {
      urgencyLabel: 'Perawatan Mandiri (Self-Care)',
      urgencyColor: 'text-[#20B2AA]',
      glowColor: 'bg-[#20B2AA]',
      heatmapInsight:
        'AI mendeteksi sedikit penurunan densitas rambut secara merata. Sering terjadi pasca-sakit, melahirkan, atau stres (Telogen Effluvium ringan).',
      products: [
        { name: 'Dove Hair Fall Treatment', type: 'Daily Shampoo', reason: 'Menutrisi rambut dari akar hingga ujung.' },
        { name: 'Nutrafor Hair/Biotin', type: 'Suplemen', reason: 'Mencukupi kebutuhan nutrisi internal untuk rambut.' },
      ],
      dos: ['Sisir rambut hanya saat sudah setengah kering', 'Tidur cukup 7-8 jam per hari'],
      donts: ['Kurangi penggunaan alat styling panas (catokan)'],
    },
    sedang: {
      urgencyLabel: 'Perawatan Intensif (Needs Attention)',
      urgencyColor: 'text-yellow-400',
      glowColor: 'bg-yellow-400',
      heatmapInsight:
        'AI mendeteksi garis rambut yang menipis atau area mahkota yang mulai tembus pandang. Mengindikasikan penipisan folikel berlanjut.',
      products: [
        { name: 'Aloxidil / Minoxidil 5%', type: 'Obat Topikal', reason: 'Terbukti klinis merangsang fase anagen (pertumbuhan).' },
        { name: 'Kerastase Hair Fall Control', type: 'Serum', reason: 'Mengandung aminexil untuk memperpanjang usia rambut.' },
      ],
      dos: ['Gunakan sisir bergigi jarang', 'Perbanyak asupan protein hewani/nabati'],
      donts: ['Hindari ekstensi rambut atau jepitan berat yang menarik akar'],
    },
    parah: {
      urgencyLabel: 'Butuh Intervensi Medis (Consult Doctor)',
      urgencyColor: 'text-red-400',
      glowColor: 'bg-red-400',
      heatmapInsight:
        'AI mendeteksi resesi garis rambut yang signifikan and folikel dorman di area luas (Pola kebotakan genetik lanjut).',
      products: [
        { name: 'Finasteride (Oral)', type: 'Obat Resep', reason: 'Menghambat hormon DHT penyebab kebotakan genetik (khusus pria).' },
        { name: 'Terapi PRP (Platelet-Rich Plasma)', type: 'Klinik Medis', reason: 'Stimulasi folikel menggunakan plasma darah sendiri.' },
      ],
      dos: [
        'Konsultasi ke klinik transplantasi/pemulihan rambut profesional',
        'Lakukan cek darah untuk cek kadar zat besi & tiroid',
      ],
      donts: ['Hindari produk berbahan keras yang bisa merusak kulit kepala yang terekspos'],
    },
  },

  Default: {
    ringan: {
      urgencyLabel: 'Pantau Berkala',
      urgencyColor: 'text-[#20B2AA]',
      glowColor: 'bg-[#20B2AA]',
      heatmapInsight: 'AI mendeteksi anomali ringan pada tekstur kulit kepala. Belum ada tanda inflamasi serius.',
      products: [{ name: 'Sampo Bayi / Mild Shampoo', type: 'Perawatan Lembut', reason: 'Membersihkan tanpa mengiritasi kulit kepala sensitif.' }],
      dos: ['Jaga kebersihan rambut rutin', 'Bilas rambut hingga benar-benar bersih dari busa'],
      donts: ['Jangan mencoba menggaruk area yang terasa aneh'],
    },
    sedang: {
      urgencyLabel: 'Perawatan Ekstra',
      urgencyColor: 'text-yellow-400',
      glowColor: 'bg-yellow-400',
      heatmapInsight: 'AI mendeteksi inflamasi tingkat sedang. Diperlukan perawatan anti-inflamasi topikal.',
      products: [{ name: 'Bioderma Nodé', type: 'Dermatologis', reason: 'Menenangkan kulit kepala reaktif.' }],
      dos: ['Gunakan air sejuk untuk keramas'],
      donts: ['Hindari produk dengan pewangi buatan tajam'],
    },
    parah: {
      urgencyLabel: 'Periksa ke Dokter',
      urgencyColor: 'text-red-400',
      glowColor: 'bg-red-400',
      heatmapInsight: 'AI mendeteksi kerusakan jaringan atau inflamasi pekat. Sangat disarankan pemeriksaan laboratorium.',
      products: [{ name: 'Konsultasi Sp.KK', type: 'Medis', reason: 'Diagnosis pasti sangat diperlukan.' }],
      dos: ['Segera ke fasilitas kesehatan terdekat'],
      donts: ['Dilarang mengoleskan ramuan herbal/tradisional yang tidak teruji'],
    },
  },
}

// ─────────────────────────────────────────────
// ENCYCLOPEDIA
// ─────────────────────────────────────────────
export const CONDITIONS_ENCYCLOPEDIA = [
  {
    id: 'dandruff',
    name: 'Dermatitis Seboroik',
    subtitle: 'Ketombe / Seborrheic Dermatitis',
    tag: 'Jamur & Inflamasi',
    tagColor: 'text-[#20B2AA] border-[#20B2AA]/40 bg-[#20B2AA]/10',
    accentColor: '#20B2AA',
    prevalence: 'Mempengaruhi ~11% populasi global',
    description:
      'Kondisi kulit kulit kronis yang memengaruhi area kaya kelenjar minyak (sebaceous). Ditandai sisik putih atau kuning berminyak disertai kemerahan. Bukan karena kurang mandi — ini adalah kondisi medis dengan faktor biologis yang kompleks.',
    causes: [
      { title: 'Jamur Malassezia', desc: 'Jamur yang secara alami hidup di kulit kepala, namun pada individu tertentu memicu respons inflamasi berlebih.' },
      { title: 'Produksi Sebum Berlebih', desc: 'Kelenjar minyak yang terlalu aktif menciptakan lingkungan ideal untuk pertumbuhan jamur.' },
      { title: 'Respons Imun', desc: 'Sistem kekebalan tubuh yang hipersensitif bereaksi terhadap produk metabolisme jamur.' },
      { title: 'Faktor Hormonal', desc: 'Androgen merangsang produksi sebum — itulah mengapa kondisi ini sering memburuk saat pubertas atau stres.' },
    ],
    gradient: 'from-[#20B2AA]/20 to-transparent',
  },
  {
    id: 'healthy_scalp',
    name: 'Kulit Kepala Sehat',
    subtitle: 'Kondisi Optimal',
    tag: 'Normal',
    tagColor: 'text-green-500 border-green-500/40 bg-green-500/10',
    accentColor: '#22C55E',
    prevalence: 'Tujuan utama perawatan rambut',
    description: 'Kondisi kulit kepala di mana folikel rambut berfungsi normal, keseimbangan minyak (sebum) terjaga, dan tidak ada tanda-tanda peradangan atau infeksi. Ini adalah dasar dari rambut yang kuat dan berkilau.',
    causes: [
      { title: 'Nutrisi Seimbang', desc: 'Asupan protein, zat besi, dan vitamin yang cukup mendukung siklus pertumbuhan folikel.' },
      { title: 'Higienitas Tepat', desc: 'Pembersihan kulit kepala yang konsisten menjaga pori-pori bebas dari sumbatan sebum.' },
      { title: 'Manajemen Stres', desc: 'Keseimbangan hormon membantu mencegah kerontokan prematur (Telogen Effluvium).' },
      { title: 'Proteksi Eksternal', desc: 'Menghindari paparan kimia keras dan panas berlebih menjaga kutikula tetap utuh.' },
    ],
    gradient: 'from-green-500/20 to-transparent',
  },
  {
    id: 'alopecia',
    name: 'Alopecia Areata',
    subtitle: 'Kebotakan Autoimun',
    tag: 'Autoimun',
    tagColor: 'text-violet-400 border-violet-400/40 bg-violet-400/10',
    accentColor: '#8B5CF6',
    prevalence: 'Mempengaruhi ~2% populasi, semua usia',
    description:
      'Penyakit autoimun di mana sistem kekebalan tubuh secara keliru menyerang folikel rambut yang sehat. Menyebabkan kerontokan rambut berbentuk patch bulat oval yang khas. Rambut dapat tumbuh kembali secara spontan.',
    causes: [
      { title: 'Disfungsi Autoimun', desc: 'Limfosit T menyerang folikel rambut, menganggapnya sebagai ancaman asing.' },
      { title: 'Faktor Genetik', desc: 'Ada komponen herediter kuat — risiko meningkat jika ada anggota keluarga yang terdampak.' },
      { title: 'Pemicu Stres', desc: 'Stres fisik atau emosional berat dapat memicu atau memperburuk episode akut.' },
      { title: 'Kondisi Autoimun Lain', desc: 'Sering muncul bersamaan dengan kondisi seperti tiroiditis Hashimoto atau vitiligo.' },
    ],
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis Kulit Kepala',
    subtitle: 'Scalp Psoriasis',
    tag: 'Autoimun Kronis',
    tagColor: 'text-orange-400 border-orange-400/40 bg-orange-400/10',
    accentColor: '#F97316',
    prevalence: '45-56% penderita psoriasis mengalami ini',
    description:
      'Kondisi autoimun yang mempercepat siklus hidup sel kulit. Sel baru tumbuh terlalu cepat, menumpuk di permukaan membentuk plak tebal bersisik keperakan. Berbeda dengan ketombe — psoriasis membentuk plak yang lebih tebal dan keras.',
    causes: [
      { title: 'Mutasi Gen Imun', desc: 'Variasi pada gen yang mengatur sistem imun, terutama jalur IL-17 dan IL-23.' },
      { title: 'Siklus Sel Abnormal', desc: 'Sel kulit normal berganti setiap 28-30 hari; pada psoriasis hanya 3-5 hari.' },
      { title: 'Pemicu Eksternal', desc: 'Infeksi (strep throat), cedera kulit, obat-obatan tertentu, alkohol, dan rokok.' },
      { title: 'Stres Kronis', desc: 'Kortisol dari stres kronis mengganggu regulasi sistem imun secara signifikan.' },
    ],
    gradient: 'from-orange-500/20 to-transparent',
  },
  {
    id: 'folliculitis',
    name: 'Folikulitis',
    subtitle: 'Scalp Folliculitis',
    tag: 'Infeksi Bakteri',
    tagColor: 'text-red-400 border-red-400/40 bg-red-400/10',
    accentColor: '#EF4444',
    prevalence: 'Salah satu infeksi kulit paling umum',
    description:
      'Peradangan atau infeksi pada folikel rambut, umumnya disebabkan bakteri Staphylococcus aureus. Tampak sebagai benjolan merah kecil atau pustula (berisi nanah) di sekitar folikel. Bisa terasa gatal atau nyeri saat disentuh.',
    causes: [
      { title: 'Bakteri S. aureus', desc: 'Bakteri ini secara alami ada di kulit, namun masuk ke folikel melalui luka kecil atau iritasi.' },
      { title: 'Keringat Berlebih', desc: 'Lingkungan lembap dan panas adalah breeding ground ideal bagi bakteri.' },
      { title: 'Gesekan Mekanis', desc: 'Topi ketat, helm, atau jilbab berbahan non-breathable meningkatkan risiko.' },
      { title: 'Imunosupresi', desc: 'Sistem imun yang lemah (diabetes, HIV, penggunaan steroid) meningkatkan kerentanan.' },
    ],
    gradient: 'from-red-500/20 to-transparent',
  },
  {
    id: 'telogen',
    name: 'Telogen Effluvium',
    subtitle: 'Kerontokan Difus Sementara',
    tag: 'Hormonal & Stres',
    tagColor: 'text-yellow-400 border-yellow-400/40 bg-yellow-400/10',
    accentColor: '#EAB308',
    prevalence: 'Penyebab kerontokan #2 tersering pada wanita',
    description:
      'Kerontokan rambut difus (merata) yang terjadi ketika sejumlah besar folikel rambut masuk ke fase istirahat (telogen) secara bersamaan. Biasanya reversibel. Rambut rontok 2-3 bulan setelah pemicu terjadi.',
    causes: [
      { title: 'Stres Fisik Akut', desc: 'Operasi besar, demam tinggi, persalinan, atau penurunan berat badan drastis.' },
      { title: 'Defisiensi Nutrisi', desc: 'Kekurangan zat besi, vitamin D, zinc, atau protein adalah pemicu paling umum.' },
      { title: 'Gangguan Tiroid', desc: 'Hipotiroidisme maupun hipertiroidisme keduanya dapat memicu kerontokan telogen.' },
      { title: 'Perubahan Hormonal', desc: 'Post-partum (setelah melahirkan) adalah penyebab paling klasik dan dikenal luas.' },
    ],
    gradient: 'from-yellow-500/20 to-transparent',
  },
]

// ─────────────────────────────────────────────
// AI TECH SECTIONS
// ─────────────────────────────────────────────
export const AI_TECH_SECTIONS = [
  {
    iconName: 'Brain',
    title: 'Convolutional Neural Network (CNN)',
    content:
      'Model inti Scalpalyze dibangun di atas arsitektur CNN — sejenis \'otak buatan\' yang didesain khusus untuk menganalisis gambar. CNN bekerja dengan cara memindai gambar secara bertahap menggunakan filter-filter matematika yang mendeteksi pola — mulai dari tepi sederhana (garis, kurva), tekstur (kasar/halus), hingga pola kompleks (serpihan, plak, area kebotakan).',
    detail:
      'Scalpalyze dilatih pada ribuan citra kulit kepala berlabel klinis. Setiap lapisan CNN belajar fitur yang semakin abstrak: lapisan awal mendeteksi tepi, lapisan tengah mendeteksi tekstur dan warna, lapisan dalam mendeteksi pola patologis spesifik yang membedakan ketombe dari psoriasis dari alopecia.',
  },
  {
    iconName: 'Eye',
    title: 'Grad-CAM: AI yang Bisa Menjelaskan Dirinya',
    content:
      'Salah satu kritik terbesar terhadap AI adalah \'black box\' — kita tidak tahu kenapa AI memberikan keputusan tertentu. Scalpalyze menggunakan teknik Gradient-weighted Class Activation Mapping (Grad-CAM) untuk mengatasi masalah ini.',
    detail:
      'Grad-CAM menghasilkan peta panas (heatmap) yang secara visual menunjukkan area mana di foto yang paling mempengaruhi keputusan AI. Area merah = kontribusi sangat tinggi. Area biru = kontribusi rendah. Dengan ini, dokter dan pengguna bisa memverifikasi apakah AI \'melihat\' hal yang tepat — bukan sekadar percaya angka persentase mentah-mentah.',
  },
  {
    iconName: 'Zap',
    title: 'Transfer Learning & Fine-Tuning',
    content:
      'Melatih CNN dari nol membutuhkan jutaan gambar dan waktu komputasi berbulan-bulan. Scalpalyze menggunakan teknik Transfer Learning — memulai dari model yang sudah pre-trained pada dataset ImageNet (14 juta gambar), kemudian di-fine-tune khusus untuk domain kulit kepala.',
    detail:
      'Analoginya: lebih mudah mengajarkan dokter umum yang sudah tahu anatomi dasar untuk menjadi dermatolog, dibanding mengajarkan seseorang dari nol. Transfer Learning memungkinkan akurasi tinggi bahkan dengan dataset medis yang lebih terbatas.',
  },
  {
    iconName: 'Cpu',
    title: 'Confidence Score & Threshold',
    content:
      'Angka persentase yang ditampilkan Scalpalyze adalah probabilitas posterior dari model — seberapa \'yakin\' AI bahwa pola yang dilihat cocok dengan kondisi tertentu. Angka ini bukan kebenaran mutlak.',
    detail:
      'Model dikalibrasi dengan threshold konservatif: hasil di bawah 55% probabilitas tidak ditampilkan (dianggap tidak konklusif). Rentang 55-70% = ringan, 70-85% = sedang, >85% = parah. Kalibrasi ini dirancang untuk menghindari false confidence yang bisa berbahaya dalam konteks medis.',
  },
]

// ─────────────────────────────────────────────
// PROTOCOL TABS DATA
// ─────────────────────────────────────────────
export const PROTOCOL_TABS_DATA = [
  {
    id: 'routine',
    label: 'Rutinitas Dasar',
    iconName: 'BookOpen',
    content: {
      title: 'Protokol Kebersihan Kulit Kepala',
      subtitle: 'Fondasi kesehatan rambut yang sering diabaikan',
      items: [
        {
          step: '01',
          title: 'Frekuensi Keramas Optimal',
          desc: 'Kulit kepala berminyak: setiap hari atau selang-seling. Normal: 2-3x/minggu. Kering: 1-2x/minggu. Tidak ada aturan universal — dengarkan kulit kepala kamu.',
          highlight: 'Hindari keramas sebelum tidur tanpa mengeringkan rambut sepenuhnya.',
        },
        {
          step: '02',
          title: 'Teknik Keramas yang Benar',
          desc: 'Aplikasikan sampo di kulit kepala (bukan ujung rambut). Pijat perlahan dengan ujung jari — bukan kuku. Bilas dengan air hangat, bukan panas. Air panas merusak lapisan lipid pelindung kulit kepala.',
          highlight: 'Kondisioner hanya di batang dan ujung rambut, jauhi area kulit kepala.',
        },
        {
          step: '03',
          title: 'Pengeringan yang Tepat',
          desc: 'Tepuk-tepuk (jangan digosok keras) dengan handuk microfiber. Jika pakai hair dryer, gunakan suhu medium dengan jarak minimal 15cm dan gerakkan terus — jangan diam di satu titik.',
          highlight: 'Rambut 80% kering sebelum tidur sudah cukup; jangan paksa kering sempurna dengan panas berlebih.',
        },
        {
          step: '04',
          title: 'Proteksi UV & Lingkungan',
          desc: 'UV merusak kutikula rambut dan kulit kepala. Gunakan topi atau hair sunscreen saat terpapar sinar matahari langsung >30 menit. Polusi udara juga mengoksidasi protein rambut.',
          highlight: 'Cuci rambut setelah berenang di kolam renang — klorin sangat mengiritasi kulit kepala sensitif.',
        },
      ],
    },
  },
  {
    id: 'myths',
    label: 'Mitos vs Fakta',
    iconName: 'Eye',
    content: {
      title: 'Mitos vs Fakta Seputar Rambut',
      subtitle: 'Koreksi informasi yang beredar di masyarakat',
      myths: [
        {
          myth: 'Memotong rambut membuat rambut tumbuh lebih cepat',
          fact: 'Pertumbuhan rambut terjadi di folikel di bawah kulit kepala. Memotong ujung tidak memengaruhi kecepatan tumbuh (±1.25cm/bulan). Tapi potong rambut menghilangkan ujung bercabang sehingga rambut tampak lebih sehat.',
          verdict: 'MITOS',
        },
        {
          myth: 'Keramas setiap hari menyebabkan kerontokan',
          fact: 'Keramas tidak menyebabkan kerontokan patologis. Rambut yang kamu lihat di saluran pembuangan adalah rambut yang sudah siap rontok (fase telogen). Keramas hanya mempercepat proses alami ini.',
          verdict: 'MITOS',
        },
        {
          myth: 'Ketombe disebabkan kulit kepala kotor',
          fact: 'Ketombe adalah kondisi medis yang melibatkan jamur Malassezia dan respons imun. Orang dengan higienitas tinggi pun bisa terkena. Bahkan terlalu sering keramas dengan sampo keras justru memperparah kondisi.',
          verdict: 'MITOS',
        },
        {
          myth: 'Minyak kelapa menyembuhkan semua masalah rambut',
          fact: 'Minyak kelapa bisa melembapkan batang rambut dan sedikit antijamur. Namun untuk kondisi seperti psoriasis, folikulitis bakteri, atau alopecia areata — minyak kelapa tidak efektif dan bisa memperparah folikulitis.',
          verdict: 'SEBAGIAN BENAR',
        },
        {
          myth: 'Stres tidak berpengaruh pada kerontokan rambut',
          fact: 'Stres memicu pelepasan kortisol yang mengganggu fase pertumbuhan folikel. Telogen effluvium akibat stres akut adalah kondisi medis yang nyata dan terdokumentasi dengan baik.',
          verdict: 'MITOS',
        },
      ],
    },
  },
  {
    id: 'ingredients',
    label: 'Panduan Ingredient',
    iconName: 'FlaskConical',
    content: {
      title: 'Ingredient Sampo Berbasis Sains',
      subtitle: 'Baca label, pahami kandungannya',
      ingredients: [
        {
          name: 'Ketoconazole',
          type: 'Antijamur',
          efficacy: 95,
          usage: 'Ketombe sedang-berat, Dermatitis Seboroik',
          mechanism: 'Menghambat sintesis ergosterol pada membran sel jamur Malassezia, membunuh jamur secara selektif.',
          caution: 'Gunakan maksimal 2x/minggu. Penggunaan berlebihan bisa mengganggu flora kulit kepala normal.',
          color: '#20B2AA',
        },
        {
          name: 'Salicylic Acid',
          type: 'Keratolytik',
          efficacy: 82,
          usage: 'Ketombe bersisik, Psoriasis ringan',
          mechanism: 'Melembutkan dan mengangkat sel kulit mati (deskuamasi). Memecah ikatan antar sel keratin yang sudah mati.',
          caution: 'Hindari kontak dengan mata. Dapat menyebabkan kekeringan jika berlebihan.',
          color: '#8B5CF6',
        },
        {
          name: 'Piroctone Olamine',
          type: 'Antijamur',
          efficacy: 88,
          usage: 'Ketombe ringan-sedang, pencegahan rutin',
          mechanism: 'Menghambat metabolisme zat besi yang dibutuhkan jamur untuk bertahan hidup. Lebih lembut dari Zinc Pyrithione.',
          caution: 'Alternatif bagus untuk kulit sensitif. Umum ditemukan di sampo premium.',
          color: '#06B6D4',
        },
        {
          name: 'Minoxidil',
          type: 'Vasodilatator',
          efficacy: 78,
          usage: 'Kerontokan androgenetik, Alopecia Areata',
          mechanism: 'Membuka kanal kalium, memperpanjang fase anagen (pertumbuhan) folikel, meningkatkan suplai darah dan nutrisi ke folikel.',
          caution: 'Harus digunakan konsisten — berhenti dapat menyebabkan rebound kerontokan. Efek terlihat setelah 3-6 bulan.',
          color: '#F97316',
        },
        {
          name: 'Zinc Pyrithione',
          type: 'Antibakteri + Antijamur',
          efficacy: 75,
          usage: 'Ketombe ringan, pemeliharaan rutin',
          mechanism: 'Mengganggu transpor ion pada membran sel mikroba (jamur dan bakteri), mencegah pertumbuhan berlebih.',
          caution: 'Paling umum di sampo anti-ketombe. Aman untuk penggunaan jangka panjang.',
          color: '#EAB308',
        },
        {
          name: 'Coal Tar',
          type: 'Antimitotik',
          efficacy: 85,
          usage: 'Psoriasis, Dermatitis Seboroik berat',
          mechanism: 'Memperlambat pertumbuhan sel kulit kepala yang abnormal. Mengurangi inflamasi melalui jalur biologis yang berbeda dari steroid.',
          caution: 'Bau kuat. Dapat memfotosensitisasi kulit — hindari paparan UV langsung setelah penggunaan.',
          color: '#6366F1',
        },
      ],
    },
  },
]