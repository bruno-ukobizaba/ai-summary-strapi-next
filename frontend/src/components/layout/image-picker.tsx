"use client";

import { StrapiImage } from "@/components/strapi-image";
import React, { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImagePickerProps {
  id: string;
  name: string;
  label: string;
  showCard?: boolean;
  defaultValue?: string;
}

/**
 * Converts a file to a data URL and triggers a callback with the resulting URL.
 *
 * @param file - The file to be converted into a data URL.
 * @param callback - A function to be called with the resulting data URL as a string.
 */
const generateDataUrl = (file: File, callback: (imageUrl: string) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    callback(reader.result as string);
  };
  reader.readAsDataURL(file);
};

/**
 * A functional component that renders a preview of an image.
 *
 * @param dataUrl - The URL of the image to be displayed in the preview.
 * @returns A JSX element containing the image rendered with specified dimensions and styling.
 */
const ImagePreview = ({ dataUrl }: { readonly dataUrl: string }) => {
  return (
    <StrapiImage
      src={dataUrl}
      alt="Image Preview"
      height={200}
      width={200}
      className="rounded-lg w-full object-cover"
    />
  );
};

/**
 * A functional component that displays an image preview within a card layout.
 * If no image is selected, it shows a placeholder message.
 *
 * @param dataUrl - The URL of the image to be displayed in the preview.
 * @param fileInput - A ref to the file input element, allowing interaction for image selection.
 * @returns A JSX element representing the image card with a preview and interaction capabilities.
 */
const ImageCard = ({
  dataUrl,
  fileInput,
}: {
  readonly dataUrl: string;
  readonly fileInput: React.RefObject<HTMLInputElement>;
}) => {
  const imagePreview = dataUrl ? (
    <ImagePreview dataUrl={dataUrl} />
  ) : (
    <p>No image selected</p>
  );
  return (
    <div className="w-full relative">
      <div className=" flex items-center space-x-4 rounded-md border p-4">
        {imagePreview}
      </div>
      <button
        onClick={() => fileInput.current?.click()}
        className="w-full absolute inset-0"
        type="button"
      ></button>
    </div>
  );
};

/**
 * A functional component for selecting and previewing images.
 *
 * @param id - The unique identifier for the input element.
 * @param name - The name attribute for the input element.
 * @param label - The label displayed for the image input.
 * @param defaultValue - An optional default URL for the image preview.
 * @returns A JSX element that includes a hidden file input and an image preview card.
 */
export const ImagePicker = ({
  id,
  name,
  label,
  defaultValue,
}: Readonly<ImagePickerProps>) => {
  const [dataUrl, setDataUrl] = useState<string | null>(defaultValue ?? null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      generateDataUrl(file, setDataUrl);
    }
  };

  return (
    <React.Fragment>
      <div className="hidden">
        <Label htmlFor={name}>{label}</Label>
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          accept="image/*"
        />
      </div>
      <ImageCard
        dataUrl={dataUrl ?? ""}
        fileInput={fileInput as React.RefObject<HTMLInputElement>}
      />
    </React.Fragment>
  );
};
