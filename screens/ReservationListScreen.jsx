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
import auth from '@react-native-firebase/auth';

const ReservationListScreen = ({navigation}) => {
  const [userId, setUserId] = useState(auth().currentUser.uid);
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    if (userId != null) {
      const subscriber = firestore()
        .collection('reservations')
        .where('userId', '==', userId)
        .onSnapshot(documentSnapshot => {
          const list = [];
          documentSnapshot.docs.forEach(doc => {
            list.push(doc.data());
          });
          console.log(list);
          setReservations(list);
        });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }
  }, [userId]);

  function formatFirestoreTimestamp(firestoreTimestamp) {
    // console.log('firestoreTimestamp' + firestoreTimestamp)
    // Convert Firestore timestamp to JavaScript Date object
    const date = firestoreTimestamp.toDate();

    // Format the date to a string
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const dateString = date.toLocaleDateString('en-US', options);

    return dateString;
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemHeaderText}>Name</Text>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemHeaderText}>Start</Text>
      <Text style={styles.itemText}>
        {formatFirestoreTimestamp(item.startTime)}
      </Text>
      <Text style={styles.itemHeaderText}>End</Text>
      <Text style={styles.itemText}>
        {formatFirestoreTimestamp(item.endTime)}
      </Text>
      <Text style={styles.itemHeaderText}>Total Cost</Text>
      <Text style={styles.itemText}>{item.totalCost}</Text>
    </View>
  );

  if (reservations.length == 0) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reservations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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

export default ReservationListScreen;
