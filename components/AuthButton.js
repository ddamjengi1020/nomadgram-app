import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View } from "react-native";
import constants from "../constants";

const Container = styled(TouchableOpacity)``;

const Button = styled(View)`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.orangeColor};
  width: ${constants.width / 2}px;
  padding: 10px 0;
  border-radius: 5px;
`;

const ButtonText = styled(Text)`
  color: white;
  text-align: center;
  font-weight: 700;
`;

export default function AuthButton({
  loading = false,
  text,
  onPress,
  bgColor = null,
}) {
  return (
    <Container disabled={loading} onPress={onPress}>
      <Button bgColor={bgColor}>
        <ButtonText>
          {loading ? <ActivityIndicator color="white" /> : text}
        </ButtonText>
      </Button>
    </Container>
  );
}

AuthButton.proptypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
};
