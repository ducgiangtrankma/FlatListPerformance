import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import List from './src/List';
export default function App(props) {
  console.log('Re-render App');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const getItemList = useCallback((value) => {
    setItem(value);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>{count}</Text>
      <Text>List data : {item?.display_name}</Text>
      <TouchableOpacity
        onPress={() => {
          setCount(count + 1);
        }}>
        <Text>Check</Text>
      </TouchableOpacity>
      <List getItemList={getItemList} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
