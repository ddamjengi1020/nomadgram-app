import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigation} />
      <Stack.Screen name="Photo" component={PhotoNavigation} />
      <Stack.Screen name="Message" component={MessageNavigation} />
    </Stack.Navigator>
  </NavigationContainer>
);
