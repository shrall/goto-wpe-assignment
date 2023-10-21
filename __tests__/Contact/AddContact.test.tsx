import { fireEvent, screen, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";

import { renderCreateContactPage } from "./components/renderCreateContactPage";
import { renderHomePage } from "./components/renderHomePage";
import { returnAddContactMock } from "./interfaces/AddContactMockResponse";
import { returnGetContactListMock } from "./interfaces/GetContactListMockResponse";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Add Contact", () => {
  it("opens the create contact page", async () => {
    renderHomePage([returnGetContactListMock()]);
    fireEvent.click(screen.getByRole("button", { name: /add new contact/i }));
    expect(mockRouter.asPath).toEqual("/contact/create");
  });

  it("successfuly renders the form", () => {
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
    ]);

    // Assert that the form inputs are rendered
    expect(
      screen.getByRole("textbox", {
        name: /first name/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /last name/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /phone 1/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /\+ add a new number/i,
      })
    ).toBeInTheDocument();

    // Assert that the buttons are rendered
    expect(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /save/i,
      })
    ).toBeInTheDocument();
  });

  it("opens the home page when the cancel button is clicked", () => {
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
    ]);

    fireEvent.click(screen.getByRole("link", { name: /cancel/i }));
    expect(mockRouter.asPath).toEqual("/");
  });

  it("successfuly adds a new phone number input", () => {
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
    ]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /\+ add a new number/i,
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: /phone 2/i,
      })
    ).toBeInTheDocument();
  });

  it("successfully sumbits the form with the correct values", async () => {
    const contact = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      phones: [{ number: "1234567890" }, { number: "0987654321" }],
      created_at: "2021-08-15T15:00:00.000Z",
    };
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnAddContactMock({ contact: contact }),
    ]);

    fireEvent.change(screen.getByRole("textbox", { name: /first name/i }), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /last name/i }), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /phone 1/i }), {
      target: { value: "1234567890" },
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: /\+ add a new number/i,
      })
    );
    fireEvent.change(screen.getByRole("textbox", { name: /phone 2/i }), {
      target: { value: "0987654321" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual("/");
    });
  });
});
