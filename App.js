import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const requestPage = function(url){
  console.log('requestPage: ', url);
  
  return fetch('https://cors-anywhere.herokuapp.com/' + url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function App() {
  requestPage('https://google.ca');
  
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
});
