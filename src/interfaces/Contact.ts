export interface Contact {
    id: number;
    created_at: string;
    first_name: string;
    last_name: string;
    phones: {
        number: string;
    }[];
}
export interface ContactDetails {
    contact_by_pk: Contact;
}
export interface ContactData {
    contact: Contact[];
}
export interface ContactFormValues {
    firstName: string;
    lastName: string;
    phones: {
        number: string;
    }[];
};