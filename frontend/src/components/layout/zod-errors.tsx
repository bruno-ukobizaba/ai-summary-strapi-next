/**
 * A functional component that displays a list of errors from Zod.
 *
 * @param {string[]} error - A list of errors from Zod.
 * @returns - A JSX element that displays the list of errors.
 */
export const ZodErrors = ({ error }: { error: string[] }) => {
  if (!error) return null;

  return error.map((err: string, index: number) => (
    <div
      key={index}
      className="text-pink-500 text-xs italic mt-1 py-2">
      {err}
    </div>
  ));
};
