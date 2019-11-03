import React, {useState} from 'react';
// import {pure} from 'recompose';
import {StyleSheet, Text, View, Button} from 'react-native';
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
          <View style={styles.title}>
            <FontAwesome5 name={'directions'} style={styles.text} size={15} />
            <Button
              title="DIRECTIONS"
              color={Colors.white}
              onPress={() => {
                getPath();
              }}
            />
          </View>
        </View>
        <SwipeListView
          style={styles.list}
          key={item => item.index}
          data={props.destinationList}
          renderItem={(item, rowMap) => {
            return (
              <View style={styles.row}>
                <Text>{item.item.formatted_address}</Text>
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
          <View style={styles.title}>
            <Ionicons name={'md-arrow-back'} style={styles.text} />
            <Button
              title="Back"
              color={Colors.white}
              onPress={() => {
                togglePage(!showResult);
              }}
            />
          </View>
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
                <Text key={key} style={styles.row}>{matchedItem.formatted_address}</Text>
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
