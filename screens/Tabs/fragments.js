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
