import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { renderHomePage } from "./components/renderHomePage";
import { dummyContacts } from "./DummyData";
import { returnGetContactListMock } from "./interfaces/GetContactListMockResponse";

describe("Favorites", () => {
  it("shows that list is empty if there's no data found", async () => {
    renderHomePage([returnGetContactListMock()]);
    const contactsSection = await screen.findByRole("region", {
      name: /contacts/i,
    });
    expect(contactsSection).toHaveTextContent(/the list is empty./i);
  });

  it("successfully adds a contact to favorites", async () => {
    renderHomePage([
      returnGetContactListMock({
        result: dummyContacts,
      }),
      returnGetContactListMock({
        result: dummyContacts,
        favoritesIds: [101],
      }),
      returnGetContactListMock({
        result: dummyContacts,
        favoritesIds: [101, 102],
      }),
    ]);
    const favoriteButtons = await screen.findAllByRole("button", {
      name: /favorite/i,
    });
    expect(favoriteButtons).toHaveLength(2);

    const firstFavoriteButton = favoriteButtons[0];
    await userEvent.click(firstFavoriteButton);

    const favoritesSection = await screen.findByRole("region", {
      name: /favorites/i,
    });
    expect(favoritesSection).toHaveTextContent(
      new RegExp(dummyContacts[0].first_name, "i")
    );
  });
});
