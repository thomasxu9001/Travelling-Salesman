import React, {useState} from 'react';
// import {pure} from 'recompose';
import {StyleSheet, Text, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const DestinationList: () => React$Node = () => {
  const defaultItems = [
    {key: 'a'},
    {key: 'b'},
    {key: 'c'},
    {key: 'd'},
    {key: 'e'},
    {key: 'f'},
    {key: 'g'},
    {key: 'h'},
    {key: 'i'},
    {key: 'j'},
    {key: 'k'},
    {key: 'l'},
    {key: 'm'},
    {key: 'n'},
    {key: 'o'},
    {key: 'p'},
    {key: 'q'},
    {key: 'r'},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Destinations</Text>
        <View style={styles.title}>
          <FontAwesome5 name={'directions'} style={styles.text} />
          <Text style={styles.text}>DIRECTIONS</Text>
        </View>
      </View>
      <SwipeListView
        style={styles.list}
        data={defaultItems}
        renderItem={(data, rowMap) => (
          <View style={styles.row}>
            <Text>I am {data.key} in a SwipeListView</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <AntDesign style={styles.deleteIcon} name={'delete'} />
          </View>
        )}
        leftOpenValue={75}
        disableLeftSwipe
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    maxHeight: 400,
    alignSelf: 'stretch',
    justifyContent: 'center',
    textAlign: 'center',
    zIndex: 999,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    height: 50,
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    color: Colors.white,
    borderRadius: 3,
    padding: 3,
    backgroundColor: Colors.direction,
  },
  list: {
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 25,
  },
  text: {
    color: Colors.white,
  },
  row: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.dark,
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
  },
  rowBack: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingLeft: 27,
  },
  deleteIcon: {
    fontSize: 20,
  },
});

export default DestinationList;
