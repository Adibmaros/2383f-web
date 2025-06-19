"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Video } from "@/lib/videos";

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, priority = false }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(video.thumbnailUrl);

  // Pastikan URL thumbnail valid
  useEffect(() => {
    // Fallback jika thumbnailUrl kosong
    if (!video.thumbnailUrl) {
      const fallbackUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
      setThumbnailUrl(fallbackUrl);
    }
  }, [video.thumbnailUrl, video.youtubeId]);

  // Format upload date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Fallback ke thumbnail alternatif jika terjadi error
  const handleImageError = () => {
    setIsImageLoading(false);
    setIsImageError(true);

    // Coba format thumbnail lain
    if (thumbnailUrl.includes("hqdefault.jpg")) {
      setThumbnailUrl(`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`);
    } else if (thumbnailUrl.includes("mqdefault.jpg")) {
      setThumbnailUrl(`https://img.youtube.com/vi/${video.youtubeId}/0.jpg`);
    } else {
      // Fallback ke placeholder
      setThumbnailUrl("/images/video-placeholder.jpg");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative bg-white/90 dark:bg-slate-800/80 backdrop-blur-sm 
                rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                transition-all duration-300 h-full flex flex-col
                border border-white/20 dark:border-slate-700/50
                hover:border-indigo-200 dark:hover:border-indigo-700/50"
    >
      {/* Badge for category */}
      <div className="absolute top-2 right-2 z-20">
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 backdrop-blur-md">{video.category}</span>
      </div>

      {/* Thumbnail Section */}
      <div className="relative aspect-video w-full overflow-hidden">
        {/* Background gradient while image loads */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 
                    dark:from-indigo-900/30 dark:to-purple-900/30
                    ${isImageLoading ? "opacity-100" : "opacity-0"} 
                    transition-opacity duration-300`}
        />

        {/* Thumbnail Image */}
        <Link href={`/videos/${video.id}`} className="block w-full h-full">
          <div className="relative w-full h-full overflow-hidden">
            {/* Debug: Console log untuk melihat URL yang digunakan */}

            <Image
              src={thumbnailUrl}
              alt={`Thumbnail for ${video.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className={`object-cover transition-all duration-300 
                        ${isImageLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"}
                        group-hover:scale-110`}
              onLoad={() => setIsImageLoading(false)}
              onError={handleImageError}
              priority={priority}
              unoptimized={true} // Gunakan unoptimized untuk external images
            />

            {/* Backup fallback jika image tidak ada */}
            {isImageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Play className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}

            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-600/90 hover:bg-indigo-700 transition-colors duration-200 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/videos/${video.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">{video.title}</h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">{video.description}</p>

        {/* Video metadata */}
        <div className="mt-auto flex flex-col space-y-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            <span>{formatDate(video.uploadDate)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5" />
            <span>{video.duration}</span>
            {video.views && <span className="ml-2">• {video.views.toLocaleString()} tayangan</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
