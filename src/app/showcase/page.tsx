import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Clock, User, Tag } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  timeline: string;
  team: string[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Learning Management System",
    description: "Platform pembelajaran online yang dilengkapi dengan fitur manajemen kelas, quiz online, dan tracking progress mahasiswa.",
    image: "/api/placeholder/800/600",
    technologies: ["React", "Node.js", "MongoDB", "WebRTC"],
    category: "Web Application",
    demoUrl: "https://demo.project.com",
    githubUrl: "https://github.com/username/project",
    timeline: "3 bulan",
    team: ["John Doe", "Jane Smith"],
  },
  {
    id: "2",
    title: "Sistem Informasi Keuangan Syariah",
    description: "Aplikasi manajemen keuangan berbasis syariah dengan fitur pencatatan transaksi, laporan keuangan, dan perhitungan zakat.",
    image: "/api/placeholder/800/600",
    technologies: ["Vue.js", "Laravel", "MySQL"],
    category: "Financial System",
    demoUrl: "https://demo.project.com",
    githubUrl: "https://github.com/username/project",
    timeline: "4 bulan",
    team: ["Alex Johnson", "Sarah Wilson"],
  },
  // Add more projects as needed
];

const ProjectShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-white shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Project Showcase</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Kumpulan project terbaik yang telah dikembangkan oleh mahasiswa Sistem Informasi</p>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-400 hover:text-white transition-colors">
            All Projects
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-400 hover:text-white transition-colors">
            Web Applications
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-400 hover:text-white transition-colors">
            Mobile Apps
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-400 hover:text-white transition-colors">
            Financial Systems
          </Badge>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <Badge className="text-center py-2">{project.category}</Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{project.team.length} Members</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectShowcase;
