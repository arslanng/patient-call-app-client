import { gql } from "@apollo/client";

export const ADD_PATIENT = gql`
  mutation Mutation($data: createPatientInput!) {
    createPatient(data: $data) {
      company
      id
      status
      registration_number
    }
  }
`;
