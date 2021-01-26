import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import theme from "../theme";
import constants from "../constants";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => (
  <Tab.Navigator
    tabBarPosition="bottom"
    tabBarOptions={{
      indicatorStyle: {
        backgroundColor: theme.orangeColor,
      },
      style: {
        backgroundColor: theme.bgColor,
        marginBottom: 20,
      },
      labelStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <Tab.Screen name="Select" component={SelectPhoto} />
    <Tab.Screen name="Take" component={TakePhoto} />
  </Tab.Navigator>
);

export default () => (
  <Stack.Navigator
    screenOptions={{
      ardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen
      name="PhotoTabs"
      component={PhotoTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);
