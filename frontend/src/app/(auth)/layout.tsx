/**
 * A layout component for the auth pages.
 *
 * The component renders a centered container that spans the full height of the
 * viewport. The background color of the container is gray-100 in light mode and
 * gray-900 in dark mode.
 *
 * @param {{ readonly children: React.ReactNode; }} props
 * @returns A JSX element representing the auth layout.
 */
const AuthLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default AuthLayout;
