import { DocumentNode } from "graphql";

import { Contact } from "@/interfaces/Contact";
import { MUTATION_ADD_PHONE_NUMBER_TO_CONTACT } from "@/queries/Contact";

export interface AddContactPhoneNumberMockResponse {
    request: {
        query: DocumentNode;
        variables: {
            contact_id: number | string;
            phone_number: string;
        };
    };
    result: {
        data: {
            insert_phone: {
                returning: Contact[];
            };
        };
    };
}

export const returnAddContactPhoneNumberMock = (args: {
    contact: Contact,
    phoneNumber: string
}): AddContactPhoneNumberMockResponse => {
    const contact = args.contact;
    return {
        request: {
            query: MUTATION_ADD_PHONE_NUMBER_TO_CONTACT,
            variables: {
                contact_id: contact.id,
                phone_number: args.phoneNumber
            }
        },
        result: {
            data: {
                insert_phone: {
                    returning: [
                    ],
                }
            }
        }
    }
};