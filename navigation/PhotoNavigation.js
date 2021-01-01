import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="selectPhoto" component={SelectPhoto} />
    <Tab.Screen name="takePhoto" component={TakePhoto} />
  </Tab.Navigator>
);

export default () => (
  <Stack.Navigator headerMode="screen" mode="modal">
    <Stack.Screen name="photoTabs" component={PhotoTabs} />
    <Stack.Screen name="uploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);
