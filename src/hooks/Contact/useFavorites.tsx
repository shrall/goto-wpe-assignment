import { useEffect, useState } from "react";

import { Contact } from "@/interfaces/Contact";

interface UseFavoritesProps {
  debouncedSearchQuery: string;
}

export function useFavorites({ debouncedSearchQuery }: UseFavoritesProps) {
  const [favorites, setFavorites] = useState<Contact[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Contact[]>([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, []);

  useEffect(() => {
    setFilteredFavorites(
      favorites.filter(
        (contact) =>
          contact.first_name.toLowerCase().includes(debouncedSearchQuery) ||
          contact.last_name.toLowerCase().includes(debouncedSearchQuery) ||
          contact.phones.some((phone) =>
            phone.number.toLowerCase().includes(debouncedSearchQuery)
          )
      )
    );
  }, [favorites, debouncedSearchQuery]);

  const toggleFavorite = (contact: Contact) => {
    const isFavorited = favorites.some(
      (favorite) => favorite.id === contact.id
    );

    if (isFavorited) {
      const newFavorites = favorites.filter(
        (favorite) => favorite.id !== contact.id
      );
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const updatedFavorites = [...favorites, contact];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return { favorites, filteredFavorites, toggleFavorite };
}
