import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MountainIcon = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
};

interface LogoProps {
  text?: string;
  dark?: boolean;
}

/**
 * A functional component representing the logo of the application.
 *
 * @param {string} [text=Logo Text] - The text to be displayed in the logo.
 * @param {boolean} [dark=false] - Whether the logo should be rendered in dark or light mode.
 * @returns - A JSX element representing the logo.
 */
export const Logo = ({
  text = "Logo Text",
  dark = false,
}: Readonly<LogoProps>) => {
  return (
    <Link className="flex items-center gap-2" href="/">
      <MountainIcon className={"h-6 w-6  text-pink-500"} />
      <span
        className={`text-lg font-semibold ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {text}
      </span>
    </Link>
  );
};
