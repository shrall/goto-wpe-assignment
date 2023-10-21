import { DocumentNode } from "graphql";

import { Contact } from "@/interfaces/Contact";
import { MUTATION_EDIT_CONTACT } from "@/queries/Contact";

export interface EditContactMockResponse {
    request: {
        query: DocumentNode;
        variables: {
            id: number | string;

            _set: {
                first_name: string;
                last_name: string;
            };
        };
    };
    result: {
        data: {
            update_contact_by_pk: Contact;
        };
    };
}

export const returnEditContactMock = (args: {
    contact: Contact;
    first_name: string;
    last_name: string;
}): EditContactMockResponse => {
    const { contact, first_name, last_name } = args;
    return {
        request: {
            query: MUTATION_EDIT_CONTACT,
            variables: {
                id: contact.id,
                _set: {
                    first_name,
                    last_name
                }
            }
        },
        result: {
            data: {
                update_contact_by_pk: contact
            }
        }
    };
}