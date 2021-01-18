import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { View, Animated } from "react-native";

const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.bgColor};
`;
const Container = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${(props) => `${props.size}px`};
`;
const Bar = styled(Animated.View)`
  width: 10px;
  height: 100%;
  transform: scaleY(1);
  background-color: ${theme.orangeColor};
  border: none;
  margin: 0 2px;
`;

const Loader = ({ size = 35 }) => {
  const scale1 = new Animated.Value(0);
  const scale2 = new Animated.Value(0);
  const scale3 = new Animated.Value(0);
  const scale4 = new Animated.Value(0);
  const expend1 = scale1.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.4, 1],
  });
  const expend2 = scale2.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.4, 1],
  });
  const expend3 = scale3.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.4, 1],
  });
  const expend4 = scale4.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.4, 1],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(scale1, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
    Animated.sequence([
      Animated.delay(150),
      Animated.loop(
        Animated.timing(scale2, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        })
      ),
    ]).start();
    Animated.sequence([
      Animated.delay(300),
      Animated.loop(
        Animated.timing(scale3, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        })
      ),
    ]).start();
    Animated.sequence([
      Animated.delay(450),
      Animated.loop(
        Animated.timing(scale4, {
          toValue: 2,
          duration: 1000,
          useNativeDriver: true,
        })
      ),
    ]).start();
  });

  return (
    <Wrapper>
      <Container size={size}>
        <Bar style={{ transform: [{ scaleY: expend1 }], opacity: expend1 }} />
        <Bar style={{ transform: [{ scaleY: expend2 }], opacity: expend2 }} />
        <Bar style={{ transform: [{ scaleY: expend3 }], opacity: expend3 }} />
        <Bar style={{ transform: [{ scaleY: expend4 }], opacity: expend4 }} />
      </Container>
    </Wrapper>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
};

export default Loader;
