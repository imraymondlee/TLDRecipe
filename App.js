import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import cheerio from 'react-native-cheerio';

const requestPage = function(url) {
  return fetch('https://cors-anywhere.herokuapp.com/' + url)
    .then((response) => response.text())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

const extractStructuredData = function(data) {
  const $ = cheerio.load(data);
  return $('script[type="application/ld+json"]').contents()[0].data;
}

const extractRecipe = function(data) {
  let json = JSON.parse(data);
  let recipe = json["@graph"].find(obj => {
    return obj["@type"] === "Recipe"
  });

}

export default function App() {
  requestPage('https://www.gimmesomeoven.com/baked-chicken-breast/')
    .then((data) => {
      return data;
    })
    .then((data) => {
      return extractStructuredData(data);
    })
    .then((data) => {
      // console.log(data);
      extractRecipe(data);
    });
  
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
