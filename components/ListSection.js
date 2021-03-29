import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/*
Component for sections that present a list of items 
(ingredients, single set of instructions, instructions with sections)
*/

export default function ListSection(props) {
  const list = props.items.map((item, key) => {
    return (
      <View key={key} style={styles.listItem}>
        {
          (props.itemStyle === "bullet") 
          ? <Text style={styles.listBullet}>{'\u2022'}</Text>
          : (props.itemStyle === "number") 
          ? <Text style={styles.listNumber}>{key + 1}</Text>
          : ""
        }
        {
          (props.isHowToSection) 
          ? <Text style={styles.listText}>{item.text}</Text>
          : <Text style={styles.listText}>{item}</Text>
        }
      </View>
    );
  })

  return (
    <View style={styles.container}>
      {
        props.heading &&
        <Text style={props.isHowToSection ? styles.subHeading : styles.heading}>{props.heading}</Text>
      }

      {list}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  },
  heading: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  subHeading: {
    marginBottom: 10,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 8
  },
  listBullet: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "bold",
    color: '#ffd634'
  },
  listNumber: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "bold",
    color: '#757574'
  },
  listText: {
    flex: 1,
    paddingLeft: 10,
    lineHeight: 24
  }
});
