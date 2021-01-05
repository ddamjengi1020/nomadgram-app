import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $email: String!
    $firstName: String!
    $lastName: String!
    $userName: String!
  ) {
    createAccount(
      email: $email
      firstName: $firstName
      lastName: $lastName
      userName: $userName
    )
  }
`;
