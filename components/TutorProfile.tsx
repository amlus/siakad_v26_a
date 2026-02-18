
import React, { useState } from 'react';
import { User } from '../types';

const TutorProfile: React.FC<{ user: any }> = ({ user }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    nuptk: user.nuptk || '12345678',
    jabatan: 'Tutor Utama',
    email: 'ahmad.tutor@attaqwamandiri.sch.id',
    phone: '081234567890',
    bio: 'Berdedikasi dalam mencerdaskan anak bangsa melalui pendidikan kesetaraan Paket C bidang Matematika.',
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API update
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Profil Pendidik</h2>
          <p className="text-slate-500">Kelola informasi profesional dan data kepegawaian Anda.</p>
        </div>
        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
          Edit Profil Saya
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-indigo-700 relative">
          <div className="absolute -bottom-12 left-8 p-1.5 bg-white rounded-[2rem] shadow-lg">
            <img 
              src={user.avatar} 
              alt="profile" 
              className="w-24 h-24 bg-slate-50 rounded-[1.8rem] object-cover"
            />
          </div>
        </div>

        <div className="pt-16 pb-10 px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h3 className="text-3xl font-black text-slate-900 leading-none">{profileData.name}</h3>
              <p className="text-sm font-bold text-emerald-600 mt-2 uppercase tracking-widest">{profileData.jabatan}</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NUPTK:</span>
              <span className="text-sm font-black text-slate-700">{profileData.nuptk}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <SectionTitle icon="person" title="Informasi Kontak" />
                <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                  <ProfileItem label="Alamat Email" value={profileData.email} />
                  <ProfileItem label="No. Telepon" value={profileData.phone} />
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle icon="school" title="Kompetensi Pengajaran" />
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mata Pelajaran Diampu</p>
                    <div className="flex flex-wrap gap-2">
                      {['Matematika', 'Fisika Dasar', 'Logika'].map(m => (
                        <span key={m} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl text-xs font-bold border border-emerald-100">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kelas Terdaftar</p>
                    <div className="flex flex-wrap gap-2">
                      {['Kelas 10', 'Kelas 11', 'Kelas 12'].map(k => (
                        <span key={k} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-xl text-xs font-bold border border-blue-100">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <SectionTitle icon="description" title="Biografi Singkat" />
                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 min-h-[120px]">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium italic">"{profileData.bio}"</p>
                </div>
              </div>

              <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-lg font-black mb-4">Statistik Pengajaran</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-xs text-indigo-100">Total Sesi Bulan Ini</span>
                      <span className="text-xl font-black">24 Sesi</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-xs text-indigo-100">Kehadiran Siswa (Avg)</span>
                      <span className="text-xl font-black">92%</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-12 translate-y-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Ubah Data Profil</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateProfile} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                  value={profileData.name}
                  onChange={e => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input 
                    className="w-full px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                    value={profileData.email}
                    onChange={e => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Telepon</label>
                  <input 
                    className="w-full px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                    value={profileData.phone}
                    onChange={e => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Biografi</label>
                <textarea 
                  rows={3}
                  className="w-full px-5 py-3 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none resize-none"
                  value={profileData.bio}
                  onChange={e => setProfileData({...profileData, bio: e.target.value})}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionTitle = ({ icon, title }: any) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
  </div>
);

const ProfileItem = ({ label, value }: any) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-sm font-bold text-slate-700">{value}</p>
  </div>
);

export default TutorProfile;
