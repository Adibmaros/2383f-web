"use client";
import { Share2 } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button className="p-2 rounded-full hover:bg-gray-200 transition-colors" onClick={handleShare} aria-label="Share this post">
      <Share2 className="w-5 h-5 text-gray-600" />
    </button>
  );
}
