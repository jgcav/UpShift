import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ setDate, date }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };

  return (
    <View>
      <View>
        <Button
          title="Choose Date of Birth"
          onPress={() => showMode("date")}
        ></Button>
      </View>
      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  dateInput: {
    height: 40,
    width: 60,
    backgroundColor: "rgba(255,255,255,0.2)",
    margin: 10,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 10,
  },
  dateBlock: {
    flexDirection: "row",
  },
});
