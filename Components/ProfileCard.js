import { View, Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Text, Card, Icon, Button } from "@rneui/base";

export const ProfileCard = ({ age, profile }) => {
  const { height, width } = Dimensions.get("window");
  return (
    
    <Card
      containerStyle={{
        paddingVertical: 10,
        borderRadius: 10,
        height: height * 0.45,
      }}
    >
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: profile.img }}
          style={{
            width: width * 0.4,
            height: width * 0.4,
            borderRadius: (width * 0.4) / 2,
            borderColor: "#e1e8ee",
            borderWidth: 5,
          }}
        />
      </View>
      <Card.Divider />
      <View style={styles.infoContainer}>
        <Card.Title
          style={{ marginBottom: 2, paddingBottom: 0 }}
        >{`${profile.firstName} ${profile.lastName}`}</Card.Title>
        <Text style={{ textAlign: "center" }}>{profile.bio}</Text>
        <View style={styles.subInfoContainer}>
          <Text style={{ flex: 1 }}>{profile.bike}</Text>
          <Text style={{ flex: 1, textAlign: "right" }}>{profile.region}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  subInfoContainer: {
    flexDirection: "row",
  },
});
