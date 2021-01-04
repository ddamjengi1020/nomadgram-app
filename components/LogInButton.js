import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";

const Container = styled(TouchableOpacity)`
  margin: 10px 0;
`;

const Button = styled(View)`
  padding: 10px 0;
`;

const ButtonText = styled(Text)`
  color: ${(props) => props.theme.orangeColor};
`;

export default function LogInButton({ text, onPress }) {
  return (
    <Container onPress={onPress}>
      <Button>
        <ButtonText>{text}</ButtonText>
      </Button>
    </Container>
  );
}

LogInButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};
