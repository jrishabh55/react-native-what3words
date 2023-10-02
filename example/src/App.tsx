import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import What3Words from 'react-native-what3words';
import useLocation from './hooks/useLocation';

const API_KEY = 'ICYFWDRW';
const MAP_API_KEY = 'AIzaSyB0N8Lgj0Vgg5RV10COdLcanKH_9Ll0zhg';

export default function App() {
  const { isLoading, location } = useLocation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>What3Words</Text>
      <What3Words
        apiKey={API_KEY}
        mapApiKey={MAP_API_KEY}
        onEvent={console.log}
        lat={location?.latitude ?? 0}
        lng={location?.longitude ?? 0}
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
