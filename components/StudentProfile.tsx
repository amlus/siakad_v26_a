
import React, { useState } from 'react';

const StudentProfile: React.FC<{ user: any }> = ({ user }) => {
  const [documents, setDocuments] = useState({
    foto: { status: 'Sudah Diunggah', date: '20 Okt 2024' },
    kk: { status: 'Belum Diunggah', date: '-' },
    ktp: { status: 'Belum Diunggah', date: '-' },
    rapor: { status: 'Belum Diunggah', date: '-' },
    ijazah: { status: 'Belum Diunggah', date: '-' },
  });

  const handleUpload = (type: string) => {
    // Mock upload functionality
    alert(`Membuka dialog unggah untuk: ${type.toUpperCase()}`);
    setDocuments(prev => ({
      ...prev,
      [type]: { status: 'Sudah Diunggah', date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profil Saya</h2>
          <p className="text-slate-500">Informasi lengkap data diri dan administrasi warga belajar.</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                Ajukan Perubahan Data
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700 relative">
            <div className="absolute -bottom-12 left-8 p-1.5 bg-white rounded-[2rem] shadow-lg group cursor-pointer" onClick={() => handleUpload('foto')}>
                <div className="relative overflow-hidden rounded-[1.8rem]">
                  <img 
                      src={user.avatar} 
                      alt="profile" 
                      className="w-24 h-24 bg-slate-50 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                  </div>
                </div>
            </div>
        </div>

        <div className="pt-16 pb-10 px-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm font-medium text-slate-500">
                        <span>NISN: {user.nisn}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span>NIS: {user.nis}</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100 uppercase tracking-wider">
                        {user.program}
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold border border-slate-100 uppercase tracking-wider">
                        {user.kelas}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                {/* Academic Section */}
                <div className="space-y-6">
                    <SectionTitle icon={<AcademicIcon />} title="Identitas Akademik" />
                    <div className="grid grid-cols-1 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <ProfileField label="Status Belajar" value={user.status} isStatus />
                        <ProfileField label="Program Pendidikan" value={user.program} />
                        <ProfileField label="Tingkat / Kelas" value={user.kelas} />
                        <ProfileField label="Riwayat Sekolah" value={user.riwayatPendidikan} />
                    </div>
                </div>

                {/* Personal Section */}
                <div className="space-y-6">
                    <SectionTitle icon={<UserIcon />} title="Data Pribadi" />
                    <div className="grid grid-cols-1 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <ProfileField label="Tempat Lahir" value={user.tempatLahir} />
                        <ProfileField label="Tanggal Lahir" value={user.tanggalLahir} />
                        <ProfileField label="No. Telepon / WA" value={user.noTelepon} />
                        <ProfileField label="Alamat Domisili" value={user.alamat} isLongText />
                    </div>
                </div>

                {/* Family Section */}
                <div className="space-y-6">
                    <SectionTitle icon={<HomeIcon />} title="Informasi Keluarga" />
                    <div className="grid grid-cols-1 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                        <ProfileField label="Nama Ayah Kandung" value={user.namaAyah} />
                        <ProfileField label="Nama Ibu Kandung" value={user.namaIbu} />
                    </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-6">
                    <SectionTitle icon={<DocumentIcon />} title="Dokumen & Berkas Digital" />
                    <div className="grid grid-cols-1 gap-4">
                        <DocUploadRow 
                          label="Pas Foto 3x4" 
                          status={documents.foto.status} 
                          date={documents.foto.date} 
                          onUpload={() => handleUpload('foto')} 
                        />
                        <DocUploadRow 
                          label="Kartu Keluarga (KK)" 
                          status={documents.kk.status} 
                          date={documents.kk.date} 
                          onUpload={() => handleUpload('kk')} 
                        />
                        <DocUploadRow 
                          label="KTP (Jika ada)" 
                          status={documents.ktp.status} 
                          date={documents.ktp.date} 
                          onUpload={() => handleUpload('ktp')} 
                        />
                        <DocUploadRow 
                          label="Rapor Sebelumnya" 
                          status={documents.rapor.status} 
                          date={documents.rapor.date} 
                          onUpload={() => handleUpload('rapor')} 
                        />
                        <DocUploadRow 
                          label="Ijazah Terakhir" 
                          status={documents.ijazah.status} 
                          date={documents.ijazah.date} 
                          onUpload={() => handleUpload('ijazah')} 
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }: any) => (
    <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
        <div className="text-emerald-600">{icon}</div>
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest">{title}</h4>
    </div>
);

const ProfileField = ({ label, value, isStatus, isLongText }: any) => (
    <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        {isStatus ? (
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                value === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
            }`}>{value}</span>
        ) : (
            <p className={`text-sm font-bold text-slate-700 ${isLongText ? 'italic font-medium leading-relaxed' : ''}`}>
                {value || '-'}
            </p>
        )}
    </div>
);

const DocUploadRow = ({ label, status, date, onUpload }: any) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-emerald-200 hover:shadow-sm transition-all group">
    <div className="flex items-center gap-3">
      <div className={`p-2.5 rounded-xl ${status === 'Sudah Diunggah' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-800">{label}</p>
        <p className="text-[10px] text-slate-400 font-medium">{status} • {date}</p>
      </div>
    </div>
    <button 
      onClick={onUpload}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
        status === 'Sudah Diunggah' 
          ? 'bg-slate-50 text-slate-400 hover:bg-slate-100' 
          : 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700'
      }`}
    >
      {status === 'Sudah Diunggah' ? 'Ganti' : 'Unggah'}
    </button>
  </div>
);

const AcademicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425 4.708 5.25 5.25 0 0 0 2.262 6.44l.353.214c.118.071.26.071.378 0l.353-.214a5.25 5.25 0 0 0 2.262-6.44 50.664 50.664 0 0 0-2.425-4.708Zm15.482 0a50.636 50.636 0 0 1 2.425 4.708 5.25 5.25 0 0 1-2.262 6.44l-.353.214a.375.375 0 0 1-.378 0l-.353-.214a5.25 5.25 0 0 1-2.262-6.44 50.664 50.664 0 0 1 2.425-4.708Zm-15.482 0L12 3l8.738 7.147" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export default StudentProfile;
