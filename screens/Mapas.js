import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function Mapas() {
  const location = {
    latitude: 4.7110,
    longitude: -74.0721,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
      <Text style={styles.tittle}>Mapificación</Text>
      <MapView
        style={styles.map}
        initialRegion={location}
      >
        <Marker
          coordinate={location}
          title={"Ubicación seleccionada"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  imagefondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tittle: {
    fontSize: 30,
    color: '#4d82bc',
    fontWeight: 'bold',
    marginTop: 10,
  },
  map: {
    width: '100%',
    height: '80%',
    marginTop: 10,
  },
});