import React, {useState} from 'react';
// import {pure} from 'recompose';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

let salesman = require('../utils/salesman');

function DestinationList(props) {
  // useEffect(() => {
  //   setList(props.destinationList);
  // },[props.destinationList]);
  const [solvedList, setSolvedList] = useState([]);
  const [showResult, togglePage] = useState(false);

  function getPath() {
    let points = [];
    props.destinationList.forEach(item => {
      points.push(
        new salesman.Point(
          item.geometry.location.lat,
          item.geometry.location.lng,
        ),
      );
    });

    let solution = salesman.solve(points);
    let ordered_points = solution.map(i => points[i]);

    setSolvedList(ordered_points);
    togglePage(true);
  }

  function getDestinationList() {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Destinations</Text>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => {
              getPath();
            }}>
            <FontAwesome5
              name={'directions'}
              style={styles.directionsIcon}
              size={18}
            />
            <View>
              <Text style={styles.text}>DIRECTIONS</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SwipeListView
          style={styles.list}
          key={item => item.id}
          data={props.destinationList}
          renderItem={(item, rowMap) => {
            return (
              <View style={styles.row}>
                <Text>{`(${item.index + 1}) ${
                  item.item.formatted_address
                }`}</Text>
              </View>
            );
          }}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <AntDesign
                style={styles.deleteIcon}
                name={'delete'}
                onPress={() => {
                  props.removeDestination(data);
                }}
              />
            </View>
          )}
          leftOpenValue={75}
          disableLeftSwipe
        />
      </>
    );
  }

  function getResultList() {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Solution</Text>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => {
              togglePage(!showResult);
            }}>
            <Ionicons name={'md-arrow-back'} style={styles.directionsIcon} />
            <View>
              <Text style={styles.text}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {solvedList &&
            solvedList.map((item, key) => {
              let matchedItem = props.destinationList.find(destinationItem => {
                return (
                  destinationItem.geometry.location.lat == item.x &&
                  destinationItem.geometry.location.lng == item.y
                );
              });
              return (
                <View key={key} style={styles.row}>
                  <Text>{`(${key + 1}) ` + matchedItem.formatted_address}</Text>
                </View>
              );
            })}
        </View>
      </>
    );
  }
  return (
    <View style={styles.container}>
      {showResult ? getResultList() : getDestinationList()}
    </View>
  );
}

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
  directionButton: {
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.white,
    borderRadius: 3,
    padding: 3,
    marginRight: 10,
    backgroundColor: Colors.direction,
  },
  list: {
    paddingBottom: 40,
  },
  titleText: {
    fontSize: 25,
  },
  directionsIcon: {
    color: Colors.white,
    marginRight: 5,
  },
  text: {
    color: Colors.white,
  },
  row: {
    paddingLeft: 5,
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
