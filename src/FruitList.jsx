import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import PullToRefreshFlatList from './components/PullToRefreshFlatList';
import RefreshHeader from './components/RefreshHeader';

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
    backgroundColor: 'white',
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
  const [refreshing, setRefreshing] = useState(false);
  const [percent, setPercent] = useState(0);

  function renderItem({ item }) {
    return (
      <View key={item} style={styles.row}>
        <Text style={styles.rowTitle}>{item}</Text>
      </View>
    );
  }

  function onRefresh() {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  return (
    // <FlatList
  //      data={fruits}
  //      renderItem={renderItem}
  //      style={[
  // styles.flatlist,
  // {
  // paddingTop: 20,
  // },
  //      ]}
  //      refreshControl={(
  // <RefreshControl
  // refreshing={refreshing}
  // onRefresh={onRefresh}
  // />
  //      )}
    // />
    <PullToRefreshFlatList
      isRefreshing={refreshing}
      onRefresh={onRefresh}
      onPercentageChange={(percentage) => {
        setPercent(percentage / 2);
      }}
      RefreshHeader={(
        <RefreshHeader
          progress={percent}
          shouldPlayAnimation={refreshing}
        />
       )}
      refreshingHeight={100}
      data={fruits}
      renderItem={renderItem}
      contentContainerStyle={styles.flatlist}
    />
  );
}

export default FruitList;
