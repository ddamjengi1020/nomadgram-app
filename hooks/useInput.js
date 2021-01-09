import { useState } from "react";

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const onChangeText = (text) => {
    setValue(text);
  };
  return { value, onChangeText, setValue };
};

export default useInput;
