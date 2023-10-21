import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/dist/MemoryRouterProvider";
import React from "react";

import EditContactPage from "@/pages/contact/edit";

export const renderEditContactPage = (mocks: MockedResponse[]) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <EditContactPage />
    </MockedProvider>,
    { wrapper: MemoryRouterProvider }
  );

  return { mocks };
};
