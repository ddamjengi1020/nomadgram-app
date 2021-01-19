import React from "react";
import { RefreshControl, ScrollView } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import { useState } from "react/cjs/react.development";

const UserProfile = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {};

  return (
    <ScrollView
      style={{ backgroundColor: theme.bgColor }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    ></ScrollView>
  );
};

UserProfile.propTypes = {
  id: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  fullName: PropTypes.string,
  bio: PropTypes.string,
  avatar: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  followers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
  following: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ),
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserProfile;
