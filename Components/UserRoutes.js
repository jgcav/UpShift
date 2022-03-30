import React from "react";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import { Card, Button, Icon } from "@rneui/base";
import { Dimensions, StyleSheet, View, TouchableOpacity } from "react-native";

export const UserRoutes = ({ routes, navigate }) => {
  const test = routes.map((t) => t.id);
  const isCarousel = React.useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate("SavedRoutes", { location: routes[index].myRoute })
        }
      >
        <Card>
          <View
            style={{ flexDirection: "row-reverse", justifyContent: "center" }}
          >
            <Icon name="place" />
            <Card.Title style={{ padding: 5 }}>{item}</Card.Title>
          </View>

          <Card.Divider />
          <View style={styles.shape} />
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      ref={isCarousel}
      data={test}
      renderItem={_renderItem}
      itemWidth={235}
      sliderWidth={windowWidth}
    />
  );
};

const styles = StyleSheet.create({
  shape: {
    backgroundColor: "grey",
    height: 100,
  },
});
