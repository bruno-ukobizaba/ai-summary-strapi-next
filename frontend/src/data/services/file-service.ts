/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "@/data/services/get-token";
import { mutateData } from "@/data/services/mutate-data";
import { getStrapiURL } from "@/lib/utils";

/**
 * Deletes an image file from the Strapi server using the specified image ID.
 *
 * @param {string} imageId - The ID of the image to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating the success status of the deletion.
 * @throws {Error} - Throws an error if no authentication token is found or if the deletion fails.
 */
export async function fileDeleteService(imageId: string) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
  return data;
}

/**
 * Uploads an image file to the Strapi server.
 *
 * @param {any} image - The image file to be uploaded. Must be a File or Blob object.
 * @returns {Promise<any>} - A promise that resolves to the server's response data after the image is uploaded.
 * @throws {Error} - Throws an error if no authentication token is found or if the upload fails.
 */
export async function fileUploadService(image: any) {
  const authToken = await getAuthToken();
  if (!authToken) throw new Error("No auth token found");

  const baseUrl = getStrapiURL();
  const url = new URL("/api/upload", baseUrl);

  const formData = new FormData();
  formData.append("files", image, image.name);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${authToken}` },
      method: "POST",
      body: formData,
    });

    const dataResponse = await response.json();

    return dataResponse;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
