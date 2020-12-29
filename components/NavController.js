import React from "react";
import { View } from "react-native";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";
import { useIsLoggedIn } from "./AuthContext";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <TabNavigation /> : <AuthNavigation />}
    </View>
  );
};
