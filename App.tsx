
import React, { useState, useEffect, useCallback } from 'react';
import { User, UserRole, WargaBelajar, Tutor as TutorType, Jadwal, Nilai } from './types';
import { ICONS, COLORS } from './constants';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardTutor from './components/DashboardTutor';
import DashboardSiswa from './components/DashboardSiswa';
import StudentManagement from './components/StudentManagement';
import TutorManagement from './components/TutorManagement';
import GradingSystem from './components/GradingSystem';
import AttendanceSystem from './components/AttendanceSystem';
import TeachingMaterials from './components/TeachingMaterials';
import StudentProfile from './components/StudentProfile';
import TutorProfile from './components/TutorProfile';
import ClassManagement from './components/ClassManagement';
import TutorScheduleMaterials from './components/TutorScheduleMaterials';
import SchoolProfile from './components/SchoolProfile';
import SubjectManagement from './components/SubjectManagement';
import AdditionalTasks from './components/AdditionalTasks';
import TutorHonorManagement from './components/TutorHonorManagement';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Initial Mock Auth (For Demo)
  useEffect(() => {
    // Default to Admin for easy initial access
    setCurrentUser({
      id: '1',
      name: 'Admin PKBM',
      role: UserRole.ADMIN,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    });
  }, []);

  const switchRole = (role: UserRole) => {
    const mockUsers: Record<UserRole, any> = {
      [UserRole.ADMIN]: { 
        id: '1', 
        name: 'Admin Utama', 
        role: UserRole.ADMIN, 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin' 
      },
      [UserRole.TUTOR]: { 
        id: '2', 
        name: 'Tutor Ahmad', 
        role: UserRole.TUTOR, 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad', 
        nuptk: '12345678',
        tugasTambahan: ['Wali Kelas 10', 'Penanggungjawab Titik Layanan Pancoran Mas']
      },
      [UserRole.SISWA]: { 
        id: '3', 
        name: 'Budi Santoso', 
        role: UserRole.SISWA, 
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', 
        nisn: '009887711',
        nis: '2024001',
        program: 'Paket C',
        kelas: 'Kelas 10',
        status: 'Aktif',
        tempatLahir: 'Depok',
        tanggalLahir: '2008-05-12',
        namaAyah: 'Supardi',
        namaIbu: 'Siti Rohmah',
        alamat: 'Jl. Melati No. 45, Pancoran Mas, Depok',
        noTelepon: '081234567890',
        riwayatPendidikan: 'SMP N 1 Depok'
      },
    };
    setCurrentUser(mockUsers[role]);
    setActiveTab('dashboard');
  };

  if (!currentUser) return <div className="flex h-screen items-center justify-center">Memuat...</div>;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentUser.role === UserRole.ADMIN) return <DashboardAdmin />;
        if (currentUser.role === UserRole.TUTOR) return <DashboardTutor user={currentUser} />;
        if (currentUser.role === UserRole.SISWA) return <DashboardSiswa user={currentUser} />;
        return null;
      case 'school':
        return <SchoolProfile />;
      case 'subjects':
        return <SubjectManagement />;
      case 'students':
        return <StudentManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'tutors':
        return <TutorManagement />;
      case 'honor':
        return <TutorHonorManagement user={currentUser} />;
      case 'schedule_materials':
        return <TutorScheduleMaterials user={currentUser} />;
      case 'additional_tasks':
        return <AdditionalTasks user={currentUser} />;
      case 'materials':
        return <TeachingMaterials role={currentUser.role} />;
      case 'grading':
        return <GradingSystem role={currentUser.role} />;
      case 'attendance':
        return <AttendanceSystem role={currentUser.role} userId={currentUser.id} />;
      case 'profile':
        if (currentUser.role === UserRole.SISWA) return <StudentProfile user={currentUser} />;
        if (currentUser.role === UserRole.TUTOR) return <TutorProfile user={currentUser} />;
        return null;
      default:
        return <div className="p-8">Halaman dalam pengembangan.</div>;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ICONS.Dashboard, roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
    { id: 'school', label: 'Sekolah', icon: ICONS.School, roles: [UserRole.ADMIN] },
    { id: 'profile', label: 'Profil Saya', icon: (cls: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ), roles: [UserRole.SISWA, UserRole.TUTOR] },
    { id: 'students', label: 'Warga Belajar', icon: ICONS.Users, roles: [UserRole.ADMIN] },
    { id: 'classes', label: 'Daftar Kelas', icon: (cls: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
      </svg>
    ), roles: [UserRole.ADMIN] },
    { 
      id: 'subjects', 
      label: 'Mata Pelajaran', 
      icon: (cls: string) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ), 
      roles: [UserRole.ADMIN] 
    },
    { id: 'tutors', label: 'Tutor', icon: ICONS.Academic, roles: [UserRole.ADMIN] },
    { 
      id: 'honor', 
      label: 'Honor Tutor', 
      icon: (cls: string) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75m0 1.5v.75m0 1.5v.75m0 1.5V15m1.5-1.5h.75m1.5 0h.75m1.5 0h.75m1.5 0H15m-1.5-1.5h.75m1.5 0h.75m1.5 0h.75m1.5 0H18.75M3.75 4.5h.75m1.5 0h.75m1.5 0h.75m1.5 0H9m-1.5 1.5h.75m1.5 0h.75m1.5 0h.75m1.5 0H13.5M2.25 9.375a60.414 60.414 0 0 0 15.75 2.13c.841.028 1.522-.646 1.522-1.488V4.5a2.25 2.25 0 0 0-2.25-2.25h-15a2.25 2.25 0 0 0-2.25 2.25v4.875Z" />
        </svg>
      ), 
      roles: [UserRole.ADMIN, UserRole.TUTOR] 
    },
    { 
      id: 'schedule_materials', 
      label: 'Jadwal & Materi', 
      icon: (cls: string) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ), 
      roles: [UserRole.TUTOR] 
    },
    { 
      id: 'additional_tasks', 
      label: 'Tugas Tambahan', 
      icon: (cls: string) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ), 
      roles: [UserRole.TUTOR] 
    },
    { 
      id: 'materials', 
      label: currentUser?.role === UserRole.SISWA ? 'Materi Belajar' : 'Bahan Ajar', 
      icon: ICONS.Materials, 
      roles: [UserRole.ADMIN, UserRole.SISWA] 
    },
    { id: 'attendance', label: 'Absensi', icon: ICONS.Calendar, roles: [UserRole.TUTOR, UserRole.SISWA, UserRole.ADMIN] },
    { id: 'grading', label: 'Nilai & Rapor', icon: (cls: string) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cls}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.425 4.708 5.25 5.25 0 0 0 2.262 6.44l.353.214c.118.071.26.071.378 0l.353-.214a5.25 5.25 0 0 0 2.262-6.44 50.664 50.664 0 0 0-2.425-4.708Zm15.482 0a50.636 50.636 0 0 1 2.425 4.708 5.25 5.25 0 0 1-2.262 6.44l-.353.214a.375.375 0 0 1-.378 0l-.353-.214a5.25 5.25 0 0 1-2.262-6.44 50.664 50.664 0 0 1 2.425-4.708Zm-15.482 0L12 3l8.738 7.147" />
      </svg>
    ), roles: [UserRole.ADMIN, UserRole.TUTOR, UserRole.SISWA] },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-bold text-slate-800 leading-tight">At Taqwa</h1>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Mandiri SIAKAD</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.filter(item => item.roles.includes(currentUser.role)).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.icon('w-6 h-6')}
              {isSidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Role Switcher for Demo */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {isSidebarOpen && <p className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-2">Ganti Peran (Demo)</p>}
          <div className={`flex ${isSidebarOpen ? 'flex-col' : 'flex-col items-center'} gap-2`}>
             <button onClick={() => switchRole(UserRole.ADMIN)} className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded">Admin</button>
             <button onClick={() => switchRole(UserRole.TUTOR)} className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded">Tutor</button>
             <button onClick={() => switchRole(UserRole.SISWA)} className="text-[10px] bg-slate-200 hover:bg-slate-300 px-2 py-1 rounded">Siswa</button>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
            <img src={currentUser.avatar} alt="avatar" className="w-10 h-10 rounded-full border-2 border-slate-100" />
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 capitalize">{currentUser.role.toLowerCase()}</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <button 
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100">
              Tahun Ajaran 2024/2025 Ganjil
            </span>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default App;
