"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Share2, Calendar, Clock, Eye } from "lucide-react";
import VideoPlayer from "@/app/components/VideoPlayer";
import VideoGrid from "@/app/components/VideoGrid";
import { videos, Video } from "@/lib/videos";

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { videoId } = params;

  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Find video and related videos
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundVideo = videos.find((v) => v.id === videoId);

      if (foundVideo) {
        setVideo(foundVideo);

        // Find related videos (same category, excluding current video)
        const related = videos.filter((v) => v.category === foundVideo.category && v.id !== foundVideo.id).slice(0, 3);

        setRelatedVideos(related);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [videoId]);

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: video?.title || "Video Kelas 2383F",
          text: video?.description || "Lihat video dari Kelas 2383F",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link berhasil disalin ke clipboard"))
        .catch((error) => console.log("Error copying to clipboard", error));
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse mb-6" />
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4 w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2 w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6 w-1/3" />
        <div className="h-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    );
  }

  // Not found state
  if (!video) {
    return (
      <div className="max-w-5xl mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Video Tidak Ditemukan</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">Video yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link href="/videos" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Video
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Video Player */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
        <VideoPlayer videoId={video.youtubeId} title={video.title} />
      </motion.div>

      {/* Video Info */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
        <div className="flex flex-wrap items-center justify-between mb-2 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">{video.title}</h1>

          <button
            onClick={handleShare}
            className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Share2 className="w-4 h-4 mr-1.5" />
            Bagikan
          </button>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1.5" />
            <span>{formatDate(video.uploadDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{video.duration}</span>
          </div>
          {video.views && (
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1.5" />
              <span>{video.views.toLocaleString()} tayangan</span>
            </div>
          )}
          <div className="inline-block px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-md">{video.category}</div>
        </div>

        <div className="p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Deskripsi</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{video.description}</p>
        </div>
      </motion.div>

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">Video Terkait</h2>
          <VideoGrid videos={relatedVideos} />
        </motion.div>
      )}
    </div>
  );
}
