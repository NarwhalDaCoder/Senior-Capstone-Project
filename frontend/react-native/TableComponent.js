import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const TableComponent = () => {
  const [mixName, setMixName] = useState('');
  const [mixData, setMixData] = useState([]);

  const pickJSONFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.type === 'success') {
        setMixName(result.name);

        const fileContents = await fetch(result.uri).then((response) =>
          response.json()
        );

        setMixData(fileContents);
      }
    } catch (err) {
      console.log('Error picking JSON file:', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{mixName || 'No mix selected'}</Text>
        <Button title="+" onPress={pickJSONFile} />
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Channel</Text>
          <Text style={styles.cell}>Device</Text>
          <Text style={styles.cell}>Level</Text>
          <Text style={styles.cell}>Pan</Text>
          <Text style={styles.cell}>On</Text>
        </View>
        {mixData.map((mixItem, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{mixItem.channel}</Text>
            <Text style={styles.cell}>{mixItem.device}</Text>
            <Text style={styles.cell}>{mixItem.level}</Text>
            <Text style={styles.cell}>{mixItem.pan}</Text>
            <Text style={styles.cell}>{mixItem.on}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});

export default TableComponent;