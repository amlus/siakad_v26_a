
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // Bisa berupa Email (Admin) atau NISN/NUPTK
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatBirthdayToPassword = (dateString: string) => {
    // Input: YYYY-MM-DD -> Output: DDMMYYYY
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${day}${month}${year}`;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Silakan masukkan Username (Email/NISN/NUPTK) dan Kata Sandi.");
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      // 1. Validasi ADMIN
      if (username === 'admin@pkbmattaqwamandiri.sch.id' && password === 'adminpkbm123') {
        onLogin({ 
          id: '1', 
          name: 'Admin Utama', 
          role: UserRole.ADMIN, 
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' 
        });
        setIsLoading(false);
        return;
      }

      // 2. Data Mock untuk Validasi (Simulasi Database)
      const mockTutors = [
        { id: '2', nuptk: '12345678', name: 'Tutor Ahmad S.Pd', dob: '1980-01-01', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad' }
      ];

      const mockStudents = [
        { id: '3', nisn: '009887711', name: 'Budi Santoso', dob: '2008-05-12', program: 'Paket C', kelas: 'Kelas 10', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' }
      ];

      // 3. Validasi TUTOR (Username = NUPTK, Password = DDMMYYYY)
      const foundTutor = mockTutors.find(t => t.nuptk === username);
      if (foundTutor && password === formatBirthdayToPassword(foundTutor.dob)) {
        onLogin({ 
          id: foundTutor.id, 
          name: foundTutor.name, 
          role: UserRole.TUTOR, 
          avatar: foundTutor.avatar,
          nuptk: foundTutor.nuptk
        });
        setIsLoading(false);
        return;
      }

      // 4. Validasi WARGA BELAJAR (Username = NISN, Password = DDMMYYYY)
      const foundStudent = mockStudents.find(s => s.nisn === username);
      if (foundStudent && password === formatBirthdayToPassword(foundStudent.dob)) {
        onLogin({ 
          id: foundStudent.id, 
          name: foundStudent.name, 
          role: UserRole.SISWA, 
          avatar: foundStudent.avatar,
          program: foundStudent.program,
          kelas: foundStudent.kelas,
          nisn: foundStudent.nisn
        });
        setIsLoading(false);
        return;
      }

      alert('Kredensial salah. \nAdmin: Gunakan Email \nWarga Belajar: Gunakan NISN \nTutor: Gunakan NUPTK \nPassword: Tgl Lahir (DDMMYYYY)');
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row min-h-[650px] animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Branding & Info */}
        <div className="w-full md:w-1/2 bg-emerald-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 font-black text-2xl shadow-xl shadow-emerald-900/20">A</div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none uppercase">At Taqwa Mandiri</h1>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">SIAKAD v2.0</p>
              </div>
            </div>

            <h2 className="text-4xl font-black leading-tight mb-6">
              Pusat Pendidikan <br />
              <span className="text-emerald-200">Kesetaraan & Mandiri</span>
            </h2>
            <p className="text-emerald-50/80 font-medium leading-relaxed max-w-sm">
              Sistem Informasi Akademik terintegrasi untuk mendukung proses belajar mengajar yang lebih efektif, transparan, dan akuntabel.
            </p>
          </div>

          <div className="relative z-10">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-emerald-200">verified_user</span>
                <p className="text-xs font-black uppercase tracking-widest">Akses Terenkripsi</p>
              </div>
              <p className="text-[10px] text-emerald-50/60 leading-relaxed font-bold">
                Warga Belajar & Tutor: Masuk menggunakan NISN/NUPTK sebagai username dan Tanggal Lahir (DDMMYYYY) sebagai kata sandi.
              </p>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/4 scale-150 rotate-12">
            <span className="material-symbols-outlined text-[400px]">account_balance</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-black text-slate-800 mb-2">Selamat Datang</h3>
            <p className="text-sm font-medium text-slate-400">Silakan masuk ke akun SIAKAD Anda</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email / NISN / NUPTK</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">person</span>
                <input 
                  required
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username Anda"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kata Sandi</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors">lock</span>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password / DDMMYYYY"
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-100 bg-slate-50 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600 transition-colors">Ingat saya</span>
              </label>
              <button type="button" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Bantuan Akses?</button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  Masuk Sekarang
                </>
              )}
            </button>
          </form>

          <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-100">
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Contoh Akses</h4>
            <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500">
               <div>
                 <p className="text-emerald-600 mb-1">Warga Belajar:</p>
                 <p>User: 009887711</p>
                 <p>Pass: 12052008</p>
               </div>
               <div>
                 <p className="text-indigo-600 mb-1">Tutor:</p>
                 <p>User: 12345678</p>
                 <p>Pass: 01011980</p>
               </div>
            </div>
          </div>

          <div className="mt-auto pt-8 text-center">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
              &copy; 2024 PKBM At Taqwa Mandiri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
