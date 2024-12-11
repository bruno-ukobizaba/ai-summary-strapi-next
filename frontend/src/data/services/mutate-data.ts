/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthToken } from "@/data/services/get-token";
import { getStrapiURL } from "@/lib/utils";

export const mutateData = async (method: string, path: string, payload?: any) => {
const baseUrl = getStrapiURL();
const authToken =  await getAuthToken();
const url = new URL(path, baseUrl);

if (!authToken) throw new Error("No auth token found");

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: payload? JSON.stringify(payload) : undefined,
        });

        if (method === "DELETE") return response.ok;

        const data = await response?.json();
        return data;
    } catch (error) {   
        console.error("Error fetching data:", error);
        throw error;
    }
}