import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import Home from "@/pages";

import { GetContactListMockResponse } from "../interfaces/GetContactListMockResponse";

export const renderHomePage = (mocks: GetContactListMockResponse[]) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>,
    { wrapper: MemoryRouterProvider }
  );

  return { mocks };
};
