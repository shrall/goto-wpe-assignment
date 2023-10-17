import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";

type ButtonLinkProps = {
  icon?: IconType;
  classNames?: {
    icon?: string;
  };
} & React.ComponentPropsWithRef<"a">;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ children, className, icon: ButtonIcon, classNames, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          className
        )}
        {...rest}
      >
        {ButtonIcon && (
          <ButtonIcon
            className={clsx("-ml-1 mr-2 h-5 w-5", classNames?.icon)}
            aria-hidden="true"
          />
        )}
        {children}
      </a>
    );
  }
);

export default ButtonLink;
