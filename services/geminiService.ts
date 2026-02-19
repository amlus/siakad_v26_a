
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeStudentPerformance(studentName: string, grades: any[]) {
  // Prompt dikustomisasi agar AI membandingkan nilai terhadap KKM dan melihat detail kompetensi materi
  const prompt = `Sebagai konsultan pendidikan PKBM, lakukan analisis performa akademik mendalam untuk warga belajar bernama ${studentName}. 
  Data Nilai: ${JSON.stringify(grades)}. 
  
  Instruksi:
  1. Bandingkan nilai rata-rata tiap mapel dengan KKM.
  2. Perhatikan detail 'capaianKompetensi' untuk melihat materi spesifik yang dikuasai/belum dikuasai.
  3. Berikan ringkasan (maks 4 kalimat) yang mencakup:
     - Kekuatan materi siswa.
     - Kelemahan spesifik berdasarkan materi kompetensi.
     - Rekomendasi tindak lanjut yang praktis bagi Tutor.
  Gunakan nada profesional namun tetap suportif.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "Gagal menghasilkan analisis AI saat ini karena gangguan teknis.";
  }
}

export async function generateERaporNarrative(studentName: string, mapel: string, score: number, kkm: number) {
  const prompt = `Buatkan satu paragraf narasi rapor Kurikulum Merdeka untuk mata pelajaran ${mapel} dengan nilai ${score}/100 (KKM: ${kkm}) untuk siswa bernama ${studentName}. Fokus pada capaian pembelajaran dan motivasi peningkatan diri.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Siswa telah berupaya mencapai standar kompetensi minimum yang ditetapkan.";
  }
}
