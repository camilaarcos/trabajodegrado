import {Text, View, TouchableOpacity, Image, StyleSheet, ScrollView,TextInput } from "react-native";
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
  const [searchText, setSearchText] = useState('');

  
  const filterChangeX = (selectedItem) => {
    let filtered = crimenes;

    if (selectedItem && selectedItem !== "Tipo de crimen") {
      filtered = filtered.filter(crimen => crimen.Tipo === selectedItem);
    }
    if (searchText) {
      filtered = filtered.filter(crimen => 
        crimen.Tipo.toLowerCase().includes(searchText.toLowerCase()) ||
        crimen.Barrio.toLowerCase().includes(searchText.toLowerCase()) ||
        crimen.Fecha.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredCrimenes(filtered);
  };

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

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredCrimenes(crimenes);
    } else {
      filterChangeX(null);
    }
  };

return(
  <ScrollView contentContainerStyle={{ flexGrow: 1,
        // alignItems: 'center',
        // padding: 16,
        backgroundColor: '#FEFEFE'}}>
        <Text style={styles.tittle}>Detalles de los crímenes</Text>
        <TextInput
        style={styles.searchInput}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearchTextChange}
      />
      <Text style={styles.texto}>Filtrar por</Text>
        <View style={styles.dropdown}>
              <SelectDropdown
              data={tipos}
              onSelect={filterChangeTipo}
              renderButton={(selectedItem, isOpened) => (
                <View style={styles.dropdownButtonStyle1}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon}  />
                  )}
                  <Text style ={styles.FuenteDrop}>
                    {(selectedItem ) || "Tipo de crímen"}
                  </Text>
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
                <View style={styles.dropdownButtonStyle2}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon}  />
                  )}
                  <Text style ={styles.FuenteDrop} >
                    {(selectedItem ) || "Fecha"}
                  </Text>
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
                <View style={styles.dropdownButtonStyle3}>
                  {selectedItem && (
                    <Icon name={selectedItem.icon}  />
                  )}
                  <Text style ={styles.FuenteDrop} >
                    {(selectedItem ) || "Barrio"}
                  </Text>
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
      {filteredCrimenes.length > 0 ? (
      filteredCrimenes.map((crimen) => (
        <TouchableOpacity key={crimen.id} style={styles.crimenesContainer}
          onPress={() => navigation.navigate('MostrarCrimen', { crimenesId: crimen.id })}>
         <View style={styles.row}>
        <Text style={styles.textoCrimen}>{crimen.Tipo}</Text>
        <Text style={styles.textoCrimen}>{crimen.Fecha}</Text>
      </View>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.textoCrimen}>No hay crímenes registrados</Text>
    )}
    </View>

        
          </ScrollView>
);

}

export const styles = StyleSheet.create({

      tittle: {
        textAlign: 'center',
        fontSize: 26,
        color: '#2E3A47',
        fontWeight: 'bold',
        padding: 10,
      },
      texto: {
        color: '#2E3A47',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 10,
      },
      searchInput: {
        width: 372,
        height: 44,
        padding: 10,
        gap: 10,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderColor: '#00AFFF',
        borderWidth: 1,
      },
      crimenes: {
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#E5F4F1',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 20,
        minHeight: 550,
      },
      crimenesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        gap: 10,
        height: 41,
        backgroundColor: '#FEFEFE',
        borderRadius: 15,
        marginBottom: 8,
      },
      textoCrimen: {
        fontSize: 14,
        color: '#2E3A47',

      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
      dropdownButtonStyle3: {
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
});