"use client";
import ReactPlayer from "react-player/youtube";

/**
 * Generates a complete YouTube video URL from a video ID.
 *
 * @param {Object} params - The parameters object
 * @param {string} params.videoId - The unique identifier of the YouTube video
 * @returns {string} The complete YouTube video URL
 *
 * @example
 * generateYouTubeUrl({ videoId: "dQw4w9WgXcQ" })
 * // Returns: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 */
const generateYouTubeUrl = ({ videoId }: { videoId: string }) => {
  const baseUrl = new URL("https://www.youtube.com/watch");
  baseUrl.searchParams.append("v", videoId);
  return baseUrl.href;
};

interface YouTubePlayerProps {
  videoId: string;
}

/**
 * A component that renders a YouTube player with a specified video ID.
 *
 * @function
 * @param {Object} props - The component props
 * @param {string} props.videoId - The unique identifier of the YouTube video
 * @returns {ReactElement} A React component that renders a YouTube player with the specified video ID
 *
 * @example
 * <YouTubePlayer videoId="dQw4w9WgXcQ" />
 * // Renders a YouTube player with the video ID "dQw4w9WgXcQ"
 */
const YouTubePlayer = ({ videoId }: Readonly<YouTubePlayerProps>) => {
  if (!videoId) return null;
  const videoUrl = generateYouTubeUrl({ videoId });

  return (
    <div className="relative aspect-video rounded-md overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default YouTubePlayer;
