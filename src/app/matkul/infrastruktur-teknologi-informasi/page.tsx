import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "infrastruktur-teknologi-informasi",
  name: "Infrastruktur Teknologi Informasi",
  code: "SIN4425",
  description:
    "Mata kuliah ini membahas konsep dasar infrastruktur teknologi informasi, mencakup jaringan komputer, sistem penyimpanan, keamanan data, dan komputasi awan. Mahasiswa akan mempelajari teori serta praktik dalam merancang, mengelola, dan mengamankan infrastruktur TI yang mendukung kebutuhan bisnis.",
  lecturer: {
    name: "Dr.FENNY PURWANI",
    title: ", M.Kom",
    image: "/images/dosen/budi-santoso.jpg",
    email: "budi.santoso@university.ac.id",
    expertise: ["Network Infrastructure", "Cloud Computing", "Data Security"],
  },
  schedule: {
    day: "Rabu",
    time: "13:00 - 14:40",
    room: "BF310",
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
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
