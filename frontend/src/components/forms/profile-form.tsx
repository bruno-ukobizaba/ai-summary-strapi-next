"use client";

import { StrapiErrors } from "@/components/layout/strapi-errors";
import { updateProfileAction } from "@/data/actions/profile-actions";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

import { SubmitButton } from "@/components/layout/submit-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  credits: number;
}

/**
 * A functional component representing a count box.
 *
 * @param text - The number to be displayed in the count box.
 * @returns - A JSX element representing the count box.
 */
const CountBox = ({ text }: { readonly text: number }) => {
  const style = "font-bold text-md mx-1";
  const color = text > 0 ? "text-primary" : "text-red-500";

  return (
    <div className="flex items-center justify-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none">
      You have<span className={cn(style, color)}>{text}</span>credit(s)
    </div>
  );
};

const INITIAL_STATE = {
  data: null,
  strapiErrors: null,
  message: null,
};

/**
 * A functional component representing the profile form.
 *
 * @param data - The data required to render the profile form.
 * @param className - An optional class name for the profile form.
 * @returns - A JSX element representing the profile form.
 */
export const ProfileForm = ({
  data,
  className,
}: {
  readonly data: ProfileFormProps;
  readonly className?: string;
}) => {
  const updateProfileWithId = updateProfileAction.bind(null, data.id);
  const [formState, formAction] = useActionState(
    updateProfileWithId,
    INITIAL_STATE,
  );

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <div className="space-y-4 grid ">
        <div className="grid grid-cols-3 gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Username"
            defaultValue={data?.username || ""}
            disabled
          />
          <Input
            id="email"
            name="email"
            placeholder="Email"
            defaultValue={data?.email || ""}
            disabled
          />
          <CountBox text={data?.credits} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            defaultValue={data?.firstName || ""}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            defaultValue={data?.lastName || ""}
          />
        </div>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Write your bio here..."
          className="resize-none border rounded-md w-full h-[224px] p-2"
          defaultValue={data?.bio || ""}
          required
        />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Profile" loadingText="Saving Profile" />
      </div>
      <StrapiErrors error={formState?.strapiErrors} />
    </form>
  );
};
