import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  name: "Infrastruktur Teknologi Informasi",
  code: "SIN4114",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Infrastruktur Teknologi Informasi,",
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
    // Add more meetings as needed
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
