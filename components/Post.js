import React from "react";
import { Text, Image, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import Slider from "./Slider";
import NavIcon from "./NavIcon";

const Container = styled.View``;
const Header = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const UserContainer = styled.View`
  margin-left: 10px;
`;
const BoldText = styled.Text`
  font-size: 17px;
`;
const LightText = styled.Text`
  font-size: 13px;
  color: ${theme.darkGreyColor};
`;
const CaptionNav = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const Post = ({ user, location, files }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </Touchable>
        <UserContainer>
          <Touchable>
            <BoldText>{user.userName}</BoldText>
          </Touchable>
          {location && <LightText>{location}</LightText>}
        </UserContainer>
      </Header>
      <Slider files={files} />
      <CaptionNav>
        <Touchable>
          <NavIcon name={"heart-outline"} />
        </Touchable>
        <Touchable>
          <NavIcon name={"chatbubble-outline"} />
        </Touchable>
        <Touchable>
          <NavIcon name={"paper-plane-outline"} />
        </Touchable>
      </CaptionNav>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.objectOf(PropTypes.string.isRequired),
    })
  ),
  isLiked: PropTypes.bool.isRequired,
  createAt: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string.isRequired).isRequired
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.objectOf(PropTypes.string.isRequired),
    })
  ),
  loggedUser: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
    })
  ),
};

export default Post;
