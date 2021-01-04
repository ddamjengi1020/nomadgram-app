import Toast from "react-native-toast-message";

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const toastShowFunc = (text1) =>
  Toast.show({
    type: "error",
    position: "top",
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    text1,
  });
