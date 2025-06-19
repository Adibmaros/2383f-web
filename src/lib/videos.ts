export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeId: string;
  category: string;
  uploadDate: string;
  duration: string;
  views?: number;
}

export const categories = ["Semua", "Kuliah", "Tutorial", "Kegiatan", "Dokumentasi", "Presentasi"];

// Helper untuk mendapatkan YouTube video ID dari berbagai format URL
export function getYoutubeVideoId(url: string): string {
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : url;
}

// Helper untuk mengkonversi YouTube ID ke URL thumbnail
export function getYoutubeThumbnail(videoId: string, quality: "default" | "medium" | "high" | "standard" | "maxres" = "high"): string {
  // Fix: Perbaikan format URL thumbnail
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

// Helper untuk mengkonversi YouTube ID ke embed URL
export function getYoutubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

// Data video kelas
export const videos: Video[] = [
  {
    id: "video-1",
    title: "Tugas UAS Multimedia",
    description: "Rekaman kuliah tentang tugas UAS Multimedia untuk kelas 2383F",
    thumbnailUrl: "", // Akan diisi otomatis
    youtubeId: "8Nnm6Jw1au8",
    category: "Kuliah",
    uploadDate: "2025-06-19",
    duration: "45:22",
    views: 324,
  },
  {
    id: "video-2",
    title: "UAS Multimedia",
    description: "Kelompok dimas, ojan, eriel, nicco dan rayyan",
    thumbnailUrl: "",
    youtubeId: "MT0jA56M-yo",
    category: "Kuliah",
    uploadDate: "2025-06-19",
    duration: "32:18",
    views: 287,
  },
  {
    id: "video-3",
    title: "UAS Multimedia",
    description: "Kelompok ais, dian, ajie, mukti dan raja",
    thumbnailUrl: "",
    youtubeId: "SGZ1-E-qBFU",
    category: "Kuliah",
    uploadDate: "2025-06-19",
    duration: "18:45",
    views: 156,
  },
  {
    id: "video-4",
    title: "UAS Multimedia",
    description: "Kelompok reica",
    thumbnailUrl: "",
    youtubeId: "u8q-8KcNaSA",
    category: "Kuliah",
    uploadDate: "2025-06-19",
    duration: "1:12:33",
    views: 203,
  },
  {
    id: "video-5",
    title: "UAS Multimedia",
    description: "Kelompok Diqi",
    thumbnailUrl: "",
    youtubeId: "IdRw9hu1zic",
    category: "Kuliah",
    uploadDate: "2025-06-19",
    duration: "56:41",
    views: 176,
  },
];

// Fix: Pastikan thumbnailUrl diatur dengan benar untuk setiap video
videos.forEach((video) => {
  // Gunakan format yang benar untuk URL thumbnail
  video.thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
});
