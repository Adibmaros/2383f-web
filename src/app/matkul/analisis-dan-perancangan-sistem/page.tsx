import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "analisis-dan-perancangan-sistem",
  name: "Analisis dan Perancangan Sistem",
  code: "SIN4114",
  description: "Mata kuliah yang membahas metodologi dan teknik dalam menganalisis kebutuhan sistem serta merancang solusi sistem informasi yang efektif dan efisien.",
  lecturer: {
    name: "Evi Fadilah",
    title: "M.Kom.",
    image: "/images/dosen/evi-fadilah.jpg",
    email: "evi.fadilah@university.ac.id",
    expertise: ["Systems Analysis", "Business Process Modeling", "UML"],
  },
  schedule: {
    day: "Selasa",
    time: "13:00 - 16:20",
    room: "Lab Sistem 2",
  },
  credit: 4,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Analisis dan Perancangan Sistem",
      description: "Pengenalan konsep dasar analisis sistem dan metodologi pengembangan sistem",
      materials: [
        {
          name: "Modul Pengantar",
          type: "pdf",
          url: "/materials/aps/week1/modul.pdf",
        },
        {
          name: "Contoh Kasus",
          type: "doc",
          url: "/materials/aps/week1/case.doc",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
