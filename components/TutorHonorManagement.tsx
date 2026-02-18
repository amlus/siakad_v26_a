
import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../types';

interface TutorHonorBreakdown {
  id: string;
  nama: string;
  sessions: {
    tatapMuka: number;
    tutorial: number;
    mandiri: number;
  };
  tugasTambahan: string[];
}

const HONOR_RATES = {
  TATAP_MUKA: 50000,
  TUTORIAL: 15000,
  MANDIRI: 10000
};

const ADDITIONAL_TASK_RATES: Record<string, number> = {
  'Wali Kelas': 25000,
  'Penanggungjawab Titik Layanan': 35000
};

const mockHonorData: TutorHonorBreakdown[] = [
  { 
    id: '1', 
    nama: 'Admin Utama', // Changed to match mock user names for testing
    sessions: { tatapMuka: 12, tutorial: 8, mandiri: 4 },
    tugasTambahan: ['Wali Kelas', 'Penanggungjawab Titik Layanan']
  },
  { 
    id: '2', 
    nama: 'Tutor Ahmad', 
    sessions: { tatapMuka: 8, tutorial: 12, mandiri: 6 },
    tugasTambahan: ['Wali Kelas']
  },
  { 
    id: '3', 
    nama: 'Budi Santoso S.Ag', 
    sessions: { tatapMuka: 4, tutorial: 4, mandiri: 10 },
    tugasTambahan: []
  },
  { 
    id: '4', 
    nama: 'Lina Wati M.Pd', 
    sessions: { tatapMuka: 10, tutorial: 0, mandiri: 2 },
    tugasTambahan: ['Penanggungjawab Titik Layanan']
  },
];

const TutorHonorManagement: React.FC<{ user: User }> = ({ user }) => {
  const [honorList] = useState<TutorHonorBreakdown[]>(mockHonorData);
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = user.role === UserRole.ADMIN;

  const filteredHonors = useMemo(() => {
    let list = honorList;
    
    // If not admin, only show own honorarium
    if (!isAdmin) {
      list = honorList.filter(h => h.nama === user.name);
    } else {
      // If admin, apply search filter
      list = honorList.filter(h => h.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    return list;
  }, [honorList, searchTerm, isAdmin, user.name]);

  const calculateSessionTotal = (sessions: TutorHonorBreakdown['sessions']) => {
    return (sessions.tatapMuka * HONOR_RATES.TATAP_MUKA) + 
           (sessions.tutorial * HONOR_RATES.TUTORIAL) + 
           (sessions.mandiri * HONOR_RATES.MANDIRI);
  };

  const calculateTaskTotal = (tasks: string[]) => {
    return tasks.reduce((sum, task) => {
      const matchingKey = Object.keys(ADDITIONAL_TASK_RATES).find(key => task.includes(key));
      return sum + (matchingKey ? ADDITIONAL_TASK_RATES[matchingKey] : 0);
    }, 0);
  };

  const calculateGrandTotalPerTutor = (h: TutorHonorBreakdown) => {
    return calculateSessionTotal(h.sessions) + calculateTaskTotal(h.tugasTambahan);
  };

  const totals = useMemo(() => {
    return filteredHonors.reduce((acc, h) => ({
      sessions: acc.sessions + calculateSessionTotal(h.sessions),
      tasks: acc.tasks + calculateTaskTotal(h.tugasTambahan),
      grand: acc.grand + calculateGrandTotalPerTutor(h)
    }), { sessions: 0, tasks: 0, grand: 0 });
  }, [filteredHonors]);

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isAdmin ? 'Honorarium Tutor' : 'Slip Honorarium Saya'}
          </h2>
          <p className="text-slate-500">
            {isAdmin 
              ? 'Analisis pendapatan tutor berdasarkan beban mengajar dan tugas tambahan.' 
              : 'Ringkasan estimasi honorarium yang akan diterima periode berjalan.'}
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined text-sm">download</span>
              Ekspor PDF
            </button>
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">payments</span>
              Proses Pembayaran
            </button>
          </div>
        )}
        {!isAdmin && (
           <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
             <span className="material-symbols-outlined text-sm">print</span>
             Cetak Slip Gaji
           </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
             {isAdmin ? 'Total Honor Seluruh Tutor' : 'Total Estimasi Honor Saya'}
           </p>
           <h4 className="text-3xl font-black text-slate-800">{formatIDR(totals.grand)}</h4>
           <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">Periode: Oktober 2024</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 shadow-sm flex flex-col justify-between">
           <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-widest mb-1">Honor Sesi KBM</p>
           <h4 className="text-2xl font-black text-emerald-700">{formatIDR(totals.sessions)}</h4>
           <p className="text-[10px] text-emerald-600/50 mt-2 font-bold uppercase">Tatap Muka, Tutorial, Mandiri</p>
        </div>
        <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 shadow-sm flex flex-col justify-between">
           <p className="text-[10px] font-black text-indigo-600/60 uppercase tracking-widest mb-1">Honor Tugas Tambahan</p>
           <h4 className="text-2xl font-black text-indigo-700">{formatIDR(totals.tasks)}</h4>
           <p className="text-[10px] text-indigo-600/50 mt-2 font-bold uppercase">Tunjangan Amanah Khusus</p>
        </div>
      </div>

      {/* Detail Rates Section */}
      <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Parameter Perhitungan Honor</h3>
        <div className="flex flex-wrap gap-8">
           <div className="space-y-1">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tatap Muka</p>
             <p className="text-sm font-black text-slate-700">{formatIDR(HONOR_RATES.TATAP_MUKA)} <span className="text-[10px] font-medium text-slate-400">/ Sesi</span></p>
           </div>
           <div className="space-y-1">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Tutorial</p>
             <p className="text-sm font-black text-slate-700">{formatIDR(HONOR_RATES.TUTORIAL)} <span className="text-[10px] font-medium text-slate-400">/ Sesi</span></p>
           </div>
           <div className="space-y-1">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Mandiri</p>
             <p className="text-sm font-black text-slate-700">{formatIDR(HONOR_RATES.MANDIRI)} <span className="text-[10px] font-medium text-slate-400">/ Sesi</span></p>
           </div>
           <div className="w-px h-8 bg-slate-200"></div>
           <div className="space-y-1">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Wali Kelas</p>
             <p className="text-sm font-black text-indigo-600">{formatIDR(ADDITIONAL_TASK_RATES['Wali Kelas'])} <span className="text-[10px] font-medium text-slate-400">/ Bulan</span></p>
           </div>
           <div className="space-y-1">
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">PJ Titik Layanan</p>
             <p className="text-sm font-black text-indigo-600">{formatIDR(ADDITIONAL_TASK_RATES['Penanggungjawab Titik Layanan'])} <span className="text-[10px] font-medium text-slate-400">/ Bulan</span></p>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        {isAdmin && (
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                type="text" 
                placeholder="Cari tutor..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs font-bold border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tahun Ajaran: 2024/2025</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Nama Tutor</th>
                <th className="px-4 py-4 text-center">Sesi KBM</th>
                <th className="px-4 py-4 text-center">Tugas Tambahan</th>
                <th className="px-8 py-4 text-right">Honor KBM</th>
                <th className="px-8 py-4 text-right">Honor Tugas</th>
                <th className="px-8 py-4 text-right">Grand Total</th>
                {isAdmin && <th className="px-4 py-4 text-center">Detail</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHonors.map(h => {
                const sessionTotal = calculateSessionTotal(h.sessions);
                const taskTotal = calculateTaskTotal(h.tugasTambahan);
                const grandTotal = sessionTotal + taskTotal;
                return (
                  <tr key={h.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center font-black text-xs border border-slate-200 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500 transition-all">
                          {h.nama.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{h.nama}</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Tutor Utama</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-bold text-slate-700">{h.sessions.tatapMuka + h.sessions.tutorial + h.sessions.mandiri} Sesi</span>
                        <span className="text-[9px] text-slate-400 font-medium">({h.sessions.tatapMuka}T | {h.sessions.tutorial}Tr | {h.sessions.mandiri}M)</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex flex-col items-center gap-1">
                         {h.tugasTambahan.length > 0 ? h.tugasTambahan.map((t, idx) => (
                           <span key={idx} className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 whitespace-nowrap">
                             {t}
                           </span>
                         )) : <span className="text-[9px] text-slate-300 font-bold uppercase italic">-</span>}
                       </div>
                    </td>
                    <td className="px-8 py-4 text-right font-bold text-slate-600 text-xs">
                      {formatIDR(sessionTotal)}
                    </td>
                    <td className="px-8 py-4 text-right font-bold text-indigo-600 text-xs">
                      {formatIDR(taskTotal)}
                    </td>
                    <td className="px-8 py-4 text-right font-black text-emerald-600 text-base">
                      {formatIDR(grandTotal)}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-4 text-center">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-emerald-600 transition-colors">
                          <span className="material-symbols-outlined text-lg">receipt_long</span>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
              {filteredHonors.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center opacity-40">
                    <p className="text-sm font-medium italic">Data honorarium tidak ditemukan.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">info</span>
                  </div>
                  <h3 className="text-2xl font-black">Catatan Transparansi</h3>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed">
                 {isAdmin 
                   ? 'Sistem ini menghitung honorarium secara otomatis berdasarkan data master Jadwal KBM dan penugasan Tugas Tambahan yang diverifikasi oleh Admin.' 
                   : 'Honorarium dihitung berdasarkan laporan kehadiran mengajar dan tugas tambahan aktif. Jika terdapat ketidaksesuaian data, silakan hubungi bagian Administrasi/Bendahara PKBM.'}
               </p>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] min-w-[300px] text-center backdrop-blur-md">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Grand Total {isAdmin ? 'Pengeluaran' : 'Pendapatan'}</p>
               <h4 className="text-4xl font-black text-emerald-500 mb-1">{formatIDR(totals.grand)}</h4>
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Periode Aktif</p>
            </div>
         </div>
         <div className="absolute right-0 top-0 bottom-0 w-64 bg-emerald-500/5 blur-3xl rounded-full"></div>
      </div>
    </div>
  );
};

export default TutorHonorManagement;
