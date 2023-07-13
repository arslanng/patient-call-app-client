import { gql } from "@apollo/client";

export const GET_ALL_PATIENTS = gql`
  query Patients {
    patients {
      company
      id
      status
      registration_number
    }
  }
`;

export const ALL_PATIENTS_SUB = gql`
  subscription {
    allPatients {
      company
      id
      registration_number
      status
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($updatePatientId: ID!, $data: updatePatientInput!) {
    updatePatient(id: $updatePatientId, data: $data) {
      company
      id
      status
    }
  }
`;

export const UPDATE_PATIENT_SUB = gql`
  subscription Subscription($company: String) {
    patientUpdated(company: $company) {
      company
      id
      registration_number
      status
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation Mutation($deletePatientId: ID!) {
    deletePatient(id: $deletePatientId) {
      company
      id
      registration_number
    }
  }
`;

export const DELETE_PATIENT_SUB = gql`
  subscription PatientDeleted($company: String) {
    patientDeleted(company: $company) {
      company
      id
      registration_number
      status
    }
  }
`;

export const CREATE_PATIENT_SUB = gql`
  subscription Subscription($company: String) {
  patientCreated(company: $company) {
    company
    id
    registration_number
    status
  }
}
`;