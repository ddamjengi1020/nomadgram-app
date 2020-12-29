import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="home" component={AuthHome} />
      <Stack.Screen name="login" component={LogIn} />
      <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
  </NavigationContainer>
);
