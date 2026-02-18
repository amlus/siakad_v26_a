
import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types';

const AttendanceSystem: React.FC<{ role: UserRole, userId: string }> = ({ role, userId }) => {
  const [selectedMapel, setSelectedMapel] = useState('Matematika');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [activeRecapTab, setActiveRecapTab] = useState<'warga' | 'tutor'>('warga');
  
  // Face Recognition States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'idle' | 'detecting' | 'verifying' | 'matching' | 'success'>('idle');
  const [simulatedCoords, setSimulatedCoords] = useState({ x: 0, y: 0 });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const mockWargaRecap = [
    { id: '1', name: 'Budi Santoso', kelas: 'Kelas 10', hadir: 18, izin: 2, sakit: 1, alpa: 0, percentage: 85 },
    { id: '2', name: 'Siti Aminah', kelas: 'Kelas 8', hadir: 20, izin: 0, sakit: 1, alpa: 0, percentage: 95 },
    { id: '3', name: 'Asep Saepul', kelas: 'Kelas 12', hadir: 15, izin: 4, sakit: 0, alpa: 2, percentage: 71 },
    { id: '4', name: 'Dewi Lestari', kelas: 'Kelas 6', hadir: 21, izin: 0, sakit: 0, alpa: 0, percentage: 100 },
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

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setScanStatus('detecting');
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Akses kamera ditolak. Silakan izinkan kamera untuk menggunakan fitur Face Recognition.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setScanStatus('idle');
  };

  const handleFaceScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanStatus('verifying');
    setScanProgress(0);
    
    // Simulate biometric scanning stages
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      
      // Dynamic status messages based on progress
      if (progress > 30 && progress < 60) setScanStatus('verifying');
      if (progress >= 60) setScanStatus('matching');

      // Randomize coords to look "active"
      setSimulatedCoords({
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100)
      });

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setScanStatus('success');
          setHasCheckedIn(true);
          setIsScanning(false);
          stopCamera();
        }, 1000);
      }
    }, 50);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  if (isAdmin) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 print:m-0 print:p-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Rekapitulasi Kehadiran</h2>
            <p className="text-slate-500">Laporan kehadiran seluruh warga belajar dan tenaga pendidik.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-slate-800 text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-900 transition-all shadow-lg font-bold text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.821 21 12m0 0-3.18-1.821m3.18 1.821-3.18 1.821M17.28 10.179 3 12m0 0 3.18 1.821M3 12l3.18-1.821" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h10.5a2.25 2.25 0 0 1 2.25 2.25v6.75a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V9a2.25 2.25 0 0 1 2.25-2.25Z" />
            </svg>
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
                  <th className="px-8 py-4 text-right">Persentase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeRecapTab === 'warga' ? (
                  mockWargaRecap.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 text-sm">
                      <td className="px-8 py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.kelas}</td>
                      <td className="px-4 py-4 text-center font-bold text-emerald-600">{item.hadir}</td>
                      <td className="px-8 py-4 text-right font-black text-slate-800">{item.percentage}%</td>
                    </tr>
                  ))
                ) : (
                  mockTutorRecap.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 text-sm">
                      <td className="px-8 py-4 font-bold text-slate-800">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 font-medium">{item.mapel}</td>
                      <td className="px-4 py-4 text-center font-bold text-emerald-600">{item.hadir}</td>
                      <td className="px-8 py-4 text-right font-black text-slate-800">{item.percentage}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (isTutor) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Presensi Online (Tutor)</h2>
            <p className="text-slate-500">Pencatatan kehadiran real-time per mata pelajaran.</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm" value={selectedMapel} onChange={(e) => setSelectedMapel(e.target.value)}>
              <option>Matematika</option><option>B. Indonesia</option>
            </select>
            <button className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20">Simpan Presensi</button>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] text-slate-400 uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-4">Siswa</th>
                <th className="px-8 py-4 text-center">Hadir</th>
                <th className="px-8 py-4 text-center">Izin</th>
                <th className="px-8 py-4 text-center">Alpa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="px-8 py-4 font-semibold text-slate-700">{s.name}</td>
                  <td className="px-8 py-4 text-center"><input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Hadir'} className="w-5 h-5 text-emerald-600" /></td>
                  <td className="px-8 py-4 text-center"><input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Izin'} className="w-5 h-5 text-amber-600" /></td>
                  <td className="px-8 py-4 text-center"><input type="radio" name={`att-${s.id}`} defaultChecked={s.status === 'Alpa'} className="w-5 h-5 text-red-600" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SISWA VIEW: ENHANCED FACE RECOGNITION ATTENDANCE
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Presensi Face Recognition</h2>
          <p className="text-slate-500">Sistem identifikasi biometrik terintegrasi SIAKAD PKBM.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[3.5rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          
          {/* Left: Metadata & Instructions */}
          <div className="w-full md:w-96 p-12 bg-slate-50/50 border-r border-slate-100 flex flex-col">
            <div className="mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200 inline-block mb-4">
                Biometric Terminal
              </span>
              <h3 className="text-3xl font-black text-slate-800 leading-none">Konfirmasi Sesi</h3>
            </div>
            
            <div className="space-y-8 flex-1">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pilih Mata Pelajaran</p>
                <select 
                  className="w-full bg-white border border-slate-200 px-5 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  value={selectedMapel}
                  onChange={(e) => {
                    setSelectedMapel(e.target.value);
                    setHasCheckedIn(false);
                    stopCamera();
                  }}
                  disabled={isScanning || hasCheckedIn}
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
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800">08:00 - 09:30 WIB</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Waktu Sesi</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
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
                 <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0 1 18 0z" /></svg>
                 <p className="text-xs font-black text-amber-700">Panduan Presensi</p>
               </div>
               <p className="text-[10px] text-amber-600/80 font-bold leading-relaxed">Posisikan wajah tepat di tengah bingkai. Pastikan pencahayaan cukup dan tidak menggunakan masker atau kacamata hitam.</p>
            </div>
          </div>

          {/* Right: Camera Viewport */}
          <div className="flex-1 p-12 bg-slate-900 flex flex-col items-center justify-center relative">
            {hasCheckedIn ? (
              <div className="text-center animate-in zoom-in-95 duration-700">
                 <div className="w-40 h-40 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-2xl shadow-emerald-500/20">
                   <svg className="w-20 h-20 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <h3 className="text-4xl font-black text-white mb-4">Presensi Diterima</h3>
                 <div className="space-y-1">
                   <p className="text-emerald-400 font-black text-lg">Budi Santoso</p>
                   <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">ID: 2024001 • Paket C</p>
                 </div>
                 
                 <div className="mt-10 grid grid-cols-2 gap-4">
                   <div className="bg-white/5 border border-white/10 p-4 rounded-3xl">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Waktu</p>
                     <p className="text-white font-black">{new Date().toLocaleTimeString('id-ID')}</p>
                   </div>
                   <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-3xl">
                     <p className="text-[10px] text-emerald-500/70 font-bold uppercase mb-1">Status</p>
                     <p className="text-emerald-500 font-black tracking-widest uppercase">Hadir</p>
                   </div>
                 </div>

                 <button 
                  onClick={() => setHasCheckedIn(false)}
                  className="mt-12 text-slate-500 hover:text-slate-300 text-xs font-bold underline underline-offset-8 transition-colors"
                 >
                   Gunakan Perangkat Lain
                 </button>
              </div>
            ) : !isCameraActive ? (
              <div className="text-center">
                <div className="relative group mb-10">
                  <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative w-64 h-64 rounded-[4rem] bg-white/5 border-2 border-dashed border-white/10 flex flex-col items-center justify-center mx-auto transition-all group-hover:border-emerald-500/50">
                    <span className="material-symbols-outlined text-7xl text-white/10 group-hover:text-emerald-500/30 transition-colors">face</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">AI Vision Ready</h3>
                <p className="text-slate-500 mb-12 max-w-xs mx-auto text-sm font-medium">Sistem siap melakukan pemindaian wajah secara real-time.</p>
                <button 
                  onClick={startCamera}
                  className="bg-emerald-600 text-white px-12 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto"
                >
                  <span className="material-symbols-outlined">videocam</span>
                  Mulai Pemindaian
                </button>
              </div>
            ) : (
              <div className="relative w-full max-w-2xl animate-in fade-in zoom-in-95 duration-500">
                <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-black border-4 border-white/5 shadow-2xl ring-1 ring-white/10">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover scale-x-[-1] opacity-80"
                  />
                  
                  {/* Biometric Overlays */}
                  <div className="absolute inset-0 pointer-events-none">
                    
                    {/* Face Detection Frame */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[350px] border-2 rounded-[4rem] transition-all duration-700 ${isScanning ? 'border-emerald-500 scale-105 shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 'border-white/20 border-dashed'}`}>
                      {/* Corners */}
                      <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-[3.5rem]"></div>
                      <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-[3.5rem]"></div>
                      <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-[3.5rem]"></div>
                      <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-[3.5rem]"></div>
                      
                      {/* Laser Line */}
                      {isScanning && (
                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_rgba(52,211,153,0.8)] animate-laser-scan top-0 z-20"></div>
                      )}

                      {/* Landmarks Simulation */}
                      {isScanning && (
                        <div className="absolute inset-0 opacity-40">
                          {[...Array(12)].map((_, i) => (
                            <div 
                              key={i} 
                              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse" 
                              style={{ 
                                top: `${20 + Math.random() * 60}%`, 
                                left: `${20 + Math.random() * 60}%`,
                                animationDelay: `${Math.random() * 2}s`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Telemetry Data */}
                  <div className="absolute top-8 left-8 space-y-2">
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-white/60 flex items-center gap-2 border border-white/10 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      Terminal_01: {isScanning ? 'Processing' : 'Standby'}
                    </div>
                    {isScanning && (
                      <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-black text-emerald-400 flex items-center gap-2 border border-emerald-500/20 uppercase tracking-widest">
                        Biometric_X: {simulatedCoords.x} | Y: {simulatedCoords.y}
                      </div>
                    )}
                  </div>

                  {/* Scan Progress Ring (Top Right) */}
                  {isScanning && (
                    <div className="absolute top-8 right-8">
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="176" strokeDashoffset={176 - (176 * scanProgress) / 100} className="text-emerald-500 transition-all duration-300" />
                        </svg>
                        <span className="absolute text-[10px] font-black text-white">{scanProgress}%</span>
                      </div>
                    </div>
                  )}

                  {/* Recognition Prompt Overlay */}
                  <div className="absolute bottom-10 inset-x-0 flex justify-center px-10">
                    <div className="w-full max-w-sm bg-black/60 backdrop-blur-xl p-5 rounded-[2.5rem] border border-white/10 text-center shadow-2xl">
                       <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-1">
                        {scanStatus === 'detecting' ? 'Mendeteksi Wajah...' : 
                         scanStatus === 'verifying' ? 'Ekstraksi Fitur Biometrik' : 
                         scanStatus === 'matching' ? 'Mencocokkan Database SIAKAD' :
                         'Analisis Selesai'}
                       </p>
                       <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
                         <div className={`h-full bg-emerald-500 transition-all duration-500 ${isScanning ? 'w-full' : 'w-0'}`}></div>
                       </div>
                    </div>
                  </div>

                  {/* Success Flash */}
                  {scanStatus === 'success' && (
                    <div className="absolute inset-0 bg-white animate-out fade-out duration-1000 z-50"></div>
                  )}
                </div>

                <div className="mt-12 flex flex-col gap-4">
                  <button 
                    onClick={handleFaceScan}
                    disabled={isScanning}
                    className={`w-full py-6 rounded-[2rem] font-black text-xl shadow-2xl transition-all flex items-center justify-center gap-4 ${
                      isScanning 
                        ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 cursor-wait' 
                        : 'bg-emerald-600 text-white hover:bg-emerald-500 hover:scale-[1.02] active:scale-95'
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                        Memproses Identitas...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">fingerprint</span>
                        Ambil Presensi Sekarang
                      </>
                    )}
                  </button>
                  <button 
                    onClick={stopCamera}
                    disabled={isScanning}
                    className="w-full py-4 bg-white/5 text-slate-400 rounded-[2rem] font-bold text-sm hover:bg-white/10 transition-all disabled:opacity-30 flex items-center justify-center gap-2 border border-white/10"
                  >
                    Nonaktifkan Kamera
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes laser-scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-laser-scan {
          animation: laser-scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AttendanceSystem;
