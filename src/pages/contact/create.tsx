import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "sonner";

import useAddContact from "@/hooks/Contact/useAddContact";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { REGEX } from "@/constant/regex";
import { ContactFormValues } from "@/interfaces/Contact";

function ContactCreatePage() {
  const router = useRouter();

  const methods = useForm<ContactFormValues>({
    defaultValues: {
      phones: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "phones",
    rules: {
      required: "There should at least be one phone number",
    },
  });

  const { onSubmit, loading } = useAddContact({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      router.push("/");
      toast.success("Contact added successfully.");
    },
  });

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl min-h-screen py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Create new contact
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add a new contact to your phonebook.
                  </p>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="grid grid-cols-6 gap-x-6 gap-y-4">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        label="First name"
                        id="firstName"
                        validation={{
                          required: "First name is required.",
                          pattern: {
                            value: REGEX.NO_SPECIAL_CHARACTERS,
                            message:
                              "First name cannot contain special characters.",
                          },
                        }}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        label="Last name"
                        id="lastName"
                        validation={{
                          required: "Last name is required.",
                          pattern: {
                            value: REGEX.NO_SPECIAL_CHARACTERS,
                            message:
                              "Last name cannot contain special characters.",
                          },
                        }}
                      />
                    </div>

                    {fields.map((field, index) => {
                      return (
                        <div
                          key={field.id}
                          className="col-span-6 sm:col-span-4 flex items-center"
                        >
                          <Input
                            label={`Phone ${index + 1}`}
                            id={`phones.${index}.number`}
                            validation={{
                              required: "Phone number cannot be empty.",
                            }}
                          />
                          <button
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <AiFillDelete className="h-5 w-5 ml-2 text-red-600" />
                          </button>
                        </div>
                      );
                    })}
                    <div className="col-span-6 sm:col-span-4">
                      <button
                        onClick={() => {
                          append({ number: "" });
                        }}
                        type="button"
                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-2 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="block text-sm font-medium text-gray-900">
                          + Add a new number
                        </span>
                      </button>
                      {methods.formState.errors.phones ? (
                        <p className="text-sm text-red-500 mt-1">
                          {methods.formState.errors.phones.root?.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="light">
                <Link href="/">Cancel</Link>
              </Button>
              <Button isLoading={loading} type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ContactCreatePage;
