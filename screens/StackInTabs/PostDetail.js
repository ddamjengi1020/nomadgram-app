import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import Post from "../../components/Post";
import theme from "../../theme";

const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      post {
        id
        location
        isLiked
        caption
        commentCount
        createAt
        likes {
          id
          user {
            id
            userName
          }
        }
      }
      comments {
        id
        text
        user {
          id
          userName
          avatar
        }
      }
      files {
        id
        url
      }
      user {
        id
        userName
        avatar
      }
    }
  }
`;

export default ({ route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { params } = route;
  const { data, loading, refetch } = useQuery(SEE_FULL_POST, {
    variables: { id: params?.id },
  });

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    }
    {
      setRefreshing(false);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bgColor }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Post
        id={data?.seeFullPost?.post.id}
        isLiked={data?.seeFullPost?.post.isLiked}
        user={data?.seeFullPost?.user}
        location={data?.seeFullPost?.post.location}
        files={data?.seeFullPost?.files}
        caption={data?.seeFullPost?.post.caption}
        likes={data?.seeFullPost?.post.likes}
        comments={data?.seeFullPost?.comments}
        createAt={data?.seeFullPost?.post.createAt}
      />
    </ScrollView>
  );
};
