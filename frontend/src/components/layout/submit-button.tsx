"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const Loader = ({ text }: { readonly text: string }) => {
  return (
    <div className="flex items-center space-x-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      <p>{text}</p>
    </div>
  );
};

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

/**
 * A functional component representing a submit button.
 *
 * This component is a wrapper around the Button component that handles
 * pending form submissions. When the form is pending (i.e. submitting), it
 * displays a loading text and disables the button. Otherwise, it displays
 * the regular text and does not disable the button.
 *
 * @param text - The text to display when the form is not pending.
 * @param loadingText - The text to display when the form is pending.
 * @param loading - A boolean indicating whether the form is pending. If
 *   `true`, the button is disabled and the loading text is displayed.
 * @param className - An optional class name to apply to the button.
 *
 * @returns A JSX element representing the submit button.
 */
export const SubmitButton = ({
  text,
  loadingText,
  loading,
  className,
}: Readonly<SubmitButtonProps>) => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={status.pending || loading}
      disabled={status.pending || loading}
      className={cn(className)}>
      {status.pending || loading ?
        <Loader text={loadingText} />
      : text}
    </Button>
  );
};
