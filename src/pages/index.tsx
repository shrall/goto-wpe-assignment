import Link from "next/link";
import React from "react";
import {
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineStar,
} from "react-icons/ai";
import { useDebounce } from "use-debounce";

import { useFavorites } from "@/hooks/Contact/useFavorites";
import { useGetContactList } from "@/hooks/Contact/useGetContactList";

import Button from "@/components/common/Button/Button";
import ContactCard from "@/components/Contact/ContactCard";
import ContactCardEmptyState from "@/components/Contact/ContactCardEmptyState";
import Layout from "@/components/layout/Layout";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { favorites, filteredFavorites, toggleFavorite } = useFavorites({
    debouncedSearchQuery,
  });

  const {
    data: contacts,
    previousData,
    loading,
    refetch,
    handleNext,
    handlePrev,
  } = useGetContactList({
    favorites,
    debouncedSearchQuery,
  });

  const queryResult = loading ? previousData : contacts;

  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="block sm:hidden text-2xl font-bold tracking-tight text-gray-900 mb-2">
            Phonebook
          </h2>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="hidden sm:block text-2xl font-bold tracking-tight text-gray-900">
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
            <Link href="/contact/create">
              <Button variant="primary" icon={AiOutlinePlus}>
                <span className="hidden lg:block">Add new contact</span>
              </Button>
            </Link>
          </div>
          <hr className="mb-4" />
          <section aria-label="favorites">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
              Favorites
            </h2>
            {favorites.length > 0 ? (
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {filteredFavorites.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    toggleFavorite={toggleFavorite}
                    onDelete={refetch}
                    className="mb-4"
                  />
                ))}
              </ul>
            ) : (
              <ContactCardEmptyState
                icon={AiOutlineStar}
                title="Favorites"
                description="The list is empty."
              />
            )}
          </section>
          <hr className="mb-4" />
          <section aria-label="contacts">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
              Contacts
            </h2>
            {queryResult && queryResult.contact.length > 0 ? (
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {queryResult.contact.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    toggleFavorite={toggleFavorite}
                    onDelete={refetch}
                    className="mb-4"
                  />
                ))}
              </ul>
            ) : (
              <ContactCardEmptyState
                icon={AiOutlinePhone}
                title="Contacts"
                description="The list is empty."
              />
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
