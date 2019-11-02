import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './Map';
import SearchInput from './components/SearchInput';
import DestinationList from './components/DestinationList';

const App: () => React$Node = () => {
  const [isShow, setVisibility] = useState(true);

  function toggleView(event) {
    console.log('short', event);
    setVisibility(!isShow);
  }
  return (
    <View style={styles.container}>
      {isShow && <SearchInput />}

      <Map onPress={toggleView} />

      {isShow && <DestinationList />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default App;
