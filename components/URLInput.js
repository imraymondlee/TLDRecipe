import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Linking } from 'react-native';

export default function URLInput(props) {
  const [url, setURL] = useState('');

  const openURL = () => {
    props.loadRecipe(url);
  }

  const openOriginal = () => {
    Linking.openURL(url);
  }

  return (
    <View style={props.homeScreen ? styles.containerHome : styles.container }>
      <TextInput
        style={styles.input}
        onChangeText={text => setURL(text)}
        value={url}
        placeholder={'Recipe URL'}
      />
      <View style={styles.buttonView}>
        <TouchableOpacity 
          style={styles.button}
          onPress={openURL}
        >
          <Text style={styles.buttonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonSecondary}
          onPress={openOriginal}
        >
          <Text style={styles.buttonSecondaryText}>Original</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 25
  },
  containerHome: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10
  },
  input: {
    flexBasis: '100%',
    marginBottom: 15,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
  },
  buttonView: {
    flexDirection: 'row'
  },
  button: {
    marginHorizontal: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffd634',
    backgroundColor: '#ffd634',
    paddingHorizontal: 25
  },
  buttonSecondary: {
    marginHorizontal: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#44380b',
    paddingHorizontal: 25
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#44380b'
  },
  buttonSecondaryText: {
    fontWeight: 'bold',
    color: '#44380b'
  }
});
