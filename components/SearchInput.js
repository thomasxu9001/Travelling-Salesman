import React, {useState} from 'react';
// import {pure} from 'recompose';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SearchInput: () => React$Node = () => {
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
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(defaultItems);

  function loadData(refreshing) {
    console.log('fired');
    let data = [];
    if (refreshing) {
      setLoading(true);
      setItems(defaultItems);
    }
    setTimeout(() => {
      if (!refreshing) {
        data = items.concat(defaultItems);
        setItems(data);
      }
      setLoading(false);
    }, 2000);
  }
  function getIndicator() {
    return (
      <View styles={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} animating={true} />
        <Text>Loading...</Text>
      </View>
    );
  }
  function getGeoLocation(text) {
    console.log(text);
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome style={styles.searchIcon} name={'search'} />
        <TextInput
          style={styles.input}
          onChangeText={text => getGeoLocation(text)}
          placeholder={'Search here'}
        />
      </View>
      <FlatList
        style={styles.itemList}
        data={items}
        refreshing={loading}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              () => {};
            }}>
            <Text>{item.key}</Text>
          </TouchableOpacity>
        )}
        onRefresh={() => {
          loadData(true);
        }}
        ListFooterComponent={() => getIndicator()}
        onEndReached={() => loadData()}
        initialListSize={10}
        pageSize={10}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 50,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    textAlign: 'center',
    zIndex: 999,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 4,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  searchIcon: {
    fontSize: 15,
  },
  input: {
    padding: 11,
    alignSelf: 'stretch',
    alignItems: 'center',
    textAlign: 'center',
    height: 40,
    backgroundColor: Colors.white,
  },
  itemList: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.dark,
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginTop: 5,
    maxHeight: 200,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    margin: 10,
  },
});

export default SearchInput;
