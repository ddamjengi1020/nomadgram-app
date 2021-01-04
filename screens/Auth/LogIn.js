import { useMutation } from "@apollo/client";
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
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const email = useInput("");
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });

  const handleLogin = async () => {
    const { value } = email;
    if (value === "") {
      return toastShowFunc("Email can't be empty");
    } else if (!value.includes("@")) {
      return toastShowFunc("Please write an email");
    } else if (!emailRegex.test(value)) {
      return toastShowFunc("That is invalid Email");
    }
    try {
      setLoading(true);
      await requestSecretMutation();
      // To do navigate part
    } catch (error) {
      console.log(error);
      toastShowFunc("Can't log in now😥");
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
