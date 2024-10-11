import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../src/config/firebase";
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyC66ZWY55i0_SWvY9pskT9Mj4OptmQZoiY");
export default function Mapas() {
  const [direccion, setDireccion] = useState(null);
  const [coordenadas, setCoordenadas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDireccion = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'crimenes'));
        let direccionData = null;
        querySnapshot.forEach((doc) => {
          direccionData = doc.data().Direccion; 
        });

        if (!direccionData) {
          throw new Error('No se encontró ninguna dirección en la colección');
        }
 
        const direccionCompleta = `${direccionData}, Tuluá, Valle`;
        console.log("Dirección obtenida:", direccionCompleta); // Depuración
        setDireccion(direccionCompleta);
        obtenerCoordenadas(direccionCompleta);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.error("Error obteniendo los datos de Firestore: ", error);
      }
    };

    fetchDireccion();
  }, []);

  const obtenerCoordenadas = async (direccion) => {
    try {
      console.log("Dirección enviada a la API:", direccion); // Depuración
      const response = await Geocoder.from(direccion);
      console.log("Respuesta de la API de Google Maps:", response); // Depuración
      if (response.results.length > 0) {
        const location = response.results[0].geometry.location;
        setCoordenadas({
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        throw new Error('No se pudo convertir la dirección a coordenadas');
      }
    } catch (error) {
      setError(error.message);
      console.error("Error al obtener las coordenadas: ", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // const location = {
  //   latitude: 4.7110,
  //   longitude: -74.0721,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  // if (!location) {
  //   return <Text>Cargando...</Text>;
  // }
  if (!coordenadas) {
    return <Text>No se encontraron coordenadas para la dirección proporcionada.</Text>;
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
          ...coordenadas,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={coordenadas}
          title={"Ubicación seleccionada"}
        />
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
    marginTop: 10,
  },
});