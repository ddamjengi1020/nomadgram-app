import React, { useLayoutEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import { USER_FRAGEMENT } from "./fragments";
import UserProfile from "../../components/UserProfile";

const GET_ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGEMENT}
`;

export default ({ navigation }) => {
  const { data, loading, refetch } = useQuery(GET_ME);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data?.me?.userName,
    });
  });

  return loading ? <Loader /> : <UserProfile {...data?.me} />;
};
