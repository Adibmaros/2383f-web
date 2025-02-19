import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "interaksi-manusia-dan-komputer",
  name: "Interaksi Manusia dan Komputer",
  code: "SIN4132",
  description: "Mata kuliah yang membahas prinsip-prinsip desain antarmuka pengguna, pengalaman pengguna, dan evaluasi usability dalam pengembangan sistem interaktif.",
  lecturer: {
    name: "Indah Hidayanti",
    title: ", M.Kom.",
    image: "/lecture/dosen5.png",

    email: "indah.hidayanti@university.ac.id",
    expertise: ["Information System"],
  },
  schedule: {
    day: "Jumat",
    time: "08:00 - 09:40",
    room: "BF310",
  },
  credit: 2,
  semester: "20242",
  meetings: [
    // {
    //   week: 1,
    //   topic: "Pengantar IMK",
    //   description: "Pengenalan konsep dasar interaksi manusia dan komputer",
    //   materials: [
    //     {
    //       name: "Slide IMK",
    //       type: "pdf",
    //       url: "/materials/imk/week1/slides.pdf",
    //     },
    //     {
    //       name: "Tugas Observasi",
    //       type: "doc",
    //       url: "/materials/imk/week1/observasi.doc",
    //     },
    //   ],
    // },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
