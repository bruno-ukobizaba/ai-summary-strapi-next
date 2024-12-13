interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

/**
 * A functional component that displays error messages from Strapi.
 *
 * @param error - An object containing the error details from Strapi.
 * @returns A JSX element displaying the error message in styled text, or null if no message exists.
 */
export const StrapiErrors = ({
  error,
}: {
  readonly error: StrapiErrorsProps;
}) => {
  if (!error?.message) return null;
  return (
    <div className="text-pink-500 text-md italic py-2">{error.message}</div>
  );
};
