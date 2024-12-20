"use client";
import dynamic from "next/dynamic";

const YouTubePlayer = dynamic(
  () => import("@/components/layout/client-youtube-player/youtube-player"),
  { ssr: false }
);

/**
 * A client-side YouTube player component that renders a video player.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.videoId - The YouTube video ID to be played
 * @returns {JSX.Element} A YouTube player component
 *
 * @example
 * ```tsx
 * <ClientYouTubePlayer videoId="dQw4w9WgXcQ" />
 * ```
 */
const ClientYouTubePlayer = ({ videoId }: { videoId: string }) => {
  return <YouTubePlayer videoId={videoId} />;
};

export default ClientYouTubePlayer;
