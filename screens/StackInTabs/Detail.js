import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FRAGEMENT_IN_POST } from "../fragments";
import Loader from "../../components/Loader";

const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      post {
        ...PostParts
      }
    }
  }
  ${FRAGEMENT_IN_POST}
`;

export default ({ route }) => {
  const { params } = route;
  const { data, loading } = useQuery(SEE_FULL_POST, {
    variables: { id: params?.id },
  });
  console.log(data);
  return loading ? <Loader /> : null;
};
