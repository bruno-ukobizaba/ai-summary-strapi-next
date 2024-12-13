import { LogoutButton } from "@/components/layout/logout-button";

/**
 * A functional component representing the dashboard page.
 *
 * This component renders a simple page with an h1 element containing the text
 * "Dashboard" and a LogoutButton component.
 *
 * @returns A JSX element representing the dashboard page.
 */
const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
