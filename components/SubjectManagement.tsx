
import React, { useState } from 'react';
import { MataPelajaran } from '../types';

const initialSubjects: MataPelajaran[] = [
  { id: '1', nama: 'Matematika', kode: 'MTK-01', jamTatapMuka: 2, jamTutorial: 1, jamMandiri: 1, skk: 4 },
  { id: '2', nama: 'Bahasa Indonesia', kode: 'BIN-01', jamTatapMuka: 1, jamTutorial: 1, jamMandiri: 1, skk: 3 },
  { id: '3', nama: 'IPA Terpadu', kode: 'IPA-01', jamTatapMuka: 2, jamTutorial: 1, jamMandiri: 1, skk: 4 },
  { id: '4', nama: 'Bahasa Inggris', kode: 'BIG-01', jamTatapMuka: 1, jamTutorial: 0, jamMandiri: 1, skk: 2 },
  { id: '5', nama: 'Pendidikan Agama', kode: 'AGM-01', jamTatapMuka: 1, jamTutorial: 0, jamMandiri: 1, skk: 2 },
  { id: '6', nama: 'Sejarah Indonesia', kode: 'SEJ-01', jamTatapMuka: 1, jamTutorial: 0, jamMandiri: 1, skk: 2 },
];

const SubjectManagement: React.FC = () => {
  const [subjects, setSubjects] = useState<MataPelajaran[]>(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<MataPelajaran | null>(null);
  
  const [formData, setFormData] = useState({
    nama: '',
    kode: '',
    jamTatapMuka: 1,
    jamTutorial: 1,
    jamMandiri: 1,
    skk: 2
  });

  const openAddModal = () => {
    setEditingSubject(null);
    setFormData({ nama: '', kode: '', jamTatapMuka: 1, jamTutorial: 1, jamMandiri: 1, skk: 2 });
    setIsModalOpen(true);
  };

  const openEditModal = (subject: MataPelajaran) => {
    setEditingSubject(subject);
    setFormData({
      nama: subject.nama,
      kode: subject.kode,
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
    if (window.confirm('Hapus mata pelajaran ini?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Kurikulum & Mapel</h2>
          <p className="text-slate-500">Kelola daftar kurikulum, rincian beban jam, dan Satuan Kredit Kompetensi (SKK).</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Tambah Mapel
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="px-6 py-4">Kode Mapel</th>
                <th className="px-6 py-4">Mata Pelajaran</th>
                <th className="px-4 py-4 text-center">Tatap Muka</th>
                <th className="px-4 py-4 text-center">Tutorial</th>
                <th className="px-4 py-4 text-center">Mandiri</th>
                <th className="px-4 py-4 text-center">Total SKK</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs border border-emerald-100">
                      {sub.kode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">{sub.nama}</p>
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-slate-600">
                    {sub.jamTatapMuka}
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-slate-600">
                    {sub.jamTutorial}
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-slate-600">
                    {sub.jamMandiri}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full font-black text-xs border border-amber-100">
                      {sub.skk} SKK
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(sub)}
                        className="p-2 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">{editingSubject ? 'Ubah Mata Pelajaran' : 'Tambah Mata Pelajaran'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kode Mapel</label>
                  <input 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                    placeholder="MTK-01" 
                    value={formData.kode} 
                    onChange={e => setFormData({...formData, kode: e.target.value.toUpperCase()})} 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Mapel</label>
                  <input 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" 
                    placeholder="Matematika" 
                    value={formData.nama} 
                    onChange={e => setFormData({...formData, nama: e.target.value})} 
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Distribusi Beban Belajar (Jam)</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tatap Muka</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold outline-none" 
                      value={formData.jamTatapMuka} 
                      onChange={e => setFormData({...formData, jamTatapMuka: parseInt(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tutorial</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold outline-none" 
                      value={formData.jamTutorial} 
                      onChange={e => setFormData({...formData, jamTutorial: parseInt(e.target.value)})} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Mandiri</label>
                    <input 
                      type="number" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold outline-none" 
                      value={formData.jamMandiri} 
                      onChange={e => setFormData({...formData, jamMandiri: parseInt(e.target.value)})} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Satuan Kredit Kompetensi (SKK)</label>
                <input 
                  type="number" 
                  min="1" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-black text-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" 
                  value={formData.skk} 
                  onChange={e => setFormData({...formData, skk: parseInt(e.target.value)})} 
                />
                <p className="text-[9px] text-slate-400 italic">SKK dihitung berdasarkan akumulasi beban belajar per minggu.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all">Simpan Mapel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
