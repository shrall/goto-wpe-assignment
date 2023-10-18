import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import React, { Fragment } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { AiFillMessage, AiFillPhone } from "react-icons/ai";
import { MdStars } from "react-icons/md";

import ButtonLink from "../common/Button/ButtonLink";

const people = [
  {
    name: "Jane Cooper",
    telephone: "+1-202-555-0170",
    imageUrl: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 10
    )}.jpg`,
  },
  {
    name: "Jane Cooper",
    telephone: "+1-202-555-0170",
    imageUrl: `https://randomuser.me/api/portraits/women/${Math.floor(
      Math.random() * 10
    )}.jpg`,
  },
];

const ContactList = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithRef<"ul">
>(({ className, ...rest }, ref) => {
  return (
    <ul
      ref={ref}
      role="list"
      className={clsx(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...rest}
    >
      {people.map((person) => (
        <li
          key={person.telephone}
          className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow relative"
        >
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
          <div className="flex flex-1 flex-col px-8 pt-8 pb-4">
            <div className="relative h-32 w-32 mx-auto">
              <Image
                src={person.imageUrl}
                alt=""
                width={400}
                height={400}
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              />
              <MdStars className="absolute h-10 w-10 top-0 -right-2 bg-white border border-white rounded-full text-gray-400 hover:text-yellow-500 cursor-pointer" />
            </div>
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{person.telephone}</dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex items-center justify-between gap-x-2 px-4 pb-4">
              <div className="flex flex-1">
                <ButtonLink
                  icon={AiFillMessage}
                  href={`sms:${person.telephone}`}
                  className="flex-1"
                >
                  Message
                </ButtonLink>
              </div>
              <div className="flex flex-1">
                <ButtonLink
                  icon={AiFillPhone}
                  href={`tel:${person.telephone}`}
                  className="flex-1"
                >
                  Call
                </ButtonLink>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});

export default ContactList;
