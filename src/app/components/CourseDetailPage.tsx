"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Download, FileText, GraduationCap, MapPin } from "lucide-react";
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
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || url.split("/").pop() || "material");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-slate-50 to-gray-100 dark:from-slate-900 dark:via-slate-800 dark:to-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="mb-8 backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 border-white/20 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-8 p-6">
            <div className="md:w-1/4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/30 dark:ring-slate-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <img src={course.lecturer.image} alt={course.lecturer.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-3/4">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2 tracking-tight">{course.name}</h1>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 font-medium">{course.code}</p>
                  <p className="text-slate-700/90 dark:text-slate-300/90 mb-6 leading-relaxed">{course.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: GraduationCap, text: `${course.credit} SKS • ${course.semester}` },
                    { icon: Calendar, text: course.schedule.day },
                    { icon: Clock, text: course.schedule.time },
                    { icon: MapPin, text: `Ruang ${course.schedule.room}` },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center p-3 rounded-xl bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all duration-300 group">
                      <item.icon className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                      <span className="text-slate-700 dark:text-slate-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="syllabus" className="space-y-4">
          <TabsList className="w-full max-w-md mx-auto bg-white/80 dark:bg-slate-800/50 rounded-xl p-1">
            <TabsTrigger value="syllabus" className="w-1/2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-600">
              Silabus & Materi
            </TabsTrigger>
            <TabsTrigger value="lecturer" className="w-1/2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white dark:data-[state=active]:bg-indigo-600">
              Informasi Dosen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus" className="space-y-4">
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {course.meetings.map((meeting) => (
                    <AccordionItem key={meeting.week} value={`week-${meeting.week}`} className="border-slate-200 dark:border-slate-700">
                      <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-700/30 px-4 rounded-lg transition-all">
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-slate-800 dark:text-slate-200">
                            Pertemuan {meeting.week}: {meeting.topic}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="p-4 space-y-4">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{meeting.description}</p>

                          <div className="space-y-3">
                            <h4 className="font-medium text-slate-800 dark:text-slate-200">Materi Pembelajaran:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {meeting.materials.map((material, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-700/50 transition-all duration-300 group">
                                  <div className="flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium text-slate-700 dark:text-slate-200">{material.name}</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="bg-white/50 dark:bg-slate-800/50 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-all duration-300"
                                    onClick={() => handleDownload(material.url, `${material.name}.${material.type}`)}
                                  >
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
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                      {course.lecturer.name}
                      <span className="text-indigo-500 dark:text-indigo-400 ml-2">{course.lecturer.title}</span>
                    </h3>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-3 text-slate-800 dark:text-slate-200">Bidang Keahlian</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.lecturer.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-sm hover:bg-indigo-100 dark:hover:bg-indigo-800/40 transition-all duration-300 cursor-default"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
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
