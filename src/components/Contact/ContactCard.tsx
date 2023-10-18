import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import React, { Fragment } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiFillMessage, AiFillPhone } from "react-icons/ai";
import { MdStars } from "react-icons/md";

import { Contact } from "@/interfaces/Contact";

import ButtonLink from "../common/Button/ButtonLink";

type ContactCardProps = {
  contact: Contact;
  toggleFavorite: (contact: Contact) => void;
} & React.ComponentPropsWithoutRef<"li">;

const ContactCard = React.forwardRef<HTMLLIElement, ContactCardProps>(
  ({ className, contact, toggleFavorite, ...rest }, ref) => {
    return (
      <li
        ref={ref}
        className={clsx(
          "col-span-1 flex flex-col rounded-lg bg-white text-center shadow relative",
          className
        )}
        {...rest}
      >
        {JSON.parse(localStorage.getItem("favorites") || "[]").every(
          (favorite: Contact) => favorite.id !== contact.id
        ) && (
          <Menu
            as="div"
            className="absolute inline-block text-left top-2 right-2"
          >
            <div>
              <Menu.Button className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <span className="sr-only">Open options</span>
                <AiOutlineEllipsis className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={clsx(
                          active && "bg-gray-100",
                          "block px-4 py-2 text-sm text-red-600"
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        )}

        <div className="flex flex-1 flex-col px-8 pt-8 pb-4">
          <div className="relative h-32 w-32 mx-auto">
            <Image
              src={`https://randomuser.me/api/portraits/women/${Math.floor(
                Math.random() * 10
              )}.jpg`}
              alt=""
              width={400}
              height={400}
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            />
            <MdStars
              onClick={() => toggleFavorite(contact)}
              className={clsx(
                "absolute h-10 w-10 top-0 -right-2 bg-white border border-white rounded-full text-gray-400 hover:text-yellow-500 cursor-pointer",
                JSON.parse(localStorage.getItem("favorites") || "[]").some(
                  (favorite: Contact) => favorite.id === contact.id
                ) && "text-yellow-500"
              )}
            />
          </div>
          <h3 className="mt-6 text-sm font-medium text-gray-900">
            {contact.first_name} {contact.last_name}
          </h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <dt className="sr-only">Title</dt>
            <dd className="text-sm text-gray-500">
              {contact.phones[0].number}
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex items-center justify-between gap-x-2 px-4 pb-4">
            <div className="flex flex-1">
              <ButtonLink
                icon={AiFillMessage}
                href={`sms:${contact.phones[0].number}`}
                className="flex-1"
              >
                Message
              </ButtonLink>
            </div>
            <div className="flex flex-1">
              <ButtonLink
                icon={AiFillPhone}
                href={`tel:${contact.phones[0].number}`}
                className="flex-1"
              >
                Call
              </ButtonLink>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default ContactCard;
