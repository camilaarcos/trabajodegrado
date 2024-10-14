import {Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchCrimenes } from "../utils/Acciones";
export default function Inicio() {

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
        padding: 16,
        backgroundColor: '#dfe9f5'}}>
        <Text style={styles.tittle}>Detalles de los crímenes</Text>
        <Text style={styles.texto}>Filtros</Text>
        <View style={styles.dropdown}>
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
      </View>
        <View style={styles.crimenes}>
      {filteredCrimenes.map((crimen) => (
        <TouchableOpacity key={crimen.id} style={styles.crimenesContainer}
          onPress={() => navigation.navigate('MostrarCrimen', { crimenesId: crimen.id })}>
          <Text style={styles.textoCrimen}>{crimen.Tipo}</Text>
        </TouchableOpacity>
      ))}
    </View>

        
          </ScrollView>
);

}

export const styles = StyleSheet.create({

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
      crimenes: {
        width: '100%',
        backgroundColor: '#ffffff80',
        padding: 10,
        alignItems: 'flex-start',
        borderRadius: 5,
      },
      crimenesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginBottom: 5,
      },
      textoCrimen: {
        fontSize: 20,
        color: '#000',
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