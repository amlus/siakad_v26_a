
import React, { useState } from 'react';
import { UserRole } from '../types';

interface Material {
  id: string;
  title: string;
  subject: string;
  program: string;
  kelas: string; // Added property
  type: 'PDF' | 'Video' | 'Link' | 'Doc';
  date: string;
  tutor: string;
}

const mockMaterials: Material[] = [
  { id: '1', title: 'Modul Persamaan Kuadrat', subject: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', type: 'PDF', date: '2024-10-20', tutor: 'Ahmad S.Pd' },
  { id: '2', title: 'Video Sejarah Kemerdekaan', subject: 'Sejarah', program: 'Paket B', kelas: 'Kelas 8', type: 'Video', date: '2024-10-18', tutor: 'Siti M.Pd' },
  { id: '3', title: 'Latihan Menulis Esai', subject: 'Bahasa Indonesia', program: 'Paket C', kelas: 'Kelas 12', type: 'Doc', date: '2024-10-22', tutor: 'Ahmad S.Pd' },
  { id: '4', title: 'Link Simulasi Fisika Dasar', subject: 'IPA', program: 'Paket C', kelas: 'Kelas 11', type: 'Link', date: '2024-10-15', tutor: 'Budi Santoso' },
];

const TeachingMaterials: React.FC<{ role: UserRole }> = ({ role }) => {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    subject: '',
    program: 'Paket C',
    kelas: 'Kelas 10', // Default value
    type: 'PDF' as 'PDF' | 'Video' | 'Link' | 'Doc',
  });

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.kelas.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'Semua' || m.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    const item: Material = {
      id: Math.random().toString(36).substr(2, 9),
      ...newMaterial,
      date: new Date().toISOString().split('T')[0],
      tutor: 'Tutor Ahmad', // Mocked current user
    };
    setMaterials([item, ...materials]);
    setIsModalOpen(false);
    setNewMaterial({ title: '', subject: '', program: 'Paket C', kelas: 'Kelas 10', type: 'PDF' });
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'PDF': return 'bg-red-50 text-red-600 border-red-100';
      case 'Video': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Doc': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Link': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const isStudent = role === UserRole.SISWA;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isStudent ? 'Materi Belajar' : 'Bahan Ajar & Modul'}
          </h2>
          <p className="text-slate-500">
            {isStudent 
              ? 'Akses kumpulan materi pembelajaran dan modul untuk mendukung belajarmu.' 
              : 'Kumpulan materi pembelajaran, modul, dan referensi belajar.'}
          </p>
        </div>
        {!isStudent && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Unggah Bahan Ajar
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
          <div className="relative flex-1 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari materi, mapel, atau kelas..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              className="w-full sm:w-auto border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none bg-white cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="Semua">Semua Tipe</option>
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Doc">Dokumen</option>
              <option value="Link">Link Eksternal</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[11px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Judul Materi</th>
                <th className="px-6 py-4 text-center">Tipe</th>
                <th className="px-6 py-4">Mapel</th>
                <th className="px-6 py-4">Program / Kelas</th>
                {!isStudent && <th className="px-6 py-4">Diunggah Oleh</th>}
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMaterials.length > 0 ? (
                filteredMaterials.map((material) => (
                  <tr key={material.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${getTypeColor(material.type)}`}>
                          {material.type === 'PDF' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                          {material.type === 'Video' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
                          {material.type === 'Link' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>}
                          {material.type === 'Doc' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{material.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{material.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getTypeColor(material.type)}`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">{material.subject}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">{material.program}</span>
                        <span className="text-[10px] font-medium text-slate-400 italic">{material.kelas}</span>
                      </div>
                    </td>
                    {!isStudent && <td className="px-6 py-4 text-sm text-slate-500 font-medium">{material.tutor}</td>}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors" title="Lihat/Download">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </button>
                        {!isStudent && (
                          <button 
                            onClick={() => setMaterials(materials.filter(m => m.id !== material.id))}
                            className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors" 
                            title="Hapus"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                      <p className="text-lg font-bold">Materi tidak ditemukan</p>
                      <p className="text-sm">Coba kata kunci atau filter lain.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Unggah Bahan Ajar Baru</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddMaterial} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Judul Materi</label>
                <input 
                  required
                  type="text" 
                  placeholder="Contoh: Modul Dasar Akuntansi"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Pelajaran</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Contoh: Ekonomi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium"
                    value={newMaterial.subject}
                    onChange={(e) => setNewMaterial({...newMaterial, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Program Paket</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium bg-white"
                    value={newMaterial.program}
                    onChange={(e) => setNewMaterial({...newMaterial, program: e.target.value})}
                  >
                    <option>Paket A</option>
                    <option>Paket B</option>
                    <option>Paket C</option>
                  </select>
                </div>
              </div>

              {/* NEW FIELD: Target Kelas */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Kelas</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-medium bg-white"
                  value={newMaterial.kelas}
                  onChange={(e) => setNewMaterial({...newMaterial, kelas: e.target.value})}
                >
                  {[7, 8, 9, 10, 11, 12].map(num => (
                    <option key={num} value={`Kelas ${num}`}>Kelas {num}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipe Konten</label>
                <div className="grid grid-cols-4 gap-2">
                  {['PDF', 'Video', 'Doc', 'Link'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewMaterial({...newMaterial, type: type as any})}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        newMaterial.type === type 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih File / Masukkan Tautan</label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                  <div className="p-3 rounded-full bg-white text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-600">Klik untuk unggah file</p>
                    <p className="text-xs text-slate-400">PDF, MP4, atau DOC (Maks 20MB)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
                >
                  Simpan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachingMaterials;
