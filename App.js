import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Map from './Map';
import SearchInput from './components/SearchInput';
import DestinationList from './components/DestinationList';
import ConfirmFooter from './components/ConfirmFooter';
import NotificationsIOS from 'react-native-notifications/lib/src/index.ios';
import moment from 'moment';

const App: () => React$Node = () => {
  const [isShow, setVisibility] = useState(true);
  const [destinationList, setDestinationList] = useState([]);
  const [showFooter, setShowFooter] = useState(false);
  const [pinedPlace, setPinedPlace] = useState();
  const [markerDetail, setMarkerDetail] = useState();
  const [notificationId, setNotificationId] = useState();
  const options = {
    key: 'Your API Key',
    region: 'nz',
    types: ['address'],
    fields: ['address_components', 'geometry.location', 'name'],
  };
  function toggleView() {
    setPinedPlace(null);
    setMarkerDetail(null);
    setShowFooter(false);
    setVisibility(!isShow);
  }
  function addDestination(item) {
    let newList = [...destinationList];
    let matchAddress = newList.find(itemInList => {
      return itemInList.formatted_address === item.formatted_address;
    });

    if (!matchAddress) {
      newList.push({...item, id: item.place_id});
      setDestinationList(newList);
      // Set notification
      if (notificationId) {
        NotificationsIOS.cancelLocalNotification(notificationId);
      }
      let fiveMinutesLater = moment();
      fiveMinutesLater.set({minute: fiveMinutesLater.get('minute') + 5});
      console.log(fiveMinutesLater);
      let newNotificationId = NotificationsIOS.localNotification({
        fireDate: fiveMinutesLater,
        body: item.formatted_address,
        title: 'The last place you added',
        sound: 'chime.aiff',
        silent: false,
        category: 'Travelling Salesman',
        userInfo: {},
      });
      setNotificationId(newNotificationId);
    }
  }
  function removeDestination(index) {
    let newList = [...destinationList];
    newList.splice(index, 1);
    setDestinationList(newList);
  }
  async function onLongPress(event) {
    setVisibility(false);
    setPinedPlace(event.coordinate);
    let data;
    let queryParams = {
      ...options,
      latlng: `${event.coordinate.latitude},${event.coordinate.longitude}`,
    };
    data = await getPlacesFromGoogleGeo(queryParams);
    if (data.results && data.results.length > 0) {
      setMarkerDetail(data.results[0]);
      setShowFooter(true);
    }
  }
  function onFooterConfirm() {
    addDestination(markerDetail);
    setShowFooter(false);
    setVisibility(true);
  }
  function onFooterCancel() {
    setPinedPlace(null);
    setMarkerDetail(null);
    setShowFooter(false);
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
      .catch(error => {});
    return data;
  }

  async function getPlacesFromGoogleGeo(queryParams) {
    // build url
    const url = `https://maps.google.com/maps/api/geocode/json?${toQueryParams(
      queryParams,
    )}`;
    let data;
    await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        data = Promise.resolve(responseJson);
      })
      .catch(error => {});
    return data;
  }

  return (
    <View style={isShow ? styles.container : styles.footerContainer}>
      {isShow && (
        <SearchInput
          addDestination={item => addDestination(item)}
          getPlacesFromGoogle={getPlacesFromGoogle}
          searchOptions={options}
        />
      )}

      <Map onPress={toggleView} onLongPress={onLongPress} marker={pinedPlace} />
      {isShow && (
        <DestinationList
          destinationList={destinationList}
          removeDestination={index => removeDestination(index)}
        />
      )}

      {!isShow && showFooter && (
        <ConfirmFooter
          onCancle={onFooterCancel}
          onConfirm={onFooterConfirm}
          markerDetail={{...markerDetail}}
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

  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default App;
