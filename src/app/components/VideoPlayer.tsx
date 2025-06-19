"use client";

import { useState, useEffect } from "react";
import { getYoutubeEmbedUrl } from "@/lib/videos";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, title }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Handle embed URL
  const embedUrl = getYoutubeEmbedUrl(videoId);

  // Enhanced parameters for embed URL
  const enhancedEmbedUrl = `${embedUrl}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1`;

  if (!isMounted) {
    return (
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading player...</span>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}
      <iframe src={enhancedEmbedUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full aspect-video" onLoad={() => setIsLoading(false)} />
    </div>
  );
};

export default VideoPlayer;
