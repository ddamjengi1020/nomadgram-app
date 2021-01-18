import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";
import CardBySearch from "../../components/CardBySearch";
import theme from "../../theme";

const SEARCH = gql`
  query searchPost($term: String!) {
    searchPost(term: $term) {
      id
      files {
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      userName
      avatar
      isFollowing
      isSelf
    }
  }
`;

export default ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery(SEARCH, {
    skip: !term || !shouldFetch,
    variables: { term },
  });

  const onChangeText = (text) => {
    setShouldFetch(false);
    setTerm(text);
  };
  const onSubmit = () => {
    setShouldFetch(true);
  };
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar
          value={term}
          onChangeText={onChangeText}
          onSubmit={onSubmit}
        />
      ),
      headerTitleAlign: "center",
    });
  }, [navigation, term]);

  return loading ? (
    <Loader />
  ) : (
    <FlatList
      style={{ backgroundColor: theme.bgColor }}
      columnWrapperStyle={{ flex: 1, justifyContent: "flex-start" }}
      data={data?.searchPost}
      horizontal={false}
      numColumns={3}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item }) => <CardBySearch {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
