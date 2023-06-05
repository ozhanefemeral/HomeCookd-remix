// tailwind based button with primary, secondary, and tertiary variants

import React, { ComponentProps } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  icon?: string;
  small?: boolean;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  text,
  icon,
  small,
  className,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-md font-medium text-white",
        {
          "bg-primary": variant === "primary",
          "bg-transparent": variant !== "primary",
        },
        {
          underline: variant === "tertiary",
        },
        {
          "!text-primary": variant !== "primary",
        },
        {
          "border-2 border-primary": variant !== "tertiary",
        },
        {
          "p-0": variant === "tertiary",
          "px-2 py-1 box-border": variant !== "tertiary",
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
