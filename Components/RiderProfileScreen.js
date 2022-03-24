import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";

export default function RiderProfileScreen({ route }) {
  const { height, width } = Dimensions.get("window");
  const { rider, profileUrl } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: profileUrl,
          }}
        />
      </View>
      <View style={styles.info}>
        <ScrollView>
          <View style={styles.infoTop}>
            <Text
              style={styles.name}
            >{`${rider.firstName} ${rider.lastName}`}</Text>
            {/* <Text>405 followers</Text> */}
            <Text style={styles.age}>{rider.age}</Text>
          </View>

          <Text style={styles.bio}>{rider.bio}</Text>
          <Text style={styles.bike}>{rider.bike}</Text>
          <View style={styles.infoLower}>
            <Text style={styles.gender}>{rider.selectedGender}</Text>
            <Text style={styles.distance}>1 mile</Text>
          </View>
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Message</Text>
      </TouchableOpacity>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0984E3",
  },
  imgContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },
  logo: {
    justifyContent: "center",
    width: width,
    height: width,
  },
  info: {
    flex: 1,
    paddingHorizontal: width * 0.025,
  },
  infoTop: {
    flexDirection: "row",
  },
  name: {
    fontSize: 40,
    textAlign: "left",
    flex: 4,
  },
  age: {
    fontSize: 40,
    textAlign: "right",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
  },
  bio: {
    flex: 1,
    fontSize: 22,
  },
  bike: {
    fontSize: 18,
  },
  infoLower: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gender: {
    fontSize: 18,
  },
  distance: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
