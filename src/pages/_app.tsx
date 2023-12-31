import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

import "@/styles/globals.css";

import { useApollo } from "@/lib/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo();

  return (
    <ApolloProvider client={client}>
      <Toaster richColors position="top-center" />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
