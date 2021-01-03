import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from 'react-native';
import cheerio from 'react-native-cheerio';
import ListSection from './components/ListSection';
import URLInput from './components/URLInput';

const requestPage = function(url) {
  return fetch('https://cors-anywhere.herokuapp.com/' + url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
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
  const [recipeIngredients, setRecipeIngredients] = useState(['Loading...']);
  const [recipeInstructions, setRecipeInstructions] = useState(['Loading...']);

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
 
    requestPage('https://natashaskitchen.com/pan-seared-steak/')
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
    <SafeAreaView style={styles.droidSafeArea}>
        <URLInput />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{recipeName}</Text>
          <ListSection heading="Ingredients" items={recipeIngredients} itemStyle="bullet" />
          <ListSection heading="Instructions" items={recipeInstructions} itemStyle="number" />
          <StatusBar style="auto" />
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "bold"
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 45 : 0
  },
});
