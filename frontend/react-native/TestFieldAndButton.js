import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text } from "react-native";
import { Platform } from 'react-native';

let getConfigProfile;
//Import from either functionsWeb.js or functionsMobile.js
// where both files use export { getConfigProfile }; at the end of the file
// to export the code
if (Platform.OS === 'web') {
  getConfigProfile = require('./functionsWeb').getConfigProfile;
} else{
  getConfigProfile = require('./functionsMobile').getConfigProfile;
} 

const TestFieldAndButton = () => {
  const [ip, onChangeIP] = useState("");
  const [port, onChangePort] = useState("");
  const [channel, onChangeChannel] = useState("");
  const [mix, onChangeMix] = useState("");
  const [data, setData] = useState(null);

  //define event to get json and set to data
  //Ensure bool is set to false to enable dummy mode.
  const handlePress = async () => {
    const result = await  getConfigProfile(ip, port, mix, channel,true);
    setData(result);
  }

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
        onPress={handlePress}
      />
      {data && <Text>{JSON.stringify(data)}</Text>}
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