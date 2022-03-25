import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
export default function RequestCard({ profileUrl, rider, navigate }) {
  console.log("profile", rider);
  console.log("url", profileUrl);
  return (
    <View>
      <Text>{`${rider.firstName} ${rider.lastName}`}</Text>
    </View>
  );
}
