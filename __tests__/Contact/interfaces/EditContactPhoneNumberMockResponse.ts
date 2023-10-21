import { DocumentNode } from "graphql";

import { Contact } from "@/interfaces/Contact";
import { MUTATION_EDIT_CONTACT_PHONE_NUMBER } from "@/queries/Contact";


export interface EditContactPhoneNumberMockResponse {
    request: {
        query: DocumentNode;
        variables: {
            pk_columns: {
                number: string,
                contact_id: number | string
            },
            new_phone_number: string
        };
    };
    result: {
        data: {
            update_phone_by_pk: {
                contact: Contact
            }
        }
    };
}

export const returnEditContactPhoneNumberMock = (args: {
    oldPhoneNumber: string,
    newPhoneNumber: string,
    contact: Contact
}): EditContactPhoneNumberMockResponse => {
    const { oldPhoneNumber, newPhoneNumber, contact } = args;
    return {
        request: {
            query: MUTATION_EDIT_CONTACT_PHONE_NUMBER,
            variables: {
                pk_columns: {
                    contact_id: contact.id,
                    number: oldPhoneNumber
                },
                new_phone_number: newPhoneNumber
            }
        },
        result: {
            data: {
                update_phone_by_pk: {
                    contact
                }
            }
        }
    }
};
