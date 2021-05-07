import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

const Item = (props) => {
  const {item, index, onPressItem} = props;
  return (
    <TouchableOpacity style={styles.item} onPress={onPressItem}>
      <FastImage style={styles.img} source={{uri: item.profile_image}} />
      <View style={styles.contentItem}>
        <Text style={styles.txtItem}>{item.display_name}</Text>
        <Text style={styles.txtItem}>{index}</Text>
        <Text style={styles.txtItem}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(Item);
const itemHeight = 100;
const styles = StyleSheet.create({
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
