import { LogoutButton } from "@/components/layout/logout-button";

const DashboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1>Dashboard</h1>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
