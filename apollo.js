import { HttpLink, ApolloLink, concat } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = new HttpLink({ uri: "http://172.30.1.21:5000" });

const authLink = new ApolloLink(async (operation, forward) => {
  const token = await AsyncStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  return forward(operation);
});

const options = {
  link: concat(authLink, httpLink),
};

export default options;
