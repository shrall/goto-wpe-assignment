import { AiOutlinePlus } from "react-icons/ai";

import ButtonLink from "@/components/common/Button/ButtonLink";
import ContactList from "@/components/Contact/ContactList";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-8 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Phonebook
            </h2>
            <ButtonLink href="#" icon={AiOutlinePlus}>
              Add new contact
            </ButtonLink>
          </div>
          <ContactList className="mb-2" />
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6"
            aria-label="Pagination"
          >
            <div className="flex flex-1 gap-x-2 justify-between md:justify-end">
              <div
                // onClick={nextPage}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Prev
              </div>
              <div
                // onClick={nextPage}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Next
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  );
}
