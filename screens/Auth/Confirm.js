import { useMutation } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useLogIn } from "../../components/AuthContext";
import { toastShowFunc } from "../../utils";
import { CONFIRM_SECRET } from "./AuthQuery";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.bgColor};
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const logIn = useLogIn();
  const {
    params: { email },
  } = useRoute();
  const secret = useInput("");
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: { secret: secret.value, email },
  });

  const handleLogin = async () => {
    const { value } = secret;
    if (value === "" || !value.includes(" ")) {
      return toastShowFunc("error", "Invaild Secret");
    }
    try {
      setLoading(true);
      const {
        data: { confirmSecret },
      } = await confirmSecretMutation();
      if (confirmSecret) {
        logIn(confirmSecret);
      }
    } catch (error) {
      console.log(error);
      toastShowFunc("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AuthInput
          {...secret}
          placeholder="Your Secret"
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
          returnKeyType="go"
        />
        <AuthButton loading={loading} text={"Confirm"} onPress={handleLogin} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
