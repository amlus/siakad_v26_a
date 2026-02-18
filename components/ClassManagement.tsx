
import React, { useState, useMemo } from 'react';
import { WargaBelajar } from '../types';

const initialStudents: WargaBelajar[] = [
  { 
    id: '1', nama: 'Budi Santoso', nisn: '009887711', nis: '2024001', program: 'Paket C', kelas: 'Kelas 10', status: 'Aktif',
    riwayatPendidikan: 'SMP N 1 Depok', tempatLahir: 'Depok', tanggalLahir: '2008-05-12', namaAyah: 'Supardi',
    namaIbu: 'Siti Rohmah', alamat: 'Jl. Melati No. 45, Pancoran Mas, Depok', noTelepon: '081234567890'
  },
  { 
    id: '2', nama: 'Siti Aminah', nisn: '008776622', nis: '2024002', program: 'Paket B', kelas: 'Kelas 8', status: 'Aktif',
    riwayatPendidikan: 'SD IT Al Hikmah', tempatLahir: 'Jakarta', tanggalLahir: '2010-02-20', namaAyah: 'Zulkifli',
    namaIbu: 'Aminah', alamat: 'Perum Gema Pesona Block C2, Depok', noTelepon: '085678901234'
  },
  { 
    id: '3', nama: 'Ahmad Faisal', nisn: '007775533', nis: '2024003', program: 'Paket C', kelas: 'Kelas 10', status: 'Aktif',
    riwayatPendidikan: 'SMP Harapan Bangsa', tempatLahir: 'Bogor', tanggalLahir: '2008-11-02', namaAyah: 'Hadi',
    namaIbu: 'Murni', alamat: 'Cibinong, Bogor', noTelepon: '081398765432'
  },
  { 
    id: '4', nama: 'Dewi Lestari', nisn: '006664444', nis: '2024004', program: 'Paket A', kelas: 'Kelas 6', status: 'Aktif',
    riwayatPendidikan: '-', tempatLahir: 'Depok', tanggalLahir: '2012-04-15', namaAyah: 'Rahmat',
    namaIbu: 'Lia', alamat: 'Beji, Depok', noTelepon: '081299990000'
  },
  { 
    id: '5', nama: 'Andi Pratama', nisn: '005553322', nis: '2024005', program: 'Paket A', kelas: 'Kelas 1', status: 'Aktif',
    riwayatPendidikan: '-', tempatLahir: 'Depok', tanggalLahir: '2017-08-10', namaAyah: 'Iwan',
    namaIbu: 'Santi', alamat: 'Sawangan, Depok', noTelepon: '081211112222'
  },
  { 
    id: '6', nama: 'Rina Wijaya', nisn: '004442211', nis: '2024006', program: 'Paket A', kelas: 'Kelas 4', status: 'Aktif',
    riwayatPendidikan: '-', tempatLahir: 'Jakarta', tanggalLahir: '2014-11-25', namaAyah: 'Doni',
    namaIbu: 'Yulia', alamat: 'Cinere, Depok', noTelepon: '081344445555'
  },
  // Unassigned pool students for demo
  { 
    id: '7', nama: 'Eko Wahyudi', nisn: '003331100', nis: '2024007', program: 'Paket C', kelas: '', status: 'Aktif',
    riwayatPendidikan: '-', tempatLahir: 'Depok', tanggalLahir: '2008-01-01', namaAyah: 'A',
    namaIbu: 'B', alamat: 'Depok', noTelepon: '08111222333'
  },
  { 
    id: '8', nama: 'Lilis Suryani', nisn: '002221199', nis: '2024008', program: 'Paket B', kelas: '', status: 'Aktif',
    riwayatPendidikan: '-', tempatLahir: 'Depok', tanggalLahir: '2010-05-05', namaAyah: 'C',
    namaIbu: 'D', alamat: 'Depok', noTelepon: '08111222444'
  }
];

const gradeLevels = [
  { id: 'Kelas 1', name: 'Kelas 1', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 2', name: 'Kelas 2', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 3', name: 'Kelas 3', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 4', name: 'Kelas 4', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 5', name: 'Kelas 5', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 6', name: 'Kelas 6', program: 'Paket A', desc: 'Kesetaraan SD' },
  { id: 'Kelas 7', name: 'Kelas 7', program: 'Paket B', desc: 'Kesetaraan SMP' },
  { id: 'Kelas 8', name: 'Kelas 8', program: 'Paket B', desc: 'Kesetaraan SMP' },
  { id: 'Kelas 9', name: 'Kelas 9', program: 'Paket B', desc: 'Kesetaraan SMP' },
  { id: 'Kelas 10', name: 'Kelas 10', program: 'Paket C', desc: 'Kesetaraan SMA' },
  { id: 'Kelas 11', name: 'Kelas 11', program: 'Paket C', desc: 'Kesetaraan SMA' },
  { id: 'Kelas 12', name: 'Kelas 12', program: 'Paket C', desc: 'Kesetaraan SMA' },
];

const programStyles: Record<string, any> = {
  'Paket A': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', iconBg: 'bg-blue-600' },
  'Paket B': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', iconBg: 'bg-amber-500' },
  'Paket C': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-600' }
};

const ClassManagement: React.FC = () => {
  const [students, setStudents] = useState<WargaBelajar[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState('');

  const getStudentCount = (kelasId: string) => {
    return students.filter(s => s.kelas === kelasId).length;
  };

  const filteredStudents = useMemo(() => {
    return selectedClass 
      ? students.filter(s => s.kelas === selectedClass)
      : [];
  }, [students, selectedClass]);

  const unassignedStudents = useMemo(() => {
    if (!selectedClass) return [];
    const currentClassInfo = gradeLevels.find(g => g.id === selectedClass);
    return students.filter(s => 
      s.kelas !== selectedClass && 
      (s.program === currentClassInfo?.program) &&
      s.nama.toLowerCase().includes(memberSearch.toLowerCase())
    );
  }, [students, selectedClass, memberSearch]);

  const handleAddMember = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, kelas: selectedClass! } : s));
  };

  const handleRemoveMember = (studentId: string) => {
    if(confirm('Keluarkan siswa dari kelas ini?')) {
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, kelas: '' } : s));
    }
  };

  const currentClassInfo = gradeLevels.find(g => g.id === selectedClass);
  const currentStyles = currentClassInfo ? programStyles[currentClassInfo.program] : programStyles['Paket C'];

  if (selectedClass) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedClass(null)}
              className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Daftar Anggota: {selectedClass}</h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                 <span className={`${currentStyles.bg} ${currentStyles.text} px-2 py-0.5 rounded font-bold text-[10px] border ${currentStyles.border} uppercase tracking-tighter`}>
                  {currentClassInfo?.program}
                 </span>
                 <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                 <span>{filteredStudents.length} Siswa Terdaftar</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsAddMemberModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 font-bold text-sm"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Tambah Anggota
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Nama Lengkap</th>
                  <th className="px-6 py-4">NISN / NIS</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg ${currentStyles.bg} ${currentStyles.text} flex items-center justify-center font-bold text-xs border ${currentStyles.border}`}>
                            {student.nama.charAt(0)}
                          </div>
                          <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{student.nama}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <p className="font-bold text-slate-600">{student.nisn}</p>
                        <p className="text-slate-400">{student.nis}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`${currentStyles.bg} ${currentStyles.text} px-2.5 py-1 rounded-full text-[10px] font-bold border ${currentStyles.border}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleRemoveMember(student.id)}
                            className="p-2 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-lg transition-colors"
                            title="Keluarkan dari Kelas"
                          >
                            <span className="material-symbols-outlined text-lg">person_remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-20 text-center opacity-40">
                      <p className="text-sm font-medium italic">Belum ada anggota kelas.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Tambah Anggota */}
        {isAddMemberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
              <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-black text-slate-800">Tambah Anggota Kelas</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{selectedClass} • {currentClassInfo?.program}</p>
                </div>
                <button onClick={() => setIsAddMemberModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="p-6 border-b border-slate-50">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input 
                    type="text" 
                    placeholder="Cari siswa..." 
                    className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 max-h-[400px]">
                <div className="space-y-3">
                  {unassignedStudents.length > 0 ? unassignedStudents.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-black">
                          {student.nama.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{student.nama}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {student.kelas ? `Saat ini: ${student.kelas}` : 'Belum Ada Kelas'}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleAddMember(student.id)}
                        className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                      >
                        Tambahkan
                      </button>
                    </div>
                  )) : (
                    <p className="text-center py-10 text-slate-400 text-sm italic">Tidak ada siswa yang tersedia.</p>
                  )}
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 flex justify-end">
                <button 
                  onClick={() => setIsAddMemberModalOpen(false)}
                  className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Kelas & Anggota</h2>
          <p className="text-slate-500">Kelola distribusi warga belajar ke dalam rombongan belajar (rombel).</p>
        </div>
      </div>

      <div className="space-y-16">
        {['Paket A', 'Paket B', 'Paket C'].map((programName) => {
          const styles = programStyles[programName];
          return (
            <div key={programName} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-1.5 rounded-2xl ${styles.bg} ${styles.text} border ${styles.border} flex items-center gap-2 shadow-sm`}>
                   <div className={`w-2 h-2 rounded-full ${styles.iconBg}`}></div>
                   <h3 className="text-sm font-black uppercase tracking-[0.2em]">{programName}</h3>
                </div>
                <div className={`flex-1 h-px ${styles.bg}`}></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {gradeLevels
                  .filter(grade => grade.program === programName)
                  .map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedClass(grade.id)}
                    className={`bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-300 hover:-translate-y-1.5 transition-all text-left group overflow-hidden relative`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${styles.bg} opacity-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-125 transition-transform duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-2xl ${styles.iconBg} text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                        </svg>
                      </div>
                      
                      <h3 className={`text-xl font-bold text-slate-800 mb-1 group-hover:${styles.text} transition-colors`}>{grade.name}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{grade.desc}</p>
                      
                      <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-2">
                        <div className="flex flex-col">
                          <span className="text-3xl font-black text-slate-800 leading-tight">{getStudentCount(grade.id)}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Anggota Kelas</span>
                        </div>
                        <div className={`p-2.5 rounded-full bg-slate-50 group-hover:${styles.iconBg} group-hover:text-white transition-all duration-300`}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassManagement;
