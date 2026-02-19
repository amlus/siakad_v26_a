
import React, { useState, useRef } from 'react';

const ImportCenter: React.FC = () => {
  const [activeType, setActiveType] = useState<'warga' | 'tutor'>('warga');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const downloadTemplate = () => {
    const headers = {
      warga: "Nama Lengkap,NISN,NIS,Program,Kelas,Jenis Kelamin,Tanggal Lahir (YYYY-MM-DD),Alamat,No Telepon",
      tutor: "Nama Lengkap,NUPTK,Jabatan,Mata Pelajaran (Pisahkan Koma),Kelas Diampu (Pisahkan Koma),Tugas Tambahan"
    };

    const content = headers[activeType];
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Template_${activeType === 'warga' ? 'Warga_Belajar' : 'Tutor'}_PKBM.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setUploadStatus('uploading');
    setProgress(0);

    // Simulasi Progress Bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('validating');
          setTimeout(() => {
            setUploadStatus('success');
          }, 1500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const reset = () => {
    setUploadStatus('idle');
    setFileName('');
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pusat Import Data Master</h2>
          <p className="text-slate-500 font-medium">Unggah data secara massal melalui file Spreadsheet (Excel/CSV).</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => { reset(); setActiveType('warga'); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeType === 'warga' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Warga Belajar
          </button>
          <button 
            onClick={() => { reset(); setActiveType('tutor'); }}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeType === 'tutor' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Tutor
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {uploadStatus === 'idle' ? (
          <div className="flex-1 flex flex-col p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-800">Petunjuk Import {activeType === 'warga' ? 'Warga Belajar' : 'Tutor'}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Pastikan file yang Anda unggah mengikuti format kolom yang telah ditentukan agar sistem dapat mengenali data dengan benar.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">1</div>
                    <p className="text-xs font-bold text-slate-700">Unduh template CSV resmi melalui tombol di bawah.</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">2</div>
                    <p className="text-xs font-bold text-slate-700">Isi data sesuai kolom. Untuk tanggal gunakan format YYYY-MM-DD.</p>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">3</div>
                    <p className="text-xs font-bold text-slate-700">Unggah file kembali ke area drop-zone di samping.</p>
                  </div>
                </div>

                <button 
                  onClick={downloadTemplate}
                  className="flex items-center gap-3 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100 transition-all group w-fit"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Unduh Template {activeType === 'warga' ? 'Warga Belajar' : 'Tutor'} (.csv)
                </button>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`h-80 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-6 transition-all cursor-pointer group ${
                  isDragging ? 'border-emerald-500 bg-emerald-50 shadow-2xl shadow-emerald-500/10' : 'border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50/30'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".csv, .xlsx, .xls"
                  onChange={(e) => e.target.files && processFile(e.target.files[0])}
                />
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-5xl">cloud_upload</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-700">Seret file ke sini atau klik untuk memilih</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Format Excel (.xlsx) atau CSV yang didukung</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center animate-in zoom-in-95 duration-500">
            {uploadStatus === 'uploading' && (
              <div className="w-full max-w-sm space-y-8">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto animate-bounce">
                  <span className="material-symbols-outlined text-5xl">upload</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800">Mengunggah...</h3>
                  <p className="text-sm text-slate-400 font-bold">{fileName}</p>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className="h-full bg-emerald-600 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{progress}% Selesai</p>
              </div>
            )}

            {uploadStatus === 'validating' && (
              <div className="space-y-8">
                <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto relative">
                  <span className="material-symbols-outlined text-5xl">rule</span>
                  <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-[2rem] animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800">Validasi Data</h3>
                  <p className="text-sm text-slate-500 font-medium">Memeriksa struktur kolom dan kecocokan data induk...</p>
                </div>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="space-y-10">
                <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-500/40 mx-auto">
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-800">Import Berhasil!</h3>
                  <p className="text-sm text-slate-500 font-medium max-w-md">
                    Sistem telah berhasil memproses data baru dari file <span className="font-black text-slate-700">{fileName}</span>.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                    <p className="text-2xl font-black text-emerald-600">{activeType === 'warga' ? '42' : '12'}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Masuk</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                    <p className="text-2xl font-black text-slate-400">0</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gagal/Duplikat</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={reset} className="px-8 py-4 bg-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-200">Unggah Lagi</button>
                  <button onClick={reset} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-700">Selesai</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportCenter;
