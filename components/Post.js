import React, { useState } from "react";
import { Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import Slider from "./Slider";
import NavIcon from "./NavIcon";
import constants from "../constants";

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View`
  margin-bottom: 10px;
`;
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
  width: ${constants.width / 1.2}px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: 6px 0;
`;

const CaptionText = styled.Text`
  margin: 0 10px;
`;

const MoreComments = styled.View``;

const Post = ({
  id,
  isLiked: isLikedP,
  user,
  location,
  files,
  caption,
  likes,
  comments,
}) => {
  const { navigate } = useNavigation();
  const [isMore, setIsMore] = useState(false);
  const [isLiked, setIsLiked] = useState(isLikedP);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id,
    },
  });
  const triggerMore = () => {
    setIsMore(true);
  };
  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    try {
      await toggleLikeMutation();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <Touchable
        onPress={() =>
          navigate("UserDetail", { id: user.id, userName: user.userName })
        }
      >
        <Header>
          <Image
            source={{ uri: user.avatar }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
          <UserContainer>
            <BoldText fontSize={17}>{user.userName}</BoldText>
            {location && <LightText fontSize={14}>{location}</LightText>}
          </UserContainer>
        </Header>
      </Touchable>
      <Slider files={files} />
      <CaptionNav>
        <Touchable>
          <NavIcon
            name={isLiked ? "heart" : "heart-outline"}
            color={isLiked ? theme.redColor : theme.blackColor}
            onPress={toggleLike}
          />
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
            {likes.length > 1 ? (
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
              {caption.length > 20 && !isMore
                ? `${caption.slice(0, 18)}...`
                : caption}
            </CaptionText>
          </Touchable>
          {caption.length > 20 && !isMore && (
            <Touchable onPress={triggerMore}>
              <LightText fontSize={14}>more</LightText>
            </Touchable>
          )}
        </CaptionContent>
        <MoreComments>
          {comments.length > 0 && (
            <Touchable>
              <LightText fontSize={14}>
                See all {comments.length} comments
              </LightText>
            </Touchable>
          )}
        </MoreComments>
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
