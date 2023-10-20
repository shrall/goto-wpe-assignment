import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { AiFillSave } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "sonner";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

import { REGEX } from "@/constant/regex";
import { ContactData, ContactDetails } from "@/interfaces/Contact";
import {
  GET_CONTACT_DETAILS_QUERY,
  GET_CONTACT_LIST_QUERY,
  MUTATION_ADD_PHONE_NUMBER_TO_CONTACT,
  MUTATION_EDIT_CONTACT,
  MUTATION_EDIT_CONTACT_PHONE_NUMBER,
} from "@/queries/Contact";

type FormValues = {
  firstName: string;
  lastName: string;
  phones: {
    number: string;
  }[];
};

function ContactEditPage() {
  const router = useRouter();
  const id = router.query.id;

  const methods = useForm<FormValues>({});
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

  const { data: contactDetails } = useQuery<ContactDetails>(
    GET_CONTACT_DETAILS_QUERY,
    {
      variables: { id: id },
      onCompleted: (data) => {
        methods.setValue("firstName", data.contact_by_pk.first_name);
        methods.setValue("lastName", data.contact_by_pk.last_name);
        methods.setValue("phones", data.contact_by_pk.phones);
        setInputDisabled(data.contact_by_pk.phones.map(() => true));
      },
    }
  );

  const { data: contactData } = useQuery<ContactData>(GET_CONTACT_LIST_QUERY);
  const [editContact, { loading: nameLoading }] = useMutation(
    MUTATION_EDIT_CONTACT
  );
  const [editContactPhoneNumber] = useMutation(
    MUTATION_EDIT_CONTACT_PHONE_NUMBER
  );

  const onSubmit = (data: FormValues) => {
    const { firstName, lastName } = data;
    const contactExists = contactData?.contact.some((contact) => {
      return (
        contact.id !== parseInt(id as string) &&
        contact.first_name === firstName &&
        contact.last_name === lastName
      );
    });
    if (contactExists) {
      toast.error("Contact already exists.");
    } else {
      editContact({
        variables: {
          id: id,
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
        onError: (error) => {
          toast.error(error.message);
        },
        onCompleted: () => {
          router.push("/");
          toast.success("Contact edited successfully.");
        },
      });
    }
  };

  const handleUpdatePhoneNumber = (index: number, number: string) => {
    editContactPhoneNumber({
      variables: {
        pk_columns: {
          contact_id: id,
          number: contactDetails?.contact_by_pk.phones[index].number,
        },
        new_phone_number: number,
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success("Phone number edited successfully.");
        setInputDisabled(
          inputDisabled.map((value, i) => (i === index ? true : value))
        );
      },
    });
  };

  const [addPhoneNumber] = useMutation(MUTATION_ADD_PHONE_NUMBER_TO_CONTACT);
  const handleAddPhoneNumber = (index: number, number: string) => {
    addPhoneNumber({
      variables: {
        contact_id: id,
        phone_number: number,
      },
      onError: (error) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success("Phone number added successfully.");
        setInputDisabled(
          inputDisabled.map((value, i) => (i === index ? true : value))
        );
      },
    });
  };

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
                                    ? handleAddPhoneNumber(
                                        index,
                                        methods.getValues(
                                          `phones.${index}.number`
                                        )
                                      )
                                    : handleUpdatePhoneNumber(
                                        index,
                                        methods.getValues(
                                          `phones.${index}.number`
                                        )
                                      )
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

export default ContactEditPage;
