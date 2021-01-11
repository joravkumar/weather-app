import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IWeather } from './Weather.interface';

const weatherEndPoint = 'https://weatherbit-v1-mashape.p.rapidapi.com/current';

// headers: {
//     'x-rapidapi-key': 'cab77a0b09msh87ed71dee26c6d2p155c74jsn11e31bcfb22e',
//     'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
//   }

const { width } = Dimensions.get('screen');
export default function Weather() {
  const [tempData, setTempData] = useState<IWeather>({
    city: null,
    temp: null,
    description: null,
  });
  const fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${lon}&lat=${lat}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '',
          'x-rapidapi-host': '',
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.data);
        if (response.data.length !== 0) {
          const { app_temp, city_name, weather } = response.data[0];
          setTempData({
            temp: app_temp,
            city: city_name,
            description: weather.description,
          });
        }
      });
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        alert('Error Gettig Weather Condtions');
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="cloud-outline" size={48} color="#fff" />
        <Text style={styles.tempText}>{tempData.temp}˚C</Text>
        <Text style={styles.subtitle}>{tempData.city}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{tempData.description}</Text>
        <Text style={styles.subtitle}>It hurts my eyes!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7b733',
    width,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40,
  },
  tempText: {
    fontSize: 35,
    color: '#fff',
  },
  title: {
    fontSize: 35,
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
});
