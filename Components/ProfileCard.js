import { Text, View, Image, StyleSheet } from "react-native";
import getAge from "./ageCalculator";

export const ProfileCard = ({ age, profile, profilePicture }) => {
  return (
    <View style={styles.profileCard}>
      <Image
        style={styles.profilePic}
        source={{
          uri: profilePicture,
        }}
      />
      <View>
        <Text style={styles.text}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.text}>{profile.selectedGender}</Text>
        <Text style={styles.text}>{profile.bike}</Text>
        <Text style={styles.text}>{profile.region}</Text>
        <Text style={styles.text}>{age}</Text>
        <Text style={styles.text}>{profile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "#0984E3",
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    padding: 10,
  },
  profilePic: {
    width: 150,
    height: 150,
    margin: 10,
    alignSelf: "flex-start",
    borderRadius: 40,
  },
  title: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
