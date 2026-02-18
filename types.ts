
export enum UserRole {
  ADMIN = 'ADMIN',
  TUTOR = 'TUTOR',
  SISWA = 'SISWA'
}

// Fix: Added optional properties to User interface to support SISWA and TUTOR role specific fields
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  nisn?: string;
  nuptk?: string;
  kelas?: string;
  program?: string;
  nis?: string;
  tugasTambahan?: string[];
}

export interface WargaBelajar {
  id: string;
  nama: string;
  nisn: string;
  nis: string;
  program: 'Paket A' | 'Paket B' | 'Paket C';
  kelas: string;
  status: 'Aktif' | 'Non-Aktif';
  riwayatPendidikan: string;
  tempatLahir: string;
  tanggalLahir: string;
  namaAyah: string;
  namaIbu: string;
  alamat: string;
  noTelepon: string;
}

export interface Tutor {
  id: string;
  nama: string;
  nuptk: string;
  jabatan: string;
  mapel: string[];
  kelas: string[];
  tugasTambahan?: string[];
}

export interface MataPelajaran {
  id: string;
  nama: string;
  kode: string;
  jamTatapMuka: number;
  jamTutorial: number;
  jamMandiri: number;
  skk: number;
}

export interface Jadwal {
  id: string;
  hari: string;
  jam: string;
  mapel: string;
  tutor: string;
  ruang: string;
}

export interface Nilai {
  id: string;
  siswaId: string;
  mapelId: string;
  harian: number;
  tugas: number;
  uts: number;
  uas: number;
}

export interface AbsensiRecord {
  id: string;
  date: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
  mapel: string;
}
