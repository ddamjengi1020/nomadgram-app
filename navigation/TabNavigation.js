import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import MessageLink from "../components/MessageLink";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notification from "../screens/Tabs/Notification";
import Profile from "../screens/Tabs/Profile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackFactory = (components, customOptions) => {
  return (
    <Stack.Navigator
      initialRouteName={components[0].name}
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        ...customOptions,
      }}
    >
      {components.map((component, idx) => {
        const { route, name } = component;
        return <Stack.Screen key={idx} name={name} component={route} />;
      })}
    </Stack.Navigator>
  );
};

export default () => (
  <Tab.Navigator>
    <Tab.Screen name="Home">
      {() =>
        StackFactory([{ route: Home, name: "Home" }], {
          headerRight: () => <MessageLink />,
        })
      }
    </Tab.Screen>
    <Tab.Screen name="Search">
      {() => StackFactory([{ route: Search, name: "Search" }])}
    </Tab.Screen>
    <Tab.Screen
      name="Add"
      component={View}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("Photo");
        },
      })}
    />
    <Tab.Screen name="Notification">
      {() => StackFactory([{ route: Notification, name: "Notification" }])}
    </Tab.Screen>
    <Tab.Screen name="Profile">
      {() => StackFactory([{ route: Profile, name: "Profile" }])}
    </Tab.Screen>
  </Tab.Navigator>
);
