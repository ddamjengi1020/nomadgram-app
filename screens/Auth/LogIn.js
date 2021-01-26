import { useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { emailRegex, toastShowFunc } from "../../utils";
import { LOG_IN } from "./AuthQuery";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.bgColor};
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const email = useInput(params?.email || "");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const handleLogin = async () => {
    const { value } = email;
    if (value === "") {
      return toastShowFunc("error", "Email can't be empty");
    } else if (!value.includes("@")) {
      return toastShowFunc("error", "Please write an email");
    } else if (!emailRegex.test(value)) {
      return toastShowFunc("error", "That is invalid Email");
    }
    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();
      console.log(requestSecret);
      console.log(email);
      if (requestSecret) {
        toastShowFunc("success", "Check your email");
        navigate("Confirm", { email: email.value });
      } else {
        toastShowFunc("info", "Email not found, please create new one");
        navigate("SignUp", { email: email.value });
      }
    } catch (error) {
      console.log(error);
      toastShowFunc("error", "Can't log in now😥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AuthInput
          {...email}
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onSubmitEditing={handleLogin}
          returnKeyType="send"
        />
        <AuthButton loading={loading} text={"Log In"} onPress={handleLogin} />
      </Container>
    </TouchableWithoutFeedback>
  );
};
