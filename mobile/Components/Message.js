import React from 'react'
import { Text, View } from "react-native";

export default function Message({message}) {
    return (
        <View>
            <Text>{message}</Text>
        </View>
    )
}
