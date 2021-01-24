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
      console.error('Error requesting page: ', error);
    });
}

const extractStructuredData = function(data) {
  const $ = cheerio.load(data);
  return $('script[type="application/ld+json"]').contents()[0].data;
}

export default function App() {
  const [recipeName, setRecipeName] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState();
  const [recipeHowToSection, setRecipeHowToSection] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState();
  const [recipeStatus, setRecipeStatus] = useState('none');   //none, loading, loaded, error

  const extractRecipe = function(data) {
    let json = JSON.parse(data);
    let recipe = json["@graph"].find(obj => {
      return obj["@type"] === "Recipe"
    });
    setRecipeName(recipe.name);
    setRecipeIngredients(recipe.recipeIngredient);

    //check if recipe has HowToSection
    if(recipe.recipeInstructions.some(obj => obj["@type"] === 'HowToSection')) {
      setRecipeHowToSection(recipe.recipeInstructions);
    } else {
      setRecipeInstructions(recipe.recipeInstructions.map(r => r.text));
    }

    setRecipeStatus('loaded');
  }

  const loadRecipe = (url) => {
    setRecipeStatus('loading');
    //TODO: reset the states before loading new recipe
    requestPage(url)
      .then((data) => {
        return data;
      })
      .then((data) => {
        return extractStructuredData(data);
      })
      .then((data) => {
        extractRecipe(data);
      })
      .catch((error) => {
        console.error('Error loading recipe: ', error);
        setRecipeStatus('error');
      });
  }

  const howToSections = recipeHowToSection.map((item, key) => {
    return (
      <ListSection key={key} heading={item.name} items={item.itemListElement} itemStyle="number" isHowToSection={true} />
    );
  })
  
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <URLInput loadRecipe={loadRecipe} />
      {
        (recipeStatus === 'loaded')
        ?
        <ScrollView contentContainerStyle={styles.recipeContainer}>
          <Text style={styles.title}>{recipeName}</Text>
          <ListSection heading="Ingredients" items={recipeIngredients} itemStyle="bullet" />

          <Text style={styles.heading}>Instructions</Text>
          {
            (recipeHowToSection.length > 0) 
            ? howToSections
            : <ListSection items={recipeInstructions} itemStyle="number" />
          }
        </ScrollView>
        :(recipeStatus === 'loading')
        ?<Text>Loading</Text>
        :(recipeStatus === 'error')
        ?<Text>Error</Text>
        :<React.Fragment />
      }

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
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
  heading: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
});
