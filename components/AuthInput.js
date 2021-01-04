import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextInput, View } from "react-native";
import constants from "../constants";

const Container = styled(View)`
  margin-bottom: 15px;
`;

const Input = styled(TextInput)`
  width: ${constants.width / 2}px;
  padding: 4px 10px;
  border: 1px solid
    ${(prop) =>
      prop.isFocused ? prop.theme.orangeColor : prop.theme.darkGreyColor};
  border-radius: 5px;
`;

const AuthInput = ({
  placeholder,
  value,
  onChangeText,
  autoCapitalize = "characters",
  keyboardType = "default",
  onSubmitEditing = () => null,
  returnKeyType = "done",
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const toggleFocus = () => setIsFocus((prev) => !prev);

  return (
    <Container>
      <Input
        placeholder={placeholder}
        defaultValue={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        isFocused={isFocus}
        onFocus={toggleFocus}
        onEndEditing={toggleFocus}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
      />
    </Container>
  );
};

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  autoCapitalize: PropTypes.oneOf(["characters", "words", "sentences", "none"]),
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]),
  onSubmitEditing: PropTypes.fuc,
  returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
};

export default AuthInput;
