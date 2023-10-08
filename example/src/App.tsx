import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import What3Words from 'react-native-what3words';
import useLocation from './hooks/useLocation';

const API_KEY = '';
const MAP_API_KEY = '';

export default function App() {
  const { isLoading, location } = useLocation();
  const [selectedLocation, setSelectedLocation] = useState();

  const handleSelected = (event: any) => {
    console.log('🚀 ~ file: App.tsx:15 ~ handleSelected ~ event:', event);
    setSelectedLocation(event.data.words);
  };

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
        onEvent={handleSelected}
        lat={location?.latitude ?? 0}
        lng={location?.longitude ?? 0}
        words={selectedLocation}
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
