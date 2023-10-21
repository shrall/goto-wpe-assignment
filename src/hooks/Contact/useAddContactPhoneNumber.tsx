import { useMutation } from "@apollo/client";

import { MUTATION_ADD_PHONE_NUMBER_TO_CONTACT } from "@/queries/Contact";

export default function useAddContactPhoneNumber(args: {
  id: string | string[] | undefined;
  onCompleted: (index: number) => void;
  onError: (error: Error) => void;
}) {
  const [addPhoneNumber] = useMutation(MUTATION_ADD_PHONE_NUMBER_TO_CONTACT);

  const handleAddPhoneNumber = (handlerArgs: {
    index: number;
    number: string;
  }) => {
    addPhoneNumber({
      variables: {
        contact_id: parseInt(args.id as string),
        phone_number: handlerArgs.number,
      },
      onError: (error) => args.onError(error),
      onCompleted: () => args.onCompleted(handlerArgs.index),
    });
  };

  return { handleAddPhoneNumber };
}
