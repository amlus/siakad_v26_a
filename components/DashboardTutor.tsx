
import React from 'react';
import { User } from '../types';

const DashboardTutor: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Panel Tutor</h2>
          <p className="text-slate-500">Selamat datang kembali, Bapak/Ibu {user.name}.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600">Lihat Kalender</button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md">Input Nilai</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
             </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">4</p>
            <p className="text-xs text-slate-500 font-medium">Mata Pelajaran Diampu</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">82</p>
            <p className="text-xs text-slate-500 font-medium">Total Warga Belajar</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
             </svg>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">12</p>
            <p className="text-xs text-slate-500 font-medium">Tugas Belum Dinilai</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Status Pembelajaran Kelas</h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Update Minggu Ini</span>
        </div>
        <div className="p-6 space-y-6">
          <ClassProgress name="Matematika (Paket C - Kelas 10)" progress={75} students={24} />
          <ClassProgress name="Bahasa Indonesia (Paket B - Kelas 8)" progress={40} students={18} />
          <ClassProgress name="PKn (Paket C - Kelas 12)" progress={92} students={32} />
        </div>
      </div>
    </div>
  );
};

const ClassProgress = ({ name, progress, students }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-sm">
      <div className="flex flex-col">
        <span className="font-bold text-slate-800">{name}</span>
        <span className="text-xs text-slate-500">{students} Warga Belajar</span>
      </div>
      <span className="font-bold text-slate-700">{progress}% Materi Selesai</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default DashboardTutor;
