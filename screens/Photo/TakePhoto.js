import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text, View, TouchableOpacity } from "react-native";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import constants from "../../constants";
import NavIcon from "../../components/NavIcon";
import theme from "../../theme";
import Loader from "../../components/Loader";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.bgColor};
`;

const CameraS = styled(Camera)`
  width: ${constants.width}px;
  height: ${constants.height / 1.8}px;
  justify-content: flex-end;
`;

const TypeToggleBtn = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const BodyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TakePictureBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-width: 10px;
  border-color: ${theme.lightGreyColor};
  border-radius: 50px;
`;

export default ({ navigation }) => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);

  const takePhoto = async () => {
    try {
      // const { uri } = await cameraRef.current.takePictureAsync({
      //   quality: 1,
      // });
      // const savedPhoto = await MediaLibrary.createAssetAsync(uri);
      console.log("Captured your screen!");
      setCanTakePhoto(false);
      if (savedPhoto) navigation.navigate("UploadPhoto");
    } catch (e) {
      console.log(e);
    }
  };

  const toggleCameraType = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const getPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Container>
      {hasPermission ? (
        <>
          <CameraS ref={cameraRef} type={cameraType}>
            <TypeToggleBtn onPress={toggleCameraType}>
              <NavIcon
                name={"camera-reverse"}
                color={theme.bgColor}
                size={30}
              />
            </TypeToggleBtn>
          </CameraS>
          <BodyContainer>
            <TakePictureBtn
              onPress={takePhoto}
              disabled={!canTakePhoto}
            ></TakePictureBtn>
          </BodyContainer>
        </>
      ) : (
        <BodyContainer>
          <Text>Camera Permission Denied</Text>
        </BodyContainer>
      )}
    </Container>
  );
};
