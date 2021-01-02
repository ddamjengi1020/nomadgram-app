import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import AuthHome from "../screens/Auth/AuthHome";
import LogIn from "../screens/Auth/LogIn";
import SignUp from "../screens/Auth/SignUp";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode={"none"}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={AuthHome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  </NavigationContainer>
);
