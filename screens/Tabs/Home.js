import React from "react";
import { Button, Text, View } from "react-native";
import { useLogOut } from "../../components/AuthContext";

export default () => {
  const logOut = useLogOut();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      <Button onPress={logOut} title="log out" />
    </View>
  );
};
