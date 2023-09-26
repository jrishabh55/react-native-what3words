import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import What3Words from 'react-native-what3words';

const API_KEY = '';
const MAP_API_KEY = '';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>What3Words</Text>
      <What3Words
        apiKey={API_KEY}
        mapApiKey={MAP_API_KEY}
        onEvent={console.log}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 500,
    marginTop: 100,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
