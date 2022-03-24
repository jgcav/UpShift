import React from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";

export default function RiderProfileScreen({ route }) {
  const { rider, profileUrl } = route.params;
  console.log(rider, profileUrl);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: profileUrl,
        }}
      />
      <Text style={styles.name}>{`${rider.firstName} ${rider.lastName}`}</Text>
      <Text>405 followers</Text>
      <Text>{rider.age}</Text>
      <Text>{rider.bio}</Text>
      <Text>{rider.bike}</Text>
      <Text>{rider.gender}</Text>
      <Text>1 mile</Text>
      <Button title="Message" color="black" onPress={() => {}} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  logo: {
    justifyContent: "center",
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 50,
    textAlign: "left",
  },
});
