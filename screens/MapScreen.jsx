import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {SafeAreaView, StyleSheet, View} from 'react-native';

const MapScreen = ({route, navigation}) => {
  console.log(route.params.spots[0].location.longitude);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.044308,
          longitude: -114.0656663,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {route.params.spots.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: item.location.latitude,
              longitude: item.location.longitude,
            }}
            onCalloutPress={() =>
              navigation.navigate('ParkingLotDetail', {item})
            }
            title={item.name}
            description={`Available slot: ${item.availability}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
