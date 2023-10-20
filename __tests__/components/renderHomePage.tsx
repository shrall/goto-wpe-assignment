import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import Home from "@/pages";

import { GetContactListMockResponse } from "../interfaces/GetContactListMockResponse";

export const renderHomePage = (mocks: GetContactListMockResponse[]) => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  );

  return { mocks };
};
