
import React, { useState, useMemo } from 'react';
import { UserRole, Nilai, WargaBelajar } from '../types';
import { analyzeStudentPerformance } from '../services/geminiService';

// Mock Data Warga Belajar dengan Nilai Terintegrasi
const mockStudentGrades = [
  { id: '1', nama: 'Budi Santoso', program: 'Paket C', kelas: 'Kelas 10', rata2: 84.5, skk: 12, status: 'Lulus Sesi' },
  { id: '2', nama: 'Siti Aminah', program: 'Paket C', kelas: 'Kelas 10', rata2: 78.2, skk: 12, status: 'Lulus Sesi' },
  { id: '3', nama: 'Ahmad Faisal', program: 'Paket C', kelas: 'Kelas 11', rata2: 89.0, skk: 14, status: 'Lulus Sesi' },
  { id: '4', nama: 'Rina Wijaya', program: 'Paket B', kelas: 'Kelas 8', rata2: 72.5, skk: 10, status: 'Perbaikan' },
  { id: '5', nama: 'Andi Pratama', program: 'Paket A', kelas: 'Kelas 4', rata2: 91.2, skk: 8, status: 'Lulus Sesi' },
];

const GradingSystem: React.FC<{ role: UserRole }> = ({ role }) => {
  const [activeProgram, setActiveProgram] = useState<'Paket A' | 'Paket B' | 'Paket C'>('Paket C');
  const [selectedKelas, setSelectedKelas] = useState<string>('Semua Kelas');
  const [aiInsight, setAiInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const isAdmin = role === UserRole.ADMIN;
  const isStudent = role === UserRole.SISWA;

  // Mock data untuk logika kelayakan siswa (Contoh: Tidak Layak untuk demo jika attendance < 80 atau grade < 70)
  // Anda bisa mencoba mengubah angka di bawah ini untuk melihat perubahan UI
  const studentStats = {
    attendanceRate: 75, // Simulasi di bawah 80%
    averageGrade: 68,   // Simulasi di bawah 70
  };

  const isEligibleForExam = studentStats.attendanceRate >= 80 && studentStats.averageGrade >= 70;

  // Opsi Kelas dinamis berdasarkan Program
  const classOptions = useMemo(() => {
    switch (activeProgram) {
      case 'Paket A': return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
      case 'Paket B': return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
      case 'Paket C': return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
      default: return [];
    }
  }, [activeProgram]);

  // Filter Data untuk Admin
  const filteredData = useMemo(() => {
    return mockStudentGrades.filter(s => 
      s.program === activeProgram && 
      (selectedKelas === 'Semua Kelas' || s.kelas === selectedKelas)
    );
  }, [activeProgram, selectedKelas]);

  // Mock Detail Nilai (untuk drill-down)
  const mockDetailGrades: Partial<Nilai>[] = [
    { mapelNama: 'Matematika', kkm: 70, harian: 65, tugas: 60, uts: 68, uas: 70 },
    { mapelNama: 'Bahasa Indonesia', kkm: 75, harian: 70, tugas: 72, uts: 65, uas: 68 },
    { mapelNama: 'Bahasa Inggris', kkm: 70, harian: 62, tugas: 65, uts: 60, uas: 65 },
    { mapelNama: 'IPA Terpadu', kkm: 70, harian: 78, tugas: 75, uts: 72, uas: 74 },
  ];

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const subject = isAdmin ? `Kelas ${selectedKelas} (${activeProgram})` : "Budi Santoso";
    const result = await analyzeStudentPerformance(subject, isAdmin ? filteredData : mockDetailGrades);
    setAiInsight(result || 'Terjadi kesalahan.');
    setLoadingAi(false);
  };

  const programTheme = {
    'Paket A': 'blue',
    'Paket B': 'amber',
    'Paket C': 'emerald'
  }[activeProgram];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">E-Rapor & Manajemen Nilai</h2>
          <p className="text-slate-500">
            {isAdmin ? 'Pantau capaian akademik warga belajar per jenjang dan rombel.' : 'Pantau pencapaian belajar dan status kelayakan ujian Anda.'}
          </p>
        </div>
        
        {isAdmin && (
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-2xl font-bold text-xs hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-lg">download</span> Ekspor Legger
            </button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined text-lg">add_circle</span> Input Nilai Kolektif
            </button>
          </div>
        )}
      </div>

      {isStudent && (
        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm overflow-hidden relative group">
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className={`w-32 h-32 rounded-full border-8 flex flex-col items-center justify-center ${isEligibleForExam ? 'border-emerald-500 text-emerald-600' : 'border-rose-500 text-rose-600'} transition-all duration-700`}>
                    <span className="text-3xl font-black">{studentStats.attendanceRate}%</span>
                    <span className="text-[10px] font-black uppercase">Presensi</span>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm ${isEligibleForExam ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-rose-500 text-white border-rose-400'} animate-pulse`}>
                      {isEligibleForExam ? 'Layak Ikut UAS/UPK' : 'Belum Memenuhi Syarat'}
                    </span>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Status Kelayakan Ujian</h3>
                  </div>
                  
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Berdasarkan regulasi akademik PKBM At Taqwa Mandiri, Anda dinyatakan <span className={isEligibleForExam ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>{isEligibleForExam ? 'LAYAK' : 'TIDAK LAYAK'}</span> mengikuti Ujian Akhir Semester (UAS) dan Ujian Pendidikan Kesetaraan (UPK).
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className={`material-symbols-outlined ${studentStats.attendanceRate >= 80 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {studentStats.attendanceRate >= 80 ? 'check_circle' : 'cancel'}
                        </span>
                        <p className="text-xs font-bold text-slate-600">Presensi Minimal 80% (Aktual: {studentStats.attendanceRate}%)</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span className={`material-symbols-outlined ${studentStats.averageGrade >= 70 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {studentStats.averageGrade >= 70 ? 'check_circle' : 'cancel'}
                        </span>
                        <p className="text-xs font-bold text-slate-600">Rata-rata Nilai ≥ 70 (Aktual: {studentStats.averageGrade})</p>
                    </div>
                  </div>
                </div>
            </div>
            <div className={`absolute top-0 right-0 w-64 h-64 ${isEligibleForExam ? 'bg-emerald-500/5' : 'bg-rose-500/5'} rounded-full translate-x-32 -translate-y-32 blur-3xl`}></div>
          </div>

          {!isEligibleForExam && (
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 rounded-[2rem] p-8 shadow-sm animate-in slide-in-from-top-4 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl">emergency_home</span>
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-lg font-black text-rose-900">Tindak Lanjut Akademik (Wajib)</h4>
                  <p className="text-sm text-rose-800/70 font-medium leading-relaxed">
                    Anda belum memenuhi kriteria kelayakan ujian semester ini. Untuk memulihkan status kelayakan, Anda <strong>WAJIB</strong> mengikuti salah satu atau kedua program berikut sesuai instruksi Tutor:
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-rose-200">
                       <span className="material-symbols-outlined text-rose-600 text-sm">history_edu</span>
                       <span className="text-xs font-bold text-rose-900">Program Remedial</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-xl border border-rose-200">
                       <span className="material-symbols-outlined text-amber-600 text-sm">folder_managed</span>
                       <span className="text-xs font-bold text-amber-900">Tugas Portofolio</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                  <button className="w-full md:w-auto bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">contact_support</span>
                    Hubungi Tutor
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex bg-white p-1.5 rounded-[2rem] border border-slate-200 shadow-sm">
            {(['Paket A', 'Paket B', 'Paket C'] as const).map((prog) => (
              <button
                key={prog}
                onClick={() => {
                  setActiveProgram(prog);
                  setSelectedKelas('Semua Kelas');
                }}
                className={`px-8 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                  activeProgram === prog 
                    ? `bg-${programTheme}-600 text-white shadow-xl shadow-${programTheme}-500/20` 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {prog}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-[2rem] border border-slate-200 shadow-sm flex-1 md:flex-none">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Kelas:</span>
            <select 
              className="text-sm font-bold text-slate-700 bg-transparent outline-none cursor-pointer"
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
            >
              <option>Semua Kelas</option>
              {classOptions.map(kls => <option key={kls} value={kls}>{kls}</option>)}
            </select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className={`p-8 bg-${programTheme}-50/50 border-b border-${programTheme}-100 flex justify-between items-center`}>
              <h3 className="font-black text-slate-800">
                {isAdmin ? `Legger Nilai: ${activeProgram} - ${selectedKelas}` : 'Transkrip Nilai Semester Ganjil'}
              </h3>
              <div className="flex items-center gap-2">
                 <span className={`text-[10px] font-black text-${programTheme}-600 bg-${programTheme}-100 px-3 py-1 rounded-full border border-${programTheme}-200 uppercase tracking-widest`}>2024/2025</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase tracking-widest font-black border-b border-slate-50">
                    <th className="px-8 py-5">{isAdmin ? 'Warga Belajar' : 'Mata Pelajaran'}</th>
                    <th className="px-4 py-5 text-center">{isAdmin ? 'Kelas' : 'KKM'}</th>
                    <th className="px-4 py-5 text-center">{isAdmin ? 'SKK' : 'Rata2'}</th>
                    <th className="px-8 py-5 text-right">{isAdmin ? 'Nilai Rata2' : 'Nilai Akhir'}</th>
                    <th className="px-8 py-5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isAdmin ? (
                    filteredData.map((student) => (
                      <tr key={student.id} onClick={() => setSelectedStudentId(student.id)} className="hover:bg-slate-50/80 cursor-pointer transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-${programTheme}-100 text-${programTheme}-600 flex items-center justify-center font-black text-xs`}>
                              {student.nama.charAt(0)}
                            </div>
                            <span className="font-bold text-slate-800 group-hover:text-emerald-700">{student.nama}</span>
                          </div>
                        </td>
                        <td className="px-4 py-5 text-center font-bold text-slate-400">{student.kelas}</td>
                        <td className="px-4 py-5 text-center font-black text-slate-600">{student.skk}</td>
                        <td className="px-8 py-5 text-right font-black text-emerald-600 text-lg">{student.rata2.toFixed(1)}</td>
                        <td className="px-8 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            student.status === 'Lulus Sesi' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    mockDetailGrades.map((grade, idx) => {
                      const avg = (grade.harian! + grade.tugas! + grade.uts! + grade.uas!) / 4;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="px-8 py-5 font-bold text-slate-800">{grade.mapelNama}</td>
                          <td className="px-4 py-5 text-center font-bold text-slate-400">{grade.kkm}</td>
                          <td className="px-4 py-5 text-center font-black text-slate-600">{avg.toFixed(1)}</td>
                          <td className="px-8 py-5 text-right font-black text-emerald-600 text-lg">{avg.toFixed(1)}</td>
                          <td className="px-8 py-5 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase ${avg >= grade.kkm! ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                              {avg >= grade.kkm! ? 'Tuntas' : 'Perbaikan'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {!isStudent && (
            <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined text-3xl">psychology</span>
                  </div>
                  <div>
                    <h3 className="font-black text-lg">AI Performa {isAdmin ? 'Kelas' : 'Siswa'}</h3>
                    <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-widest">Generative Intelligence</p>
                  </div>
                </div>
                
                {aiInsight ? (
                  <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-xs leading-relaxed mb-8 italic text-emerald-50/80 animate-in fade-in zoom-in-95 duration-500">
                    {aiInsight}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs mb-10 leading-relaxed">
                    {isAdmin 
                      ? `Analisis rata-rata nilai kelas ${selectedKelas} untuk mendapatkan rekomendasi peningkatan strategi pembelajaran bagi tutor.`
                      : 'Gunakan AI untuk menganalisis detail capaian kompetensi siswa berdasarkan nilai materi spesifik dan pembandingan terhadap KKM.'}
                  </p>
                )}

                <button 
                  onClick={handleAiAnalysis}
                  disabled={loadingAi}
                  className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loadingAi ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Menganalisis...</>
                  ) : (
                    <><span className="material-symbols-outlined">auto_awesome</span> Jalankan Analisis AI</>
                  )}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
            </div>
          )}

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Kriteria Kelulusan</h4>
             <div className="space-y-5">
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-500">Min. Kehadiran</span>
                  <span className={`text-sm font-black ${studentStats.attendanceRate < 80 ? 'text-rose-600' : 'text-slate-800'}`}>80%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                  <span className="text-xs font-bold text-slate-500">Min. Rata-rata Nilai</span>
                  <span className={`text-sm font-black ${studentStats.averageGrade < 70 ? 'text-rose-600' : 'text-slate-800'}`}>70</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">Tuntas Semua Mapel</span>
                  <span className={`material-symbols-outlined ${isEligibleForExam ? 'text-emerald-500' : 'text-slate-300'}`}>check_circle</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingSystem;
