import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { useLogOut } from "../../components/AuthContext";
import Loader from "../../components/Loader";

const SEE_FEED = gql`
  {
    seeFeed {
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
  }
`;

export default () => {
  const { loading, data } = useQuery(SEE_FEED);
  console.log(loading, data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {loading ? <Loader /> : <Text>We have Feed data!</Text>}
    </View>
  );
};
