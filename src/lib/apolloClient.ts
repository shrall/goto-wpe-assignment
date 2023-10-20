import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

function createApolloClient() {
    return new ApolloClient({
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_API_URL,
            credentials: "same-origin",
        }),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network",
            }
        }
    });
}

export function useApollo() {
    const client = useMemo(() => createApolloClient(), []);
    return client;
}