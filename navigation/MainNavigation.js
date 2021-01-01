import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="main" component={TabNavigation} />
      <Stack.Screen name="photo" component={PhotoNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);
