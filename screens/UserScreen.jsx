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

const UserScreen = ({route, navigation}) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Email: {auth().currentUser.email}</Text>
        <View style={{height: 15}} />
        <Button style={styles.button} title="Signout" onPress={handleLogout} />
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

export default UserScreen;
