
import React from 'react';
import { User } from '../types';

// Mock shared schedules data (as if coming from a database)
const globalSchedules = [
  { id: '1', hari: 'Senin', jam: '08:00 - 09:30', mapel: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', tutor: 'Ahmad S.Pd', ruang: 'Zoom Meeting / R. 101' },
  { id: '2', hari: 'Rabu', jam: '10:00 - 11:30', mapel: 'IPA Dasar', program: 'Paket B', kelas: 'Kelas 8', tutor: 'Siti M.Pd', ruang: 'R. 104' },
  { id: '3', hari: 'Kamis', jam: '08:00 - 09:30', mapel: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', tutor: 'Ahmad S.Pd', ruang: 'R. 101' },
  { id: '4', hari: 'Kamis', jam: '13:00 - 14:30', mapel: 'Matematika Lanjut', program: 'Paket C', kelas: 'Kelas 12', tutor: 'Ahmad S.Pd', ruang: 'R. 101' },
  { id: '5', hari: 'Jumat', jam: '09:00 - 10:30', mapel: 'Bahasa Indonesia', program: 'Paket C', kelas: 'Kelas 10', tutor: 'Siti M.Pd', ruang: 'R. 102' },
];

const DashboardSiswa: React.FC<{ user: User, onViewCalendar?: () => void }> = ({ user, onViewCalendar }) => {
  // Filter schedules to only show what's relevant for this specific student
  const mySchedules = globalSchedules.filter(
    s => s.kelas === user.kelas && s.program === user.program
  );

  // Group by Day for better display
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  
  const programColorMap: Record<string, string> = {
    'Paket A': 'blue',
    'Paket B': 'amber',
    'Paket C': 'emerald'
  };

  const pColor = programColorMap[user.program as string] || 'emerald';

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Hero Welcome Section */}
      <div className={`bg-gradient-to-r from-${pColor}-600 to-${pColor}-800 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
              {user.program} - {user.kelas || 'Kelas 10'}
            </span>
          </div>
          <h2 className="text-4xl font-black mb-2">Semangat Belajar, {user.name.split(' ')[0]}!</h2>
          <p className="text-white/80 font-medium max-w-md">
            Hari ini kamu memiliki <span className="text-white font-bold underline decoration-white/30">{mySchedules.filter(s => s.hari === 'Kamis').length} sesi</span> belajar. Pastikan koneksi internet stabil ya!
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-white text-emerald-900 px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 transition-transform">
              Materi Belajar
            </button>
            <button 
              onClick={onViewCalendar}
              className="bg-black/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-black/30 transition-all"
            >
              Presensi Cepat
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white/5 -skew-x-12 translate-x-24 pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mb-24 pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Schedule Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-${pColor}-50 text-${pColor}-600 flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                Jadwal Belajar Mingguan
              </h3>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                 <button className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-slate-800 shadow-sm">List View</button>
                 <button 
                  onClick={onViewCalendar}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                 >
                   Calendar
                 </button>
              </div>
            </div>

            <div className="space-y-8">
              {days.map(day => {
                const daySchedules = mySchedules.filter(s => s.hari === day);
                if (daySchedules.length === 0) return null;

                return (
                  <div key={day} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-black uppercase tracking-widest text-${pColor}-600 bg-${pColor}-50 px-3 py-1 rounded-full`}>
                        {day}
                      </span>
                      <div className="flex-1 h-px bg-slate-100"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {daySchedules.map((item) => (
                        <div key={item.id} className="group p-5 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-default">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.jam}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          </div>
                          <h4 className="font-black text-slate-800 group-hover:text-emerald-700 transition-colors mb-1">{item.mapel}</h4>
                          <div className="flex items-center gap-2 mb-4">
                             <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                             <p className="text-xs text-slate-500 font-medium">{item.tutor}</p>
                          </div>
                          <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between">
                             <div className="flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-slate-400">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <span className="text-[10px] font-bold text-slate-500">{item.ruang}</span>
                             </div>
                             {item.ruang.toLowerCase().includes('zoom') && (
                               <button className="text-[10px] font-black text-blue-600 hover:underline">Gabung Link</button>
                             )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Side Statistics & Updates */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
              </svg>
              Keaktifan Belajar
            </h3>
            <div className="flex justify-center mb-8">
               <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="402" strokeDashoffset="40" className="text-emerald-500 rounded-full" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-slate-800">90%</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Absensi</span>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 text-center">
                <p className="text-lg font-black text-emerald-600 leading-none">18</p>
                <p className="text-[10px] font-bold text-emerald-700/60 uppercase mt-1">Hadir</p>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 text-center">
                <p className="text-lg font-black text-amber-600 leading-none">2</p>
                <p className="text-[10px] font-bold text-amber-700/60 uppercase mt-1">Izin</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 text-center">
                <p className="text-lg font-black text-slate-400 leading-none">0</p>
                <p className="text-[10px] font-bold text-slate-500/60 uppercase mt-1">Alpa</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-800 mb-6">Tugas & Deadline</h3>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100/50 rounded-full translate-x-8 -translate-y-8"></div>
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Deadline: Besok</p>
                <p className="text-sm text-slate-800 font-black">Esai Bahasa Indonesia</p>
                <p className="text-xs text-slate-500 mt-2">Materi: Struktur Teks Narasi</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Deadline: 3 hari lagi</p>
                <p className="text-sm text-slate-800 font-black">Latihan Trigonometri</p>
                <p className="text-xs text-slate-500 mt-2">Materi: Segitiga Siku-siku</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;
