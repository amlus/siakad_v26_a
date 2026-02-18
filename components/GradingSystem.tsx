
import React, { useState, useMemo } from 'react';
import { UserRole } from '../types';
import { analyzeStudentPerformance } from '../services/geminiService';

const GradingSystem: React.FC<{ role: UserRole }> = ({ role }) => {
  const [aiInsight, setAiInsight] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  const mockGrades = [
    { mapel: 'Matematika', harian: 85, tugas: 80, uts: 78, uas: 88 },
    { mapel: 'Bahasa Indonesia', harian: 90, tugas: 88, uts: 85, uas: 92 },
    { mapel: 'Pendidikan Agama', harian: 95, tugas: 94, uts: 92, uas: 95 },
    { mapel: 'IPA', harian: 65, tugas: 70, uts: 60, uas: 0 }, 
  ];

  // Mock Attendance Data for the student
  const attendanceRate = 85; // 85% attendance

  const isStudent = role === UserRole.SISWA;

  // Calculate Average for Eligibility (Harian + Tugas + UTS) and check Attendance
  const eligibilityData = useMemo(() => {
    const totals = mockGrades.reduce((acc, curr) => {
      const avgSubject = (curr.harian + curr.tugas + curr.uts) / 3;
      return acc + avgSubject;
    }, 0);
    const cumulativeAvg = totals / mockGrades.length;
    
    const scoreEligible = cumulativeAvg >= 70;
    const attendanceEligible = attendanceRate >= 80;
    const isEligible = scoreEligible && attendanceEligible;

    return { cumulativeAvg, attendanceRate, isEligible, scoreEligible, attendanceEligible };
  }, [mockGrades, attendanceRate]);

  const handleAiAnalysis = async () => {
    setLoadingAi(true);
    const result = await analyzeStudentPerformance("Budi Santoso", mockGrades);
    setAiInsight(result || 'Terjadi kesalahan saat menghubungi AI.');
    setLoadingAi(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">E-Rapor & Penilaian</h2>
          <p className="text-slate-500">
            {isStudent 
              ? 'Ringkasan hasil belajar dan status kelulusan mata pelajaran.' 
              : 'Manajemen nilai kurikulum Merdeka dan rekapitulasi otomatis.'}
          </p>
        </div>
        {!isStudent && (
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Input Nilai Masal
          </button>
        )}
      </div>

      {isStudent && (
        <div className={`p-8 rounded-[2.5rem] border-2 flex flex-col md:flex-row items-center gap-8 transition-all ${
          eligibilityData.isEligible 
            ? 'bg-emerald-50 border-emerald-100 shadow-sm' 
            : 'bg-red-50 border-red-100 shadow-sm'
        }`}>
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-xl ${
            eligibilityData.isEligible ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {eligibilityData.isEligible ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            )}
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className={`text-2xl font-black ${eligibilityData.isEligible ? 'text-emerald-900' : 'text-red-900'}`}>
              Kelayakan UAS: {eligibilityData.isEligible ? 'LAYAK' : 'BELUM LAYAK'}
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className={`flex items-center gap-2 text-sm font-bold ${eligibilityData.scoreEligible ? 'text-emerald-700' : 'text-red-700'}`}>
                <div className={`w-2 h-2 rounded-full ${eligibilityData.scoreEligible ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                Rata-rata: {eligibilityData.cumulativeAvg.toFixed(1)} / 70.0
              </div>
              <div className={`flex items-center gap-2 text-sm font-bold ${eligibilityData.attendanceEligible ? 'text-emerald-700' : 'text-red-700'}`}>
                <div className={`w-2 h-2 rounded-full ${eligibilityData.attendanceEligible ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                Kehadiran: {eligibilityData.attendanceRate}% / 80%
              </div>
            </div>
            <p className={`text-xs font-medium italic mt-2 ${eligibilityData.isEligible ? 'text-emerald-600/70' : 'text-red-600/70'}`}>
              Syarat UAS: Nilai Rata-rata &ge; 70.0 DAN Kehadiran Minimal 80%.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Grade Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">
                {isStudent ? 'Data Nilai Per Mata Pelajaran' : 'Daftar Nilai: Budi Santoso (Paket C)'}
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-slate-200">
                Semester Ganjil 2024
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] text-slate-400 uppercase tracking-widest font-bold border-b border-slate-100">
                    <th className="px-6 py-4">Mata Pelajaran</th>
                    <th className="px-4 py-4 text-center">Harian</th>
                    <th className="px-4 py-4 text-center">Tugas</th>
                    <th className="px-4 py-4 text-center">UTS</th>
                    <th className="px-4 py-4 text-center bg-slate-50/50">Rata-rata</th>
                    <th className="px-4 py-4 text-center">UAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockGrades.map((grade, idx) => {
                    const preUasAvg = (grade.harian + grade.tugas + grade.uts) / 3;
                    return (
                      <tr key={idx} className="text-sm hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-slate-800">{grade.mapel}</td>
                        <td className="px-4 py-4 text-center text-slate-600">{grade.harian}</td>
                        <td className="px-4 py-4 text-center text-slate-600">{grade.tugas}</td>
                        <td className="px-4 py-4 text-center text-slate-600">{grade.uts}</td>
                        <td className={`px-4 py-4 text-center font-bold bg-slate-50/30 ${preUasAvg >= 70 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {preUasAvg.toFixed(1)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {grade.uas > 0 ? (
                            <span className="font-bold text-slate-800">{grade.uas}</span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-300 italic">Belum Ujian</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Unduh Draft Rapor (PDF)
            </button>
            {!isStudent && (
              <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-500/20 transition-all">
                Publikasikan ke Siswa
              </button>
            )}
          </div>
        </div>

        {/* Right: AI Analysis & Insights */}
        <div className="space-y-6">
          {(role === UserRole.TUTOR || role === UserRole.ADMIN) && (
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2rem] text-white shadow-xl animate-in fade-in slide-in-from-right-4 duration-500 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-200">
                    <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 9 4.5ZM19.321 12.456a.75.75 0 0 1 .134 1.054l-1.342 1.678a1.5 1.5 0 0 1-1.171.562H15.75a.75.75 0 0 1 0-1.5h1.192l.608-.76a.75.75 0 0 1 1.054-.134l.717.56Zm-1.258-3.956a.75.75 0 0 1 1.054.134l1.342 1.678a1.5 1.5 0 0 1 .134 1.732l-.717.896a.75.75 0 0 1-1.188-.916l.487-.608h-2.175a.75.75 0 0 1 0-1.5h2.463l-.608-.76a.75.75 0 0 1 .134-1.054l1.074.848Z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-bold text-lg">AI Performance Insight</h3>
                </div>
                <p className="text-indigo-100 text-xs mb-6 leading-relaxed opacity-80">
                  Analisis mendalam pola belajar dan prediksi capaian kompetensi otomatis.
                </p>
                {aiInsight ? (
                  <div className="bg-white/10 p-4 rounded-2xl text-xs mb-4 backdrop-blur-md border border-white/20 leading-relaxed">
                    {aiInsight}
                  </div>
                ) : null}
                <button 
                  onClick={handleAiAnalysis}
                  disabled={loadingAi}
                  className="w-full py-3.5 bg-white text-indigo-700 rounded-2xl font-bold hover:bg-slate-50 transition-all disabled:opacity-50 shadow-lg"
                >
                  {loadingAi ? 'Menganalisis...' : 'Hasilkan Analisis AI'}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
            </div>
          )}

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
              {isStudent ? 'Statistik Anda' : 'Statistik Kelas'}
            </h4>
            <div className="space-y-5">
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                <span className="text-slate-500 font-medium">Kehadiran</span>
                <span className={`font-bold ${eligibilityData.attendanceEligible ? 'text-emerald-600' : 'text-red-500'}`}>
                  {eligibilityData.attendanceRate}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-3">
                <span className="text-slate-500 font-medium">Rata-rata Akumulatif</span>
                <span className={`font-bold ${eligibilityData.scoreEligible ? 'text-emerald-600' : 'text-red-500'}`}>
                  {eligibilityData.cumulativeAvg.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Predikat</span>
                <span className="font-bold text-slate-800">Sangat Baik (A)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingSystem;
