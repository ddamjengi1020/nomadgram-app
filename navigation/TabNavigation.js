import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import constants from "../constants";
import NavIcon from "../components/NavIcon";
import MessageLink from "../components/MessageLink";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notification from "../screens/Tabs/Notification";
import Profile from "../screens/Tabs/Profile";
import PostDetail from "../screens/StackInTabs/PostDetail";
import UserDetail from "../screens/StackInTabs/UserDetail";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackFactory = (components) => {
  return (
    <Stack.Navigator
      initialRouteName={components[0].name}
      screenOptions={{
        // headerStyle: { height: 80 }, // Maybe..
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {components.map((component, idx) => (
        <Stack.Screen
          key={idx}
          name={component.name || " "}
          component={component.route}
        />
      ))}
    </Stack.Navigator>
  );
};

export default () => (
  <Tab.Navigator
    tabBarOptions={{ showLabel: false, keyboardHidesTabBar: true }}
    initialRouteName={"Add"}
  >
    <Tab.Screen
      name="Home"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={focused ? "home" : "home-outline"} />
        ),
      }}
    >
      {() =>
        StackFactory([
          { route: Home, name: "home" },
          { route: PostDetail, name: "PostDetail" },
          { route: UserDetail, name: "UserDetail" },
        ])
      }
    </Tab.Screen>
    <Tab.Screen
      name="Search"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={focused ? "search" : "search-outline"}
          />
        ),
      }}
    >
      {() =>
        StackFactory([
          { route: Search },
          { route: PostDetail, name: "PostDetail" },
          { route: UserDetail, name: "UserDetail" },
        ])
      }
    </Tab.Screen>
    <Tab.Screen
      name="Add"
      component={View}
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon focused={focused} name={"camera"} size={35} />
        ),
      }}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate("Photo");
        },
      })}
    />
    <Tab.Screen
      name="Notification"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={focused ? "heart" : "heart-outline"}
          />
        ),
      }}
    >
      {() => StackFactory([{ route: Notification, name: "Notification" }])}
    </Tab.Screen>
    <Tab.Screen
      name="Profile"
      options={{
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={focused ? "person" : "person-outline"}
          />
        ),
      }}
    >
      {() =>
        StackFactory([
          { route: Profile, name: "Profile" },
          { route: PostDetail, name: "PostDetail" },
          { route: UserDetail, name: "UserDetail" },
        ])
      }
    </Tab.Screen>
  </Tab.Navigator>
);
