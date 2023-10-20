import { useQuery } from "@apollo/client";
import React from "react";

import { Contact, ContactData } from "@/interfaces/Contact";
import { GET_CONTACT_LIST_QUERY } from "@/queries/Contact";

interface UseGetContactListProps {
  favorites?: Contact[];
  debouncedSearchQuery?: string;
}

export function useGetContactList({
  favorites = [],
  debouncedSearchQuery = "",
}: UseGetContactListProps) {
  const [limit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const result = useQuery<ContactData>(GET_CONTACT_LIST_QUERY, {
    variables: {
      limit,
      offset,
      where: {
        id: { _nin: favorites.map((contact) => contact.id) },
        _or: [
          { first_name: { _ilike: `%${debouncedSearchQuery}%` } },
          { last_name: { _ilike: `%${debouncedSearchQuery}%` } },
          { phones: { number: { _ilike: `%${debouncedSearchQuery}%` } } },
        ],
      },
    },
  });

  const handlePrev = () => {
    setOffset(offset - limit);
  };
  const handleNext = () => {
    setOffset(offset + limit);
  };

  return { ...result, handleNext, handlePrev };
}
