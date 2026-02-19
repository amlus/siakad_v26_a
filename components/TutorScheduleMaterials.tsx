
import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../types';
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

export interface LinkedMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Link' | 'Doc';
}

export interface Penugasan {
  id: string;
  judul: string;
  mapel: string;
  program: string;
  kelas: string;
  deadline: string;
  deskripsi: string;
  materials?: LinkedMaterial[];
}

interface SubmissionRecord {
  id: string;
  studentName: string;
  status: 'Terkumpul' | 'Terlambat' | 'Belum';
  submittedAt?: string;
  grade?: number;
  attachment?: string;
  responseText?: string;
}

const mockSchedules: JadwalTutor[] = [
  { id: '1', hari: 'Senin', jam: '08:00 - 09:30', mapel: 'Matematika', program: 'Paket C', kelas: 'Kelas 10', ruang: 'Zoom Meeting / R. 101', mode: 'Tutorial' },
  { id: '2', hari: 'Rabu', jam: '10:00 - 11:30', mapel: 'IPA Dasar', program: 'Paket B', kelas: 'Kelas 8', ruang: 'R. 104', mode: 'Tatap Muka' },
  { id: '3', hari: 'Kamis', jam: '13:00 - 14:30', mapel: 'Matematika Lanjut', program: 'Paket C', kelas: 'Kelas 12', ruang: 'R. 101', mode: 'Mandiri' },
];

export const mockAssignments: Penugasan[] = [
  { 
    id: 't1', 
    judul: 'Latihan Aljabar Linear', 
    mapel: 'Matematika', 
    program: 'Paket C', 
    kelas: 'Kelas 10', 
    deadline: '2024-11-15', 
    deskripsi: 'Kerjakan soal halaman 45-47 di buku modul.',
    materials: [{ id: 'm1', title: 'Modul Aljabar Dasar', type: 'PDF' }]
  },
  { 
    id: 't2', 
    judul: 'Resume Sejarah Kemerdekaan', 
    mapel: 'Sejarah', 
    program: 'Paket B', 
    kelas: 'Kelas 8', 
    deadline: '2024-11-10', 
    deskripsi: 'Buat rangkuman minimal 2 halaman mengenai peristiwa Rengasdengklok.',
    materials: [{ id: 'm2', title: 'Video Dokumenter Kemerdekaan', type: 'Video' }]
  },
];

const mockSubmissions: Record<string, SubmissionRecord[]> = {
  't1': [
    { id: 's1', studentName: 'Budi Santoso', status: 'Terkumpul', submittedAt: '12 Nov 2024, 09:45', grade: 85, attachment: 'jawaban_budi.pdf' },
    { id: 's2', studentName: 'Siti Aminah', status: 'Terlambat', submittedAt: '16 Nov 2024, 10:15', grade: 70, attachment: 'tugas_siti.pdf' },
    { id: 's3', studentName: 'Ahmad Faisal', status: 'Belum' },
    { id: 's4', studentName: 'Dewi Lestari', status: 'Terkumpul', submittedAt: '14 Nov 2024, 20:00', attachment: 'mtk_dewi.pdf' },
  ]
};

const TutorScheduleMaterials: React.FC<{ user: User }> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'assignments' | 'materials'>('schedule');
  const [schedules, setSchedules] = useState<JadwalTutor[]>(mockSchedules);
  const [assignments, setAssignments] = useState<Penugasan[]>(mockAssignments);
  const [viewingTaskId, setViewingTaskId] = useState<string | null>(null);
  
  // Student Submission State
  const [submissionText, setSubmissionText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Role Checks
  const isStudent = user.role === UserRole.SISWA;
  const isAdminOrTutor = user.role === UserRole.ADMIN || user.role === UserRole.TUTOR;

  // Form states for adding content
  const [newJadwal, setNewJadwal] = useState({
    hari: 'Senin', jam: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', ruang: '', mode: 'Tatap Muka' as any
  });

  // Dynamic Class Helper
  const getClassOptions = (program: string) => {
    switch (program) {
      case 'Paket A': return ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];
      case 'Paket B': return ['Kelas 7', 'Kelas 8', 'Kelas 9'];
      case 'Paket C': return ['Kelas 10', 'Kelas 11', 'Kelas 12'];
      default: return [];
    }
  };
  
  const [newTask, setNewTask] = useState<{
    judul: string;
    mapel: string;
    program: string;
    kelas: string;
    deadline: string;
    deskripsi: string;
    linkedMaterials: LinkedMaterial[];
  }>({
    judul: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', deadline: '', deskripsi: '', linkedMaterials: []
  });

  const selectedAssignment = useMemo(() => 
    assignments.find(a => a.id === viewingTaskId), 
    [assignments, viewingTaskId]
  );

  const handleAddJadwal = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedules([...schedules, { id: Math.random().toString(36).substr(2, 9), ...newJadwal }]);
    setIsAddModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignments([...assignments, { 
      id: Math.random().toString(36).substr(2, 9), 
      ...newTask, 
      materials: newTask.linkedMaterials 
    }]);
    setIsTaskModalOpen(false);
    setNewTask({ judul: '', mapel: '', program: 'Paket C', kelas: 'Kelas 10', deadline: '', deskripsi: '', linkedMaterials: [] });
  };

  const handleSubmitAssignment = () => {
    if (!submissionText.trim()) return alert("Tulis jawaban Anda terlebih dahulu.");
    setIsSubmitted(true);
    alert("Tugas Anda berhasil dikirim ke Tutor!");
  };

  const handleAttachQuickMaterial = (type: 'PDF' | 'Video' | 'Link' | 'Doc') => {
    const title = prompt(`Masukkan Judul ${type}:`);
    if (title) {
      setNewTask({
        ...newTask,
        linkedMaterials: [...newTask.linkedMaterials, { id: Date.now().toString(), title, type }]
      });
    }
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
            onClick={() => { setActiveSubTab('schedule'); setViewingTaskId(null); }}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'schedule' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Jadwal
          </button>
          <button 
            onClick={() => { setActiveSubTab('assignments'); setViewingTaskId(null); }}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'assignments' && !viewingTaskId ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Penugasan
          </button>
          <button 
            onClick={() => { setActiveSubTab('materials'); setViewingTaskId(null); }}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeSubTab === 'materials' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Bahan Ajar
          </button>
        </div>
      </div>

      {activeSubTab === 'schedule' && (
        <div className="space-y-6">
          {isAdminOrTutor && (
            <div className="flex justify-end">
              <button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2 transition-all hover:bg-emerald-700">
                <span className="material-symbols-outlined text-sm font-black">add</span> Buat Jadwal Baru
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative group overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    item.mode === 'Tutorial' ? 'bg-blue-50 text-blue-600' : 
                    item.mode === 'Mandiri' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {item.mode}
                  </div>
                  {isAdminOrTutor && (
                    <button onClick={() => setSchedules(schedules.filter(s => s.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  )}
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

      {activeSubTab === 'assignments' && !viewingTaskId && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-800">Daftar Penugasan Aktif</h3>
            {isAdminOrTutor && (
              <button onClick={() => setIsTaskModalOpen(true)} className="bg-indigo-600 text-white px-5 py-3 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2 transition-all hover:bg-indigo-700">
                <span className="material-symbols-outlined text-sm font-black">assignment_add</span> Beri Tugas Baru
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {assignments.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-emerald-200 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-2 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <span className="material-symbols-outlined text-3xl">assignment</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-1">
                      <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-widest">{task.mapel}</span>
                      <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-widest">{task.program} • {task.kelas}</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-800">{task.judul}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{task.deskripsi}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0 self-stretch justify-between">
                   <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase">Deadline</p>
                     <p className="text-sm font-black text-red-500">{task.deadline}</p>
                   </div>
                   <button 
                    onClick={() => {
                      setViewingTaskId(task.id);
                      setIsSubmitted(false);
                      setSubmissionText('');
                    }}
                    className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/20"
                   >
                     {isStudent ? 'Kerjakan Tugas' : 'Cek Pengumpulan'}
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEWING DETAIL TASK / SUBMISSIONS */}
      {activeSubTab === 'assignments' && viewingTaskId && selectedAssignment && (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setViewingTaskId(null)}
              className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
            </button>
            <div>
              <h3 className="text-xl font-black text-slate-800">{selectedAssignment.judul}</h3>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{selectedAssignment.mapel} • Deadline: {selectedAssignment.deadline}</p>
            </div>
          </div>

          {isAdminOrTutor ? (
            /* TUTOR/ADMIN VIEW: RECAP TABLE */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SubmissionStatCard label="Terkumpul" value={mockSubmissions[viewingTaskId]?.filter(s => s.status !== 'Belum').length || 0} total={24} color="emerald" />
                <SubmissionStatCard label="Terlambat" value={mockSubmissions[viewingTaskId]?.filter(s => s.status === 'Terlambat').length || 0} total={24} color="amber" />
                <SubmissionStatCard label="Belum" value={24 - (mockSubmissions[viewingTaskId]?.filter(s => s.status !== 'Belum').length || 0)} total={24} color="red" />
                <SubmissionStatCard label="Rata-rata Nilai" value="82.4" total={100} color="indigo" />
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="px-8 py-4">Warga Belajar</th>
                        <th className="px-6 py-4 text-center">Status</th>
                        <th className="px-6 py-4">Waktu Pengumpulan</th>
                        <th className="px-6 py-4">Lampiran</th>
                        <th className="px-6 py-4 text-center">Nilai</th>
                        <th className="px-8 py-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(mockSubmissions[viewingTaskId] || []).map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4">
                            <p className="font-bold text-slate-800">{sub.studentName}</p>
                            <p className="text-[10px] text-slate-400 font-bold">NIS: 202400{sub.id.slice(-1)}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                              sub.status === 'Terkumpul' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              sub.status === 'Terlambat' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-slate-100 text-slate-400 border-slate-200'
                            }`}>
                              {sub.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-bold text-slate-600">{sub.submittedAt || '-'}</span>
                          </td>
                          <td className="px-6 py-4">
                            {sub.attachment ? (
                              <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:underline">
                                <span className="material-symbols-outlined text-sm">description</span>
                                {sub.attachment}
                              </button>
                            ) : <span className="text-xs text-slate-300 italic">-</span>}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input 
                              type="number" 
                              placeholder="0-100" 
                              className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 text-center text-sm font-black focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none"
                              defaultValue={sub.grade}
                            />
                          </td>
                          <td className="px-8 py-4 text-right">
                            <button className="p-2.5 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-400 transition-all">
                              <span className="material-symbols-outlined text-lg font-bold">rate_review</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* STUDENT VIEW: SUBMISSION FORM */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Instruksi Tugas</h4>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      {selectedAssignment.deskripsi}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tulis Jawaban Anda</h4>
                    {isSubmitted ? (
                      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl">
                        <p className="text-emerald-800 font-medium italic">"{submissionText}"</p>
                        <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          Tugas Terkumpul pada {new Date().toLocaleString('id-ID')}
                        </div>
                      </div>
                    ) : (
                      <textarea 
                        className="w-full p-6 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none min-h-[250px] text-slate-800 font-medium transition-all"
                        placeholder="Ketik jawaban atau rangkuman tugas Anda di sini..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                      />
                    )}
                  </div>
                </div>

                {!isSubmitted && (
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-4">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Atau Unggah File Jawaban</h4>
                    <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 bg-slate-50 group hover:border-emerald-400 transition-all cursor-pointer">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 shadow-sm transition-colors">
                        <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-600">Klik untuk upload file pendukung</p>
                        <p className="text-xs text-slate-400 mt-1 uppercase tracking-tighter font-black">PDF, JPG, atau DOC (Maks 10MB)</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                  <div className="relative z-10 space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Status Pengumpulan</p>
                      <h4 className={`text-2xl font-black ${isSubmitted ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {isSubmitted ? 'Terkumpul' : 'Belum Dikerjakan'}
                      </h4>
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-white/10">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold">Nilai Tutor</span>
                          <span className="font-black">{isSubmitted ? 'Menunggu Penilaian' : '-'}</span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold">Sisa Waktu</span>
                          <span className="font-black text-rose-400">3 Hari Lagi</span>
                       </div>
                    </div>

                    {!isSubmitted && (
                      <button 
                        onClick={handleSubmitAssignment}
                        className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-900/40 hover:bg-emerald-500 transition-all"
                      >
                        Kirim Sekarang
                      </button>
                    )}
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Materi Referensi</h4>
                   <div className="space-y-3">
                      {selectedAssignment.materials?.map(m => (
                        <div key={m.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 cursor-pointer transition-all">
                           <span className={`material-symbols-outlined text-sm ${m.type === 'PDF' ? 'text-red-500' : 'text-blue-500'}`}>
                              {m.type === 'PDF' ? 'picture_as_pdf' : 'play_circle'}
                           </span>
                           <span className="text-xs font-bold text-slate-700">{m.title}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'materials' && (
        <TeachingMaterials role={user.role} />
      )}

      {/* MODALS FOR ADMIN/TUTOR: BUAT JADWAL BARU (UPGRADED UI) */}
      {isAddModalOpen && isAdminOrTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[95vh]">
            
            {/* Modal Header */}
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-600/20">
                  <span className="material-symbols-outlined text-3xl">event_available</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Buat Jadwal Baru</h3>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mt-1 opacity-60">Penyusunan Agenda KBM At Taqwa</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="p-3 hover:bg-slate-200 rounded-2xl transition-all text-slate-400 hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-2xl font-black">close</span>
              </button>
            </div>

            <form onSubmit={handleAddJadwal} className="p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
              
              {/* Section 1: Detail Mata Pelajaran */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm font-black">book</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">Informasi Pembelajaran</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg uppercase tracking-widest ml-1 shadow-sm">Nama Mata Pelajaran</label>
                    <input 
                      required 
                      className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                      placeholder="Contoh: Matematika Peminatan"
                      value={newJadwal.mapel} 
                      onChange={e => setNewJadwal({...newJadwal, mapel: e.target.value})} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Program Pendidikan</label>
                      <div className="relative">
                        <select 
                          className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                          value={newJadwal.program}
                          onChange={e => {
                            const prog = e.target.value;
                            const firstClass = getClassOptions(prog)[0];
                            setNewJadwal({...newJadwal, program: prog, kelas: firstClass});
                          }}
                        >
                          <option>Paket A</option>
                          <option>Paket B</option>
                          <option>Paket C</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Target Kelas</label>
                      <div className="relative">
                        <select 
                          className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer"
                          value={newJadwal.kelas}
                          onChange={e => setNewJadwal({...newJadwal, kelas: e.target.value})}
                        >
                          {getClassOptions(newJadwal.program).map(kls => (
                            <option key={kls} value={kls}>{kls}</option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Waktu & Lokasi */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm font-black">schedule</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">Waktu & Lokasi Sesi</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Hari Pelaksanaan</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map(h => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setNewJadwal({...newJadwal, hari: h})}
                            className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-tighter border transition-all ${
                              newJadwal.hari === h 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                : 'bg-white text-slate-400 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-700 bg-blue-100 px-3 py-1 rounded-lg uppercase tracking-widest ml-1 shadow-sm">Rentang Jam</label>
                      <input 
                        required 
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" 
                        placeholder="08:00 - 09:30" 
                        value={newJadwal.jam} 
                        onChange={e => setNewJadwal({...newJadwal, jam: e.target.value})} 
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black text-indigo-700 bg-indigo-100 px-3 py-1 rounded-lg uppercase tracking-widest ml-1 shadow-sm">Ruang / Tautan Online</label>
                   <input 
                    required 
                    className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-sm font-bold focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300" 
                    placeholder="Contoh: R. 101 atau Link Zoom"
                    value={newJadwal.ruang} 
                    onChange={e => setNewJadwal({...newJadwal, ruang: e.target.value})} 
                   />
                </div>
              </div>

              {/* Section 3: Mode Belajar */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mode Pembelajaran</label>
                <div className="grid grid-cols-3 gap-4">
                  {(['Tatap Muka', 'Tutorial', 'Mandiri'] as const).map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setNewJadwal({...newJadwal, mode})}
                      className={`flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all ${
                        newJadwal.mode === mode 
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-inner' 
                          : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {mode === 'Tatap Muka' ? 'groups' : mode === 'Tutorial' ? 'record_voice_over' : 'person_celebrate'}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">{mode}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-50">
                <button 
                  type="button" 
                  onClick={() => setIsAddModalOpen(false)} 
                  className="flex-1 py-5 bg-slate-100 rounded-[1.8rem] font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-200 transition-all"
                >
                  Batalkan
                </button>
                <button 
                  type="submit" 
                  className="flex-[2] py-5 bg-emerald-600 text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">save</span>
                  Simpan Jadwal KBM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isTaskModalOpen && isAdminOrTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
           <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
             <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800">Beri Tugas Baru</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="material-symbols-outlined p-2 hover:bg-slate-200 rounded-full text-slate-500">close</button>
            </div>
            <form onSubmit={handleAddTask} className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Judul Tugas</label>
                  <input required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold" value={newTask.judul} onChange={e => setNewTask({...newTask, judul: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deadline</label>
                    <input required type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold" value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instruksi / Deskripsi</label>
                 <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium resize-none" value={newTask.deskripsi} onChange={e => setNewTask({...newTask, deskripsi: e.target.value})} />
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lampirkan Bahan Ajar</h4>
                  <span className="text-[10px] text-slate-400 font-bold italic">*Opsional</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button type="button" onClick={() => handleAttachQuickMaterial('PDF')} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-all group">
                    <span className="material-symbols-outlined text-red-500 group-hover:scale-110 transition-transform">picture_as_pdf</span>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">Attach PDF</span>
                  </button>
                  <button type="button" onClick={() => handleAttachQuickMaterial('Video')} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-all group">
                    <span className="material-symbols-outlined text-blue-500 group-hover:scale-110 transition-transform">movie</span>
                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-tighter">Attach Video</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-xs uppercase text-slate-500">Batal</button>
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-indigo-600/20 active:scale-[0.98]">Publikasikan Tugas</button>
              </div>
            </form>
           </div>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

const SubmissionStatCard = ({ label, value, total, color }: any) => {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-red-50 text-red-600 border-red-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100'
  };

  return (
    <div className={`p-6 rounded-[2rem] border ${colorMap[color]} shadow-sm`}>
      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black">{value}</span>
        {typeof total === 'number' && <span className="text-xs font-bold opacity-40">/ {total}</span>}
      </div>
    </div>
  );
};

export default TutorScheduleMaterials;
