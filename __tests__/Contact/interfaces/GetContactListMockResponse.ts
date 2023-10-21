import { DocumentNode } from "graphql";

import { Contact } from "@/interfaces/Contact";
import { GET_CONTACT_LIST_QUERY } from "@/queries/Contact";

export interface GetContactListMockResponse {
    request: {
        query: DocumentNode;
        variables?: {
            limit?: number;
            offset?: number;
            where?: {
                id?: { _nin?: number[] };
                _or?: [
                    { first_name?: { _ilike?: string } },
                    { last_name?: { _ilike?: string } },
                    { phones?: { number?: { _ilike?: string } } }
                ];
            };
        };
    };
    result: {
        data: {
            contact: Contact[];
        };
    };
}


export const returnGetContactListMock = (args: {
    searchQuery?: string,
    result?: Contact[],
    favoritesIds?: number[],
    withPagination?: boolean
} = {}): GetContactListMockResponse => {
    const {
        searchQuery = "",
        result = [],
        favoritesIds = [],
        withPagination = true
    } = args;

    return {
        request: {
            query: GET_CONTACT_LIST_QUERY,
            variables: withPagination ? {
                limit: 10,
                offset: 0,
                where: {
                    id: { _nin: favoritesIds },
                    _or: [
                        { first_name: { _ilike: `%${searchQuery}%` } },
                        { last_name: { _ilike: `%${searchQuery}%` } },
                        { phones: { number: { _ilike: `%${searchQuery}%` } } },
                    ],
                },
            } : {
            },
        },
        result: {
            data: {
                contact: result,
            },
        },
    };
};
