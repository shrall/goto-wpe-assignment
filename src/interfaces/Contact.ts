export interface Contact {
    created_at: string;
    first_name: string;
    id: number;
    last_name: string;
    phones: {
        number: string;
    }[];
}
export interface ContactDetails {
    contact_by_pk: {
        last_name: string;
        id: number;
        first_name: string;
        created_at: string;
        phones: {
            number: string;
        }[];
    };
}

export interface ContactData {
    contact: Contact[];
}
