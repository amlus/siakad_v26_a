
export enum UserRole {
  ADMIN = 'ADMIN',
  TUTOR = 'TUTOR',
  SISWA = 'SISWA'
}

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
  tanggalLahir?: string; // Format YYYY-MM-DD
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
  tanggalLahir: string; // Tambahan untuk login
}

export interface MataPelajaran {
  id: string;
  nama: string;
  kode: string;
  program: 'Paket A' | 'Paket B' | 'Paket C';
  jamTatapMuka: number;
  jamTutorial: number;
  jamMandiri: number;
  skk: number;
}

export interface CapaianKompetensi {
  materi: string;
  skor: number;
  deskripsi: string;
}

export interface Nilai {
  id: string;
  siswaId: string;
  mapelId: string;
  mapelNama: string; 
  tahunAjaran: string;
  semester: 'Ganjil' | 'Genap';
  kkm: number;
  harian: number;
  tugas: number;
  uts: number;
  uas: number;
  capaianKompetensi: CapaianKompetensi[];
}

export interface AbsensiRecord {
  id: string;
  date: string;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpa';
  mapel: string;
}
