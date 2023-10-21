import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import { renderHomePage } from "./components/renderHomePage";
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
        favoritesIds: [101],
      }),
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
        favoritesIds: [101, 102],
      }),
    ]);
    const favoriteButtons = await screen.findAllByRole("button", {
      name: /favorite/i,
    });
    expect(favoriteButtons).toHaveLength(2);

    const firstFavoriteButton = favoriteButtons[0];
    await waitFor(() => {
      firstFavoriteButton.click();
    });

    const favoritesSection = await screen.findByRole("region", {
      name: /favorites/i,
    });
    expect(favoritesSection).toHaveTextContent(/john donatello/i);
  });
});
