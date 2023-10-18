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
      first_name
      last_name
      id
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