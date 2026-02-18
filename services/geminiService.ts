
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeStudentPerformance(studentName: string, grades: any[]) {
  const prompt = `Analisis performa akademik untuk warga belajar bernama ${studentName} berdasarkan data nilai berikut: ${JSON.stringify(grades)}. Berikan ringkasan singkat (maks 3 kalimat) tentang kekuatan dan area pengembangan, serta saran tindak lanjut. Gunakan nada yang memotivasi.`;

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
    return "Gagal menghasilkan analisis AI saat ini.";
  }
}

export async function generateERaporNarrative(studentName: string, mapel: string, score: number) {
  const prompt = `Buatkan satu paragraf narasi rapor Kurikulum Merdeka untuk mata pelajaran ${mapel} dengan nilai ${score}/100 untuk siswa bernama ${studentName}. Fokus pada capaian pembelajaran.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Siswa telah mencapai kompetensi yang diharapkan pada mata pelajaran ini.";
  }
}
