import { Logo } from "@/components/layout/logo";
import { LogoutButton } from "@/components/layout/logout-button";
import { Button } from "@/components/ui/button";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import Link from "next/link";
import { SummaryForm } from "../forms/summary-form";

interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}

interface AuthUserProps {
  username: string;
  email: string;
}

/**
 * A functional component representing the logged-in user.
 *
 * @param userData - The data of the logged-in user.
 * @returns - A JSX element representing the logged-in user.
 */
export const LoggedInUser = ({
  userData,
}: {
  readonly userData: AuthUserProps;
}) => {
  return (
    <div className="flex gap-2">
      <Link
        href={"/dashboard/account"}
        className="font-semibold hover:text-primary">
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
};

/**
 * A functional component representing the header of the application.
 *
 * @param data - The data required to render the header.
 * @returns - A JSX element representing the header.
 */
export const Header = async ({ data }: Readonly<HeaderProps>) => {
  const { logoText, ctaButton } = data;
  const user = await getUserMeLoader();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      {user.ok && <SummaryForm />}
      <div className="flex items-center gap-4">
        {user.ok ?
          <LoggedInUser userData={user.data} />
        : <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        }
      </div>
    </div>
  );
};
