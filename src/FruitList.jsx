import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

const fruits = [
  'Apple',
  'Orange',
  'Watermelon',
  'Avocado',
  'Blueberry',
  'Coconut',
  'Durian',
  'Mango',
];

const styles = StyleSheet.create({
  flatlist: {

  },
  row: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
  rowTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

function FruitList() {
  function renderItem({ item }) {
    return (
      <View key={item} style={styles.row}>
        <Text style={styles.rowTitle}>{item}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={fruits}
      renderItem={renderItem}
      style={[
        styles.flatlist,
        {
          paddingTop: 20,
        },
      ]}
    />
  );
}

export default FruitList;
