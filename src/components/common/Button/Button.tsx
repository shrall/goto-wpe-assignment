import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";
import { BiLoaderAlt } from "react-icons/bi";

const ButtonVariant = ["primary", "light"] as const;

type ButtonProps = {
  isLoading?: boolean;
  icon?: IconType;
  variant?: (typeof ButtonVariant)[number];
  classNames?: {
    icon?: string;
  };
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading = false,
      icon: ButtonIcon,
      variant = "primary",
      classNames,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm",
          variant === "primary" &&
            "border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          variant === "light" &&
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
          className
        )}
        {...rest}
      >
        {isLoading && (
          <BiLoaderAlt className="h-5 w-5 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && (
          <>
            {ButtonIcon && (
              <ButtonIcon
                className={clsx("-ml-1 mr-2 h-5 w-5", classNames?.icon)}
                aria-hidden="true"
              />
            )}
            {children}
          </>
        )}
      </button>
    );
  }
);

export default Button;
