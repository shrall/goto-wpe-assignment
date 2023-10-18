import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";

type ContactCardEmptyStateProps = {
  icon: IconType;
  title: string;
  description: string;
} & React.ComponentPropsWithRef<"div">;

const ContactCardEmptyState = React.forwardRef<
  HTMLDivElement,
  ContactCardEmptyStateProps
>(({ className, icon: Icon, title, description, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        "text-center mb-4 py-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg",
        className
      )}
      {...rest}
    >
      <Icon className="mx-auto h-12 w-12" />
      <h3 className="mt-2 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-sm ">{description}</p>
    </div>
  );
});

export default ContactCardEmptyState;
