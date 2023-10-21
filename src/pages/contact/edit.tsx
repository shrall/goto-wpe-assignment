import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "sonner";

import useAddContactPhoneNumber from "@/hooks/Contact/useAddContactPhoneNumber";
import useEditContact from "@/hooks/Contact/useEditContact";
import useEditContactPhoneNumber from "@/hooks/Contact/useEditContactPhoneNumber";
import useGetContactDetails from "@/hooks/Contact/useGetContactDetails";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { REGEX } from "@/constant/regex";
import { ContactFormValues } from "@/interfaces/Contact";

function EditContactPage() {
  const router = useRouter();
  const id = router.query.id;

  const methods = useForm<ContactFormValues>({});
  const { fields, append } = useFieldArray({
    control: methods.control,
    name: "phones",
    rules: {
      required: "There should at least be one phone number",
    },
  });

  const [inputDisabled, setInputDisabled] = useState<boolean[]>(
    fields.map(() => true)
  );
  const toggleEdit = (index: number) => {
    const updatedDisabledState = [...inputDisabled];
    updatedDisabledState[index] = !updatedDisabledState[index];
    setInputDisabled(updatedDisabledState);
  };

  const { data: contactDetails } = useGetContactDetails({
    id: id,
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: (data) => {
      methods.setValue("firstName", data.contact_by_pk.first_name);
      methods.setValue("lastName", data.contact_by_pk.last_name);
      methods.setValue("phones", data.contact_by_pk.phones);
      setInputDisabled(data.contact_by_pk.phones.map(() => true));
    },
  });

  const { onSubmit, loading: nameLoading } = useEditContact({
    id: id,
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      router.push("/");
      toast.success("Contact updated successfully.");
    },
  });

  const { handleUpdatePhoneNumber } = useEditContactPhoneNumber({
    id: id,
    onCompleted: (index) => {
      setInputDisabled(
        inputDisabled.map((value, i) => (i === index ? true : value))
      );
      toast.success("Phone number updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { handleAddPhoneNumber } = useAddContactPhoneNumber({
    id: id,
    onCompleted: (index) => {
      setInputDisabled(
        inputDisabled.map((value, i) => (i === index ? true : value))
      );
      toast.success("Phone number added successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
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
                            disabled={inputDisabled[index]}
                          />
                          {inputDisabled[index] && (
                            <button
                              onClick={() => toggleEdit(index)}
                              type="button"
                            >
                              <AiFillEdit className="h-5 w-5 ml-2 text-indigo-600" />
                            </button>
                          )}
                          {!inputDisabled[index] &&
                            contactDetails?.contact_by_pk && (
                              <button
                                onClick={() =>
                                  contactDetails.contact_by_pk.phones.length <
                                  index + 1
                                    ? handleAddPhoneNumber({
                                        index,
                                        number: methods.getValues(
                                          `phones.${index}.number`
                                        ),
                                      })
                                    : handleUpdatePhoneNumber({
                                        index,
                                        newNumber: methods.getValues(
                                          `phones.${index}.number`
                                        ),
                                        oldPhoneNumber:
                                          contactDetails.contact_by_pk.phones[
                                            index
                                          ].number,
                                      })
                                }
                                type="button"
                              >
                                <AiFillSave className="h-5 w-5 ml-2 text-indigo-600" />
                              </button>
                            )}
                        </div>
                      );
                    })}
                    <div className="col-span-6 sm:col-span-4">
                      <button
                        onClick={() => {
                          append({ number: "" });
                          setInputDisabled([...inputDisabled, false]);
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
              <Button isLoading={nameLoading} type="submit" variant="primary">
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default EditContactPage;
