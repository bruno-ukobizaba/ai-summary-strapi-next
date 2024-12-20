"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, TrashIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

/**
 * A functional component that displays a loading animation.
 *
 * This component is a convenience wrapper around the Loader2 component from
 * lucide-react. It renders a Loader2 in a div with flexbox layout, which
 * centers the loading animation horizontally and vertically.
 *
 * @returns A JSX element representing the loading animation.
 */
const Loader = () => {
  return (
    <div className="flex items-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
};

interface DeleteButtonProps {
  className?: string;
}

/**
 * A functional component that displays a "delete" button.
 *
 * This component displays a TrashIcon when the form is not pending and a
 * Loader when the form is pending.
 *
 * @param className - An optional class name to apply to the button.
 *
 * @returns A JSX element representing the delete button.
 */
export const DeleteButton = ({ className }: Readonly<DeleteButtonProps>) => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={status.pending}
      disabled={status.pending}
      className={cn(className)}>
      {status.pending ?
        <Loader />
      : <TrashIcon className="w-4 h-4" />}
    </Button>
  );
};
