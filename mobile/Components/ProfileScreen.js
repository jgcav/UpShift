import React, { useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [room, setRoom] = useState("");
  const handleLogout = () => {
    setError("");

    logout()
      .then(() => {
        navigate("Login");
      })
      .catch(() => {
        setError("Failed to log out");
      });
  };
  return (
    <View>
      <Text>{currentUser && currentUser.email}</Text>
      <Text>{error && error}</Text>
      <TouchableOpacity style={style.buttonContainer}>
        <Button title="logout" color="black" onPress={handleLogout} />
      </TouchableOpacity>
      <TouchableOpacity style={style.buttonContainer}>
        <Button
          title="chat"
          color="black"
          onPress={() => {
            navigate("Chat", { roomId: room });
          }}
        />
      </TouchableOpacity>
      <TextInput
        placeholder="room"
        placeholderTextColor={"rgba(255,255,255,0.6)"}
        autoCapitalize="none"
        value={room}
        onChangeText={setRoom}
        autoCorrect={false}
      />
    </View>
  );
}

const style = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0984E3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
