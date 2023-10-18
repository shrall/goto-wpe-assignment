import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { useDebounce } from "use-debounce";

import Button from "@/components/common/Button/Button";
import ContactCard from "@/components/Contact/ContactCard";
import ContactCardEmptyState from "@/components/Contact/ContactCardEmptyState";
import Layout from "@/components/layout/Layout";

import { Contact, ContactData } from "@/interfaces/Contact";
import {
  GET_CONTACT_LIST_QUERY,
  MUTATION_DELETE_CONTACT,
} from "@/queries/Contact";

export default function Home() {
  const [limit, setLimit] = React.useState(10);
  const [offset, setOffset] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const [favorites, setFavorites] = useState<Contact[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Contact[]>([]);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (contact: Contact) => {
    const isFavorite = favorites.some(
      (favorite: Contact) => favorite.id === contact.id
    );

    if (isFavorite) {
      const newFavorites = favorites.filter(
        (favorite: Contact) => favorite.id !== contact.id
      );
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      const updatedFavorites = [...favorites, contact];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const {
    data: contacts,
    loading,
    refetch,
  } = useQuery<ContactData>(GET_CONTACT_LIST_QUERY, {
    variables: {
      limit: limit,
      offset: offset,
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

  const [deleteContact] = useMutation(MUTATION_DELETE_CONTACT, {
    variables: {
      id: deleteId,
    },
  });

  useEffect(() => {
    if (deleteId) {
      deleteContact().then(() => {
        setDeleteId(null);
        refetch();
      });
    }
  }, [deleteId, deleteContact, refetch]);

  React.useEffect(() => {
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
    refetch();
  }, [limit, offset, debouncedSearchQuery, refetch, favorites]);

  const handlePrev = () => {
    setOffset(offset - limit);
  };
  const handleNext = () => {
    setOffset(offset + limit);
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Phonebook
            </h2>
            <div className="w-full max-w-lg lg:max-w-xs ml-auto">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiOutlineSearch
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button variant="primary" icon={AiOutlinePlus}>
              <Link href="/contact/create">Add new contact</Link>
            </Button>
          </div>
          <hr className="mb-4" />
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
              Favorites
            </h2>
            {filteredFavorites.length === 0 && (
              <ContactCardEmptyState
                icon={AiOutlineStar}
                title="Favorites"
                description="The list is empty."
              />
            )}
            {filteredFavorites.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {loading && (
                  <p className="col-span-4 flex items-center justify-center py-12">
                    <CgSpinner className="animate-spin h-12 w-12 text-indigo-600" />
                  </p>
                )}
                {filteredFavorites.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    toggleFavorite={toggleFavorite}
                    setDeleteId={setDeleteId}
                    className="mb-4"
                  />
                ))}
              </ul>
            )}
          </section>
          <hr className="mb-4" />
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
              Contacts
            </h2>
            {contacts && contacts.contact.length === 0 && (
              <ContactCardEmptyState
                icon={AiOutlinePhone}
                title="Contacts"
                description="The list is empty."
              />
            )}
            {contacts && contacts.contact.length > 0 && (
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {loading && (
                  <p className="col-span-4 flex items-center justify-center py-12">
                    <CgSpinner className="animate-spin h-12 w-12 text-indigo-600" />
                  </p>
                )}
                {contacts.contact.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    toggleFavorite={toggleFavorite}
                    setDeleteId={setDeleteId}
                    className="mb-4"
                  />
                ))}
              </ul>
            )}
          </section>
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="flex flex-1 gap-x-2 justify-between md:justify-end">
              <Button onClick={handlePrev} variant="light">
                Prev
              </Button>
              <Button onClick={handleNext} variant="light">
                Next
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
