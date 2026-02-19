
import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types';

interface WargaRecap {
  id: string;
  name: string;
  kelas: string;
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  percentage: number;
  signature?: string; // Menampung base64 mock tanda tangan
}

const AttendanceSystem: React.FC<{ role: UserRole, userId: string }> = ({ role, userId }) => {
  const [selectedMapel, setSelectedMapel] = useState('Matematika');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [activeRecapTab, setActiveRecapTab] = useState<'warga' | 'tutor'>('warga');
  const [isTutorSigned, setIsTutorSigned] = useState(false);
  const [viewingSignature, setViewingSignature] = useState<string | null>(null);
  
  // Signature States
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Mock Signature Data (Placeholder base64 signatures)
  const mockSignature = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAxMDAgNDAiPjxwYXRoIGQ9Ik0xMCAzMCBDIDIwIDEwLCA0MCAxMCwgNTAgMzAgQyA2MCA1MCwgODAgNTAsIDkwIDMwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwZjE3MmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+";

  const mockWargaRecap: WargaRecap[] = [
    { id: '1', name: 'Budi Santoso', kelas: 'Kelas 10', hadir: 18, izin: 2, sakit: 1, alpa: 0, percentage: 85, signature: mockSignature },
    { id: '2', name: 'Siti Aminah', kelas: 'Kelas 8', hadir: 20, izin: 0, sakit: 1, alpa: 0, percentage: 95, signature: mockSignature },
    { id: '3', name: 'Asep Saepul', kelas: 'Kelas 12', hadir: 15, izin: 4, sakit: 0, alpa: 2, percentage: 71, signature: mockSignature },
    { id: '4', name: 'Dewi Lestari', kelas: 'Kelas 6', hadir: 21, izin: 0, sakit: 0, alpa: 0, percentage: 100, signature: mockSignature },
  ];

  const mockTutorRecap = [
    { id: '1', name: 'Ahmad S.Pd', mapel: 'Matematika', hadir: 12, izin: 0, percentage: 100 },
    { id: '2', name: 'Siti M.Pd', mapel: 'B. Indonesia', hadir: 10, izin: 2, percentage: 83 },
    { id: '3', name: 'Budi Santoso S.Ag', mapel: 'Agama', hadir: 11, izin: 1, percentage: 91 },
  ];

  const students = [
    { id: '1', name: 'Budi Santoso', status: 'Hadir' },
    { id: '2', name: 'Siti Aminah', status: 'Hadir' },
    { id: '3', name: 'Asep Saepul', status: 'Izin' },
    { id: '4', name: 'Dewi Lestari', status: 'Hadir' },
  ];

  const isAdmin = role === UserRole.ADMIN;
  const isTutor = role === UserRole.TUTOR;

  // Signature Logic
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsEmpty(false);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveSignature = () => {
    if (isEmpty) return alert("Silakan berikan tanda tangan terlebih dahulu.");
    setHasCheckedIn(true);
    if (isTutor) setIsTutorSigned(true);
  };

  if (isAdmin) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 print:m-0 print:p-0 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Rekapitulasi Kehadiran</h2>
            <p className="text-slate-500">Laporan kehadiran seluruh warga belajar dan tenaga pendidik.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg font-bold text-sm"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            Cetak Rekapitulasi
          </button>
        </div>

        <div className="hidden print:block text-center border-b-2 border-slate-900 pb-6 mb-8">
          <h1 className="text-2xl font-black uppercase">PKBM At Taqwa Mandiri</h1>
          <p className="text-sm font-bold">LAPORAN REKAPITULASI KEHADIRAN PERIODIK</p>
          <p className="text-xs italic mt-1">Tahun Ajaran 2024/2025 - Semester Ganjil</p>
        </div>

        <div className="flex gap-4 border-b border-slate-200 print:hidden">
          <button 
            onClick={() => setActiveRecapTab('warga')}
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeRecapTab === 'warga' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Warga Belajar
          </button>
          <button 
            onClick={() => setActiveRecapTab('tutor')}
            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeRecapTab === 'tutor' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            Tutor
          </button>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden print:border-none print:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 print:text-black">
                  <th className="px-8 py-4">{activeRecapTab === 'warga' ? 'Warga Belajar' : 'Tutor'}</th>
                  <th className="px-4 py-4">{activeRecapTab === 'warga' ? 'Kelas' : 'Mapel Utama'}</th>
                  <th className="px-4 py-4 text-center">Hadir</th>
                  <th className="px-4 py-4 text-center">{activeRecapTab === 'warga' ? 'Bukti TTD' : 'Aksi'}</th>
                  <th className="px-8 py-4 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeRecapTab === 'warga' ? (
                  mockWargaRecap.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 text-sm group transition-all">
                      <td className="px-8 py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.kelas}</td>
                      <td className="px-4 py-4 text-center font-bold text-emerald-600">{item.hadir}</td>
                      <td className="px-4 py-4 text-center">
                        {item.signature ? (
                          <div 
                            onClick={() => setViewingSignature(item.signature!)}
                            className="inline-block cursor-pointer bg-slate-50 p-1 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group-hover:bg-white"
                          >
                            <img src={item.signature} alt="ttd" className="h-6 w-12 object-contain opacity-70 group-hover:opacity-100" />
                          </div>
                        ) : (
                          <span className="text-slate-300 italic text-[10px]">Belum Ada</span>
                        )}
                      </td>
                      <td className="px-8 py-4 text-right font-black text-slate-800">{item.percentage}%</td>
                    </tr>
                  ))
                ) : (
                  mockTutorRecap.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 text-sm">
                      <td className="px-8 py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.mapel}</td>
                      <td className="px-4 py-4 text-center font-bold text-emerald-600">{item.hadir}</td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-indigo-600 font-black text-[10px] uppercase hover:underline">Lihat Detail</button>
                      </td>
                      <td className="px-8 py-4 text-right font-black text-slate-800">{item.percentage}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Lihat Tanda Tangan */}
        {viewingSignature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 print:hidden">
            <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 border-8 border-white">
              <div className="p-8 flex flex-col items-center">
                <div className="w-full flex justify-between items-center mb-6">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest">Bukti Tanda Tangan Digital</h3>
                  <button onClick={() => setViewingSignature(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
                    <span className="material-symbols-outlined text-slate-400">close</span>
                  </button>
                </div>
                
                <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex items-center justify-center min-h-[250px] shadow-inner">
                  <img src={viewingSignature} alt="Signature large" className="max-w-full h-auto drop-shadow-lg" />
                </div>
                
                <div className="mt-8 flex gap-3 w-full">
                  <button 
                    onClick={() => setViewingSignature(null)}
                    className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Tutup
                  </button>
                  <button 
                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">download</span> Unduh Bukti
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isTutor && isTutorSigned) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsTutorSigned(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
               <span className="material-symbols-outlined">arrow_back</span>
             </button>
             <div>
               <h2 className="text-2xl font-bold text-slate-800">Presensi Kelas: {selectedMapel}</h2>
               <p className="text-slate-500">Silakan beri tanda kehadiran pada warga belajar yang hadir.</p>
             </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setHasCheckedIn(false);
                setIsTutorSigned(false);
                alert("Seluruh presensi berhasil disimpan!");
              }} 
              className="bg-emerald-600 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
            >
              Simpan & Tutup Kelas
            </button>
          </div>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Warga Belajar</th>
                <th className="px-8 py-5 text-center">Hadir</th>
                <th className="px-8 py-5 text-center">Izin / Sakit</th>
                <th className="px-8 py-5 text-center">Alpa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-400">
                        {s.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Hadir'} className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                  </td>
                  <td className="px-8 py-5 text-center">
                    <input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Izin'} className="w-5 h-5 accent-amber-500 cursor-pointer" />
                  </td>
                  <td className="px-8 py-5 text-center">
                    <input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Alpa'} className="w-5 h-5 accent-rose-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // SIGNATURE VIEW (Used by both Siswa for attendance and Tutor for class opening)
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {isTutor ? 'Verifikasi Tanda Tangan Mengajar' : 'Presensi Tanda Tangan Digital'}
          </h2>
          <p className="text-slate-500">
            {isTutor 
              ? 'Tutor wajib memberikan tanda tangan digital sebagai bukti pelaksanaan KBM.' 
              : 'Silakan berikan tanda tangan digital Anda untuk mencatat kehadiran hari ini.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left: Metadata & Instructions */}
          <div className="w-full md:w-96 p-12 bg-slate-50/50 border-r border-slate-100 flex flex-col">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 inline-block mb-4">
                Identity Terminal
              </span>
              <h3 className="text-3xl font-black text-slate-800 leading-none">Konfirmasi Sesi</h3>
            </div>
            
            <div className="space-y-8 flex-1">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</p>
                <select 
                  className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  value={selectedMapel}
                  onChange={(e) => {
                    setSelectedMapel(e.target.value);
                    setHasCheckedIn(false);
                    clearSignature();
                  }}
                  disabled={hasCheckedIn}
                >
                  <option>Matematika</option>
                  <option>Bahasa Indonesia</option>
                  <option>Bahasa Inggris</option>
                  <option>IPA Dasar</option>
                </select>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informasi Sesi</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">08:00 - 09:30 WIB</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Waktu Sesi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined text-lg">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">Titik Layanan R. 101</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Lokasi Presensi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-3xl bg-amber-50 border border-amber-100">
               <div className="flex items-center gap-3 mb-2">
                 <span className="material-symbols-outlined text-amber-600 text-lg">info</span>
                 <p className="text-xs font-black text-amber-700">Panduan Presensi</p>
               </div>
               <p className="text-[10px] text-amber-600/80 font-bold leading-relaxed">
                 Berikan tanda tangan sejelas mungkin pada area kanvas yang tersedia. Tanda tangan ini akan disimpan sebagai arsip digital resmi PKBM.
               </p>
            </div>
          </div>

          {/* Right: Signature Canvas */}
          <div className="flex-1 p-12 bg-slate-100 flex flex-col items-center justify-center relative">
            {hasCheckedIn ? (
              <div className="text-center animate-in zoom-in-95 duration-700">
                 <div className="w-40 h-40 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/20">
                   <span className="material-symbols-outlined text-5xl text-emerald-500">check_circle</span>
                 </div>
                 <h3 className="text-4xl font-black text-slate-800 mb-4">Presensi Diterima</h3>
                 <div className="space-y-1">
                   <p className="text-emerald-600 font-black text-lg">{isTutor ? 'Verifikasi Mengajar' : 'Budi Santoso'}</p>
                   <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">ID: 2024001 • {selectedMapel}</p>
                 </div>
                 
                 <div className="mt-10 grid grid-cols-2 gap-4">
                   <div className="bg-white border border-slate-200 p-4 rounded-3xl">
                     <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Waktu</p>
                     <p className="text-slate-800 font-black">{new Date().toLocaleTimeString('id-ID')}</p>
                   </div>
                   <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-3xl">
                     <p className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Status</p>
                     <p className="text-emerald-600 font-black tracking-widest uppercase">Hadir</p>
                   </div>
                 </div>

                 <button 
                  onClick={() => {
                    setHasCheckedIn(false);
                    if (isTutor) setIsTutorSigned(true);
                  }}
                  className="mt-12 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-900/20"
                 >
                   {isTutor ? 'Masuk ke Absensi Siswa' : 'Gunakan Perangkat Lain'}
                 </button>
              </div>
            ) : (
              <div className="w-full max-w-2xl flex flex-col gap-8 animate-in fade-in duration-500">
                <div className="space-y-4">
                   <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Kanvas Tanda Tangan</h4>
                      <button onClick={clearSignature} className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1 hover:text-rose-700">
                        <span className="material-symbols-outlined text-sm">ink_eraser</span>
                        Hapus Kanvas
                      </button>
                   </div>
                   
                   <div className="relative bg-white rounded-[2.5rem] border-4 border-slate-200 shadow-inner overflow-hidden aspect-[4/3] cursor-crosshair group">
                      <canvas 
                        ref={canvasRef}
                        width={600}
                        height={450}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={endDrawing}
                        onMouseOut={endDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={endDrawing}
                        className="w-full h-full touch-none"
                      />
                      {isEmpty && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity">
                           <span className="material-symbols-outlined text-8xl mb-4">edit_note</span>
                           <p className="text-sm font-black uppercase tracking-[0.3em]">Area Tanda Tangan</p>
                        </div>
                      )}
                      {/* Grid line helper */}
                      <div className="absolute bottom-16 inset-x-8 h-px bg-slate-100 pointer-events-none"></div>
                   </div>
                </div>

                <div className="flex flex-col gap-4">
                   <button 
                    onClick={saveSignature}
                    className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-emerald-600/20 hover:bg-emerald-500 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
                   >
                     <span className="material-symbols-outlined">draw</span>
                     Simpan Presensi
                   </button>
                   <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                     * Dengan menyimpan, Anda menyatakan kehadiran pada sesi {selectedMapel} secara sah.
                   </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSystem;
