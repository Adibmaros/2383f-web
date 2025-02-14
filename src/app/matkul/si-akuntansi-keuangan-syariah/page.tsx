import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "si-akuntansi-keuangan-syariah",
  name: "SI Akuntansi Keuangan Syariah",
  code: "SIN4424",
  description: "Mata kuliah yang mengintegrasikan konsep sistem informasi dengan prinsip-prinsip akuntansi keuangan syariah dalam pengembangan sistem informasi akuntansi.",
  lecturer: {
    name: "Sri Rahayu",
    title: "M.Kom.",
    image: "/images/dosen/sri-rahayu.jpg",
    email: "sri.rahayu@university.ac.id",
    expertise: ["Islamic Finance", "Accounting Information Systems", "Financial Technology"],
  },
  schedule: {
    day: "Kamis",
    time: "08:41 - 12:00",
    room: "Lab Akuntansi",
  },
  credit: 4,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Akuntansi Syariah",
      description: "Pengenalan dasar akuntansi syariah dan perbedaannya dengan akuntansi konvensional",
      materials: [
        {
          name: "Modul Akuntansi Syariah",
          type: "pdf",
          url: "/materials/akuntansi/week1/modul.pdf",
        },
        {
          name: "Latihan Soal",
          type: "doc",
          url: "/materials/akuntansi/week1/latihan.doc",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
