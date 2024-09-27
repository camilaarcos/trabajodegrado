import {Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_DB } from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './Registro';
import { fetchCrimenes } from "../utils/Acciones";
export default function Detalles() {

  const navigation = useNavigation();
  const [crimenes, setCrimenes] = useState([]);
  const [filteredCrimenes, setFilteredCrimenes] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedBarrio, setSelectedBarrio] = useState(null);

  useEffect(() => {
    const unsubscribe = fetchCrimenes((result) => {
      if (result.statusResponse) {
        setCrimenes(result.data);
        setFilteredCrimenes(result.data);
      } else {
        console.log(result.error);
      }
    });
    return () => unsubscribe();
  },[]);

  const tipos = ["Tipo de crimen", ...new Set(crimenes.map(crimen => crimen.Tipo))];
  const barrios = ["Barrio", ...new Set(crimenes.map(crimen => crimen.Barrio))];
  const fechas = ["Fecha", ...new Set(crimenes.map(crimen => crimen.Fecha))];

  const filterChangeTipo = (selectedItem) => {
    setSelectedTipo(selectedItem);
    filterCrimenes(selectedItem, selectedFecha, selectedBarrio);
  };

  const filterChangeBarrio = (selectedItem) => {
    setSelectedBarrio(selectedItem);
    filterCrimenes(selectedTipo, selectedFecha, selectedItem);
  };

  const filterChangeFecha = (selectedItem) => {
    setSelectedFecha(selectedItem);
    filterCrimenes(selectedTipo, selectedItem, selectedBarrio);
  };

  const filterCrimenes = (tipo, fecha, barrio) => {
    let filtered = crimenes;
    if (tipo && tipo !== "Tipo de crimen") {
      filtered = filtered.filter(crimen => crimen.Tipo === tipo);
    }
    if (fecha && fecha !== "Fecha") {
      filtered = filtered.filter(crimen => crimen.Fecha === fecha);
    }
    if (barrio && barrio !== "Barrio") {
      filtered = filtered.filter(crimen => crimen.Barrio === barrio);
    }
    setFilteredCrimenes(filtered);
  };


return(
  <ScrollView contentContainerStyle={{ flexGrow: 1,
        alignItems: 'center',
        padding: 16,}}>
        <Image source={require('../assets/fondo.png')} style={[styles2.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles2.tittle}>Detalles de los crímenes</Text>
        <Text style={styles2.texto}>Filtros</Text>
        <SelectDropdown
        data={tipos}
        onSelect={filterChangeTipo}
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
      <SelectDropdown
        data={fechas}
        onSelect={filterChangeFecha}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text >
              {(selectedItem ) || "Fecha"}
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

      <SelectDropdown
        data={barrios}
        onSelect={filterChangeBarrio}
        renderButton={(selectedItem, isOpened) => (
          <View style={[styles.dropdownButtonStyle, styles2.dropdownButtonStyle]}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text >
              {(selectedItem ) || "Barrio"}
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

      {filteredCrimenes.map((crimen) => (
        <TouchableOpacity key={crimen.id} style={styles2.crimenesContainer}
          onPress={() => navigation.navigate('MostrarCrimen', { crimenesId: crimen.id })}>
          <Text style={styles2.textoCrimen}>{crimen.Tipo}</Text>
        </TouchableOpacity>
      ))}

        
          </ScrollView>
);

}

export const styles2 = StyleSheet.create({
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
        marginBottom: 10,
      },
      texto: {
        color: '#000',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
      },
      crimenesContainer: {
        width: '100%',
        backgroundColor: '#ffffff80',
        padding: 10,
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    
      },
      textoCrimen: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
      },
      dropdownButtonStyle: {
        marginBottom: 10,
      },
});