import React, { useState } from 'react';
import { User } from '../types';
import TeachingMaterials from './TeachingMaterials';

interface JadwalTutor {
  id: string;
  hari: string;
  jam: string;
  mapel: string;
  program: string;
  kelas: string;
  ruang: string;
  mode: 'Tatap Muka' | 'Tutorial' | 'Mandiri';
}

export interface Penugasan {
  id: string;
  judul: string;
  mapel: string;
  program: string;
  kelas: string;
  deadline: string;
  deskripsi: string;
}

const mockSchedules: JadwalTutor[] = [
  { id: '1', hari: 'Senin', jam: '08:00 - 09:30', mapel: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', ruang: 'Zoom Meeting / R. 101', mode: 'Tutorial' },
  { id: '2', hari: 'Rabu', jam: '10:00 - 11:30', mapel: 'IPA Dasar', program: 'Paket B', kelas: 'Kelas 8', ruang: 'R. 104', mode: 'Tatap Muka' },
  { id: '3', hari: 'Kamis', jam: '13:00 - 14:30', mapel: 'Matematika Lanjut', program: 'Paket C', kelas: 'Kelas 12', ruang: 'R. 101', mode: 'Mandiri' },
];

export const mockAssignments: Penugasan[] = [
  { id: 't1', judul: 'Latihan Aljabar Linear', mapel: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', deadline: '2024-11-15', deskripsi: 'Kerjakan soal halaman 45-47 di buku modul.' },
  { id: 't2', judul: 'Resume Sejarah Kemerdekaan', mapel: 'Sejarah', program: 'Paket B', kelas: 'Kelas 8', deadline: '2024-11-10', deskripsi: 'Buat rangkuman minimal 2 halaman.' },
];

const TutorScheduleMaterials: React.FC<{ user: User }> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'assignments' | 'materials'>('schedule');
  const [schedules, setSchedules] = useState<JadwalTutor[]>(mockSchedules);
  const [assignments, setAssignments] = useState<Penugasan[]>(mockAssignments);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Filters for Schedule
  const [filterDay, setFilterDay] = useState('Semua');
  const [filterMapel, setFilterMapel] = useState('');
  const [filterProgram, setFilterProgram] = useState('Semua');

  // Form states
  const [newJadwal, setNewJadwal] = useState({
    hari: 'Senin', jam: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', ruang: '', mode: 'Tatap Muka' as any
  });
  
  const [newTask, setNewTask] = useState({
    judul: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', deadline: '', deskripsi: ''
  });

  const filteredSchedules = schedules.filter(s => {
    const matchesDay = filterDay === 'Semua' || s.hari === filterDay;
    const matchesMapel = filterMapel === '' || s.mapel.toLowerCase().includes(filterMapel.toLowerCase());
    const matchesProgram = filterProgram === 'Semua' || s.program === filterProgram;
    return matchesDay && matchesMapel && matchesProgram;
  });

  const handleAddJadwal = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedules([...schedules, { id: Math.random().toString(36).substr(2, 9), ...newJadwal }]);
    setIsAddModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignments([...assignments, { id: Math.random().toString(36).substr(2, 9), ...newTask }]);
    setIsTaskModalOpen(false);
    setNewTask({ judul: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', deadline: '', deskripsi: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen KBM</h2>
          <p className="text-slate-500">Pusat kendali pengajaran: Jadwal, Penugasan, dan Bahan Ajar.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button 
            onClick={() => setActiveSubTab('schedule')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'schedule' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Jadwal
          </button>
          <button 
            onClick={() => setActiveSubTab('assignments')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'assignments' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Penugasan
          </button>
          <button 
            onClick={() => setActiveSubTab('materials')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'materials' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Bahan Ajar
          </button>
        </div>
      </div>

      {activeSubTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600">filter_alt</span>
              Filter Jadwal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500/20"
                  value={filterDay}
                  onChange={e => setFilterDay(e.target.value)}
                >
                  <option>Semua</option>
                  <option>Senin</option><option>Selasa</option><option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold outline-none"
                  value={filterProgram}
                  onChange={e => setFilterProgram(e.target.value)}
                >
                  <option>Semua</option><option>Paket A</option><option>Paket B</option><option>Paket C</option>
                </select>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cari Mata Pelajaran</label>
                <div className="relative">
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold outline-none pl-10"
                    placeholder="Contoh: Matematika"
                    value={filterMapel}
                    onChange={e => setFilterMapel(e.target.value)}
                  />
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2 transition-all hover:bg-emerald-700">
              <span className="material-symbols-outlined text-sm font-black">add</span> Buat Jadwal Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.mode === 'Tutorial' ? 'bg-blue-50 text-blue-600' : 
                    item.mode === 'Mandiri' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {item.mode}
                  </div>
                  <button onClick={() => setSchedules(schedules.filter(s => s.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-1">{item.mapel}</h3>
                <p className="text-xs font-bold text-slate-400 mb-4">{item.program} • {item.kelas}</p>
                <div className="space-y-3 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span className="text-xs font-bold">{item.hari}, {item.jam}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-xs font-medium">{item.ruang}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-800">Daftar Penugasan Aktif</h3>
            <button onClick={() => setIsTaskModalOpen(true)} className="bg-indigo-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2 transition-all hover:bg-indigo-700">
              <span className="material-symbols-outlined text-sm font-black">assignment_add</span> Beri Tugas Baru
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {assignments.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl">assignment</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">{task.mapel}</span>
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-widest">{task.program} • {task.kelas}</span>
                  </div>
                  <h4 className="text-lg font-black text-slate-800">{task.judul}</h4>
                  <p className="text-sm text-slate-500 font-medium">{task.deskripsi}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase">Deadline</p>
                     <p className="text-sm font-black text-red-500">{task.deadline}</p>
                   </div>
                   <button className="text-xs font-black text-indigo-600 hover:underline">Lihat Pengumpulan</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'materials' && (
        <TeachingMaterials role={user.role} />
      )}

      {/* Modal Buat Jadwal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Buat Jadwal Baru</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="material-symbols-outlined p-2 hover:bg-slate-200 rounded-full">close</button>
            </div>
            <form onSubmit={handleAddJadwal} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hari</label>
                    <select className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white" value={newJadwal.hari} onChange={e => setNewJadwal({...newJadwal, hari: e.target.value})}>
                      <option>Senin</option><option>Selasa</option><option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jam</label>
                    <input required className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" placeholder="08:00 - 09:30" value={newJadwal.jam} onChange={e => setNewJadwal({...newJadwal, jam: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</label>
                 <input required className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" value={newJadwal.mapel} onChange={e => setNewJadwal({...newJadwal, mapel: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Program</label>
                    <select className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white" value={newJadwal.program} onChange={e => setNewJadwal({...newJadwal, program: e.target.value})}>
                       <option>Paket A</option><option>Paket B</option><option>Paket C</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Kelas</label>
                    <input required className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" value={newJadwal.kelas} onChange={e => setNewJadwal({...newJadwal, kelas: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mode Belajar</label>
                 <select className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold bg-white" value={newJadwal.mode} onChange={e => setNewJadwal({...newJadwal, mode: e.target.value as any})}>
                    <option>Tatap Muka</option><option>Tutorial</option><option>Mandiri</option>
                 </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase text-slate-500">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-emerald-600/20">Simpan Jadwal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tugas */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Beri Tugas Baru</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="material-symbols-outlined p-2 hover:bg-slate-200 rounded-full">close</button>
            </div>
            <form onSubmit={handleAddTask} className="p-8 space-y-4">
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Tugas</label>
                 <input required className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" value={newTask.judul} onChange={e => setNewTask({...newTask, judul: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mapel</label>
                    <input required className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" value={newTask.mapel} onChange={e => setNewTask({...newTask, mapel: e.target.value})} />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</label>
                    <input required type="date" className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold" value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instruksi / Deskripsi</label>
                 <textarea required rows={4} className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium resize-none" value={newTask.deskripsi} onChange={e => setNewTask({...newTask, deskripsi: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase text-slate-500">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20">Publikasikan Tugas</button>
              </div>
            </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default TutorScheduleMaterials;