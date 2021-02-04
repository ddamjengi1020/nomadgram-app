import axios from "axios";
import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import constants from "../../constants";
import useInput from "../../hooks/useInput";
import theme from "../../theme";
import { toastShowFunc } from "../../utils";
import { SEE_FEED } from "../Tabs/Home";

const UPLOAD_POST = gql`
  mutation uploadPost(
    $caption: String!
    $location: String
    $files: [String!]!
  ) {
    uploadPost(caption: $caption, location: $location, files: $files) {
      id
      caption
      location
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${theme.bgColor};
  padding: 10px;
`;

const Contents = styled.View`
  display: flex;
  flex-direction: row;
`;

const PreviewImg = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Form = styled.View`
  width: ${constants.width / 1.5}px;
  height: 100px;
`;

const CaptionInput = styled.TextInput`
  padding: 5px;
  width: ${constants.width / 1.5}px;
  font-size: 16px;
`;

const UploadBtn = styled.TouchableOpacity`
  margin-right: 15px;
  padding: 10px;
`;

const BtnText = styled.Text`
  color: ${theme.orangeColor};
  font-weight: 700;
  font-size: 17px;
`;

export default ({ route, navigation }) => {
  const {
    params: { photo },
  } = route;
  const caption = useInput("");
  const [uploadPostMutation] = useMutation(UPLOAD_POST);

  const postFile = async () => {
    if (caption.value === "") {
      toastShowFunc("error", "Please fill the caption");
    } else {
      const formData = new FormData();
      const typeDetail = photo.filename.split(".")[1].toLowerCase();
      let fileLinks = []; // initialized for file links from google-cloud-storage

      formData.append("files", {
        name: photo.filename,
        uri: photo.uri,
        type: `image/${typeDetail}`,
      });
      try {
        const {
          data: { files },
        } = await axios({
          url: "http://172.30.1.21:5000/api/upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        files.forEach(
          (file) =>
            (fileLinks = [
              ...fileLinks,
              `https://storage.googleapis.com/nomadgram-storage/${file.filename}`,
            ])
        );
        const {
          data: { uploadPost },
        } = await uploadPostMutation({
          variables: {
            caption: caption.value,
            files: fileLinks,
          },
          refetchQueries: () => [{ query: SEE_FEED }],
        });

        if (uploadPost.id) {
          navigation.navigate("Main");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <UploadBtn onPress={postFile}>
          <BtnText>Share</BtnText>
        </UploadBtn>
      ),
    });
  }, [caption.value]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Contents>
          <PreviewImg source={{ uri: photo.uri }} />
          <Form>
            <CaptionInput {...caption} placeholder={"Caption..."} multiline />
          </Form>
        </Contents>
      </Container>
    </TouchableWithoutFeedback>
  );
};
