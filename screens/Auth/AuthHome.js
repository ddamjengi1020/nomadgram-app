import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewS = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default ({ navigation }) => {
  // const { navigate } = useNavigation();
  return (
    <ViewS>
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text>Go to Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate("signup")}
      >
        <Text>Go to Sign up</Text>
      </TouchableOpacity>
    </ViewS>
  );
};
