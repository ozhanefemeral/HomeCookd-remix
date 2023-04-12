// tailwind based button with primary, secondary, and tertiary variants

import React, { ComponentProps } from "react";
import clsx from "clsx";
import { Icon } from "@iconify/react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
  icon?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  text,
  icon,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-md font-medium text-white",
        {
          "bg-primary": variant === "primary",
          "bg-transparent": variant === "tertiary" || variant === "secondary",
        },
        {
          underline: variant === "tertiary",
        },
        {
          "!text-primary": variant === "tertiary" || variant === "secondary",
        },
        {
          "border-2 border-primary": variant === "secondary",
        },
        {
          "p-0": variant === "tertiary",
          "px-4 py-2": variant === "primary" || variant === "secondary",
        }
      )}
      {...otherProps}
    >
      {icon && <Icon icon={icon} className="mr-2" />}
      {text}
    </button>
  );
}
