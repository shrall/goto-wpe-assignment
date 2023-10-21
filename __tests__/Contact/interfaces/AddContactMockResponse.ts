import { DocumentNode } from "graphql";

import { Contact } from "@/interfaces/Contact";
import { MUTATION_ADD_CONTACT } from "@/queries/Contact";

export interface AddContactMockResponse {
    request: {
        query: DocumentNode;
        variables: {
            first_name: string;
            last_name: string;
            phones: {
                number: string;
            }[];
        };
    };
    result: {
        data: {
            insert_contact: {
                returning: Contact[];
            };
        };
    };
}

export const returnAddContactMock = (
    args: { contact: Contact }
): AddContactMockResponse => {
    const contact = args.contact;
    return {
        request: {
            query: MUTATION_ADD_CONTACT,
            variables: {
                first_name: contact.first_name,
                last_name: contact.last_name,
                phones: contact.phones,
            },
        },
        result: {
            data: {
                insert_contact: {
                    returning: [
                        contact
                    ],
                },
            },
        },
    };
}
