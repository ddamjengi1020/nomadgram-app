import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { useLogOut } from "../../components/AuthContext";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import theme from "../../theme";

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
  const { loading, data, refetch } = useQuery(SEE_FEED);

  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const RefreshC = (
    <RefreshControl refreshing={refreshing} onRefresh={refresh} />
  );

  return (
    <ScrollView
      refreshControl={RefreshC}
      style={{ backgroundColor: theme.bgColor }}
    >
      {loading ? (
        <Loader />
      ) : (
        data?.seeFeed?.map((post) => <Post key={post.id} {...post} />)
      )}
    </ScrollView>
  );
};
