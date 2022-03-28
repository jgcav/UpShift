import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  collection,
  getDocs,
  query,
  limit,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import firebase from "../config/firebase.js";
import RiderCard from "./RiderCard";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.js";
const regions = [
  "Scotland",
  "North East",
  "North West",
  "Yorkshire & Humberside",
  "East Midlands",
  "West Midlands",
  "East of England",
  "London",
  "South East",
  "South West",
  "Wales",
  "Northern Ireland",
  "Isle of Man",
];
const genders = ["Male", "Female", "Other", "All"];
const db = firebase.firestore();

export default function RiderFinder({ navigation: { navigate } }) {
  const [riders, setRiders] = useState([]);
  const [gender, setGender] = useState("Male");
  const [region, setRegion] = useState("North East");
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  function getRiders() {
    const Proms = [
      getDocs(
        query(
          collection(db, "profiles"),
          where("selectedGender", "==", `${gender}`),
          where("region", "==", `${region}`),
          where("uid", "!=", `${currentUser.uid}`)
        )
      ),
      getDoc(doc(db, `profiles/${currentUser.uid}`)),
    ];
    return Promise.all(Proms).then(([snapshot, docSnap]) => {
      let profiles = snapshot.docs.map((doc) => {
        return doc.data();
      });
      const { connected } = docSnap.data();
      if (connected !== undefined) {
        profiles = profiles.filter(
          (profile) => !connected.includes(profile.uid)
        );
      }
      for (let i = profiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = profiles[i];
        profiles[i] = profiles[j];
        profiles[j] = temp;
      }

      return profiles;
    });
  }

  useEffect(() => {
    getRiders().then((profiles) => {
      setRiders(profiles);
      setLoading(false);
    });
  }, [region, gender]);

  if (loading)
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "#0984E3",
          flex: 1,
        }}
      >
        <Image
          style={styles.loading}
          source={require("../images/GREY-GEAR-LOADING.gif")}
        />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.filterContainer}>
        <SelectDropdown
          data={regions}
          onSelect={(selectedItem, index) => {
            setRegion(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          defaultButtonText={"Region"}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
        <SelectDropdown
          data={genders}
          onSelect={(selectedItem, index) => {
            setGender(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          defaultButtonText={"Gender"}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>

      {riders.map((rider, index) => {
        return (
          <RiderCard
            rider={rider}
            navigate={navigate}
            setLoading={setLoading}
            key={index}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0984E3",
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
  },
  loading: {
    width: 100,
    height: 100,
  },
});
