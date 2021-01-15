import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache, AsyncStorageWrapper } from "apollo3-cache-persist";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Toast from "react-native-toast-message";
import NavController from "./components/NavController";
import { AuthProvider } from "./components/AuthContext";
import apolloClientOptions from "./apollo";
import theme from "./theme";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [clientS, setClientS] = useState(null);
  const [initLoggedIn, setInitLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      const cache = new InMemoryCache({
        typePolicies: {
          Post: {
            fields: {
              likes: {
                merge(_, incoming = []) {
                  return incoming;
                },
              },
            },
          },
        },
      });

      await persistCache({
        cache,
        storage: new AsyncStorageWrapper(AsyncStorage),
      });

      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });

      const checkLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (checkLoggedIn === "false" || checkLoggedIn === null) {
        setInitLoggedIn(false);
      } else {
        setInitLoggedIn(true);
      }
      setClientS(client);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && clientS && initLoggedIn !== null ? (
    <ApolloProvider client={clientS}>
      <ThemeProvider theme={theme}>
        <AuthProvider checkLoggedIn={initLoggedIn}>
          <StatusBar barStyle="dark-content" backgroundColor={theme.bgColor} />
          <NavController />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
