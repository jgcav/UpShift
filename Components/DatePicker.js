import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ setDate, date, tooYoung, getAge, setAge }) => {
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    
    setDate(currentDate);

    let ageS = getAge(currentDate);

    setAge(ageS);
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
                  backgroundColor: "#FF9494",
                  marginBottom: 20,
                  textAlign: "center",
                  color: "black",
                  paddingHorizontal: 10,

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
                  borderWidth: 1,
                }
          }
        >
          <Text style={styles.buttonText}>
            * Choose Date of Birth (18+ Only)
          </Text>
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
          style={{ flex: 1 }}
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
});
