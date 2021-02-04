import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ScrollView, Text, View, RefreshControl, Image } from "react-native";
import { useLogOut } from "../../components/AuthContext";
import MessageLink from "../../components/MessageLink";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import theme from "../../theme";
import { useLayoutEffect } from "react";
import constants from "../../constants";

export const SEE_FEED = gql`
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

export default ({ navigation }) => {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <MessageLink />,
      headerTitle: () => (
        <Image
          source={require("../../assets/mainLogo.png")}
          style={{
            width: constants.width / 2.5,
          }}
          resizeMode="contain"
        />
      ),
    });
  });

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      refreshControl={RefreshC}
      style={{ backgroundColor: theme.bgColor, flex: 1 }}
    >
      {data?.seeFeed?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </ScrollView>
  );
};
