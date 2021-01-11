import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import theme from "../theme";

const NavIcon = ({
  focused = false,
  name,
  color = theme.blackColor,
  size = 26,
}) => (
  <Ionicons
    name={name}
    size={size}
    color={focused ? theme.orangeColor : color}
  />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool,
};

export default NavIcon;
