
import React, { useState, useMemo } from 'react';
import { MataPelajaran } from '../types';

const initialSubjects: MataPelajaran[] = [
  { id: '1', nama: 'Matematika', kode: 'MTK-A1', program: 'Paket A', jamTatapMuka: 1, jamTutorial: 1, jamMandiri: 1, skk: 3 },
  { id: '2', nama: 'Bahasa Indonesia', kode: 'BIN-A1', program: 'Paket A', jamTatapMuka: 1, jamTutorial: 1, jamMandiri: 1, skk: 3 },
  { id: '3', nama: 'IPA Terpadu', kode: 'IPA-B1', program: 'Paket B', jamTatapMuka: 2, jamTutorial: 1, jamMandiri: 1, skk: 4 },
  { id: '4', nama: 'Matematika Lanjut', kode: 'MTK-C1', program: 'Paket C', jamTatapMuka: 2, jamTutorial: 1, jamMandiri: 1, skk: 4 },
  { id: '5', nama: 'Pendidikan Agama', kode: 'AGM-C1', program: 'Paket C', jamTatapMuka: 1, jamTutorial: 0, jamMandiri: 1, skk: 2 },
  { id: '6', nama: 'Sejarah Indonesia', kode: 'SEJ-C1', program: 'Paket C', jamTatapMuka: 1, jamTutorial: 0, jamMandiri: 1, skk: 2 },
];

const SubjectManagement: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<'Paket A' | 'Paket B' | 'Paket C'>('Paket C');
  const [subjects, setSubjects] = useState<MataPelajaran[]>(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<MataPelajaran | null>(null);
  
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    program: 'Paket C' as 'Paket A' | 'Paket B' | 'Paket C',
    jamTatapMuka: 1,
    jamTutorial: 1,
    jamMandiri: 1,
    skk: 2
  });

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => s.program === activeProgram);
  }, [subjects, activeProgram]);

  const totalSKK = useMemo(() => {
    return filteredSubjects.reduce((acc, curr) => acc + curr.skk, 0);
  }, [filteredSubjects]);

  const openAddModal = () => {
    setEditingSubject(null);
    setFormData({ 
      nama: '', 
      kode: '', 
      program: activeProgram, 
      jamTatapMuka: 1, 
      jamTutorial: 1, 
      jamMandiri: 1, 
      skk: 2 
    });
    setIsModalOpen(true);
  };

  const openEditModal = (subject: MataPelajaran) => {
    setEditingSubject(subject);
    setFormData({
      nama: subject.nama,
      kode: subject.kode,
      program: subject.program,
      jamTatapMuka: subject.jamTatapMuka,
      jamTutorial: subject.jamTutorial,
      jamMandiri: subject.jamMandiri,
      skk: subject.skk
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects(subjects.map(s => s.id === editingSubject.id ? { ...s, ...formData } : s));
    } else {
      const newSub: MataPelajaran = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData
      };
      setSubjects([...subjects, newSub]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Hapus mata pelajaran ini dari kurikulum?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const programStyles = {
    'Paket A': 'emerald',
    'Paket B': 'amber',
    'Paket C': 'indigo'
  };

  const themeColor = programStyles[activeProgram];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Kurikulum & Mapel</h2>
          <p className="text-slate-500">Kelola struktur kurikulum, beban jam, dan SKK per program pendidikan.</p>
        </div>
        <button 
          onClick={openAddModal}
          className={`bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-${themeColor}-500/20 flex items-center gap-2 transition-all active:scale-95`}
        >
          <span className="material-symbols-outlined text-lg">add_task</span>
          Tambah Mapel {activeProgram}
        </button>
      </div>

      {/* Program Selection Tabs */}
      <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-200 shadow-sm w-fit">
        {(['Paket A', 'Paket B', 'Paket C'] as const).map((prog) => (
          <button
            key={prog}
            onClick={() => setActiveProgram(prog)}
            className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
              activeProgram === prog 
                ? `bg-${programStyles[prog]}-600 text-white shadow-xl shadow-${programStyles[prog]}-500/20` 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {prog}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`bg-${themeColor}-50 border border-${themeColor}-100 p-8 rounded-[2.5rem] shadow-sm`}>
          <p className={`text-[10px] font-black uppercase tracking-widest text-${themeColor}-600/60 mb-1`}>Total Mata Pelajaran</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-black text-${themeColor}-700`}>{filteredSubjects.length}</span>
            <span className="text-sm font-bold text-slate-400">Mapel Terdaftar</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Akumulasi Beban SKK</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-slate-800">{totalSKK}</span>
            <span className="text-sm font-bold text-slate-400">Total SKK {activeProgram}</span>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Status Kurikulum</p>
            <h4 className="text-xl font-black text-emerald-400">Terverifikasi</h4>
            <p className="text-[10px] text-white/60 font-medium mt-2">Sesuai standar Kurikulum Merdeka PNF</p>
          </div>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 translate-y-8"></div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] uppercase tracking-widest font-black border-b border-slate-100">
                <th className="px-8 py-5">Kode & Mata Pelajaran</th>
                <th className="px-4 py-5 text-center">Tatap Muka</th>
                <th className="px-4 py-5 text-center">Tutorial</th>
                <th className="px-4 py-5 text-center">Mandiri</th>
                <th className="px-4 py-5 text-center">SKK</th>
                <th className="px-8 py-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl bg-${themeColor}-50 flex items-center justify-center font-mono font-black text-[10px] text-${themeColor}-600 border border-${themeColor}-100`}>
                          {sub.kode.split('-')[1] || sub.id}
                        </div>
                        <div>
                          <p className="font-black text-slate-800 text-base">{sub.nama}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{sub.kode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className="text-sm font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">{sub.jamTatapMuka}j</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className="text-sm font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">{sub.jamTutorial}j</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                       <span className="text-sm font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">{sub.jamMandiri}j</span>
                    </td>
                    <td className="px-4 py-5 text-center">
                      <span className={`bg-${themeColor}-50 text-${themeColor}-700 px-4 py-2 rounded-2xl font-black text-sm border border-${themeColor}-100 shadow-sm`}>
                        {sub.skk} SKK
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(sub)}
                          className="p-3 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">edit_note</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(sub.id)}
                          className="p-3 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-2xl transition-all"
                        >
                          <span className="material-symbols-outlined text-lg">delete_sweep</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center opacity-20 grayscale">
                       <span className="material-symbols-outlined text-7xl mb-4">folder_off</span>
                       <p className="text-xl font-black">Kurikulum Belum Tersedia</p>
                       <p className="text-sm font-bold">Silakan tambahkan mata pelajaran untuk {activeProgram}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
            <div className={`p-8 bg-${themeColor}-50 border-b border-${themeColor}-100 flex justify-between items-center`}>
              <div>
                <h3 className="text-2xl font-black text-slate-800">{editingSubject ? 'Ubah Mata Pelajaran' : 'Tambah Mata Pelajaran'}</h3>
                <p className={`text-xs font-bold text-${themeColor}-600 uppercase tracking-widest mt-0.5`}>Program: {formData.program}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/50 rounded-2xl transition-colors text-slate-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program Pendidikan</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-bold bg-slate-50 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all cursor-not-allowed" 
                    value={formData.program}
                    disabled
                  >
                    <option>Paket A</option>
                    <option>Paket B</option>
                    <option>Paket C</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kode Mapel</label>
                  <input 
                    required 
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all uppercase placeholder:text-slate-300" 
                    placeholder="Contoh: MTK-C01" 
                    value={formData.kode} 
                    onChange={e => setFormData({...formData, kode: e.target.value.toUpperCase()})} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Mata Pelajaran</label>
                <input 
                  required 
                  className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                  placeholder="Contoh: Matematika Peminatan" 
                  value={formData.nama} 
                  onChange={e => setFormData({...formData, nama: e.target.value})} 
                />
              </div>

              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Rincian Beban Belajar (Jam/Minggu)</p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Tatap Muka</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black outline-none text-center" 
                      value={formData.jamTatapMuka} 
                      onChange={e => setFormData({...formData, jamTatapMuka: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Tutorial</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black outline-none text-center" 
                      value={formData.jamTutorial} 
                      onChange={e => setFormData({...formData, jamTutorial: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Mandiri</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black outline-none text-center" 
                      value={formData.jamMandiri} 
                      onChange={e => setFormData({...formData, jamMandiri: parseInt(e.target.value) || 0})} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Satuan Kredit Kompetensi (SKK)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1" 
                    className={`w-full px-5 py-5 rounded-[1.8rem] border border-slate-200 text-xl font-black text-${themeColor}-600 focus:ring-8 focus:ring-${themeColor}-500/5 outline-none transition-all pl-12`} 
                    value={formData.skk} 
                    onChange={e => setFormData({...formData, skk: parseInt(e.target.value) || 1})} 
                  />
                  <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-${themeColor}-400`}>stars</span>
                </div>
                <p className="text-[10px] text-slate-400 italic font-medium">SKK diakumulasi untuk pemenuhan standar kelulusan {activeProgram}.</p>
              </div>

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-100 rounded-[1.8rem] font-black text-xs uppercase tracking-widest text-slate-500 active:scale-95 transition-all">Batal</button>
                <button type="submit" className={`flex-1 py-5 bg-${themeColor}-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-${themeColor}-900/30 active:scale-95 transition-all`}>Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
