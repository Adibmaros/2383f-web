"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Clock, User, Play, Tag } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  youtubeUrl?: string;
  demoUrl?: string; // URL untuk live demo
  thumbnailUrl?: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  timeline: string;
  team: string[];
}

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Online Course Coding",
    description: "Website belajar coding.",
    youtubeUrl: "https://youtu.be/UzNd84QP85A",
    demoUrl: "", // Opsional: URL untuk live demo
    technologies: ["HTML", "CSS", "Javascript"],
    category: "Web Application",
    githubUrl: "https://github.com/username/project",
    timeline: "1 minggu",
    team: ["Fauzan Aziman Putra"],
  },
  // Add more projects as needed
];

const categories = ["All Projects", "Web Application", "Mobile Apps", "Financial Systems"];

const ProjectCard = ({ project }: { project: Project }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = project.youtubeUrl ? getYouTubeVideoId(project.youtubeUrl) : null;
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : project.thumbnailUrl;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-slate-800/50 backdrop-blur-lg border border-gray-100 dark:border-gray-700 hover:transform hover:scale-[1.02]">
      <div className="aspect-video overflow-hidden rounded-t-lg relative">
        {showVideo && videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`Demo video for ${project.title}`}
            className="w-full h-full absolute top-0 left-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full">
            <img src={thumbnailUrl || "/api/placeholder/800/600"} alt={`Preview of ${project.title}`} className="w-full h-full object-cover" loading="lazy" />
            {videoId && (
              <button onClick={() => setShowVideo(true)} className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/60 transition-colors" aria-label={`Play demo video for ${project.title}`}>
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </button>
            )}
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">{project.category}</Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">{project.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-300">{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-blue-50/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1" title="Timeline">
            <Clock className="w-4 h-4" />
            <span>{project.timeline}</span>
          </div>
          <div className="flex items-center gap-1" title="Team Members">
            <User className="w-4 h-4" />
            <span>{project.team.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          {/* Live Demo Button */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              aria-label={`Visit live demo of ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}

          {/* YouTube Demo Button */}
          {project.youtubeUrl && (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
              aria-label={`Watch demo video of ${project.title} on YouTube`}
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </a>
          )}

          {/* GitHub Button */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              aria-label={`View source code of ${project.title}`}
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ProjectShowcase = () => {
  const [activeFilter, setActiveFilter] = useState("All Projects");

  const filteredProjects = projects.filter((project) => activeFilter === "All Projects" || project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 dark:from-slate-900 dark:via-slate-800 dark:to-zinc-900">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Project Showcase</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Kumpulan project terbaik yang telah dikembangkan oleh mahasiswa Sistem Informasi</p>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className={`px-4 py-2 text-sm cursor-pointer transition-all duration-300
                ${activeFilter === category ? "bg-indigo-500 text-white dark:bg-indigo-600" : "bg-white/80 dark:bg-slate-800/50 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600"}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectShowcase;
