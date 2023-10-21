import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import React from "react";

import CreateContactPage from "@/pages/contact/create";

export const renderCreateContactPage = (mocks: MockedResponse[]) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <CreateContactPage />
    </MockedProvider>,
    { wrapper: MemoryRouterProvider }
  );

  return { mocks };
};
