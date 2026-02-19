
import React, { useState } from 'react';
import { Tutor } from '../types';

const initialTutors: Tutor[] = [
  // Fix: added missing required property 'tanggalLahir'
  { id: '1', nama: 'Ahmad S.Pd', nuptk: '12345678', jabatan: 'Tutor Utama', mapel: ['Matematika', 'IPA'], kelas: ['Kelas 10', 'Kelas 11', 'Kelas 12'], tugasTambahan: ['Wali Kelas 10', 'Koordinator Kurikulum'], tanggalLahir: '1980-01-01' },
  // Fix: added missing required property 'tanggalLahir'
  { id: '2', nama: 'Siti M.Pd', nuptk: '87654321', jabatan: 'Tutor', mapel: ['Bahasa Indonesia'], kelas: ['Kelas 7', 'Kelas 8', 'Kelas 9'], tugasTambahan: ['Penanggungjawab Titik Layanan Pancoran Mas'], tanggalLahir: '1985-05-05' },
  // Fix: added missing required property 'tanggalLahir'
  { id: '3', nama: 'Budi Santoso S.Ag', nuptk: '11223344', jabatan: 'Tutor', mapel: ['Agama', 'PPKn'], kelas: ['Kelas 10', 'Kelas 12'], tugasTambahan: [], tanggalLahir: '1990-10-10' },
];

const TutorManagement: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  
  const [formData, setFormData] = useState({
    nama: '',
    nuptk: '',
    jabatan: 'Tutor',
    mapelInput: '',
    kelasInput: '',
    tugasInput: '',
    // Fix: added tanggalLahir to form data
    tanggalLahir: ''
  });

  const openAddModal = () => {
    setEditingTutor(null);
    // Fix: added default tanggalLahir for new tutor
    setFormData({ nama: '', nuptk: '', jabatan: 'Tutor', mapelInput: '', kelasInput: '', tugasInput: '', tanggalLahir: '1990-01-01' });
    setIsModalOpen(true);
  };

  const openEditModal = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setFormData({
      nama: tutor.nama,
      nuptk: tutor.nuptk,
      jabatan: tutor.jabatan,
      mapelInput: tutor.mapel.join(', '),
      kelasInput: tutor.kelas.join(', '),
      tugasInput: (tutor.tugasTambahan || []).join(', '),
      // Fix: added tanggalLahir to editing form data
      tanggalLahir: tutor.tanggalLahir
    });
    setIsModalOpen(true);
  };

  const handleSaveTutor = (e: React.FormEvent) => {
    e.preventDefault();
    const mapel = formData.mapelInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const kelas = formData.kelasInput.split(',').map(s => s.trim()).filter(s => s !== '');
    const tugasTambahan = formData.tugasInput.split(',').map(s => s.trim()).filter(s => s !== '');

    if (editingTutor) {
      setTutors(tutors.map(t => t.id === editingTutor.id ? { ...t, ...formData, mapel, kelas, tugasTambahan, tanggalLahir: formData.tanggalLahir } : t));
    } else {
      // Fix: added missing property 'tanggalLahir' to new tutor object
      const newTutor: Tutor = {
        id: Math.random().toString(36).substr(2, 9),
        nama: formData.nama,
        nuptk: formData.nuptk,
        jabatan: formData.jabatan,
        mapel,
        kelas,
        tugasTambahan,
        tanggalLahir: formData.tanggalLahir
      };
      setTutors([...tutors, newTutor]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus data tutor ini?')) {
      setTutors(tutors.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Tutor</h2>
          <p className="text-slate-500">Kelola data tenaga pendidik, penugasan kelas, dan tugas tambahan.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={openAddModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah Tutor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutors.map((tutor) => (
          <div key={tutor.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xl border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                {tutor.nama.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{tutor.nama}</h3>
                <p className="text-xs text-slate-500 font-medium">NUPTK: {tutor.nuptk || '-'}</p>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between text-xs items-center">
                <span className="text-slate-400 font-semibold uppercase tracking-wider">Jabatan</span>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{tutor.jabatan}</span>
              </div>
              
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Mata Pelajaran</p>
                <div className="flex flex-wrap gap-1">
                  {tutor.mapel.map((m, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100">{m}</span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Kelas Diampu</p>
                <div className="flex flex-wrap gap-1">
                  {tutor.kelas.map((k, i) => (
                    <span key={i} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">{k}</span>
                  ))}
                </div>
              </div>

              {tutor.tugasTambahan && tutor.tugasTambahan.length > 0 && (
                <div>
                  <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1.5">Tugas Tambahan</p>
                  <div className="flex flex-wrap gap-1">
                    {tutor.tugasTambahan.map((t, i) => (
                      <span key={i} className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-50 flex gap-2">
              <button 
                onClick={() => openEditModal(tutor)}
                className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 transition-colors"
              >
                Edit Data
              </button>
              <button 
                onClick={() => handleDelete(tutor.id)}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Tutor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">{editingTutor ? 'Edit Data Tutor' : 'Tambah Tutor Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSaveTutor} className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                  <input required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="Ahmad S.Pd" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NUPTK</label>
                  <input className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" placeholder="1234..." value={formData.nuptk} onChange={e => setFormData({...formData, nuptk: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jabatan</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white" value={formData.jabatan} onChange={e => setFormData({...formData, jabatan: e.target.value})}>
                    <option>Tutor Utama</option>
                    <option>Tutor</option>
                    <option>Tutor Pendamping</option>
                  </select>
                </div>
                {/* Fix: Added input for tanggalLahir */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal Lahir</label>
                  <input required type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" value={formData.tanggalLahir} onChange={e => setFormData({...formData, tanggalLahir: e.target.value})} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mata Pelajaran (Pisahkan Koma)</label>
                <input required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" placeholder="Matematika, IPA, ..." value={formData.mapelInput} onChange={e => setFormData({...formData, mapelInput: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kelas Diampu (Pisahkan Koma)</label>
                <input required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm" placeholder="Kelas 10, Kelas 11, ..." value={formData.kelasInput} onChange={e => setFormData({...formData, kelasInput: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Tugas Tambahan (Pisahkan Koma)</label>
                <textarea className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm min-h-[80px]" placeholder="Contoh: Wali Kelas 10, Penanggungjawab Titik Layanan" value={formData.tugasInput} onChange={e => setFormData({...formData, tugasInput: e.target.value})} />
                <p className="text-[9px] text-slate-400 italic leading-tight">* Diisi oleh Admin untuk ditampilkan di dashboard Tutor.</p>
              </div>
              <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">Batal</button>
                <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">Simpan Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorManagement;
