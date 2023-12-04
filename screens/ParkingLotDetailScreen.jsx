import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import auth from '@react-native-firebase/auth';
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

const ParkingLotDetailScreen = ({route, navigation}) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const item = route.params.item;

  function calculateExponentialParkingCost(
    startTime,
    endTime,
    ratePerHour,
    exponent,
  ) {
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endTime.getTime() - startTime.getTime();

    // Convert milliseconds to hours
    const hours = differenceInMilliseconds / (1000 * 60 * 60);

    // Calculate the total cost with exponential growth
    const totalCost = ratePerHour * Math.pow(hours, exponent);

    return totalCost.toFixed(2); // Rounds to two decimal places
  }

  const total = calculateExponentialParkingCost(startTime, endTime, 1, 1.25);

  const handleConfirm = () => {
    setLoading(true);
    firestore()
      .collection('reservations')
      .add({
        userId: auth().currentUser.uid,
        spotId: item.id,
        name: item.name,
        startTime: startTime,
        endTime: endTime,
        totalCost: total,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        setLoading(false);
        Alert.alert(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Available: {item.availability}</Text>
        <Text style={styles.itemText}>Slots: {item.capacity}</Text>
        <Text style={styles.itemSubHeaderText}>From</Text>
        <DatePicker date={startTime} onDateChange={setStartTime} />
        <Text style={styles.itemSubHeaderText}>End</Text>
        <DatePicker
          date={endTime}
          onDateChange={setEndTime}
          minimumDate={startTime}
        />
        <View style={{height: 15}} />
        <Text style={styles.itemSubHeaderText}>Total Cost: ${total}</Text>
        <View style={{height: 15}} />
        <Button
          style={styles.button}
          disabled={loading}
          title="Confirm"
          onPress={handleConfirm}
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
  },
  itemHeaderText: {
    fontSize: 18,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
  itemSubHeaderText: {
    fontSize: 16,
    paddingVertical: 2,
    fontWeight: 'bold',
  },
  itemText: {
    paddingVertical: 2,
    fontSize: 16,
  },
});

export default ParkingLotDetailScreen;
