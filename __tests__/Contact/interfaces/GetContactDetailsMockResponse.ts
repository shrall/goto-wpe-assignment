import { DocumentNode } from "graphql";

import { ContactDetails } from "@/interfaces/Contact";
import { GET_CONTACT_DETAILS_QUERY } from "@/queries/Contact";

export interface GetContactDetailsMockResponse {
    request: {
        query: DocumentNode;
        variables: {
            id: number | string;
        };
    };
    result: {
        data: ContactDetails;
    };
}

export const returnGetContactDetailsMock = (
    args: { contact: ContactDetails }
): GetContactDetailsMockResponse => {
    const contact = args.contact;
    return {
        request: {
            query: GET_CONTACT_DETAILS_QUERY,
            variables: {
                id: contact.contact_by_pk.id,
            },
        },
        result: {
            data: contact,
        },
    };
};