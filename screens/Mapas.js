import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../src/config/firebase";
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyC66ZWY55i0_SWvY9pskT9Mj4OptmQZoiY");
export default function Mapas() {
  const [coordenadas, setCoordenadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'crimenes'), (snapshot) => {
      let direccionesData = [];
      snapshot.forEach((doc) => {
        const direccion = doc.data().Direccion;
        if (direccion) {
          direccionesData.push(`${direccion}, Tuluá, Valle`);
        }
      });

      if (direccionesData.length === 0) {
        setError('No se encontraron direcciones en la colección');
        setLoading(false);
        return;
      }

      console.log("Direcciones obtenidas:", direccionesData); // Depuración
      obtenerCoordenadas(direccionesData);
    }, (error) => {
      setError(error.message);
      setLoading(false);
      console.error("Error obteniendo los datos de Firestore: ", error);
    });

    return () => unsubscribe();
  }, []);

  const obtenerCoordenadas = async (direcciones) => {
    try {
      const coordenadasPromises = direcciones.map(async (direccion) => {
        const response = await Geocoder.from(direccion);
        if (response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return {
            direccion,
            latitude: location.lat,
            longitude: location.lng,
          };
        } else {
          console.error(`No se pudo convertir la dirección a coordenadas: ${direccion}`);
          return null;
        }
      });

      const coordenadasResults = await Promise.all(coordenadasPromises);
      const validCoordenadas = coordenadasResults.filter(coord => coord !== null);
      setCoordenadas(validCoordenadas);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.error("Error al obtener las coordenadas: ", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (coordenadas.length === 0) {
    return <Text>No se encontraron coordenadas para las direcciones proporcionadas.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1,
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#dfe9f5'}}>
      <Text style={styles.tittle}>Mapificación</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordenadas[0].latitude,
          longitude: coordenadas[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordenadas.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            title={coord.direccion}
          />
        ))}
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dfe9f5',
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
    // marginTop: 10,
  },
});