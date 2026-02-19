
import React, { useState } from 'react';

const SchoolProfile: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024/2025');
  const [selectedSemester, setSelectedSemester] = useState('Ganjil');
  const [isSavingPeriod, setIsSavingPeriod] = useState(false);

  // State untuk data sekolah yang dapat dikonfigurasi
  const [schoolData, setSchoolData] = useState({
    name: 'At Taqwa Mandiri',
    npsn: 'P9988776',
    akreditasi: 'Akreditasi B (BAN PNF)',
    bentuk: 'PKBM (Pusat Kegiatan Belajar Masyarakat)',
    yayasan: 'Yayasan At Taqwa Mandiri',
    skPendirian: '421.9/001/PKBM/DPMPTSP/2018',
    skOperasional: '421.9/001-Disdik/2023',
    visi: 'Menjadi pusat pendidikan non-formal yang unggul dalam mencetak lulusan mandiri, kompeten, dan berakhlak mulia di era digital.',
    misi: [
      'Menyelenggarakan pendidikan kesetaraan Paket A, B, dan C yang berkualitas.',
      'Mengembangkan keterampilan hidup (life skills) yang adaptif terhadap kebutuhan pasar kerja.',
      'Membina karakter jujur, disiplin, dan bertanggung jawab pada setiap warga belajar.'
    ],
    alamat: 'Jl. At Taqwa No. 12, Kel. Pancoran Mas, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16431',
    telepon: '+62 21 7788 9900',
    email: 'info@attaqwamandiri.sch.id'
  });

  const years = ['2022/2023', '2023/2024', '2024/2025', '2025/2026'];
  const semesters = ['Ganjil', 'Genap'];

  const handleSave = () => {
    setIsEditMode(false);
    // Di sini biasanya ada panggilan API untuk update data sekolah
    alert('Konfigurasi profil sekolah berhasil disimpan!');
  };

  const handleSavePeriod = () => {
    setIsSavingPeriod(true);
    // Simulasi delay penyimpanan
    setTimeout(() => {
      setIsSavingPeriod(false);
      alert(`Periode Akademik ${selectedYear} - Semester ${selectedSemester} berhasil diaktifkan sebagai periode utama.`);
    }, 800);
  };

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
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end text-white">
          <div>
            <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Konfigurasi Profil Satuan Pendidikan
            </span>
            {isEditMode ? (
              <input 
                className="text-5xl font-black tracking-tight leading-tight bg-white/10 border-b-2 border-white outline-none w-full max-w-2xl"
                value={schoolData.name}
                onChange={(e) => setSchoolData({...schoolData, name: e.target.value})}
              />
            ) : (
              <h1 className="text-5xl font-black tracking-tight leading-tight">
                {schoolData.name}
              </h1>
            )}
            <p className="text-emerald-100/80 font-medium max-w-xl mt-2 italic">
              "{schoolData.visi}"
            </p>
          </div>
          <button 
            onClick={() => isEditMode ? handleSave() : setIsEditMode(true)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center gap-2 ${
              isEditMode ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-white text-emerald-900 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">{isEditMode ? 'save' : 'edit_square'}</span>
            {isEditMode ? 'Simpan Konfigurasi' : 'Edit Profil'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Periode Akademik Selection */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm overflow-hidden relative group flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined">calendar_today</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">Periode Akademik Aktif</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Konfigurasi Tahun Pelajaran SIAKAD</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 flex-1">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tahun Pelajaran</label>
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Semester</label>
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
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-50 flex justify-end">
              <button 
                onClick={handleSavePeriod}
                disabled={isSavingPeriod}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingPeriod ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Menyimpan...</>
                ) : (
                  <><span className="material-symbols-outlined text-sm">check_circle</span> Simpan Periode</>
                )}
              </button>
            </div>
          </div>

          {/* Identitas Satuan Pendidikan */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-800 mb-8 border-b border-slate-100 pb-4">
                Identitas Satuan Pendidikan
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <IdentityItem 
                  label="NPSN" 
                  value={schoolData.npsn} 
                  icon="fingerprint" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, npsn: val})}
                />
                <IdentityItem 
                  label="Status Akreditasi" 
                  value={schoolData.akreditasi} 
                  icon="verified" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, akreditasi: val})}
                />
                <IdentityItem 
                  label="Bentuk Pendidikan" 
                  value={schoolData.bentuk} 
                  icon="school" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, bentuk: val})}
                />
                <IdentityItem 
                  label="Yayasan / Pengelola" 
                  value={schoolData.yayasan} 
                  icon="account_balance" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, yayasan: val})}
                />
                <IdentityItem 
                  label="SK Pendirian" 
                  value={schoolData.skPendirian} 
                  icon="description" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, skPendirian: val})}
                />
                <IdentityItem 
                  label="SK Izin Operasional" 
                  value={schoolData.skOperasional} 
                  icon="gavel" 
                  isEdit={isEditMode}
                  onChange={(val: string) => setSchoolData({...schoolData, skOperasional: val})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-600 rounded-[2.5rem] p-10 text-white shadow-xl shadow-emerald-500/20">
              <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined">visibility</span>
                Visi PKBM
              </h4>
              {isEditMode ? (
                <textarea 
                  className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm font-bold w-full h-32 outline-none focus:ring-2 focus:ring-white/50"
                  value={schoolData.visi}
                  onChange={(e) => setSchoolData({...schoolData, visi: e.target.value})}
                />
              ) : (
                <p className="text-emerald-50 text-lg font-bold leading-relaxed italic">
                  "{schoolData.visi}"
                </p>
              )}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
              <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald-600">assignment_turned_in</span>
                Misi Strategis
              </h4>
              <ul className="space-y-4">
                {schoolData.misi.map((m, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <span className="material-symbols-outlined text-[12px] text-emerald-600 font-black">check</span>
                    </div>
                    {isEditMode ? (
                      <input 
                        className="text-sm font-medium text-slate-600 w-full border-b border-slate-100 outline-none"
                        value={m}
                        onChange={(e) => {
                          const newMisi = [...schoolData.misi];
                          newMisi[idx] = e.target.value;
                          setSchoolData({...schoolData, misi: newMisi});
                        }}
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-600 leading-relaxed">{m}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6">Kontak & Lokasi</h3>
            <div className="space-y-6">
              <IdentityItem 
                label="Alamat Lengkap" 
                value={schoolData.alamat} 
                icon="location_on" 
                isEdit={isEditMode}
                onChange={(val: string) => setSchoolData({...schoolData, alamat: val})}
              />
              <IdentityItem 
                label="Telepon / WhatsApp" 
                value={schoolData.telepon} 
                icon="phone_iphone" 
                isEdit={isEditMode}
                onChange={(val: string) => setSchoolData({...schoolData, telepon: val})}
              />
              <IdentityItem 
                label="Email Resmi" 
                value={schoolData.email} 
                icon="alternate_email" 
                isEdit={isEditMode}
                onChange={(val: string) => setSchoolData({...schoolData, email: val})}
              />
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">Statistik Real-time</h3>
              <div className="space-y-6">
                <StatRow label="Tutor Terdaftar" value="18" sub="Aktif Mengajar" />
                <StatRow label="Warga Belajar" value="248" sub="Siswa Terdaftar" />
                <StatRow label="Total Kelas" value="12" sub="Rombongan Belajar" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500/10 rounded-full translate-x-12 translate-y-12 blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityItem = ({ label, value, icon, isEdit, onChange }: any) => (
  <div className="flex items-start gap-4 group">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      {isEdit ? (
        <input 
          className="w-full text-sm font-bold text-slate-800 border-b border-emerald-200 outline-none focus:border-emerald-500 bg-emerald-50/30 px-2 py-1 rounded"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <p className="text-sm font-bold text-slate-800 leading-tight">{value}</p>
      )}
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
