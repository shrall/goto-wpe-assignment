import { useQuery } from "@apollo/client";

import { ContactDetails } from "@/interfaces/Contact";
import { GET_CONTACT_DETAILS_QUERY } from "@/queries/Contact";

export default function useGetContactDetails(args: {
  id: string | string[] | undefined;
  onCompleted: (data: ContactDetails) => void;
  onError: (error: Error) => void;
}) {
  const result = useQuery<ContactDetails>(GET_CONTACT_DETAILS_QUERY, {
    variables: { id: parseInt(args.id as string) },
    onCompleted: (data) => args.onCompleted(data),
    onError: (error) => args.onError(error),
  });
  return result;
}
