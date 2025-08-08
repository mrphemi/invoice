import Link from "next/link";

import { cn } from "@/ui/utils";

type ButtonTheme = "primary" | "secondary" | "tertiary" | "danger" | "ghost";

type ButtonProps = {
  as?: "button" | "link";
  href?: string;
  theme?: ButtonTheme;
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

const ButtonClassMap: Record<ButtonTheme, string> = {
  primary: "bg-primary-indigo text-white hover:bg-accent-lavender",
  secondary:
    "bg-pale-indigo text-cool-blue hover:bg-indigo-tint dark:bg-deep-slate dark:hover:bg-white",
  tertiary:
    "bg-steel-navy text-muted-blue dark:text-indigo-tint hover:bg-midnight-black dark:hover:bg-rich-navy",
  danger: "bg-error-red text-white hover:bg-soft-rose",
  ghost: "bg-pale-indigo text-cool-blue hover:bg-indigo-tint",
};

const commonStyles =
  "body-1 font-bold cursor-pointer h-11 md:h-12 px-6 rounded-3xl inline-flex items-center justify-center";

const Button = ({
  label,
  as,
  href,
  theme = "primary",
  type = "button",
  icon,
  onClick,
  disabled = false,
  className = "",
}: ButtonProps) => {
  if (as === "link") {
    return (
      <Link
        href={href as string}
        className={cn(
          commonStyles,
          ButtonClassMap[theme],
          icon ? "gap-4" : "",
          className
        )}
      >
        {icon && <span className="">{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        commonStyles,
        ButtonClassMap[theme],
        icon ? "gap-4" : "",
        className
      )}
      disabled={disabled}
      type={type}
    >
      {icon && <span className="">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
