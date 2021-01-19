import { gql } from "@apollo/client";

export const USER_FRAGEMENT = gql`
  fragment UserParts on User {
    id
    userName
    email
    firstName
    lastName
    fullName
    bio
    avatar
    posts {
      id
      files {
        id
        url
      }
    }
    followers {
      id
      userName
      avatar
    }
    following {
      id
      userName
      avatar
    }
    isFollowing
    isSelf
  }
`;
