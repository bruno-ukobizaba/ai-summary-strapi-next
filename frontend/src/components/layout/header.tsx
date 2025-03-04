import { Logo } from "@/components/layout/logo";
import { LogoutButton } from "@/components/layout/logout-button";
import { Button } from "@/components/ui/button";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import Link from "next/link";
import { SummaryForm } from "../forms/summary-form";
import { LanguageSwitcher } from "./language-switcher";

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

export const Header = async ({ data }: Readonly<HeaderProps>) => {
  const { logoText, ctaButton } = data;
  const user = await getUserMeLoader();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      {user.ok && <SummaryForm />}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
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
