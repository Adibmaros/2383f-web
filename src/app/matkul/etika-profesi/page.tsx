import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "etika-profesi",
  name: "Etika Profesi",
  code: "SIN4312",
  description: "Mata kuliah ini membahas aspek etika dalam profesi teknologi informasi, termasuk kode etik profesional, tanggung jawab moral, dan etika dalam pengambilan keputusan di bidang IT.",
  lecturer: {
    name: "Aminullah Imal Alfresi",
    title: "S.T., M.Kom.",
    image: "/images/dosen/aminullah-imal.jpg",
    email: "aminullah.imal@university.ac.id",
    expertise: ["Professional Ethics", "IT Governance", "Business Ethics"],
  },
  schedule: {
    day: "Selasa",
    time: "10:21 - 12:00",
    room: "Ruang 301",
  },
  credit: 2,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Etika Profesi",
      description: "Pengenalan dasar tentang etika profesi dan pentingnya dalam dunia teknologi informasi",
      materials: [
        {
          name: "Slide Pertemuan 1",
          type: "pdf",
          url: "/materials/etika-profesi/week1/slides.pdf",
        },
        {
          name: "Kasus Studi",
          type: "doc",
          url: "/materials/etika-profesi/week1/case-study.doc",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
