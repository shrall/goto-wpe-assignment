import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderHomePage } from "./components/renderHomePage";
import { dummyContacts } from "./DummyData";
import { returnGetContactListMock } from "./interfaces/GetContactListMockResponse";

describe("Get Contact List", () => {
  it("shows that list is empty if there's no data found", async () => {
    renderHomePage([returnGetContactListMock()]);
    const contactsSection = await screen.findByRole("region", {
      name: /contacts/i,
    });
    expect(contactsSection).toHaveTextContent(/the list is empty./i);
  });

  it("successfully shows 2 contacts based on endpoint results", async () => {
    const { mocks } = renderHomePage([
      returnGetContactListMock({
        result: dummyContacts,
      }),
    ]);
    // checks that there is 2 contact cards
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);

    // checks that there is a contact card with the mock result data
    mocks[0].result.data.contact.forEach(async (contact) => {
      await screen.findByRole("heading", {
        name: new RegExp(contact.first_name),
      });
      await screen.findByRole("heading", {
        name: new RegExp(contact.last_name),
      });
    });
  });
});
