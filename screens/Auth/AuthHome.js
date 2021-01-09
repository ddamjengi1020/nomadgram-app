import React from "react";
import styled from "styled-components";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";
import LogInButton from "../../components/LogInButton";

const ViewS = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.bgColor};
`;

const Logo = styled(Image)`
  width: ${constants.width / 2}px;
`;

export default () => {
  const { navigate } = useNavigation();
  return (
    <ViewS>
      <Logo
        source={require("../../assets/mainLogo.png")}
        resizeMode="contain"
      />
      <AuthButton
        text={"Create New Account"}
        onPress={() => navigate("SignUp")}
      />
      <LogInButton text={"Log In"} onPress={() => navigate("LogIn")} />
    </ViewS>
  );
};
