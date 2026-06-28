import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = ({
  variant = "primary",
  className,
  children,
  ...rest
}: Props) => {
  const ButtonStyles = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary: "bg-surface border border-surface text-text-primary hover:bg-surface/20",
    danger: "bg-danger text-white hover:bg-danger/20",
  };

  return (
    <button
      {...rest}
      className={cn(
        "px-4 py-2 rounded-md font-bold transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed",
        className,
        ButtonStyles[variant],
      )}
    >
      {children}
    </button>
  );
};

export default Button;
