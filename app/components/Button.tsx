// tailwind based button with primary, secondary, and tertiary variants

import clsx from "clsx";
import { Icon } from "@iconify/react";

type ComponentProps = React.ComponentProps<"button">;

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  icon?: string;
  small?: boolean;
  disabled?: boolean;
} & ComponentProps;

export function Button({
  variant = "primary",
  text,
  icon,
  small,
  className,
  disabled,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-md font-medium text-white",
        {
          "bg-gray-300": disabled && variant === "primary",
          "bg-primary": !disabled && variant === "primary",
          "bg-transparent": variant !== "primary",
        },
        {
          underline: variant === "tertiary",
        },
        {
          "text-gray-300": disabled && variant !== "primary",
          "text-primary": !disabled && variant !== "primary",
        },
        {
          "border-2 border-gray-300": disabled && variant !== "tertiary",
          "border-2 border-primary": !disabled && variant !== "tertiary"
        },
        {
          "p-0": variant === "tertiary",
          "box-border px-2 py-1": variant !== "tertiary",
        },
        {
          "cursor-not-allowed": disabled,
        },
        className
      )}
      {...otherProps}
    >
      {icon && <Icon icon={icon} className="mr-2" />}
      {text}
    </button>
  );
}
