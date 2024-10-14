import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Heatmap } from "react-native-maps";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../src/config/firebase";
import Geocoder from 'react-native-geocoding';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';

Geocoder.init("AIzaSyC66ZWY55i0_SWvY9pskT9Mj4OptmQZoiY");
export default function Mapas() {
  const [coordenadas, setCoordenadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'crimenes'), (snapshot) => {
      let direccionesData = [];
      let tiposData = new Set();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const direccion = data.Direccion;
        const tipo = data.Tipo;
        if (direccion && tipo) {
          direccionesData.push({ direccion: `${direccion}, Tuluá, Valle`, tipo });
          tiposData.add(tipo);
        }
      });

      if (direccionesData.length === 0) {
        setError('No se encontraron direcciones en la colección');
        setLoading(false);
        return;
      }

      setTipos(["Todos", ...Array.from(tiposData)]);
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
      const coordenadasPromises = direcciones.map(async (item) => {
        const response = await Geocoder.from(item.direccion);
        if (response.results.length > 0) {
          const location = response.results[0].geometry.location;
          return {
            direccion: item.direccion,
            tipo: item.tipo,
            latitude: location.lat,
            longitude: location.lng,
          };
        } else {
          console.error(`No se pudo convertir la dirección a coordenadas: ${item.direccion}`);
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

  const filtrarCoordenadas = () => {
    if (tipoSeleccionado === "Todos") {
      return coordenadas;
    }
    return coordenadas.filter(coord => coord.tipo === tipoSeleccionado);
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
    <ScrollView contentContainerStyle={styles.scrollViewContent}  showsVerticalScrollIndicator={true}>
      <Text style={styles.tittle}>Ubicación de los crímenes</Text>
      <View style={styles.dropdown}>
      <SelectDropdown
        data={tipos}
        onSelect={(selectedItem) => setTipoSeleccionado(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text >
              {(selectedItem ) || "Tipo de crimen"}
            </Text>
            <Icon name={isOpened ? "chevron-up" : "chevron-down"} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      </View>
      <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordenadas[0].latitude,
          longitude: coordenadas[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filtrarCoordenadas().map((coord, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            title={coord.direccion}
          />
        ))}
      </MapView>
      </View>
      <Text style={styles.tittle2}>Mapa de Puntos de Calor</Text>

      <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordenadas[0].latitude,
          longitude: coordenadas[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Heatmap
           points={filtrarCoordenadas().map(coord => ({
            latitude: coord.latitude,
            longitude: coord.longitude,
            weight: 1,
          }))}
          radius={35}
          opacity={0.7}
          gradient={{
            colors: ["#00FF00", "#FFFF00", "#FF0000"],
            startPoints: [0.1, 0.5, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#dfe9f5',
  },
  tittle: {
    fontSize: 30,
    color: '#4d82bc',
    fontWeight: 'bold',
    marginTop: 10,
  },
  tittle2: {
    fontSize: 30,
    color: '#4d82bc',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: 500,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
  },
  dropdownItemTxtStyle: {
    fontSize: 16,
    color: '#000',
  },
  dropdownMenuStyle: {
    position: 'absolute',
  left: '50%',
  transform: [{ translateX: -150 }],
  width: 300,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
});