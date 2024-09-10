import {Text, View, Image, StyleSheet, ScrollView, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { Picker} from '@react-native-picker/picker';
import { database } from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import Crimenes from "../src/components/crimenes";

const ejemploCrimenes = [
  { id: 1, tipo: 'Robo', fecha: '2023-01-01', barrio: 'Centro' },
  { id: 2, tipo: 'Asalto', fecha: '2023-01-02', barrio: 'Norte' },
  // Agrega más datos de ejemplo según sea necesario
];

export default function Detalles({crimenes = ejemploCrimenes}) {
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [barrio, setBarrio] = useState('');
  const [filteredCrimenes, setFilteredCrimenes] = useState(crimenes);
  const [tipos, setTipos] = useState([]);
  const [fechas, setFechas] = useState([]);
  const [barrios, setBarrios] = useState([]);

  useEffect(() => {
    // Extraer valores únicos para tipo, fecha y barrio
    const tiposUnicos = [...new Set(crimenes.map(crimen => crimen.tipo))];
    const fechasUnicas = [...new Set(crimenes.map(crimen => crimen.fecha))];
    const barriosUnicos = [...new Set(crimenes.map(crimen => crimen.barrio))];

    setTipos(tiposUnicos);
    setFechas(fechasUnicas);
    setBarrios(barriosUnicos);
  }, [crimenes]);

  const filtrarCrimenes = () => {
    let filtrados = crimenes;
    if (tipo) {
      filtrados = filtrados.filter(crimen => crimen.tipo === tipo);
    }
    if (fecha) {
      filtrados = filtrados.filter(crimen => crimen.fecha === fecha);
    }
    if (barrio) {
      filtrados = filtrados.filter(crimen => crimen.barrio === barrio);
    }
    setFilteredCrimenes(filtrados);
  };
return(
  <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}>Detalles de los crímenes</Text>

        <Picker selectedValue={tipo} onValueChange={(itemValue) => setTipo(itemValue)}>
        <Picker.Item label="Seleccione Tipo" value="" />
        {tipos.map((tipo, index) => (
          <Picker.Item key={index} label={tipo} value={tipo} />
        ))}
      </Picker>
      <Picker selectedValue={fecha} onValueChange={(itemValue) => setFecha(itemValue)}>
        <Picker.Item label="Seleccione Fecha" value="" />
        {fechas.map((fecha, index) => (
          <Picker.Item key={index} label={fecha} value={fecha} />
        ))}
      </Picker>
      <Picker selectedValue={barrio} onValueChange={(itemValue) => setBarrio(itemValue)}>
        <Picker.Item label="Seleccione Barrio" value="" />
        {barrios.map((barrio, index) => (
          <Picker.Item key={index} label={barrio} value={barrio} />
        ))}
      </Picker>
      <Button title="Filtrar" onPress={filtrarCrimenes} />

        <View style={styles.crimenesContainer}>
          {crimenes.map((crimen) => (
            <Crimenes key={crimen.id} {...crimen} />
          ))}
          </View>
          </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center', 
    padding: 16,
  },
      imagefondo: {
        width: '120%',
        height: '120%',
        resizeMode: 'cover',
      },
      tittle: {
        fontSize: 30,
        color: '#4d82bc',
        fontWeight: 'bold',
        marginTop: 10,
      },
       crimenesContainer: {
        width: '100%',
        padding: 10,
      },
});