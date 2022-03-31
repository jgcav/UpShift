import React from "react";
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import { Card, Button, Icon } from "@rneui/base";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";

export const UserRoutes = ({ routes, navigate }) => {
  const test = routes.map((t) => t.id);
  const isCarousel = React.useRef(null);
  const { height, width } = Dimensions.get("window");

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate("SavedRoutes", { location: routes[index].myRoute })
        }
      >
        <Card
          containerStyle={{
            borderRadius: 10,
            paddingTop: 0,
            marginBottom: 0,
          }}
          wrapperStyle={{
            padding: 0,
            marginBottom: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
            }}
          >
            {/* <Icon name="place" /> */}
            <Card.Title
              style={{
                padding: 0,
                flex: 1,
                margin: 0,
                fontSize: 18,
                marginBottom: 4,
                marginTop: 5,
              }}
            >
              {item}
            </Card.Title>
          </View>

          <Card.Divider style={{ marginBottom: 5, padding: 0 }} />
          <View style={{ backgroundColor: "grey", height: height * 0.19 }}>
            <Image
              source={require("../assets/map.jpg")}
              style={{ width: undefined, height: height * 0.19 }}
            />
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      ref={isCarousel}
      data={test}
      renderItem={_renderItem}
      itemWidth={width * 0.85}
      sliderWidth={width * 0.91}
    />
  );
};
