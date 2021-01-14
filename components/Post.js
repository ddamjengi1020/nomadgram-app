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
  font-size: ${(props) => props.fontSize}px;
  font-weight: bold;
`;
const LightText = styled.Text`
  font-size: ${(props) => props.fontSize}px;
  color: ${theme.darkGreyColor};
`;
const CaptionNav = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 10px 0 10px;
`;
const CaptionContainer = styled.View`
  padding: 0 15px;
`;
const LikeCount = styled.Text``;

const CaptionContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const CaptionText = styled.Text`
  margin: 0 10px;
`;

const Post = ({ user, location, files, caption, likes }) => {
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
            <BoldText fontSize={17}>{user.userName}</BoldText>
          </Touchable>
          {location && <LightText fontSize={14}>{location}</LightText>}
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
      <CaptionContainer>
        {likes.length !== 0 && (
          <LikeCount>
            {likes.length > 2 ? (
              <>
                {"Liked by "}
                <BoldText fontSize={15}>{likes[0].user.userName}</BoldText>
                {" and "}
                <BoldText fontSize={15}>Other</BoldText>
              </>
            ) : (
              <>
                {"Liked by "}
                <BoldText fontSize={15}>{likes[0].user.userName}</BoldText>
              </>
            )}
          </LikeCount>
        )}
        <CaptionContent>
          <Touchable>
            <BoldText fontSize={14}>{user.userName}</BoldText>
          </Touchable>
          <Touchable>
            <CaptionText>
              {caption.length > 20 ? `${caption.slice(0, 18)}...` : caption}
            </CaptionText>
          </Touchable>
          {caption.length > 20 && (
            <Touchable>
              <LightText fontSize={14}>more</LightText>
            </Touchable>
          )}
        </CaptionContent>
      </CaptionContainer>
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
