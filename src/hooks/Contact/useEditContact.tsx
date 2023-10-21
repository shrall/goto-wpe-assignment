import { useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";

import { ContactData, ContactFormValues } from "@/interfaces/Contact";
import {
  GET_CONTACT_LIST_QUERY,
  MUTATION_EDIT_CONTACT,
} from "@/queries/Contact";

export default function useEditContact(args: {
  id: string | string[] | undefined;
  onCompleted: () => void;
  onError: (error: Error) => void;
}) {
  const { data: contactData } = useQuery<ContactData>(GET_CONTACT_LIST_QUERY);
  const [editContact, result] = useMutation(MUTATION_EDIT_CONTACT);

  const onSubmit = (data: ContactFormValues) => {
    const { firstName, lastName } = data;
    const contactExists = contactData?.contact.some((contact) => {
      return (
        contact.id !== parseInt(args.id as string) &&
        contact.first_name === firstName &&
        contact.last_name === lastName
      );
    });
    if (contactExists) {
      toast.error("Contact already exists.");
    } else {
      editContact({
        variables: {
          id: parseInt(args.id as string),
          _set: {
            first_name: firstName,
            last_name: lastName,
          },
        },
        onError: (error) => args.onError(error),
        onCompleted: () => args.onCompleted(),
      });
    }
  };

  return { onSubmit, ...result };
}
