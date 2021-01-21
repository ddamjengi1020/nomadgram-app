import React, { useLayoutEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGEMENT } from "./fragments";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import theme from "../../theme";

const GET_ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGEMENT}
`;

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(GET_ME);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.me?.userName,
    });
  });

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      style={{ backgroundColor: theme.bgColor }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserProfile {...data?.me} />
    </ScrollView>
  );
};
