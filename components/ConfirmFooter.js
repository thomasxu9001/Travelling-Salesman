import React from 'react';
import {pure} from 'recompose';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

function ConfirmFooter(props) {
  return (
    <View style={styles.footerContainer}>
      {props.markerDetail && (
        <View>
          <Text>{props.markerDetail.formatted_address}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.onCancle();
          }}>
          <Text>Cancle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.onConfirm();
          }}>
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    height: 120,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    zIndex: 999,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 15,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#e5e4e5',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    margin: 10,
    padding: 8,
    textAlign: 'center',
  },
});

export default pure(ConfirmFooter);
