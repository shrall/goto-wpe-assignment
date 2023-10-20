import { useMutation } from "@apollo/client";

import { MUTATION_EDIT_CONTACT_PHONE_NUMBER } from "@/queries/Contact";

export default function useEditContactPhoneNumber(args: {
  id: string | string[] | undefined;
  onCompleted: (index: number) => void;
  onError: (error: Error) => void;
}) {
  const [editContactPhoneNumber] = useMutation(
    MUTATION_EDIT_CONTACT_PHONE_NUMBER
  );

  const handleUpdatePhoneNumber = (handlerArgs: {
    index: number;
    newNumber: string;
    oldPhoneNumber: string;
  }) => {
    editContactPhoneNumber({
      variables: {
        pk_columns: {
          contact_id: args.id,
          number: handlerArgs.oldPhoneNumber,
        },
        new_phone_number: handlerArgs.newNumber,
      },
      onError: (error) => args.onError(error),
      onCompleted: () => args.onCompleted(handlerArgs.index),
    });
  };

  return { handleUpdatePhoneNumber };
}
