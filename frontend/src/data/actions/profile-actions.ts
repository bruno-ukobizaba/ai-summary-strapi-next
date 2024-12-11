"use server";
import qs from "qs";
import { mutateData } from "@/data/services/mutate-data";
import { revalidatePath } from "next/cache";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfileAction = async (userId: string, prevState: any, formData: FormData) => {
 const rawFormData = Object.fromEntries(formData);

 const query = qs.stringify({
     populate: "*",
 });

 const payload = {
    firstName: rawFormData.firstName,
    lastName: rawFormData.lastName,
    bio: rawFormData.bio,
 };

 const responseData = await mutateData("PUT", `/api/users/${userId}?${query}`, payload);

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
        message: "Failed to update profile.",
     };
 }
 // Revalidate the dashboard cache to update the user's profile information
 revalidatePath(`/dashboard/account`);


 return {
    ...prevState,
    message: "Profile updated successfully.",
    data: responseData,
    strapiErrors: null,
 }
}