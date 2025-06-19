import VideoCard from "./VideoCard";
import { Video } from "@/lib/videos";

interface VideoGridProps {
  videos: Video[];
  className?: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, className = "" }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">Tidak ada video yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} priority={index < 4} />
      ))}
    </div>
  );
};

export default VideoGrid;
