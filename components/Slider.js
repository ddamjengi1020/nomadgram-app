import React, { useState } from "react";
import { Image } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Carousel, { Pagination } from "react-native-snap-carousel";
import constants from "../constants";
import theme from "../theme";

const Container = styled.View``;

const Slider = ({ files }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  return (
    <Container>
      <Carousel
        data={files}
        layout={"default"}
        sliderWidth={constants.width}
        itemWidth={constants.width}
        onSnapToItem={(idx) => setActiveSlide(idx)}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={{ uri: item.url }}
            style={{ width: constants.width, height: constants.height / 3 }}
          />
        )}
      />
      <Pagination
        containerStyle={{
          position: "absolute",
          bottom: -65,
          left: 0,
          right: 0,
        }}
        dotsLength={files.length}
        activeDotIndex={activeSlide}
        inactiveDotScale={0.7}
        inactiveDotOpacity={0.7}
        animatedFriction={6}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 6,
          backgroundColor: theme.orangeColor,
        }}
        inactiveDotStyle={{
          backgroundColor: theme.darkGreyColor,
        }}
      />
    </Container>
  );
};

Slider.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Slider;
