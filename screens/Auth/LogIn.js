import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLogIn } from "../../components/AuthContext";

export default () => {
  const login = useLogIn();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "orange",
      }}
    >
      <Text>Log In</Text>
      <TouchableOpacity onPress={login}>
        <Text>login btn</Text>
      </TouchableOpacity>
    </View>
  );
};
