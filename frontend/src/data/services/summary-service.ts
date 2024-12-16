/**
 * Generates a summary for a given video ID using the Strapi API.
 *
 * @param videoId - The ID of the video for which a summary is to be generated.
 * @returns A promise that resolves to an object containing the generated summary
 *          text and an error object with a message if an error occurs.
 */
export const generateSummaryService = async (videoId: string) => {
  const url = "/api/summarize";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId: videoId }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error generating summary:", error);
    if (error instanceof Error) return { error: { message: error.message } };
    return { data: null, error: { message: "An unknown error occurred" } };
  }
};
