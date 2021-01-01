import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="home" component={Home} />
    <Tab.Screen name="search" component={Search} />
    <Tab.Screen
      name="add"
      component={View}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("photo");
        },
      })}
    />
    <Tab.Screen name="notification" component={Notification} />
    <Tab.Screen name="profile" component={Profile} />
  </Tab.Navigator>
);
