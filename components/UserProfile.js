import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";
import constants from "../constants";
import NavIcon from "./NavIcon";

const Container = styled.View``;

const Touchable = styled.TouchableOpacity``;

const HeaderContainer = styled.View`
  padding: 15px;
`;

const HeaderSection = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BodySection = styled.View``;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const RelationInfo = styled.View`
  width: ${constants.width / 1.5}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RelationItem = styled.View`
  margin: 0 15px;
`;

const BoldText = styled.Text`
  font-weight: 700;
  font-size: ${(props) => props.size || 14}px;
  text-align: center;
`;

const LightText = styled.Text`
  font-size: ${(props) => props.size || 14}px;
  font-weight: 500;
`;

const EditProfile = styled.View`
  height: 40px;
  border-color: ${theme.lightGreyColor};
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;

const GridContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const GridButton = styled.View`
  width: ${constants.width / 2}px;
  display: flex;
  align-items: center;
  border-bottom-width: ${(props) =>
    props.isGrid ? "1px" : props.isList ? "1px" : 0};
  border-color: ${theme.darkGreyColor};
`;

const UserProfile = ({
  avatar,
  posts,
  followers,
  following,
  fullName,
  isSelf,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const [isList, setIsList] = useState(false);
  const gridTrigger = () => {
    setIsGrid(true);
    setIsList(false);
  };
  const listTrigger = () => {
    setIsGrid(false);
    setIsList(true);
  };
  return (
    <Container>
      <HeaderContainer>
        <HeaderSection>
          <Avatar source={{ uri: avatar }} />
          <RelationInfo>
            <RelationItem>
              <Touchable>
                <BoldText size={17}>{posts.length}</BoldText>
                <LightText>posts</LightText>
              </Touchable>
            </RelationItem>
            <RelationItem>
              <Touchable>
                <BoldText size={17}>{followers.length}</BoldText>
                <LightText>followers</LightText>
              </Touchable>
            </RelationItem>
            <RelationItem>
              <Touchable>
                <BoldText size={17}>{following.length}</BoldText>
                <LightText>following</LightText>
              </Touchable>
            </RelationItem>
          </RelationInfo>
        </HeaderSection>
        <HeaderSection>
          <BoldText>{fullName}</BoldText>
        </HeaderSection>
        {isSelf && (
          <Touchable>
            <EditProfile>
              <BoldText>Edit Profile</BoldText>
            </EditProfile>
          </Touchable>
        )}
      </HeaderContainer>
      <BodySection>
        <GridContainer>
          <Touchable onPress={gridTrigger}>
            <GridButton isGrid={isGrid}>
              <NavIcon name={"grid-outline"} />
            </GridButton>
          </Touchable>
          <Touchable onPress={listTrigger}>
            <GridButton isList={isList}>
              <NavIcon name={"list-outline"} />
            </GridButton>
          </Touchable>
        </GridContainer>
      </BodySection>
    </Container>
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
