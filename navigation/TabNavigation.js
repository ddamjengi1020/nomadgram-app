import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen
        name="add"
        component={View}
        listeners={{
          tabPress: () => console.log("add"),
        }}
      />
      <Tab.Screen name="notification" component={Notification} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>
);
