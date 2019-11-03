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
function SearchInput(props) {
  const options = {
    key: 'Your API KEY',
    region: 'nz',
    types: ['address'],
    fields: ['address_components', 'geometry.location', 'name'],
  };
  // const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);

  function getIndicator() {
    if (nextPageToken) {
      return (
        <View styles={styles.indicatorContainer}>
          <ActivityIndicator style={styles.indicator} animating={true} />
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <View styles={styles.indicatorContainer}>
        <Text style={styles.indicator}> No more results. </Text>
      </View>
    );
  }
  /**
   * Convert an object into query parameters.
   * @param {Object} object Object to convert.
   * @returns {string} Encoded query parameters.
   */
  function toQueryParams(object) {
    return Object.keys(object)
      .filter(key => !!object[key])
      .map(key => key + '=' + encodeURIComponent(object[key]))
      .join('&');
  }
  async function getPlacesFromGoogle(queryParams) {
    // build url
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${toQueryParams(
      queryParams,
    )}`;
    let data;
    await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        data = Promise.resolve(responseJson);
      })
      .catch(error => {
      });
    return data;
  }

  async function getPlaces(text) {
    let queryParams = {...options, query: text};
    let places = await getPlacesFromGoogle(queryParams);
    setItems(places.results);
    setNextPageToken(places.next_page_token);
  }

  async function getNextPagePlaces() {
    if (nextPageToken) {
      let queryParams = {...options, pagetoken: nextPageToken};
      let places = await getPlacesFromGoogle(queryParams);
      Array.prototype.push.apply(items, places.results);
      setItems(items);
      setNextPageToken(places.next_page_token);
    }
  }

  function placeItem(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          props.addDestination(item);
        }}>
        <Text>{item.formatted_address}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FontAwesome style={styles.searchIcon} name={'search'} />
        <TextInput
          style={styles.input}
          onChangeText={text => getPlaces(text)}
          placeholder={'Search here'}
        />
      </View>
      <FlatList
        style={styles.itemList}
        data={items}
        renderItem={({item}) => placeItem(item)}
        ListFooterComponent={() => getIndicator()}
        onEndReached={() => getNextPagePlaces()}
        initialListSize={20}
        pageSize={20}
        onEndReachedThreshold={0.01}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
