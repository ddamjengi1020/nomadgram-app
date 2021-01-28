import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import constants from "../../constants";
import theme from "../../theme";

const SelectedPhoto = styled.Image`
  width: ${constants.width}px;
  height: ${constants.height / 2}px;
`;

const AllPhotos = styled.ScrollView`
  height: ${constants.height / 2}px;
`;

const PhotoItem = styled.Image`
  width: ${constants.width / 3}px;
  height: ${constants.height / 6}px;
  opacity: ${(props) => (props.photoId === props.selectedId ? 0.5 : 1)};
`;

const ToUploadBtn = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 10px;
  background-color: ${theme.orangeColor};
  padding: 7px 15px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

const ContentStyleOptions = {
  flexDirection: "row",
  width: constants.width,
  flexWrap: "wrap",
};

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [allPhotos, setAllPhotos] = useState([]);
  const [selected, setSelected] = useState("");
  const [fetchCount, setFetchCount] = useState(15);
  const { navigate } = useNavigation();

  const handledNextPage = () => {
    navigation.navigate("UploadPhoto", { photo: selected });
  };

  const onMomentumScrollEnd = () => {
    console.log("end!");
    if (hasNext) {
      setFetchCount((prev) => prev + 15);
    }
  };
  const changeSeleted = (id) => {
    allPhotos.map((photo) => {
      if (photo.id === id) {
        return setSelected(photo);
      }
    });
  };
  const getMediaAssets = async () => {
    try {
      const { assets, hasNextPage } = await MediaLibrary.getAssetsAsync({
        first: fetchCount,
      });
      const [firstPhoto] = assets;
      if (selected === "") {
        setSelected(firstPhoto);
      }
      setAllPhotos(assets);
      setHasNext(hasNextPage);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const getPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === "granted") {
        setHasPermission(true);
        getMediaAssets();
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    getPermission();
  }, [fetchCount]);

  return loading ? (
    <Loader />
  ) : (
    <View>
      {hasPermission ? (
        <>
          <SelectedPhoto source={{ uri: selected.uri }} />
          <ToUploadBtn onPress={handledNextPage}>
            <ButtonText>Next</ButtonText>
          </ToUploadBtn>
          <AllPhotos
            onMomentumScrollEnd={onMomentumScrollEnd}
            contentContainerStyle={ContentStyleOptions}
          >
            {allPhotos.map((photo) => (
              <TouchableOpacity
                key={photo.id}
                onPress={() => changeSeleted(photo.id)}
              >
                <PhotoItem
                  source={{ uri: photo.uri }}
                  photoId={photo.id}
                  selectedId={selected.id}
                />
              </TouchableOpacity>
            ))}
          </AllPhotos>
        </>
      ) : null}
    </View>
  );
};
