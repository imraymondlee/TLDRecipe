import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = (props) => {

  return (
    <View style={styles.container}>
    <Text style={props.homeScreen ? styles.logoTextHome : styles.logoText} 
      onPress={() => props.navigation.reset({index: 0, routes: [{ name: 'Home' }]})}>TLDR<Text style={styles.logoTextInner}>ecipe</Text></Text>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginHorizontal: 15
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecc31f'
  },
  logoTextHome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ecc31f'
  },
  logoTextInner: {
    color: '#44380b'
  },

});

export default Header;