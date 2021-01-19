import React, { useState, useLayoutEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import theme from "../../theme";
import { USER_FRAGEMENT } from "../Tabs/fragments";
import UserProfile from "../../components/UserProfile";

const SEE_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      ...UserParts
    }
  }
  ${USER_FRAGEMENT}
`;

export default ({ navigation, route }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { params } = route;
  const { data, loading, refetch } = useQuery(SEE_USER, {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params?.userName,
    });
  });

  return loading ? (
    <Loader />
  ) : (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bgColor }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <UserProfile {...data?.seeUser} />
    </ScrollView>
  );
};
