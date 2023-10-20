import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { toast } from "sonner";

import { ContactData, ContactFormValues } from "@/interfaces/Contact";
import {
  GET_CONTACT_LIST_QUERY,
  MUTATION_ADD_CONTACT,
} from "@/queries/Contact";

export default function useAddContact(args: {
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}) {
  //fetching contact list to check if contact already exists
  const { data: contactData } = useQuery<ContactData>(GET_CONTACT_LIST_QUERY);

  const [addContact, result] = useMutation(MUTATION_ADD_CONTACT);

  const onSubmit = (data: ContactFormValues) => {
    const { firstName, lastName, phones } = data;
    const contactExists = contactData?.contact.some((contact) => {
      return contact.first_name === firstName && contact.last_name === lastName;
    });
    if (contactExists) {
      toast.error("Contact already exists.");
    } else {
      addContact({
        variables: {
          first_name: firstName,
          last_name: lastName,
          phones: phones,
        },
        onError: args.onError,
        onCompleted: () => args.onCompleted(),
      });
    }
  };

  return { onSubmit, ...result };
}
