import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../constants";
import theme from "../theme";

const CardBySearch = ({ files, id }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={{ borderWidth: 1, borderColor: theme.bgColor }}
      onPress={() => navigate("PostDetail", { id })}
    >
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
        resizeMode={"cover"}
      />
    </TouchableOpacity>
  );
};

CardBySearch.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ),
  id: PropTypes.string.isRequired,
};

export default CardBySearch;
