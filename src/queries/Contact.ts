import { gql } from "@apollo/client";

export const GET_CONTACT_LIST_QUERY = gql`
  query GetContactList($limit: Int, $offset: Int, $where: contact_bool_exp) {
    contact(limit: $limit, offset: $offset, where: $where) {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

export const GET_CONTACT_DETAILS_QUERY = gql`
query GetContactDetail($id: Int!){
  contact_by_pk(id: $id) {
  last_name
  id
  first_name
  created_at
  phones {
    number
  }
}
}
`;

export const MUTATION_ADD_CONTACT = gql`
mutation AddContactWithPhones(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
    ) {
  insert_contact(
      objects: {
          first_name: $first_name, 
          last_name: 
          $last_name, phones: { 
              data: $phones
            }
        }
    ) {
    returning {
      id
      created_at
      first_name
      last_name
      phones {
        number
      }
    }
  }
}
`;

export const MUTATION_ADD_PHONE_NUMBER_TO_CONTACT = gql`
mutation AddNumberToContact ($contact_id: Int!, $phone_number:String!) {
  insert_phone(objects: {contact_id: $contact_id, number: $phone_number}) {
    returning {
      contact {
        id
        last_name
        first_name
        phones {
          number
        }
      }
    }
  }
}
`;

export const MUTATION_EDIT_CONTACT = gql`
mutation EditContactById($id: Int!, $_set: contact_set_input) {
  update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    first_name
    last_name
    phones {
      number
    }
  }
}
`;


export const MUTATION_EDIT_CONTACT_PHONE_NUMBER = gql`
mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
  update_phone_by_pk(pk_columns: $pk_columns, _set: {number: $new_phone_number}) {
    contact {
      id
      last_name
      first_name
      created_at
      phones {
        number
      }
    }
  }
}
`;

export const MUTATION_DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;