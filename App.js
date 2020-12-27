import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [recipeName, setRecipeName] = useState('Loading...');
  const [recipeIngredients, setRecipeIngredients] = useState('Loading...');
  const [recipeInstructions, setRecipeInstructions] = useState('Loading...');

  useEffect(() => {
    const extractRecipe = function(data) {
      let json = JSON.parse(data);
      let recipe = json["@graph"].find(obj => {
        return obj["@type"] === "Recipe"
      });
      // debugger;
      setRecipeName(recipe.name);
      setRecipeIngredients(recipe.recipeIngredient);
      setRecipeInstructions(recipe.recipeInstructions.map(r => r.text));
    }
 
    requestPage('https://www.gimmesomeoven.com/baked-chicken-breast/')
      .then((data) => {
        return data;
      })
      .then((data) => {
        return extractStructuredData(data);
      })
      .then((data) => {
        extractRecipe(data);
      });

  }, []);
  
  return (
    <View style={styles.container}>
      <Text>{recipeName}</Text>
      <Text>{recipeIngredients}</Text>
      <Text>{recipeInstructions}</Text>
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
