import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, View } from "react-native";
import TestGetTCP from "./Functions";
//import  TestGet  from "./Functions.js";
const TestFieldAndButton = () => {
  const [ip, onChangeIP] = React.useState("");
  const [port, onChangePort] = React.useState("");
  const [channel, onChangeChannel] = React.useState("");
  const [mix, onChangeMix] = React.useState("");
  return (
    <View>
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeIP}
        value={ip}
        placeholder="Enter IP Address"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePort}
        value={port}
        placeholder="Enter Port"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeChannel}
        value={channel}
        placeholder="Enter Channel"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeMix}
        value={mix}
        placeholder="Enter Mix"
        keyboardType="numeric"
      />
      
    </SafeAreaView>
    <Button
    title="Press me"
    //onPress={() => console.log(ip+" "+ port + " " + mix +" " + channel)}
    onPress={() => TestGetTCP(ip,port,mix,channel)}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TestFieldAndButton;