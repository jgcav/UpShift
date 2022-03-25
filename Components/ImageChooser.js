// import React, { useEffect } from "react";
// import { View, Text, Button, Image, StyleSheet, Platform } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import firebase from "../config/firebase";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// export default function ImageChooser({ profilePicture, setProfilePicture }) {
//   useEffect(() => {
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert("Camera Roll Access Required");
//         }
//       }
//     })();
//   }, []);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.cancelled) {
//       const storage = getStorage();
//       const ref = ref(storage, "image.jpg");

//       const img = await fetch(result.uri);
//       const bytes = await img.blob();

//       await uploadBytes(ref, bytes);
//     }
//   };

//   // const pickImage = () => {
//   //   ImagePicker.launchImageLibraryAsync({
//   //     mediaTypes: ImagePicker.MediaTypeOptions.All,
//   //     allowsEditing: true,
//   //     aspect: [4, 3],
//   //     quality: 1,
//   //   }).then((result) => {
//   //     if (!result.cancelled) {
//   //       let uri = result.uri;
//   //       const uploadUri =
//   //         Platform.OS === "ios" ? uri.replace("file://", "") : uri;
//   //       setProfilePicture(uploadUri);
//   //     }
//   //   });
//   // };

//   return (
// <View styles={styles.container}>
//   <Button
//     title="Pick an Image From Camera Roll +"
//     onPress={pickImage}
//     color="white"
//   />
//   {/* {profilePicture && (
//     <Image source={{ uri: profilePicture }} style={styles.image} />
//   )} */}
// </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", justifyContent: "center" },
//   image: { width: 200, height: 200, margin: 10, alignSelf: "center" },
// });
