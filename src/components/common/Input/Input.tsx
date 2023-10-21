import clsx from "clsx";
import get from "lodash.get";
import * as React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";

export type InputProps = {
  label: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  validation?: RegisterOptions;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({
  label,
  id,
  type = "text",
  validation,
  className,
  ...rest
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-normal text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          {...register(id, validation)}
          id={id}
          type={type}
          className={clsx(
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
            "bg-white disabled:bg-gray-100",
            "block w-full rounded-md shadow-sm",
            className
          )}
          {...rest}
        />

        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <RiErrorWarningFill className="text-xl text-red-500" />
          </div>
        )}
      </div>
      <div className="mt-1">
        {error && (
          <span className="text-sm text-red-500">
            {error.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
}
