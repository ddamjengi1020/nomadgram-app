import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({ navigation }) => (
  <View>
    <Text>selectphoto</Text>
    <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
      <Text>upload</Text>
    </TouchableOpacity>
  </View>
);
