import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Message" component={Message} />
    <Stack.Screen name="Messages" component={Messages} />
  </Stack.Navigator>
);
