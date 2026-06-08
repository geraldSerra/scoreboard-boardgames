import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "outline";
  /** true when placed on a dark background (affects outline text colour) */
  dark?: boolean;
  className?: string;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  dark = false,
  className = "",
}: Props) => {
  const base =
    "flex h-[52px] items-center justify-center rounded-[12px] px-5 text-[17px] font-bold tracking-wide transition-colors";

  let v: string;
  if (disabled) {
    v = `cursor-not-allowed border-2 bg-transparent text-graysoft ${
      dark ? "border-secondary" : "border-lightgray"
    }`;
  } else if (variant === "primary") {
    v = "bg-accent text-primary";
  } else {
    v = `border-2 border-secondary ${dark ? "text-white" : "text-secondary"}`;
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${v} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
