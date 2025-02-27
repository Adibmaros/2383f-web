"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface Material {
  name: string;
  type: string;
  url: string;
}

interface Meeting {
  week: number;
  topic: string;
  materials: Material[];
}

interface CourseDetailProps {
  course: {
    name: string;
    code: string;
    meetings: Meeting[];
  };
}

const CourseDetailPage: React.FC<CourseDetailProps> = ({ course }) => {
  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 dark:from-slate-900 dark:to-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{course.code}</p>

        <Card className="bg-white/80 dark:bg-slate-800/50 shadow-lg">
          <CardContent className="p-6">
            {course.meetings.map((meeting) => (
              <div key={meeting.week} className="mb-8 last:mb-0">
                <h2 className="text-xl font-semibold mb-4">
                  Pertemuan {meeting.week}: {meeting.topic}
                </h2>
                <div className="grid gap-3">
                  {meeting.materials.map((material, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg hover:bg-slate-100">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-blue-500" />
                        <span>{material.name}</span>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(material.url, `${material.name}.${material.type}`)} className="hover:bg-blue-500 hover:text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetailPage;
