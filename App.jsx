import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import FruitList from './src/FruitList';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FruitList />
    </SafeAreaView>
  );
}
