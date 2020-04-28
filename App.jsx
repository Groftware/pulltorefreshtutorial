import React from 'react';
import { StyleSheet, View } from 'react-native';
import FruitList from './src/FruitList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lottieView: {
    height: 100,
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <FruitList />
    </View>
  );
}
