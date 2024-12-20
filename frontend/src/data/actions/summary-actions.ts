"use server";

import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Payload {
  data: {
    title?: string;
    videoId: string;
    summary: string;
  };
}

/**
 * Creates a new summary using the provided form data and redirects the user
 * to the new summary route with the document id.
 *
 * @param payload - The form data containing the summary details
 * @returns A promise that resolves to the newly created summary document
 */
export const createSummaryAction = async (payload: Payload) => {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("POST", "/api/summaries", payload);
  redirect("/dashboard/summaries/" + data.data.documentId);
};

/**
 * Updates an existing summary using the provided form data and returns
 * the updated state with a success message. If any error occurs during
 * the process, the corresponding error message will be included in the
 * returned object.
 *
 * @param prevState - The previous state of the application
 * @param formData - The form data containing the updated summary details
 * @returns A promise that resolves to an object containing the updated state,
 *          data, error messages, and a success message. If any error occurs
 *          during the process, the corresponding error message will be
 *          included in the returned object.
 */
export const updateSummaryAction = async (
  prevState: any,
  formData: FormData
) => {
  const rawFormData = Object.fromEntries(formData);
  const id = rawFormData.id as string;

  const payload = {
    data: {
      title: rawFormData.title,
      summary: rawFormData.summary,
    },
  };

  const responseData = await mutateData("PUT", `/api/summaries/${id}`, payload);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Update Summary.",
    };
  }

  revalidatePath("/dashboard/summaries");
  return {
    ...prevState,
    message: "Summary Updated Successfully.",
    data: responseData,
    strapiErrors: null,
  };
};

/**
 * Deletes a summary by its id.
 *
 * @param id - The id of the summary to delete.
 * @param prevState - The current state of the application.
 * @returns A promise that resolves to the updated state of the application,
 *          or an error message if something fails.
 */
export const deleteSummaryAction = async (id: string, prevState: any) => {
  const responseData = await mutateData("DELETE", `/api/summaries/${id}`);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      message: "Oops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Delete Summary.",
    };
  }

  redirect("/dashboard/summaries");
};
