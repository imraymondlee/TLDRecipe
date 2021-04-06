import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, Platform } from 'react-native';
import cheerio from 'react-native-cheerio';
import Header from './Header';
import ListSection from './ListSection';
import URLInput from './URLInput';

//retrieving recipe website inputted
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

//takes HTML of the page to extract the structured data
const extractStructuredData = function(data) {
  const $ = cheerio.load(data);
  return $('script[type="application/ld+json"]').contents()[0].data;
}

export default function RecipeScreen(props) {
  const [url, setUrl] = useState('');

  const [recipeName, setRecipeName] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState();
  const [recipeHowToSection, setRecipeHowToSection] = useState([]);
  const [recipeInstructions, setRecipeInstructions] = useState();
  const [recipeStatus, setRecipeStatus] = useState('none');   //none, loading, loaded, error

  //takes structured data to extract the recipe
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

  const clearRecipe = () => {
    setRecipeName();
    setRecipeIngredients();
    setRecipeHowToSection([]);
    setRecipeInstructions();
  }
  
  const loadRecipe = (url) => {
    setRecipeStatus('loading');
    clearRecipe();
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

  //populate the URL that is passed through route parameter and load recipe
  useEffect(() => {
    setUrl(props.route.params.url);
    loadRecipe(props.route.params.url);
  }, []);

  //render instruction sections. Each ListSection is a howToSection
  const howToSections = recipeHowToSection.map((item, key) => {
    return (
      <ListSection key={key} heading={item.name} items={item.itemListElement} itemStyle="number" isHowToSection={true} />
    );
  })
  
  return (
    <View>
      <Header navigation={props.navigation} />
      <URLInput navigation={props.navigation} url={url} setUrl={setUrl} />
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
        ?<Text style={styles.recipeStatus}>Loading</Text>
        :(recipeStatus === 'error')
        ?<Text style={styles.recipeStatus}>Error loading the recipe</Text>
        :<React.Fragment />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingBottom: 150,
    paddingHorizontal: 15
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
  recipeStatus: {
    alignSelf: 'center'
  }
});
