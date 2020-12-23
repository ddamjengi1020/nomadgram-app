import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import apolloClientOptions from "./apollo";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [clientS, setClientS] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      const cache = new InMemoryCache();

      await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
      });

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      setClientS(client);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && clientS ? (
    <ApolloProvider client={clientS}>
      <View>
        <Text>Hello World!</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
