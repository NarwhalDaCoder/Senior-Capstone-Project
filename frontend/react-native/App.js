import { StatusBar } from 'expo-status-bar';
import React, { useState,useRef,useEffect } from 'react';
import { StyleSheet, Text, View, Button,Animated } from 'react-native';
import TestFieldAndButton from './TestFieldAndButton';
import { LinearGradient } from 'expo-linear-gradient';
import LoadPage from './LoadPage';

export default function App() {
  const [showTestFieldAndButton, setShowTestFieldAndButton] = useState(true);

  return (
    <LinearGradient
      colors={['#dbbce4', '#f3cfd7', '#f7e0ca', '#f4f4f4', '#d1dcfb', '#d6f1df']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
    <View style={styles.container}>
      <Button
        title={showTestFieldAndButton ? "Switch to Load" : "Switch to Save"}
        onPress={() => setShowTestFieldAndButton(!showTestFieldAndButton)}
      />
      <Text>Enter the form details to access the console.</Text>
      {showTestFieldAndButton ? <TestFieldAndButton /> : <LoadPage/>}
      <StatusBar style="auto" />
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
