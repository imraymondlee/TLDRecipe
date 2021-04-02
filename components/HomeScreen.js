import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';



const HomeScreen = ({ navigation }) => {
  
  return (
    <View>
      <Text>Hello World!</Text>
      <Button
        title="Go to Recipe"
        onPress={() => navigation.navigate('Recipe')}
      />
    </View>
  );
}


export default HomeScreen;