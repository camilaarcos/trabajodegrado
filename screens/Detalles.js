import {Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_DB } from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Detalles() {

  const navigation = useNavigation();
  const [crimenes, setCrimenes] = useState([]);
  const [filteredCrimenes, setFilteredCrimenes] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState(null);
  const [selectedBarrio, setSelectedBarrio] = useState(null);

  useEffect(() => {
    const collectionRef = collection(FIREBASE_DB, 'crimenes');
    const q = query(collectionRef, orderBy('Fecha', 'asc'));

    const unsubscribe = onSnapshot(q, QuerySnapshot =>{
      const crimenesData =
        QuerySnapshot.docs.map(doc => {
          const data = doc.data();
          let fechaString = '';
            if (data && data.Fecha) {
              const fechaDate = new Date(data.Fecha.seconds * 1000);
              fechaString = fechaDate.toLocaleDateString();
            }
            return {
              id: doc.id,
              Tipo: data.Tipo,
              Fecha: fechaString,
              Barrio: data.Barrio,
            };
        });
      setCrimenes(crimenesData);
      setFilteredCrimenes(crimenesData);
      
    });
    return unsubscribe;
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
  <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}>Detalles de los crímenes</Text>
        <Text style={styles.texto}>Filtros</Text>
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
        defaultButtonText="Selecciona una fecha"
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
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
          <View style={styles.dropdownButtonStyle}>
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
        <TouchableOpacity key={crimen.id} style={styles.crimenesContainer}
          onPress={() => navigation.navigate('MostrarCrimen', { crimenesId: crimen.id })}>
          <Text style={styles.textoCrimen}>{crimen.Tipo}</Text>
        </TouchableOpacity>
      ))}

        
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
        // marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    
      },
      textoCrimen: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
      },
      dropdownButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
        height: 43,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        marginBottom: 10,
      },

      dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff',
        width: 300,
        borderColor: 'grey',
        borderWidth: 1,
      },
      dropdownItemIconStyle: {
        fontSize: 16,
        color: '#000',
        marginRight: 10,
      },
      dropdownItemTxtStyle: {
        fontSize: 16,
        color: '#000',
      },
      dropdownMenuStyle: {
        position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -150 }, { translateY: -150 }],
      width: 300,
      zIndex: 1000,
      height: 500,
        borderRadius: 5,
        backgroundColor: '#ffffff',
      },
});