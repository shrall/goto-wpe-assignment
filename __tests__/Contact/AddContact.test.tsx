import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

import { renderCreateContactPage } from "./components/renderCreateContactPage";
import { renderHomePage } from "./components/renderHomePage";
import { dummyContacts } from "./DummyData";
import { returnAddContactMock } from "./interfaces/AddContactMockResponse";
import { returnGetContactListMock } from "./interfaces/GetContactListMockResponse";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Add Contact", () => {
  it("opens the create contact page", async () => {
    renderHomePage([returnGetContactListMock()]);
    const createButton = await screen.findByRole("button", {
      name: /add new contact/i,
    });
    await userEvent.click(createButton);
    expect(mockRouter.asPath).toEqual("/contact/create");
  });

  it("successfully renders the form", () => {
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

  it("opens the home page when the cancel button is clicked", async () => {
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
    ]);

    const cancelButton = await screen.findByRole("link", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockRouter.asPath).toEqual("/");
  });

  it("successfully adds a new phone number input", async () => {
    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
    ]);

    const addNewNumberButton = await screen.findByRole("button", {
      name: /\+ add a new number/i,
    });
    await userEvent.click(addNewNumberButton);

    expect(
      screen.getByRole("textbox", {
        name: /phone 2/i,
      })
    ).toBeInTheDocument();
  });

  it("successfully sumbits the form with the correct values", async () => {
    const contact = dummyContacts[0];
    contact.phones.push({ number: "0987654321" });

    renderCreateContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnAddContactMock({ contact: contact }),
    ]);

    await userEvent.type(
      screen.getByRole("textbox", { name: /first name/i }),
      contact.first_name
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /last name/i }),
      contact.last_name
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /phone 1/i }),
      contact.phones[0].number
    );
    await userEvent.click(
      screen.getByRole("button", {
        name: /\+ add a new number/i,
      })
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: /phone 2/i }),
      contact.phones[1].number
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual("/");
    });
  });
});
