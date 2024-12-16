import { getAuthToken } from "@/data/services/get-token";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { NextRequest } from "next/server";

/**
 * Handle a POST request to the /api/summarize route.
 *
 * This endpoint takes a YouTube video ID as a JSON body and returns the
 * transcript for that video ID. It requires authentication.
 *
 * @param {NextRequest} req - The NextRequest object
 * @returns {Promise<Response>} - A response containing the transcript of the video
 *   or an error message if authentication fails or an error occurs.
 */
export const POST = async (req: NextRequest) => {
  const user = await getUserMeLoader();
  const authToken = await getAuthToken();
  if (!authToken || user.ok === false) {
    return new Response(
      JSON.stringify({ data: null, error: "Not authenticated" }),
      {
        status: 401,
      }
    );
  }

  if (user.data.credits < 1) {
    return new Response(
      JSON.stringify({ data: null, error: "Not enough credits" }),
      {
        status: 402,
      }
    );
  }

  const body = await req.json();
  const videoId = body.videoId;
  const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;

  let transcriptData;

  try {
    const transcript = await fetch(url);
    transcriptData = await transcript.text();
  } catch (error) {
    console.error("Error processing request:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error }), {
        status: 500,
      });
    }
    return new Response(
      JSON.stringify({ error: "An unknown error occurred" }),
      {
        status: 500,
      }
    );
  }
  return new Response(JSON.stringify({ transcript: transcriptData }), {
    status: 200,
  });
};
