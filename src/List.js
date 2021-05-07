import React, {useEffect, useState, useRef, useCallback} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Item from './Item';
const List = ({getItemList}) => {
  console.log('Re-render list');
  let currentPage = useRef(1);
  const myList = useRef(null);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const getList = useCallback(async (page) => {
    try {
      let response = await fetch(
        `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is : ${error}`);
    }
  }, []);
  useEffect(() => {
    console.log('List ref', myList);
    getList(currentPage.current).then((res) => {
      setData([...data, ...res.items]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <Item item={item} index={index} onPressItem={() => getItemList(item)} />
      );
    },
    [getItemList],
  );
  const keyExtractor = useCallback((item, index) => `${index}`, []);
  const handleLoadMore = () => {
    currentPage.current = currentPage.current + 1;
    getList(currentPage.current).then((res) => {
      setData([...data, ...res.items]);
    });
  };
  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [],
  );
  return (
    <FlatList
      ref={myList}
      data={data}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={15}
      updateCellsBatchingPeriod={50}
      onEndReachedThreshold={0.75}
      onEndReached={handleLoadMore}
      getItemLayout={getItemLayout}
    />
  );
};
export default React.memo(List);
const itemHeight = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  item: {
    height: itemHeight,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  img: {width: 80, height: 80, alignSelf: 'center', marginLeft: 20},
  contentItem: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  txtItem: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
});
