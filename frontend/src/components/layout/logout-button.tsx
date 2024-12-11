import { logoutUserAction } from "@/data/actions/auth-actions";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  return (
    <form action={logoutUserAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
};
