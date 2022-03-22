import React, { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
export default function ProfileScreen({ navigation: { navigate } }) {
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");

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
      <TouchableOpacity style={style.buttonContainer}><Button title="logout" color="black" onPress={handleLogout} /></TouchableOpacity>
      
    </View>
  );
}
