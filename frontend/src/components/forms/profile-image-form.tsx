"use client";
import { ImagePicker } from "@/components/layout/image-picker";
import { StrapiErrors } from "@/components/layout/strapi-errors";
import { SubmitButton } from "@/components/layout/submit-button";
import { ZodErrors } from "@/components/layout/zod-errors";
import { uploadProfileImageAction } from "@/data/actions/profile-actions";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

/**
 * A functional component representing the profile image form.
 *
 * @param data - The data required to render the profile image form.
 * @param className - An optional class name for the profile image form.
 * @returns - A JSX element representing the profile image form.
 */
export const ProfileImageForm = ({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) => {
  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id,
  );

  const [formState, formAction] = useActionState(
    uploadProfileImageWithIdAction,
    initialState,
  );

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState?.zodErrors?.image} />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Image" loadingText="Saving Image" />
      </div>
    </form>
  );
};
