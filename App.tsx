import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather/Weather';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator />
          <Text style={styles.fetchingContainer}>Fetching the Weather...</Text>
        </View>
      ) : (
        <Weather />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fetchingContainer: {
    marginTop: 15
  }
});
