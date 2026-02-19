
import React, { useState, useEffect } from 'react';
import { User, UserRole } from './types';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardTutor from './components/DashboardTutor';
import DashboardSiswa from './components/DashboardSiswa';
import StudentManagement from './components/StudentManagement';
import TutorManagement from './components/TutorManagement';
import GradingSystem from './components/GradingSystem';
import AttendanceSystem from './components/AttendanceSystem';
import StudentProfile from './components/StudentProfile';
import TutorProfile from './components/TutorProfile';
import ClassManagement from './components/ClassManagement';
import TutorScheduleMaterials from './components/TutorScheduleMaterials';
import SchoolProfile from './components/SchoolProfile';
import SubjectManagement from './components/SubjectManagement';
import AdditionalTasks from './components/AdditionalTasks';
import TutorHonorManagement from './components/TutorHonorManagement';
import ImportCenter from './components/ImportCenter';
import AcademicCalendar from './components/AcademicCalendar';
import LoginPage from './components/LoginPage';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('siakad_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('siakad_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('siakad_user');
    setActiveTab('dashboard');
  };

  const switchRole = (role: UserRole) => {
    const mockUsers: Record<UserRole, any> = {
      [UserRole.ADMIN]: { id: '1', name: 'Admin Utama', role: UserRole.ADMIN, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' },
      [UserRole.TUTOR]: { id: '2', name: 'Tutor Ahmad', role: UserRole.TUTOR, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad', nuptk: '12345678' },
      [UserRole.SISWA]: { id: '3', name: 'Budi Santoso', role: UserRole.SISWA, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', program: 'Paket C', kelas: 'Kelas 10', nisn: '009887711', nis: '2024001', status: 'Aktif', riwayatPendidikan: 'SMP N 1 Depok', tempatLahir: 'Depok', tanggalLahir: '2008-05-12', namaAyah: 'Supardi', namaIbu: 'Siti Rohmah', alamat: 'Jl. Melati No. 45, Pancoran Mas, Depok', noTelepon: '081234567890' },
    };
    handleLogin(mockUsers[role]);
  };

  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === UserRole.ADMIN) return <DashboardAdmin />;
        if (currentUser.role === UserRole.SISWA) return <DashboardSiswa user={currentUser} onViewCalendar={() => setActiveTab('calendar')} />;
        if (currentUser.role === UserRole.TUTOR) return <DashboardTutor user={currentUser} />;
        return <DashboardAdmin />;
      case 'school': return <SchoolProfile />;
      case 'import': return <ImportCenter />;
      case 'subjects': return <SubjectManagement />;
      case 'students': return <StudentManagement />;
      case 'classes': return <ClassManagement />;
      case 'tutors': return <TutorManagement />;
      case 'honor': return <TutorHonorManagement user={currentUser} />;
      case 'calendar': return <AcademicCalendar user={currentUser} />;
      case 'schedule_materials': return <TutorScheduleMaterials user={currentUser} />;
      case 'additional_tasks': return <AdditionalTasks user={currentUser} />;
      case 'grading': return <GradingSystem role={currentUser.role} />;
      case 'attendance': return <AttendanceSystem role={currentUser.role} userId={currentUser.id} />;
      case 'profile':
        if (currentUser.role === UserRole.SISWA) return <StudentProfile user={currentUser} />;
        return <TutorProfile user={currentUser} />;
      default: return <DashboardAdmin />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view', roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
    { id: 'profile', label: 'Profil Saya', icon: 'account_circle', roles: [UserRole.TUTOR, UserRole.SISWA] },
    { id: 'school', label: 'Profil Sekolah', icon: 'account_balance', roles: [UserRole.ADMIN] },
    { id: 'calendar', label: 'Kalender Akademik', icon: 'calendar_today', roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
    { id: 'import', label: 'Import Data Master', icon: 'upload_file', roles: [UserRole.ADMIN] },
    { id: 'students', label: 'Warga Belajar', icon: 'person_search', roles: [UserRole.ADMIN] },
    { id: 'classes', label: 'Daftar Kelas', icon: 'groups', roles: [UserRole.ADMIN] },
    { id: 'subjects', label: 'Mata Pelajaran', icon: 'book', roles: [UserRole.ADMIN] },
    { id: 'tutors', label: 'Tutor', icon: 'school', roles: [UserRole.ADMIN] },
    { id: 'honor', label: 'Honor Tutor', icon: 'payments', roles: [UserRole.ADMIN] },
    { id: 'schedule_materials', label: 'Tugas & Materi', icon: 'event_note', roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
    { id: 'attendance', label: 'Absensi', icon: 'draw', roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
    { id: 'grading', label: 'Nilai & Rapor', icon: 'grade', roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        {/* Logo Section */}
        <div className="h-20 flex items-center px-4 overflow-hidden">
          <div className={`flex items-center ${isSidebarOpen ? 'gap-3 px-2' : 'w-full justify-center'}`}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20 shrink-0">A</div>
            {isSidebarOpen && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                <h1 className="font-black text-slate-800 leading-tight tracking-tight whitespace-nowrap">At Taqwa</h1>
                <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest opacity-70">SIAKAD PKBM</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.filter(item => item.roles.includes(currentUser.role)).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={!isSidebarOpen ? item.label : ''}
              className={`w-full flex items-center rounded-xl transition-all duration-200 h-12 ${
                isSidebarOpen ? 'px-4 gap-4' : 'justify-center'
              } ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <span className={`material-symbols-outlined text-2xl shrink-0 ${activeTab === item.id ? 'fill-1' : ''}`}>
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="font-bold text-sm whitespace-nowrap animate-in fade-in duration-300">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Role Switcher (Simulasi) */}
        {currentUser.role === UserRole.ADMIN && (
          <div className="p-3 border-t border-slate-100 bg-slate-50/30">
            <div className={`flex ${isSidebarOpen ? 'flex-col gap-1' : 'flex-col items-center gap-2'}`}>
               <button onClick={() => switchRole(UserRole.ADMIN)} title="Admin Mode" className={`flex items-center transition-all ${isSidebarOpen ? 'w-full px-3 py-2 text-[10px] bg-emerald-600 text-white rounded-lg font-black uppercase tracking-widest' : 'w-10 h-10 justify-center text-xs bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-black'}`}>
                  {isSidebarOpen ? 'Administrator' : 'A'}
               </button>
               <button onClick={() => switchRole(UserRole.TUTOR)} title="Tutor Mode" className={`flex items-center transition-all ${isSidebarOpen ? 'w-full px-3 py-2 text-[10px] bg-indigo-600 text-white rounded-lg font-black uppercase tracking-widest' : 'w-10 h-10 justify-center text-xs bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl font-black'}`}>
                  {isSidebarOpen ? 'Tutor Mode' : 'T'}
               </button>
               <button onClick={() => switchRole(UserRole.SISWA)} title="Siswa Mode" className={`flex items-center transition-all ${isSidebarOpen ? 'w-full px-3 py-2 text-[10px] bg-blue-600 text-white rounded-lg font-black uppercase tracking-widest' : 'w-10 h-10 justify-center text-xs bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-black'}`}>
                  {isSidebarOpen ? 'Warga Belajar' : 'W'}
               </button>
            </div>
          </div>
        )}

        {/* User Footer Section */}
        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center ${isSidebarOpen ? 'gap-3 px-1' : 'flex-col gap-4'}`}>
            <div className="relative shrink-0">
              <img src={currentUser.avatar} alt="avatar" className="w-10 h-10 rounded-xl border-2 border-slate-100 object-cover shadow-sm" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden flex-1 animate-in fade-in duration-300">
                <p className="text-sm font-black text-slate-800 truncate">{currentUser.name}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">{currentUser.role}</p>
              </div>
            )}
            <button 
              onClick={handleLogout}
              className={`flex items-center justify-center hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all ${isSidebarOpen ? 'p-2 rounded-lg' : 'w-10 h-10 rounded-xl'}`}
              title="Keluar"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-500 transition-all active:scale-95 border border-transparent hover:border-slate-100"
            >
              <span className="material-symbols-outlined leading-none">
                {isSidebarOpen ? 'menu_open' : 'menu'}
              </span>
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
              SIAKAD <span className="text-slate-800">At Taqwa Mandiri</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 shadow-sm">
                <span className="material-symbols-outlined text-sm font-black animate-pulse">shield_check</span>
                <span className="text-[10px] font-black uppercase tracking-widest">Sesi Aman</span>
             </div>
             <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8 custom-scrollbar">
          {renderContent()}
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};

export default App;
