// tailwind based button with primary, secondary, and tertiary variants

import React, { ComponentProps } from "react";
import clsx from "clsx";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  text: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  text,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-md px-4 py-2 font-medium text-white",
        {
          "bg-primary": variant === "primary",
          "bg-primary-300": variant === "secondary",
          "bg-transparent": variant === "tertiary",
        },
        {
          underline: variant === "tertiary",
        },
        {
          "!text-primary": variant === "tertiary",
        }
      )}
      {...otherProps}
    >
      {text}
    </button>
  );
}
