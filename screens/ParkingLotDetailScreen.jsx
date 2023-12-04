import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ParkingLotDetailScreen = ({spot}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{spot.name}</Text>
        <Text style={styles.itemText}>Available: {spot.availability}</Text>
        <Text style={styles.itemText}>Slots: {spot.capacity}</Text>
        <Button
          style={styles.button}
          title="Reserve Yours"
          onPress={handleReserve}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 5,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  itemHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
  },
});

export default ParkingLotDetailScreen;
