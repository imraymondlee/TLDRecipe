import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import Header from './Header';
import URLInput from './URLInput';



const HomeScreen = (props) => {
  const [url, setUrl] = useState('');

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} homeScreen={true} />
      <Text style={styles.subtitle}>Just the information you need from a recipe.</Text>
      <URLInput navigation={props.navigation} homeScreen={true} url={url} setUrl={setUrl} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  subtitle: {
    marginVertical: 15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444034'
  },
});

export default HomeScreen;