
import { Text, View, Image, StyleSheet, ScrollView, ActivityIndicator, Switch } from "react-native";
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
  const [barrioSeleccionado, setBarrioSeleccionado] = useState("Todos");
  const [tipos, setTipos] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [viewType, setViewType] = useState("Puntos");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(FIREBASE_DB, 'crimenes'), (snapshot) => {
      let direccionesData = [];
      let tiposData = new Set();
      let barriosData = new Set();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const direccion = data.Direccion;
        const tipo = data.Tipo;
        const barrio = data.Barrio;
        if (direccion && tipo && barrio) {
          direccionesData.push({ direccion: `${direccion}, ${barrio}, Tuluá, Valle`, tipo, barrio });
          tiposData.add(tipo);
          barriosData.add(barrio);
        }
      });

      if (direccionesData.length === 0) {
        setError('No se encontraron direcciones en la colección');
        setLoading(false);
        return;
      }

      setTipos(["Todos", ...Array.from(tiposData)]);
      setBarrios(["Todos", ...Array.from(barriosData)]);
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
            barrio: item.barrio,
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
    return coordenadas.filter(coord => {
      const filtroTipo = tipoSeleccionado === "Todos" || coord.tipo === tipoSeleccionado;
      const filtroBarrio = barrioSeleccionado === "Todos" || coord.barrio === barrioSeleccionado;
      return filtroTipo && filtroBarrio;
    });
  };

  const contarCrimenesPorBarrioYTipo = () => {
    const coordenadasFiltradas = filtrarCoordenadas();
    const recuento = {};

    coordenadasFiltradas.forEach(coord => {
      const clave = `${coord.barrio}-${coord.tipo}`;
      if (!recuento[clave]) {
        recuento[clave] = 0;
      }
      recuento[clave]++;
    });

    return recuento;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00AFFF" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (coordenadas.length === 0) {
    return <Text>No se encontraron coordenadas para las direcciones proporcionadas.</Text>;
  }

  const recuento = contarCrimenesPorBarrioYTipo();
  const totalCrimenes = Object.values(recuento).reduce((sum, count) => sum + count, 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
      <Text style={styles.tittle}>Ubicación de los crímenes</Text>
      
      {/* Dropdown para tipos de crimen */}
      <View style={styles.dropdown}>
      <SelectDropdown
        data={tipos}
        onSelect={(selectedItem) => setTipoSeleccionado(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle1}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text style ={styles.FuenteDrop}>
              {(selectedItem ) || "Tipo de crimen"}
            </Text>
            <Icon style ={styles.icono} name={isOpened ? "chevron-up" : "chevron-down"} />
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
      <SelectDropdown
        data={barrios}
        onSelect={(selectedItem) => setBarrioSeleccionado(selectedItem)}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle2}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text style ={styles.FuenteDrop}>
              {(selectedItem ) || "Barrio"}
            </Text>
            <Icon style ={styles.icono} name={isOpened ? "chevron-up" : "chevron-down"} />
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


      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Mapa de Puntos</Text>
        <Switch
          value={viewType === "Calor"}
          onValueChange={(value) => setViewType(value ? "Calor" : "Puntos")}
        />
        <Text style={styles.switchLabel}>Mapa de Calor</Text>
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
          {viewType === "Puntos" ? (
            filtrarCoordenadas().map((coord, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
                title={coord.direccion}
              />
            ))
          ) : (
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
          )}
        </MapView>
      </View>
      
      <View style={styles.recuentoContainer}>
        <Text style={styles.recuentoTitle}>
          {tipoSeleccionado === "Todos" ? "Crímenes" : "Crímenes"}:
        </Text>
        {barrioSeleccionado === "Todos" ? (
          Object.entries(recuento).map(([clave, count]) => {
            const [barrio, tipo] = clave.split('-');
            return (
              <Text key={clave} style={styles.recuentoText}>
                <Text style={styles.recuentoTitulo2}>•{tipo}: </Text>
                 {count} en {barrio}
              </Text>
            );
          })
        ) : (
          Object.entries(recuento)
            .filter(([clave]) => clave.startsWith(barrioSeleccionado))
            .map(([clave, count]) => {
              const [, tipo] = clave.split('-');
              return (
                <Text key={clave} style={styles.recuentoText}>
                 <Text style={styles.recuentoTitulo2}>•{tipo}: </Text>
                 {count} en {barrioSeleccionado}
                </Text>
              );
            })
        )}
        <Text style={styles.recuentoText}> <Text style={styles.recuentoTitulo2}> •Total:</Text>  {totalCrimenes}</Text>
      </View>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fefefe',
  },
  tittle: {
    fontSize: 26,
    color: '#2E3A47',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: "100%",
    height: 'auto',
    gap: 19,
    margin: 10,
    marginBottom: 10,
  },
  dropdownButtonStyle1: {
    flexDirection: 'row',
    backgroundColor: '#50AB89',
    borderRadius: 100,
    padding: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  dropdownButtonStyle2: {
    flexDirection: 'row',
    backgroundColor: '#50AB89',
    borderRadius: 100,
    padding: 5,
    height: 35,
    paddingHorizontal: 10,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    
  },
  FuenteDrop: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    
  },
  icono: {
    color: '#ffffff',
    // fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  dropdownItemTxtStyle: {
    fontSize: 14,
    color: '#2E3A47',
  },
  dropdownMenuStyle: {
    position: 'absolute',
  left: '50%',
  transform: [{ translateX: -150 }],
  width: 300,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  switchLabel: {
    fontSize: 18,
    color: '#2E3A47',
  },
  recuentoContainer: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    backgroundColor: '#E5F4F1',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  recuentoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E3A47',
  },
  recuentoText: {
    fontSize: 16,
    color: '#2E3A47',
    marginBottom: 5,
  },
  recuentoTitulo2:{
    fontWeight: 'bold',
    color: '#2E3A47',
  }
});
