
import React from 'react';
import { User } from '../types';

const AdditionalTasks: React.FC<{ user: User }> = ({ user }) => {
  // Mocking the tasks that would normally come from the user profile (assigned by admin)
  const tasks = user.tugasTambahan || ['Penanggungjawab Titik Layanan Pancoran Mas', 'Wali Kelas 10'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Tugas Tambahan</h2>
        <p className="text-slate-500">Daftar amanah dan tanggung jawab tambahan Anda di PKBM At Taqwa Mandiri.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 group hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-4xl">
                  {task.toLowerCase().includes('wali') ? 'supervisor_account' : 'location_on'}
                </span>
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Amanah Aktif
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    ID: {idx + 101}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors">
                  {task}
                </h3>
                <p className="text-sm text-slate-500 font-medium max-w-xl">
                  {task.toLowerCase().includes('wali') 
                    ? 'Bertanggung jawab atas pembinaan karakter, administrasi nilai, dan komunikasi dengan orang tua warga belajar di kelas yang ditugaskan.'
                    : 'Mengkoordinir operasional harian, presensi fisik, dan distribusi modul pembelajaran di lokasi titik layanan yang ditunjuk.'}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all">
                  Lihat Detail
                </button>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all">
                  Laporan
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white py-20 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-10">
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
              <span className="material-symbols-outlined text-5xl">assignment_late</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Belum Ada Tugas Tambahan</h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Saat ini Anda belum memiliki tugas tambahan (Wali Kelas / Penanggungjawab). Hubungi Admin jika ada kekeliruan data.
            </p>
          </div>
        )}

        <div className="p-8 rounded-[2.5rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h4 className="text-lg font-black mb-2 italic">Catatan Penting:</h4>
            <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
              Seluruh penugasan tambahan bersifat amanah profesional untuk mendukung kesuksesan belajar di PKBM At Taqwa Mandiri. Silakan lakukan pelaporan berkala melalui menu "Laporan" pada masing-masing tugas.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-48 bg-white/5 skew-x-12 translate-x-12 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalTasks;
