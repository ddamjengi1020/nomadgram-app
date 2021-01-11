import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import NavIcon from "./NavIcon";

const Container = styled(View)`
  margin-right: 15px;
`;
const Button = styled(TouchableOpacity)`
  padding: 5px;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Button onPress={() => navigation.navigate("Message")}>
        <NavIcon name="paper-plane-outline" />
      </Button>
    </Container>
  );
};
