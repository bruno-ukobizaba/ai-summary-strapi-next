import ClientYouTubePlayer from "@/components/layout/client-youtube-player";
import { getSummaryById } from "@/data/loaders";
import { extractYoutubeVideoId } from "@/lib/utils";

export default async function SummarySingleRoute({
  params,
  children,
}: {
  readonly params: any;
  readonly children: React.ReactNode;
}) {
  const { videoId } = await params;
  const data = await getSummaryById(videoId);
  if (data?.error?.status === 404) return <p>No Items Found</p>;
  const videoYTId = extractYoutubeVideoId(data.data.videoId);

  return (
    <div>
      <div className="h-full grid gap-4 grid-cols-5 p-4">
        <div className="col-span-3">{children}</div>
        <div className="col-span-2">
          <ClientYouTubePlayer videoId={videoYTId as string} />
        </div>
      </div>
    </div>
  );
}
