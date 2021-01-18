import { gql } from "@apollo/client";

export const FRAGEMENT_IN_POST = gql`
  fragment PostParts on Post {
    id
    location
    caption
    isLiked
    user {
      id
      userName
      avatar
    }
    likes {
      id
      user {
        userName
      }
    }
    createAt
    files {
      id
      url
    }
    comments {
      id
      text
      user {
        id
        userName
      }
    }
  }
`;
