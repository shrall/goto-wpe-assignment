import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "@/components/common/Button/Button";
import ContactList from "@/components/Contact/ContactList";
import Layout from "@/components/layout/Layout";

export default function Home() {
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
            <div className="text-center mb-4 py-12 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
              <AiOutlineStar className="mx-auto h-12 w-12" />
              <h3 className="mt-2 text-sm font-medium">Favorites</h3>
              <p className="mt-1 text-sm ">The list is empty.</p>
            </div>
          </section>
          <hr className="mb-4" />
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
              Contacts
            </h2>
            <ContactList className="mb-4" />
          </section>
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="flex flex-1 gap-x-2 justify-between md:justify-end">
              <Button variant="light">Prev</Button>
              <Button variant="light">Next</Button>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
