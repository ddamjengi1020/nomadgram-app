import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";

const Container = styled(TouchableOpacity)``;
const InnerText = styled(Text)``;

export default () => {
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("Message")}>
      <InnerText>Go Message</InnerText>
    </Container>
  );
};
