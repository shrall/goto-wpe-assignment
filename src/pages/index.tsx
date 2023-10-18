import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import Button from "@/components/common/Button/Button";
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
            <Button variant="primary" icon={AiOutlinePlus}>
              <Link href="/contact/create">Add new contact</Link>
            </Button>
          </div>
          <ContactList className="mb-2" />
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
