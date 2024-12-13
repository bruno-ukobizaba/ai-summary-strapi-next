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
 * Generates a data URL from a given file.
 *
 * @param file - The file to be converted into a data URL.
 * @param callback - A function that takes the generated data URL as an argument.
 *                  The callback is called once the data URL is generated.
 */
const generateDataUrl = (file: File, callback: (imageUrl: string) => void) => {
  const reader = new FileReader();
  reader.onload = () => {
    callback(reader.result as string);
  };
  reader.readAsDataURL(file);
};

/**
 * A functional component that renders an image preview using the provided data URL.
 *
 * @param dataUrl - A string representing the data URL of the image to be previewed.
 * @returns A JSX.Element that displays the image with a specific size and styling.
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
 * A functional component that renders an image preview with an overlayed button.
 * The component expects a data URL for the image to be previewed and a React
 * reference to an input element of type file. The component displays the image
 * preview if the data URL is set, otherwise it displays a fallback message. The
 * button is always displayed and can be used to open the file input dialog to
 * select a new image.
 *
 * @param dataUrl - A string representing the data URL of the image to be previewed.
 * @param fileInput - A React reference to an input element of type file.
 *
 * @returns A JSX.Element that displays the image preview along with the button.
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
 * A functional component that renders a label and an input element of type file.
 * The file input element is hidden from view and is used to select a new image.
 * The component renders an ImageCard component that displays the selected image
 * (if any) and a button that can be used to select a new image.
 *
 * @param id - The id attribute for the input element of type file.
 * @param name - The name attribute for the input element of type file.
 * @param label - The label displayed next to the input element of type file.
 * @param defaultValue - The default data URL to display in the ImageCard.
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
