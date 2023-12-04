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

const ParkingLotListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    const fetchSpots = () => {
      firestore()
        .collection('spots')
        .get()
        .then(collectionSnapshot => {
          const list = [];
          collectionSnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            list.push({
              id: documentSnapshot.id,
              ...data,
            });
          });
          console.log(list[0])
          setSpots(list);
        })
        .catch(error => {
          console.log(error);
        });
    };
    fetchSpots();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleReserve = () => {

  }

  const filteredSpots = spots.filter(spot =>
    spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>Available: {item.availability}</Text>
      <Text style={styles.itemText}>Slots: {item.capacity}</Text>
      <Button
        style={styles.button}
        title="Reserve Yours"
        onPress={handleReserve}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Icon name="map" size={20} color="#000" />
      </View>
      <FlatList
        data={filteredSpots}
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
    fontWeight: 'bold'
  },
  itemText: {
    fontSize: 16,
  },
});

export default ParkingLotListScreen;
