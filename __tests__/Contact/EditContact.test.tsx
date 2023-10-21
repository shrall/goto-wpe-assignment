import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

import { renderEditContactPage } from "./components/renderEditContactPage";
import { renderHomePage } from "./components/renderHomePage";
import { dummyContacts } from "./DummyData";
import { returnAddContactPhoneNumberMock } from "./interfaces/AddContactPhoneNumberMockResponse";
import { returnEditContactMock } from "./interfaces/EditContactMockResponse";
import { returnEditContactPhoneNumberMock } from "./interfaces/EditContactPhoneNumberMockResponse";
import { returnGetContactDetailsMock } from "./interfaces/GetContactDetailsMockResponse";
import { returnGetContactListMock } from "./interfaces/GetContactListMockResponse";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Edit Contact", () => {
  it("opens the edit contact page", async () => {
    const { mocks } = renderHomePage([
      returnGetContactListMock({
        result: dummyContacts,
      }),
    ]);

    const optionsButtons = await screen.findAllByRole("button", {
      name: /open options/i,
    });
    expect(optionsButtons).toHaveLength(2);

    const optionsButton = optionsButtons[0];
    await userEvent.click(optionsButton);

    const editButton = screen.getByRole("button", { name: /edit/i });
    await userEvent.click(editButton);

    expect(mockRouter.asPath).toEqual(
      `/contact/edit?id=${mocks[0].result.data.contact[0].id}`
    );
  });

  it("successfully renders the form", async () => {
    renderEditContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnGetContactDetailsMock({
        contact: {
          contact_by_pk: dummyContacts[0],
        },
      }),
    ]);

    // Assert that the form inputs are rendered
    const firstNameInput = await screen.findByRole("textbox", {
      name: /first name/i,
    });
    expect(firstNameInput).toHaveValue(dummyContacts[0].first_name);

    const lastNameInput = await screen.findByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInput).toHaveValue(dummyContacts[0].last_name);

    const phoneInput = await screen.findByRole("textbox", {
      name: /phone 1/i,
    });
    expect(phoneInput).toHaveValue(dummyContacts[0].phones[0].number);

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

  it("successfully adds a new phone number to the contact", async () => {
    renderEditContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnGetContactDetailsMock({
        contact: {
          contact_by_pk: dummyContacts[0],
        },
      }),
      returnAddContactPhoneNumberMock({
        contact: dummyContacts[0],
        phoneNumber: "0987654321",
      }),
    ]);

    const addNewNumberButton = await screen.findByRole("button", {
      name: /\+ add a new number/i,
    });
    await userEvent.click(addNewNumberButton);

    const phoneInput = await screen.findByRole("textbox", {
      name: /phone 2/i,
    });
    expect(phoneInput).toBeEnabled();

    await userEvent.type(phoneInput, "0987654321");
    expect(phoneInput).toHaveValue("0987654321");

    const saveButton = screen.getByRole("button", {
      name: /save phone number/i,
    });
    await userEvent.click(saveButton);
    expect(phoneInput).toBeDisabled();
  });

  it("successfully updates a phone number", async () => {
    renderEditContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnGetContactDetailsMock({
        contact: {
          contact_by_pk: dummyContacts[0],
        },
      }),
      returnEditContactPhoneNumberMock({
        contact: dummyContacts[0],
        newPhoneNumber: "0987654321",
        oldPhoneNumber: dummyContacts[0].phones[0].number,
      }),
    ]);

    const phoneInput = await screen.findByRole("textbox", {
      name: /phone 1/i,
    });
    expect(phoneInput).toHaveValue(dummyContacts[0].phones[0].number);
    expect(phoneInput).toBeDisabled();

    const editButton = screen.getByRole("button", {
      name: /edit phone number/i,
    });
    await userEvent.click(editButton);
    expect(phoneInput).toBeEnabled();

    await userEvent.clear(phoneInput);

    await userEvent.type(phoneInput, "0987654321");
    expect(phoneInput).toHaveValue("0987654321");

    const saveButton = screen.getByRole("button", {
      name: /save phone number/i,
    });
    await userEvent.click(saveButton);
    expect(phoneInput).toBeDisabled();
  });

  it("successfully update the contact's first name and last name", async () => {
    renderEditContactPage([
      returnGetContactListMock({ withPagination: false }),
      returnGetContactDetailsMock({
        contact: {
          contact_by_pk: dummyContacts[0],
        },
      }),
      returnEditContactMock({
        contact: dummyContacts[0],
        first_name: "John",
        last_name: "Doe",
      }),
    ]);

    const firstNameInput = await screen.findByRole("textbox", {
      name: /first name/i,
    });
    expect(firstNameInput).toHaveValue(dummyContacts[0].first_name);

    const lastNameInput = await screen.findByRole("textbox", {
      name: /last name/i,
    });
    expect(lastNameInput).toHaveValue(dummyContacts[0].last_name);

    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, "John");

    await userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, "Doe");

    const saveButton = screen.getByRole("button", {
      name: /save/i,
    });
    await userEvent.click(saveButton);

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
  });
});
