import Head from "next/head";
import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>GoTo | Software Engineer - Web Platform | Assignment</title>
        <meta
          name="description"
          content="GoTo | Software Engineer - Web Platform | Assignment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#52b950" />
        <meta name="theme-color" content="#52b950" />

        <meta
          name="author"
          property="article:author"
          content="Marshall Kurniawan"
        />
      </Head>
      {children}
    </>
  );
}
