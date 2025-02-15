import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "infrastruktur-teknologi-informasi",
  name: "Infrastruktur Teknologi Informasi",
  code: "SIN4425",
  description:
    "Mata kuliah ini membahas konsep dasar infrastruktur teknologi informasi, mencakup jaringan komputer, sistem penyimpanan, keamanan data, dan komputasi awan. Mahasiswa akan mempelajari teori serta praktik dalam merancang, mengelola, dan mengamankan infrastruktur TI yang mendukung kebutuhan bisnis.",
  lecturer: {
    name: "Dr. Budi Santoso",
    title: "S.Kom., M.T.",
    image: "/images/dosen/budi-santoso.jpg",
    email: "budi.santoso@university.ac.id",
    expertise: ["Network Infrastructure", "Cloud Computing", "Data Security"],
  },
  schedule: {
    day: "Senin",
    time: "10:00 - 12:30",
    room: "Lab Jaringan",
  },
  credit: 3,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Infrastruktur Teknologi Informasi",
      description: "Pengenalan dasar infrastruktur TI, komponen utama, dan peranannya dalam dunia digital.",
      materials: [
        {
          name: "Slide Pertemuan 1",
          type: "pdf",
          url: "/materials/infrastruktur-ti/week1/slides.pdf",
        },
        {
          name: "Artikel Dasar Infrastruktur TI",
          type: "pdf",
          url: "/materials/infrastruktur-ti/week1/article.pdf",
        },
      ],
    },
    {
      week: 2,
      topic: "Komponen Jaringan dan Protokol",
      description: "Memahami komponen utama jaringan komputer, protokol komunikasi, dan pengaturan dasar jaringan.",
      materials: [
        {
          name: "Slide Pertemuan 2",
          type: "pdf",
          url: "/materials/infrastruktur-ti/week2/slides.pdf",
        },
        {
          name: "Latihan Konfigurasi Jaringan",
          type: "doc",
          url: "/materials/infrastruktur-ti/week2/lab-exercise.doc",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
