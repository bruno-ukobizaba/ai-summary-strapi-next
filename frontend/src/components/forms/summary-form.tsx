"use client";

import { SubmitButton } from "@/components/layout/submit-button";
import { Input } from "@/components/ui/input";
import { generateSummaryService } from "@/data/services/summary-service";
import { cn, extractYoutubeVideoId } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface StrapiErrorsProps {
  message: string | null;
  name: string;
}

const initialState = {
  message: null,
  name: "",
};

const SummaryForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(initialState);
  const [value, setValue] = useState<string>("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const videoId = formData.get("videoId") as string;

    const processedVideoId = extractYoutubeVideoId(videoId);

    if (!processedVideoId) {
      toast.error("Invalid YouTube video ID or URL");
      setLoading(false);
      setValue("");
      setError({
        ...initialState,
        message: "Invalid YouTube video ID or URL",
        name: "Invalid Id",
      });
      return;
    }

    toast.success("Generating summary...");

    const summaryResponseData = await generateSummaryService(processedVideoId);
    console.log(summaryResponseData, "Response from route handler");

    if (summaryResponseData.error) {
      toast.error(summaryResponseData.error);
      setLoading(false);
      setValue("");
      setError({
        ...initialState,
        message: summaryResponseData.error,
        name: "Summary Error",
      });
      return;
    }

    toast.success("Summary generated successfully!");
    setLoading(false);
  };

  const clearError = () => {
    setError(initialState);
    if (error.message) setValue("");
  };

  const errorStyles =
    error.message ?
      "outline-1 outline outline-red-500 placeholder:text-red-700"
    : "";

  return (
    <div className="w-full max-w-[960px]">
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 items-center justify-center">
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "Youtube Video ID or URL"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onMouseDown={clearError}
          className={cn(
            "w-full focus:text-black focus-visible:ring-pink-500",
            errorStyles
          )}
          required
        />

        <SubmitButton
          text="Create Summary"
          loadingText="Creating Summary"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default SummaryForm;
