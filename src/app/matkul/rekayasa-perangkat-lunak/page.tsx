import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "rekayasa-perangkat-lunak",
  name: "Rekayasa Perangkat Lunak",
  code: "SIN4124",
  description: "Mata kuliah yang membahas prinsip-prinsip pengembangan perangkat lunak profesional, metodologi pengembangan, dan manajemen proyek software.",
  lecturer: {
    name: "Catur Eri Gunawan",
    title: ", S.T., M.Cs.",
    image: "/lecture/dosen1.png",
    email: "catur.eri@university.ac.id",
    expertise: ["Information System", "Computer Network", "Desicion Support System"],
  },
  schedule: {
    day: "Rabu",
    time: "08:41 - 12:00",
    room: "BF309",
  },
  credit: 4,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Rekayasa Perangkat Lunak",
      description: "Pengenalan konsep dasar RPL dan siklus hidup pengembangan perangkat lunak",
      materials: [
        {
          name: "Rangkuman RPL B Indo",
          type: "zip",
          url: "/matkul/RPL/ringkasan-software-engineer.zip",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
