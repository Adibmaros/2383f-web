import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "teknik-multimedia",
  name: "Teknik Multimedia",
  code: "SIN4412",
  description: "Mata kuliah yang membahas konsep dan teknik pengembangan konten multimedia, termasuk pengolahan gambar, audio, video, dan animasi.",
  lecturer: {
    name: "M. Syendi Apriko",
    title: "S.Pd., M.Kom.",
    image: "/images/dosen/syendi-apriko.jpg",
    email: "syendi.apriko@university.ac.id",
    expertise: ["Multimedia", "Digital Design", "Interactive Media"],
  },
  schedule: {
    day: "Kamis",
    time: "14:41 - 16:20",
    room: "Lab Multimedia",
  },
  credit: 2,
  semester: "20242",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Teknik Multimedia",
      description: "Pengenalan konsep dasar multimedia dan elemen-elemen multimedia",
      materials: [
        {
          name: "Slide Multimedia",
          type: "pdf",
          url: "/materials/multimedia/week1/slides.pdf",
        },
        {
          name: "Praktikum 1",
          type: "doc",
          url: "/materials/multimedia/week1/praktikum.doc",
        },
      ],
    },
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
