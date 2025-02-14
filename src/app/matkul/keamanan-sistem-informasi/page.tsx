// pages/matkul/[id].tsx
import CourseDetailPage from "@/app/components/CourseDetailPage";

const courseData = {
  id: "keamanan-sistem-informasi",
  name: "Keamanan Sistem Informasi",
  code: "SI-401",
  description: "Mata kuliah ini membahas konsep dan implementasi keamanan dalam sistem informasi modern...",
  lecturer: {
    name: "Dr. Ahmad Safwan",
    title: "Dr.",
    image: "/images/dosen/ahmad-safwan.jpg",
    email: "ahmad.safwan@university.ac.id",
    expertise: ["Cyber Security", "Network Security", "Cryptography"],
  },
  schedule: {
    day: "Senin",
    time: "08:00 - 10:30",
    room: "Lab Komputer 3",
  },
  credit: 3,
  semester: "Semester 5",
  meetings: [
    {
      week: 1,
      topic: "Pengantar Keamanan Sistem Informasi",
      description: "Pengenalan konsep dasar keamanan sistem informasi...",
      materials: [
        {
          name: "Slide Pertemuan 1",
          type: "pdf",
          url: "/materials/week1/slides.pdf",
        },
        {
          name: "Tugas Pendahuluan",
          type: "doc",
          url: "/materials/week1/assignment.doc",
        },
      ],
    },
    // ... more meetings
  ],
};

export default function MatkulDetail() {
  return <CourseDetailPage course={courseData} />;
}
