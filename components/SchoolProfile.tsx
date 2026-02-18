
import React, { useState } from 'react';

const SchoolProfile: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024/2025');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');

  const years = ['2022/2023', '2023/2024', '2024/2025', '2025/2026'];
  const semesters = ['Ganjil', 'Genap'];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Banner Section */}
      <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[300px]">
        <img 
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop" 
          alt="School Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent"></div>
        <div className="absolute bottom-10 left-10 text-white">
          <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
            Profil Resmi PKBM
          </span>
          <h1 className="text-5xl font-black tracking-tight leading-tight">
            At Taqwa Mandiri
          </h1>
          <p className="text-emerald-100/80 font-medium max-w-xl mt-2 italic">
            "Membangun Masa Depan Melalui Pendidikan Kesetaraan yang Berkarakter dan Mandiri."
          </p>
        </div>
      </div>

      {/* Identitas & Statistik Cepat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identitas & Academic Year Selection */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* NEW: Tahun Pelajaran Selection Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm overflow-hidden relative group">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Periode Akademik</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Tahun Pelajaran & Semester Aktif</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Berjalan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pilih Tahun Pelajaran</label>
                <div className="grid grid-cols-2 gap-2">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`py-3 px-4 rounded-2xl text-xs font-bold border transition-all ${
                        selectedYear === year 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20' 
                        : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-emerald-200'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pilih Semester</label>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  {semesters.map(sem => (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                        selectedSemester === sem 
                        ? 'bg-white text-emerald-700 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Semester {sem}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-400 italic font-medium leading-relaxed">
                  * Perubahan periode akademik akan mempengaruhi filter data nilai, absensi, dan jadwal di seluruh modul SIAKAD.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full translate-x-12 -translate-y-12 transition-transform group-hover:scale-110"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-800 mb-8 border-b border-slate-100 pb-4">
                Identitas Satuan Pendidikan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <IdentityItem label="NPSN" value="P9988776" icon="fingerprint" />
                <IdentityItem label="Status Akreditasi" value="Akreditasi B (BAN PNF)" icon="verified" />
                <IdentityItem label="Bentuk Pendidikan" value="PKBM (Pusat Kegiatan Belajar Masyarakat)" icon="school" />
                <IdentityItem label="Status Kepemilikan" value="Yayasan At Taqwa Mandiri" icon="account_balance" />
                <IdentityItem label="SK Pendirian Sekolah" value="421.9/001/PKBM/DPMPTSP/2018" icon="description" />
                <IdentityItem label="SK Izin Operasional" value="421.9/001-Disdik/2023" icon="gavel" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-emerald-500/20">
              <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Visi Kami
              </h4>
              <p className="text-emerald-50 text-lg font-bold leading-relaxed">
                "Menjadi pusat pendidikan non-formal yang unggul dalam mencetak lulusan mandiri, kompeten, dan berakhlak mulia di era digital."
              </p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
              <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
                Misi Kami
              </h4>
              <ul className="space-y-4">
                <MissionItem text="Menyelenggarakan pendidikan kesetaraan Paket A, B, dan C yang berkualitas." />
                <MissionItem text="Mengembangkan keterampilan hidup (life skills) yang adaptif terhadap kebutuhan pasar kerja." />
                <MissionItem text="Membina karakter jujur, disiplin, dan bertanggung jawab pada setiap warga belajar." />
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Stats */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6">Kontak & Lokasi</h3>
            <div className="space-y-6">
              <ContactItem icon="location" label="Alamat" value="Jl. At Taqwa No. 12, Kel. Pancoran Mas, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431" />
              <ContactItem icon="phone" label="Telepon / WA" value="+62 21 7788 9900" />
              <ContactItem icon="email" label="Email Resmi" value="info@attaqwamandiri.sch.id" />
              <div className="pt-4">
                <div className="w-full h-40 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=2070&auto=format&fit=crop" alt="Map Placeholder" className="w-full h-full object-cover opacity-50 grayscale" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-slate-800 border border-slate-200">
                      Buka Google Maps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">Statistik PKBM</h3>
            <div className="space-y-6">
              <StatRow label="Jumlah Pendidik" value="18" sub="Tutor Aktif" />
              <StatRow label="Jumlah Warga Belajar" value="248" sub="Siswa Terdaftar" />
              <StatRow label="Program Unggulan" value="5+" sub="Kesetaraan & Vokasi" />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6">Fasilitas Pendukung</h3>
            <div className="flex flex-wrap gap-2">
              {['Ruang Belajar AC', 'Laboratorium Komputer', 'Perpustakaan Digital', 'Ruang Serbaguna', 'Akses Internet 100Mbps', 'Kantin Sehat'].map(f => (
                <span key={f} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityItem = ({ label, value, icon }: any) => (
  <div className="flex items-start gap-4 group">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-slate-800 leading-tight">{value}</p>
    </div>
  </div>
);

const MissionItem = ({ text }: any) => (
  <li className="flex gap-3">
    <div className="w-5 h-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-0.5">
      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
    </div>
    <span className="text-sm font-medium text-slate-600 leading-relaxed">{text}</span>
  </li>
);

const ContactItem = ({ icon, label, value }: any) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
      <span className="material-symbols-outlined text-xl">{icon}</span>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-xs font-bold text-slate-700 leading-relaxed">{value}</p>
    </div>
  </div>
);

const StatRow = ({ label, value, sub }: any) => (
  <div className="flex justify-between items-end">
    <div>
      <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-xs text-white/50 font-medium">{sub}</p>
    </div>
    <span className="text-3xl font-black text-white">{value}</span>
  </div>
);

export default SchoolProfile;
