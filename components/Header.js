import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Linking } from 'react-native';

export default function Header({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.logoText} onPress={() => navigation.navigate('Home')}>TLDR<Text style={styles.logoTextInner}>ecipe</Text></Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 25
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecc31f'
  },
  logoTextInner: {
    color: '#44380b'
  },
});
