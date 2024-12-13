import { logoutUserAction } from "@/data/actions/auth-actions";
import { LogOut } from "lucide-react";

/**
 * A functional component representing a button that logs out the current user.
 *
 * This component uses the `logoutUserAction` action to log out the user.
 *
 * @returns - A JSX element representing a button that logs out the user.
 */
export const LogoutButton = () => {
  return (
    <form action={logoutUserAction}>
      <button type="submit">
        <LogOut className="w-6 h-6 hover:text-primary" />
      </button>
    </form>
  );
};
