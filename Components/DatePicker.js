import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({
  setDate,
  date,
  tooYoung,
  getAge,
  setAge,
  age,
  setTooYoung,
}) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    // console.log("here");
    setAge(getAge(date));
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  return (
    <View style={styles.dateBlock}>
      <View>
        <TouchableOpacity
          onPress={() => showMode("date")}
          style={
            tooYoung
              ? {
                  height: 40,
                  width: 300,
                  backgroundColor: "rgba(255, 0, 0, 0.5)",
                  marginBottom: 20,
                  textAlign: "center",
                  color: "black",
                  paddingHorizontal: 10,
                  borderColor: "red",
                  borderWidth: 2,
                  paddingVertical: 10,
                }
              : {
                  height: 40,
                  width: 300,
                  backgroundColor: "white",
                  marginBottom: 20,
                  textAlign: "center",
                  color: "black",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderColor: "black",
                  borderWidth: 2,
                }
          }
        >
          <Text style={styles.buttonText}>* Choose Date of Birth (18+ Only)</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          textColor="black"
          style={{flex: 1}}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateBlock: {
    width: 300,
  },
  buttonText: {
    textAlign: "center",
    color: "grey",
  },
  // date: {
  //   color: "red",
  // }
});
