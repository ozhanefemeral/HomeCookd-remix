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
        "rounded-md font-medium text-white",
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
      {text}
    </button>
  );
}
