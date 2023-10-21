import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderHomePage } from "./components/renderHomePage";
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
        result: [
          {
            created_at: "2023-10-20T04:18:09.600449+00:00",
            first_name: "John",
            id: 101,
            last_name: "Donatello",
            phones: [
              {
                number: "+625123412411",
              },
            ],
          },
          {
            created_at: "2023-10-20T04:18:09.600449+00:00",
            first_name: "Karen",
            id: 102,
            last_name: "Baker",
            phones: [
              {
                number: "+625281818181",
              },
            ],
          },
        ],
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
