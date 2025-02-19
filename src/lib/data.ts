interface MemberProfile {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  hobbies: string;
  dreams: string;
  motto: string;
  favoriteFood: string;
  classMessage: string;
  classGoals: string;
  infoTambahan?: string;
}

export const members: MemberProfile[] = [
  {
    name: "Fitriani",
    role: "Calon Pengusaha Tambang",
    bio: "Menonton & Membaca. Ingin menjadi pengusaha tambang.",
    imageUrl: "/members/fitriani.jpg",
    hobbies: "Menonton & Membaca",
    dreams: "Menjadi pengusaha tambang",
    motto: "Hasbunallah wani mal wakil ni mal maula wani'man nasir",
    favoriteFood: "Indomie goreng & Gado-gado buatan ibuk",
    classMessage: "Harus tetap kompak walau udah semester akhir",
    classGoals: "Wisuda bareng sekelas dengan predikat cumlaude",
  },
  {
    name: "Meylinda Pratiwi",
    role: "Calon Orang Sukses",
    bio: "Menonton drakor/dracin. Bercita-cita menjadi orang sukses.",
    imageUrl: "/members/meylinda.jpeg",
    hobbies: "Menonton drakor/dracin",
    dreams: "Impian menjadi orang yang sukses kedepannya",
    motto: "Orang bisa, kita harus bisa",
    favoriteFood: "Thaitea",
    classMessage: "Semoga selalu kompak",
    classGoals: "Kesuksesan",
  },
  {
    name: "Muhammad Raja",
    role: "Calon Programmer",
    bio: "Travelling. Ingin menjadi programmer.",
    imageUrl: "members/raja.jpg",
    hobbies: "Travelling",
    dreams: "Programmer",
    motto: "Cita-cita boleh pudar, S.Kom harus dikejar",
    favoriteFood: "Es bakso",
    classMessage: "Semakin maju dan solid",
    classGoals: "Lulus tepat waktu bersama",
  },
  {
    name: "Eriel Budiman",
    role: "Calon Orang Sukses",
    bio: "Sering ke Kos Nicco. Ingin sukses.",
    imageUrl: "/members/eriel.jpg",
    hobbies: "Ke Kos Nicco",
    dreams: "Sukses",
    motto: "Tindakan lebih berbicara daripada kata-kata",
    favoriteFood: "Ayam Geprek, Pop Ice",
    classMessage: "Makin Solid",
    classGoals: "Sukses bareng",
  },
  {
    name: "Mitra Asindu",
    role: "Calon Lulusan Terbaik",
    bio: "Mendengar musik di Spotify. Target: Lulus Sarjana tepat waktu.",
    imageUrl: "/members/mitra.jpg",
    hobbies: "Mendengar musik di Spotify",
    dreams: "Lulus Sarjana Tepat Waktu!",
    motto: "Jalani, perbaiki, dan berusaha memberikan yang terbaik kepada semua orang",
    favoriteFood: "Bread and Avocado Juice",
    classMessage: "Ya tetap kompak, mendukung satu sama lain meskipun nanti semester 5 ada yang lanjut di PSI, DTA, & SIA",
    classGoals: "Lulus Sarjana bareng-bareng satu kelas",
  },
  {
    name: "Adib Muhammad Maros",
    role: "Calon Software Engineer",
    bio: "hidup sekali, hidup yang berarti!",
    imageUrl: "/members/adib.jpeg",
    hobbies: "Baca Buku, Ngoding, Nulis, Coba hal baru",
    dreams: "Software Engineer!",
    motto: "Cintailah takdirmu!",
    favoriteFood: "Ayam Goreng, pecel lele",
    classMessage: "semoga bisa menciptakan kenangan indah yang bisa dikenang di masa depan nantinya",
    classGoals: "Sukses bareng bareng satu kelas",
  },
];
