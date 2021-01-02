import React from "react";
import styled from "styled-components";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";

const ViewS = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Image)`
  width: ${constants.width / 2}px;
`;

const ButtonContainer = styled(TouchableOpacity)`
  margin: 10px 0;
`;

const Button = styled(View)`
  background-color: ${(props) => props.theme.orangeColor};
  width: ${constants.width / 2}px;
  padding: 10px 0;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  text-align: center;
  font-weight: 700;
`;

const LogInBtn = styled(View)`
  padding: 10px 0;
`;

const LogInBtnText = styled(ButtonText)`
  color: ${(props) => props.theme.orangeColor};
`;

export default () => {
  const { navigate } = useNavigation();
  return (
    <ViewS>
      <Logo
        source={require("../../assets/mainLogo.png")}
        resizeMode="contain"
      />
      <ButtonContainer onPress={() => navigate("SignUp")}>
        <Button>
          <ButtonText>Create New Account</ButtonText>
        </Button>
      </ButtonContainer>
      <ButtonContainer onPress={() => navigate("LogIn")}>
        <LogInBtn>
          <LogInBtnText>Log In</LogInBtnText>
        </LogInBtn>
      </ButtonContainer>
    </ViewS>
  );
};
