import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function URLInput(props) {
  const [url, setURL] = useState('');

  const openURL = () => {
    props.loadRecipe(url);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setURL(text)}
        value={url}
        placeholder={'Recipe URL'}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={openURL}
      >
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 25
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
  },
  button: {
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#ffd634',
    paddingHorizontal: 25
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#171717'
  }
});
