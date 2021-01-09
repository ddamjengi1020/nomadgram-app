import { useMutation } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { emailRegex, userNameRegex, toastShowFunc } from "../../utils";
import { CREATE_ACCOUNT } from "./AuthQuery";
import {
  makeRedirectUri,
  useAuthRequest,
  get,
  useAutoDiscovery,
} from "expo-auth-session";

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const GhContainer = styled(View)`
  margin-top: 15px;
  padding-top: 15px;
  border-top-width: 0.5px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

export default () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const email = useInput(params?.email || "");
  const firstName = useInput("");
  const lastName = useInput("");
  const userName = useInput("");
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
    },
  });

  const GhAuthenticate = async () => {
    console.log(response);
  };

  const handleSignUp = async () => {
    if (
      email.value === "" ||
      firstName.value === "" ||
      lastName.value === "" ||
      userName.value === ""
    ) {
      return toastShowFunc("error", "Each field can't be empty");
    } else if (!email.value.includes("@")) {
      return toastShowFunc("error", "Please write an email");
    } else if (!emailRegex.test(email.value)) {
      return toastShowFunc("error", "That is invalid Email");
    } else if (!userNameRegex.test(userName.value)) {
      return toastShowFunc("error", "Invalid User Name");
    } else if (lastName.value.includes(" ")) {
      return toastShowFunc("error", "Invalid First Name");
    } else if (firstName.value.includes(" ")) {
      return toastShowFunc("error", "Invalid last Name");
    }
    try {
      setLoading(true);
      const {
        data: { createAccount },
      } = await createAccountMutation();
      if (createAccount) {
        toastShowFunc("success", "Create new Account, Log in Now");
        navigate("LogIn", { email: email.value });
      } else {
        toastShowFunc("info", "Can't create Account, Try again");
        navigate("SignUp", { email: email.value });
      }
    } catch (error) {
      toastShowFunc("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <AuthInput
          {...email}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="go"
        />
        <AuthInput
          {...userName}
          placeholder="User Name"
          autoCapitalize="words"
          returnKeyType="go"
        />
        <AuthInput
          {...firstName}
          placeholder="First Name"
          autoCapitalize="words"
          returnKeyType="go"
        />
        <AuthInput
          {...lastName}
          placeholder="Last Name"
          autoCapitalize="words"
          returnKeyType="go"
        />
        <AuthButton loading={loading} text={"Sign Up"} onPress={handleSignUp} />
        <GhContainer>
          <AuthButton
            loading={loading}
            text={"Github"}
            bgColor={"#24282d"}
            onPress={GhAuthenticate}
          />
        </GhContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
};
