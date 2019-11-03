import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './Map';
import SearchInput from './components/SearchInput';
import DestinationList from './components/DestinationList';

const App: () => React$Node = () => {
  const [isShow, setVisibility] = useState(true);
  const [destinationList, setDestinationList] = useState([]);

  function toggleView() {
    setVisibility(!isShow);
  }
  function addDestination(item) {
    let newList = [...destinationList];
    let matchAddress = newList.find(itemInList => {
      return itemInList.formatted_address === item.formatted_address;
    });
    if (!matchAddress) {
      newList.push(item);
      setDestinationList(newList);
    }
  }
  function removeDestination(index) {
    let newList = [...destinationList];
    newList.splice(index, 1);
    setDestinationList(newList);
  }
  return (
    <View style={styles.container}>
      {isShow && <SearchInput addDestination={item => addDestination(item)} />}

      <Map onPress={toggleView} />

      {isShow && (
        <DestinationList
          destinationList={destinationList}
          removeDestination={index => removeDestination(index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default App;
