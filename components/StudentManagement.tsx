
import React, { useState, useMemo, useEffect } from 'react';
import { WargaBelajar } from '../types';

const mockStudents: WargaBelajar[] = [
  { 
    id: '1', 
    nama: 'Budi Santoso', 
    nisn: '009887711', 
    nis: '2024001',
    program: 'Paket C', 
    kelas: 'Kelas 10', 
    status: 'Aktif', 
    riwayatPendidikan: 'SMP N 1 Depok',
    tempatLahir: 'Depok',
    tanggalLahir: '2008-05-12',
    namaAyah: 'Supardi',
    namaIbu: 'Siti Rohmah',
    alamat: 'Jl. Melati No. 45, Pancoran Mas, Depok',
    noTelepon: '081234567890'
  },
  { 
    id: '2', 
    nama: 'Siti Aminah', 
    nisn: '008776622', 
    nis: '2024002',
    program: 'Paket B', 
    kelas: 'Kelas 8', 
    status: 'Aktif', 
    riwayatPendidikan: 'SD IT Al Hikmah',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2010-02-20',
    namaAyah: 'Zulkifli',
    namaIbu: 'Aminah',
    alamat: 'Perum Gema Pesona Block C2, Depok',
    noTelepon: '085678901234'
  },
];

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<WargaBelajar[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedStudent, setSelectedStudent] = useState<WargaBelajar | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Form State for New Student
  const [formData, setFormData] = useState<Omit<WargaBelajar, 'id'>>({
    nama: '',
    nisn: '',
    nis: '',
    program: 'Paket C',
    kelas: 'Kelas 10',
    status: 'Aktif',
    riwayatPendidikan: '',
    tempatLahir: '',
    tanggalLahir: '',
    namaAyah: '',
    namaIbu: '',
    alamat: '',
    noTelepon: ''
  });

  // Helper for dynamic class options
  const getClassOptions = (program: string) => {
    switch (program) {
      case 'Paket A': return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
      case 'Paket B': return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
      case 'Paket C': return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
      default: return [];
    }
  };

  // Ensure class is valid when program changes
  useEffect(() => {
    const options = getClassOptions(formData.program);
    if (!options.includes(formData.kelas)) {
      setFormData(prev => ({ ...prev, kelas: options[0] || '' }));
    }
  }, [formData.program]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.nisn.includes(searchTerm) ||
                            student.nis.includes(searchTerm);
      const matchesStatus = statusFilter === 'Semua' || student.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: WargaBelajar = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    };
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
    setFormData({
      nama: '', nisn: '', nis: '', program: 'Paket C', kelas: 'Kelas 10', status: 'Aktif',
      riwayatPendidikan: '', tempatLahir: '', tanggalLahir: '', namaAyah: '', namaIbu: '',
      alamat: '', noTelepon: ''
    });
  };

  const handleImportCSV = () => {
    // Simulating import success
    alert('Import simulasi: 50 data warga belajar telah diproses.');
    setIsImportModalOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data warga belajar ini?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Warga Belajar</h2>
          <p className="text-slate-500">Pangkalan data induk Warga Belajar PKBM At Taqwa Mandiri.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsImportModalOpen(true)}
            className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all font-bold text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Import Data
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 font-bold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah Warga Belajar
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/30">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input 
              type="text" 
              placeholder="Cari nama, NISN, atau NIS..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none bg-white cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase tracking-widest font-bold border-b border-slate-100">
                <th className="px-6 py-4">Warga Belajar</th>
                <th className="px-6 py-4">NISN / NIS</th>
                <th className="px-6 py-4">Program / Kelas</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Profil</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
                          {student.nama.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{student.nama}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{student.noTelepon || 'No Phone'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-600">NISN: {student.nisn}</p>
                      <p className="text-[10px] text-slate-400 font-medium">NIS: {student.nis}</p>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit">
                          {student.program}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {student.kelas}
                        </span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                        student.status === 'Aktif' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedStudent(student)}
                        className="text-emerald-600 hover:text-emerald-700 font-bold text-xs p-2 hover:bg-emerald-50 rounded-xl transition-all"
                      >
                        Detail Lengkap
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-1">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-24 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      <p className="text-lg font-bold">Warga belajar tidak ditemukan</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-slate-800">Import Warga Belajar</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Upload file CSV/Excel</p>
              </div>
              <button onClick={() => setIsImportModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 flex flex-col items-center justify-center gap-4 group hover:border-emerald-400 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-500 shadow-sm transition-colors">
                   <span className="material-symbols-outlined text-4xl">upload_file</span>
                </div>
                <div className="text-center">
                   <p className="text-sm font-bold text-slate-700">Klik atau seret file ke sini</p>
                   <p className="text-[10px] text-slate-400 font-medium">CSV, XLS, atau XLSX (Maks 10MB)</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl space-y-2">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Petunjuk Format</p>
                <p className="text-[10px] text-amber-700/80 font-medium leading-relaxed">
                  Gunakan format kolom: Nama Lengkap, NISN, NIS, Program, Kelas, Jenis Kelamin, Tanggal Lahir, Alamat. Pastikan header sesuai dengan template.
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all">Download Template</button>
                <button onClick={handleImportCSV} className="flex-[2] py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all">Proses Import</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Extensive Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Tambah Warga Belajar</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5 opacity-60">Pendaftaran PKBM At Taqwa Mandiri</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-3 hover:bg-slate-200 rounded-2xl transition-all text-slate-400 hover:text-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-8 md:p-10 overflow-y-auto space-y-10 custom-scrollbar">
              {/* Section 1: Data Akademik */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425 4.708 5.25 5.25 0 0 0 2.262 6.44l.353.214c.118.071.26.071.378 0l.353-.214a5.25 5.25 0 0 0 2.262-6.44 50.664 50.664 0 0 0-2.425-4.708Zm15.482 0a50.636 50.636 0 0 1 2.425 4.708 5.25 5.25 0 0 1-2.262 6.44l-.353.214a.375.375 0 0 1-.378 0l-.353-.214a5.25 5.25 0 0 1-2.262-6.44 50.664 50.664 0 0 1 2.425-4.708Zm-15.482 0L12 3l8.738 7.147" />
                      </svg>
                   </div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Identitas & Penempatan Akademik</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FormInput label="Nama Lengkap" required value={formData.nama} onChange={val => setFormData({...formData, nama: val})} placeholder="Masukkan nama sesuai ijazah" />
                  <FormInput label="NISN" required value={formData.nisn} onChange={val => setFormData({...formData, nisn: val})} placeholder="Nomor Induk Siswa Nasional" />
                  <FormInput label="NIS Lokal" required value={formData.nis} onChange={val => setFormData({...formData, nis: val})} placeholder="Nomor Induk Siswa" />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Program Pendidikan</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-bold bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value as any})}>
                      <option>Paket A</option>
                      <option>Paket B</option>
                      <option>Paket C</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Kelas</label>
                    <select className="w-full px-5 py-4 rounded-2xl border border-slate-200 text-sm font-bold bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none" value={formData.kelas} onChange={e => setFormData({...formData, kelas: e.target.value})}>
                      {getClassOptions(formData.program).map((kls) => (
                        <option key={kls} value={kls}>{kls}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status Aktif</label>
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                      <button type="button" onClick={() => setFormData({...formData, status: 'Aktif'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.status === 'Aktif' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Aktif</button>
                      <button type="button" onClick={() => setFormData({...formData, status: 'Non-Aktif'})} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.status === 'Non-Aktif' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>Cuti</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Biodata Diri */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                   </div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Data Biografis & Kelahiran</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput label="Tempat Lahir" value={formData.tempatLahir} onChange={val => setFormData({...formData, tempatLahir: val})} placeholder="Kota Kelahiran" />
                  <FormInput label="Tanggal Lahir" type="date" value={formData.tanggalLahir} onChange={val => setFormData({...formData, tanggalLahir: val})} />
                </div>
              </div>

              {/* Section 3: Orang Tua */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>
                   </div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Informasi Orang Tua Kandung</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormInput label="Nama Ayah Kandung" value={formData.namaAyah} onChange={val => setFormData({...formData, namaAyah: val})} placeholder="Sesuai Akta Kelahiran" />
                  <FormInput label="Nama Ibu Kandung" value={formData.namaIbu} onChange={val => setFormData({...formData, namaIbu: val})} placeholder="Sesuai Akta Kelahiran" />
                </div>
              </div>

              {/* Section 4: Kontak & Alamat */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                   </div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Domisili & Kontak Person</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alamat Lengkap</label>
                    <textarea 
                       placeholder="Jalan, Blok, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                       className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm font-bold bg-white outline-none min-h-[120px] resize-none transition-all"
                       value={formData.alamat}
                       onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <FormInput label="Nomor HP / WhatsApp" value={formData.noTelepon} onChange={val => setFormData({...formData, noTelepon: val})} placeholder="08xxxxxxxxxx" />
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-relaxed">Penting</p>
                        <p className="text-[10px] text-amber-700/70 font-bold leading-tight mt-1">Pastikan nomor aktif untuk koordinasi pembelajaran mandiri.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Riwayat */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                      </svg>
                   </div>
                   <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Latar Belakang Pendidikan</h4>
                </div>
                <FormInput label="Asal Sekolah / Riwayat Terakhir" value={formData.riwayatPendidikan} onChange={val => setFormData({...formData, riwayatPendidikan: val})} placeholder="Contoh: SMP Negeri 1 Depok atau SDN 02 Pagi" />
              </div>

              <div className="flex gap-4 pt-10 sticky bottom-0 bg-white pb-4 border-t border-slate-50">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-5 bg-slate-100 rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-600/30 active:scale-[0.98]"
                >
                  Daftarkan Warga Belajar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detailed Student View Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="relative h-32 bg-gradient-to-r from-emerald-600 to-teal-700">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute right-6 top-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="px-8 pb-8">
              <div className="relative -mt-12 mb-6 flex items-end gap-6">
                <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl border border-slate-100">
                   <div className="w-full h-full rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-5xl font-bold border border-emerald-100">
                    {selectedStudent.nama.charAt(0)}
                  </div>
                </div>
                <div className="pb-2">
                  <h4 className="text-3xl font-bold text-slate-900 leading-tight">{selectedStudent.nama}</h4>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-100 uppercase">{selectedStudent.program}</span>
                    <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full text-[10px] font-bold border border-slate-100 uppercase">{selectedStudent.kelas}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <DataField label="NISN" value={selectedStudent.nisn} />
                  <DataField label="NIS Lokal" value={selectedStudent.nis} />
                  <DataField label="Kelahiran" value={`${selectedStudent.tempatLahir}, ${selectedStudent.tanggalLahir}`} />
                  <DataField label="Telepon" value={selectedStudent.noTelepon} />
                </div>
                <div className="space-y-6">
                  <DataField label="Ayah Kandung" value={selectedStudent.namaAyah} />
                  <DataField label="Ibu Kandung" value={selectedStudent.namaIbu} />
                  <DataField label="Status" value={selectedStudent.status} badge />
                  <DataField label="Riwayat" value={selectedStudent.riwayatPendidikan} />
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Lengkap</p>
                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                  "{selectedStudent.alamat || 'Alamat belum diisi'}"
                </p>
              </div>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20">Cetak Kartu Siswa</button>
                <button className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Edit Data</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

const FormInput = ({ label, required, value, onChange, placeholder, type = "text" }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
      {label} {required && <span className="text-red-400 text-sm">*</span>}
    </label>
    <input 
      required={required}
      type={type} 
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 text-sm font-bold bg-white outline-none transition-all placeholder:text-slate-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const DataField = ({ label, value, badge }: any) => (
  <div>
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    {badge ? (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
        value === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'
      }`}>{value}</span>
    ) : (
      <p className="text-sm font-bold text-slate-800">{value || '-'}</p>
    )}
  </div>
);

export default StudentManagement;
