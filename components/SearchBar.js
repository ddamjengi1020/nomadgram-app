import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import theme from "../theme";
import constants from "../constants";
import { ceil } from "react-native-reanimated";

const SearchBar = ({ value, onChangeText, onSubmit }) => (
  <TextInput
    style={{
      backgroundColor: theme.lightGreyColor,
      width: constants.width - 70,
      textAlign: "center",
      borderRadius: 5,
      height: 36,
    }}
    returnKeyType={"search"}
    placeholder={"Search"}
    value={value}
    onChangeText={onChangeText}
    onEndEditing={onSubmit}
  />
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
