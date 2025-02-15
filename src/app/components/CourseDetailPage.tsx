"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Download, FileText, GraduationCap, MapPin, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Meeting {
  week: number;
  topic: string;
  description: string;
  materials: {
    name: string;
    type: string;
    url: string;
  }[];
}

interface Material {
  name: string;
  type: string;
  url: string;
}

interface CourseDetailProps {
  course: {
    id: string;
    name: string;
    code: string;
    description: string;
    lecturer: {
      name: string;
      title: string;
      image: string;
      email: string;
      expertise: string[];
    };
    schedule: {
      day: string;
      time: string;
      room: string;
    };
    credit: number;
    semester: string;
    meetings: Meeting[];
  };
}

const CourseDetailPage: React.FC<CourseDetailProps> = ({ course }) => {
  const handleDownload = (url: string, fileName: string) => {
    // Create an anchor element
    const link = document.createElement("a");
    link.href = url;

    // Set the download attribute with the filename
    link.setAttribute("download", fileName || url.split("/").pop() || "material");

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src={course.lecturer.image} alt={course.lecturer.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.name}</h1>
                  <p className="text-gray-500 mb-4">Kode: {course.code}</p>
                  <p className="text-gray-700 mb-6">{course.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-600">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    <span>
                      {course.credit} SKS • {course.semester}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{course.schedule.day}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{course.schedule.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="syllabus" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-1/3">
            <TabsTrigger value="syllabus">Silabus & Materi</TabsTrigger>
            <TabsTrigger value="lecturer">Informasi Dosen</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {course.meetings.map((meeting) => (
                    <AccordionItem key={meeting.week} value={`week-${meeting.week}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <span className="text-lg font-medium">
                            Pertemuan {meeting.week}: {meeting.topic}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-4 space-y-4">
                          <p className="text-gray-700">{meeting.description}</p>

                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">Materi Pembelajaran:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {meeting.materials.map((material, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                                    <span>{material.name}</span>
                                  </div>
                                  <Button size="sm" variant="outline" onClick={() => handleDownload(material.url, `${material.name}.${material.type}`)}>
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lecturer">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-xl font-semibold">
                      {course.lecturer.title} {course.lecturer.name}
                    </h3>
                    <p className="text-gray-600">{course.lecturer.email}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3">Bidang Keahlian</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.lecturer.expertise.map((exp, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Ruang: {course.schedule.room}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetailPage;
