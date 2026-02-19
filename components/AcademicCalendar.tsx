
import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../types';

interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  type: 'class' | 'task' | 'event';
  startTime?: string;
  endTime?: string;
  location?: string;
}

const AcademicCalendar: React.FC<{ user: User }> = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock Events - Integrasi data dari KBM & Tugas
  const mockEvents: CalendarEvent[] = [
    { id: '1', date: '2024-11-15', title: 'Deadline: Latihan Aljabar', type: 'task', startTime: '23:59' },
    { id: '2', date: '2024-11-20', title: 'Ujian Tengah Semester', type: 'event', startTime: '08:00', endTime: '12:00', location: 'Aula Utama' },
    { id: '3', date: '2024-11-10', title: 'Rapat Warga Belajar', type: 'event', startTime: '10:00', location: 'Zoom Cloud' },
    // Recurring classes mock based on day
    { id: 'c1', date: '2024-11-11', title: 'Matematika - Paket C', type: 'class', startTime: '08:00', endTime: '09:30', location: 'R. 101' },
    { id: 'c2', date: '2024-11-13', title: 'IPA Dasar - Paket B', type: 'class', startTime: '10:00', endTime: '11:30', location: 'R. 104' },
    { id: 'c3', date: '2024-11-18', title: 'Matematika - Paket C', type: 'class', startTime: '08:00', endTime: '09:30', location: 'R. 101' },
  ];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getDaysArray = () => {
    const days = [];
    const numDays = daysInMonth(currentDate);
    const startDay = firstDayOfMonth(currentDate);

    // Padding for empty days at the start
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const eventsForSelectedDay = useMemo(() => {
    const key = formatDateKey(selectedDate);
    return mockEvents.filter(e => e.date === key);
  }, [selectedDate]);

  const hasEventOnDate = (date: Date) => {
    const key = formatDateKey(date);
    const types = mockEvents.filter(e => e.date === key).map(e => e.type);
    return [...new Set(types)];
  };

  const monthName = currentDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Kalender Akademik</h2>
          <p className="text-slate-500">Pantau jadwal kelas, tenggat waktu tugas, dan agenda PKBM At Taqwa Mandiri.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
           <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
             <span className="material-symbols-outlined leading-none">chevron_left</span>
           </button>
           <h3 className="text-sm font-black uppercase tracking-widest px-4">{monthName}</h3>
           <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-all">
             <span className="material-symbols-outlined leading-none">chevron_right</span>
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Calendar Grid */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
              <div key={day} className={`py-4 text-center text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                {day}
              </div>
            ))}
          </div>
          
          <div className="flex-1 grid grid-cols-7 auto-rows-fr">
            {getDaysArray().map((date, i) => {
              if (!date) return <div key={`empty-${i}`} className="border-b border-r border-slate-50 bg-slate-50/30"></div>;
              
              const events = hasEventOnDate(date);
              
              return (
                <div 
                  key={formatDateKey(date)} 
                  onClick={() => setSelectedDate(date)}
                  className={`relative p-3 border-b border-r border-slate-100 transition-all cursor-pointer hover:bg-emerald-50/30 min-h-[100px] ${isSelected(date) ? 'bg-emerald-50/50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-black ${isToday(date) ? 'w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center' : 'text-slate-400'}`}>
                      {date.getDate()}
                    </span>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {events.map(type => (
                      <div key={type} className={`h-1.5 w-1.5 rounded-full ${
                        type === 'class' ? 'bg-emerald-500' :
                        type === 'task' ? 'bg-indigo-500' :
                        'bg-amber-500'
                      }`}></div>
                    ))}
                  </div>

                  {/* Desktop view for mini event titles */}
                  <div className="hidden sm:block mt-2 space-y-1">
                    {mockEvents.filter(e => e.date === formatDateKey(date)).slice(0, 2).map(e => (
                       <div key={e.id} className={`text-[9px] font-bold px-1.5 py-0.5 rounded border truncate ${
                         e.type === 'class' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         e.type === 'task' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                         'bg-amber-50 text-amber-600 border-amber-100'
                       }`}>
                         {e.title}
                       </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Details Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Agenda Harian</p>
               <h3 className="text-2xl font-black">
                 {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
               </h3>
               
               <div className="mt-8 space-y-4">
                 {eventsForSelectedDay.length > 0 ? eventsForSelectedDay.map(e => (
                   <div key={e.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                     <div className="flex items-start justify-between gap-3 mb-2">
                        <span className={`material-symbols-outlined text-sm ${
                           e.type === 'class' ? 'text-emerald-400' : 
                           e.type === 'task' ? 'text-indigo-400' : 
                           'text-amber-400'
                        }`}>
                          {e.type === 'class' ? 'school' : e.type === 'task' ? 'assignment' : 'event'}
                        </span>
                        <span className="text-[10px] font-black opacity-40 uppercase">{e.startTime || 'All Day'}</span>
                     </div>
                     <h4 className="text-sm font-bold leading-tight group-hover:text-emerald-400 transition-colors">{e.title}</h4>
                     {e.location && (
                       <div className="flex items-center gap-1.5 mt-2 opacity-50">
                         <span className="material-symbols-outlined text-[10px]">location_on</span>
                         <span className="text-[10px] font-medium">{e.location}</span>
                       </div>
                     )}
                   </div>
                 )) : (
                   <div className="py-10 text-center opacity-40">
                     <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
                     <p className="text-xs font-bold uppercase tracking-widest">Tidak ada agenda</p>
                   </div>
                 )}
               </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Keterangan Indikator</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20"></div>
                  <span className="text-xs font-bold text-slate-600">Jadwal KBM / Tatap Muka</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/20"></div>
                  <span className="text-xs font-bold text-slate-600">Batas Pengumpulan Tugas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/20"></div>
                  <span className="text-xs font-bold text-slate-600">Event Sekolah / Libur</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
