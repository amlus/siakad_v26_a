
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const dataAbsensi = [
  { name: 'Sen', hadir: 95 },
  { name: 'Sel', hadir: 88 },
  { name: 'Rab', hadir: 92 },
  { name: 'Kam', hadir: 96 },
  { name: 'Jum', hadir: 85 },
];

const DashboardAdmin: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Warga Belajar" value="248" trend="+12%" color="emerald" />
        <StatCard title="Total Tutor" value="18" trend="Stabil" color="blue" />
        <StatCard title="Rata-rata Kehadiran" value="91%" trend="+2%" color="amber" />
        <StatCard title="Program Aktif" value="3" subtitle="Paket A, B, C" color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center justify-between">
            Tingkat Kehadiran Mingguan
            <span className="text-xs font-normal text-slate-400">Terakhir diperbarui: Hari ini, 08:00</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataAbsensi}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="hadir" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            <ActivityItem user="Tutor Sarah" action="Menginput nilai UAS Matematika" time="15 menit yang lalu" />
            <ActivityItem user="Siswa Ahmad" action="Melakukan absensi online" time="1 jam yang lalu" />
            <ActivityItem user="Admin" action="Menambahkan Warga Belajar baru" time="2 jam yang lalu" />
            <ActivityItem user="Tutor Budi" action="Mengunggah modul Bahasa Inggris" time="4 jam yang lalu" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, subtitle, color }: any) => {
  const colorMap: any = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h4 className="text-3xl font-bold text-slate-800">{value}</h4>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorMap[color]}`}>
          {trend || subtitle}
        </span>
      </div>
    </div>
  );
};

const ActivityItem = ({ user, action, time }: any) => (
  <div className="flex gap-3 items-start pb-4 border-b border-slate-50 last:border-0">
    <div className="w-8 h-8 rounded-full bg-slate-100 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm text-slate-700">
        <span className="font-semibold">{user}</span> {action}
      </p>
      <p className="text-xs text-slate-400">{time}</p>
    </div>
  </div>
);

export default DashboardAdmin;
