import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

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
        <Text style={styles.listText}>{item}</Text>
      </View>
    );
  })

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.heading}</Text>
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
