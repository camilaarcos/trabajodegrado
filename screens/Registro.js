import {Text, View, Image, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity, Alert, ScrollView} from "react-native";
import React, {useState} from "react";
import { Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {database} from '../src/config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Verifica que el nombre del paquete y el ícono sean correctos

import { isEmpty, size } from 'lodash'

export default function Registro() {
  const navigation = useNavigation();
  const [newItem,setNewItem] = React.useState({
    Tipo: ' ',
    Fecha: new Date(),
    Direccion: ' ',
    Barrio: ' ',
    Observacion: ' ',
  });
  const [Fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const data = [
    { title: "Accidente de Tránsito", icon: "car" },
    { title: "Acoso Sexual", icon: "ban" },
    { title: "Amenazas", icon: "exclamation-triangle" },
    { title: "Extorsión", icon: "money" },
    { title: "Homicidio", icon: "user-times" },
    { title: "Hurto", icon: "hand-paper-o" },
    { title: "Suicidio", icon: "meh-o" },
    { title: "Violencia", icon: "hand-rock-o" },
    { title: "Violencia Intrafamiliar", icon: "home" },
  ];

  const dataBarrio = [
    { title: "Agua clara" },
    { title: "Aguirre" },
    { title: "Alameda" },
    { title: "Alameda II" },
    { title: "Alvernia" },
    { title: "Asoagrin" },
    { title: "Bello Horizonte" },
    { title: "Avenida Cali" },
    { title: "Bolivar" },
    { title: "Bosques de Maracaibo" },
    { title: "Buenos Aires" },
    { title: "Casa Huertas" },
    { title: "Centro" },
    { title: "Cespedes" },
    { title: "Chiminangos" },
    { title: "Ciudad Campestre" },
    { title: "Ciudad Las Palmas" },
    { title: "Comfamiliar" },
    { title: "Comuneros" },
    { title: "Conjunto La Villa" },
    { title: "Conjunto Lusitania" },
    { title: "Corazon del Valle" },
    { title: "Departamental" },
    { title: "Diablos Rojos" },
    { title: "Diablos Rojos II" },
    { title: "Doce de octubre" },
    { title: "Dorado" },
    { title: "El Bosque" },
    { title: "El Bosquecito" },
    { title: "El Condor" },
    { title: "El Condor II" },
    { title: "El Descanso" },
    { title: "El Lago" },
    { title: "El Laguito" },
    { title: "El Limonar" },
    { title: "El Palmar" },
    { title: "El Paraiso" },
    { title: "El Pinar" },
    { title: "El Refugio" },
    { title: "El Retiro" },
    { title: "Entre Rios" },
    { title: "Escobar" },
    { title: "Esperanza" },
    { title: "Estambul" },
    { title: "Farfan" },
    { title: "Fatima" },
    { title: "Flor de la Campana" },
    { title: "Franciscanos" },
    { title: "Guayacanes" },
    { title: "Horizonte" },
    { title: "Internacional" },
    { title: "Jardin" },
    { title: "Jazmin" },
    { title: "Jorge Eliecer Gaitan" },
    { title: "José Antonio Galan" },
    { title: "Juan de Lemus" },
    { title: "Juan XXIII" },
    { title: "La Bastilla" },
    { title: "La Campiña" },
    { title: "La Ceiba" },
    { title: "La Graciela" },
    { title: "La Independencia" },
    { title: "La Inmaculada" },
    { title: "La Merced" },
    { title: "La Paz" },
    { title: "La Quinta" },
    { title: "La Rivera" },
    { title: "La Santa Cruz" },
    { title: "La Trinidad" },
    { title: "Las Acacias" },
    { title: "Las Americas" },
    { title: "Las Brisas" },
    { title: "Las Delicias" },
    { title: "Las Nieves" },
    { title: "Las Olas" },
    { title: "Las Veraneras" },
    { title: "Laureles" },
    { title: "Laureles II" },
    { title: "Los Olmos" },
    { title: "Los Tolues" },
    { title: "Maracaibo" },
    { title: "Marandua" },
    { title: "Maria Clara" },
    { title: "Miraflores" },
    { title: "Morales" },
    { title: "Moralito" },
    { title: "Municipal" },
    { title: "Nariño" },
    { title: "Nuevo Alvernia" },
    { title: "Nuevo Morales" },
    { title: "Nuevo Principe" },
    { title: "Palobonito" },
    { title: "Panamericano" },
    { title: "Playas" },
    { title: "Popular" },
    { title: "Portales del Rio" },
    { title: "Prados del Norte" },
    { title: "Primero de Mayo" },
    { title: "Principe" },
    { title: "Progresar" },
    { title: "Pueblo Nuevo" },
    { title: "Quintas de San Felipe" },
    { title: "Rio Paila" },
    { title: "Rojas" },
    { title: "Ruben Cruz Velez" },
    { title: "Sajonia" },
    { title: "Salesianos" },
    { title: "Saman del Norte" },
    { title: "San Antonio" },
    { title: "San Benito" },
    { title: "San Carlos" },
    { title: "San Luis" },
    { title: "San Marino" },
    { title: "San Pedro Claver" },
    { title: "San Vicente de Paul" },
    { title: "Santa Isabel" },
    { title: "Santa Rita del Rio" },
    { title: "Senderos Villa Liliana" },
    { title: "Siete de Agosto" },
    { title: "Tercer Milenio" },
    { title: "Tomas Uribe Uribe" },
    { title: "Urbanizacion Lomitas" },
    { title: "Urbanizacion Peñaranda" },
    { title: "Urbanizacion Santa Lucia" },
    { title: "Victoria" },
    { title: "Villa Campestre" },
    { title: "Villa Colombia" },
    { title: "Villa del Lago" },
    { title: "Villa del Rio" },
    { title: "Villa del Sur" },
    { title: "Villa Liliana" },
    { title: "Villanueva" },


  ];


  const validateForm = () => {
    let isValid = true
    // if(isEmpty(newItem.Tipo)) {
    //     Alert.alert('Error', 'Debes seleccionar un tipo de crimen.')
    //     isValid = false
    // }
    // if(isEmpty(newItem.Fecha)) {
    //     Alert.alert('Error', 'Debes seleccionar una fecha.')
    //     isValid = false
    // }
    // if(isEmpty(newItem.Direccion)) {
    //     Alert.alert('Error', 'Debes ingresar una dirección.')
    //     isValid = false
    // }
  }
  const onSend = async() => {
  //   if (!validateForm()) {
  //     return
  // }
    try {
      await addDoc(collection(database, 'crimenes'), newItem);
      Alert.alert("Registro de crímen", "Registro correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error registando crímen: ", error);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChangeDate = (event, selectedDate) => {
    
    if (event.type === "set") {
      toggleDatePicker(); 
      const currentDate = selectedDate ||newItem.Fecha;
      setShowDatePicker(false);
    setNewItem({ ...newItem, Fecha: currentDate });
    if (Platform.OS === "android") {
      toggleDatePicker();
      setFecha(currentDate.toDateString());
    }
    } else {
      toggleDatePicker(); 
    }
  };


return(
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
      alignItems: 'center',
      padding: 16,
    }}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        
        <Text style={styles.tittle}>Registro de crímenes</Text>
        <Image source={require('../assets/Info.png')} style={styles.imageStyle} />
        <Text style={styles.texto}>Seleccione el tipo de crímen</Text>

        
        <SelectDropdown
        data={data}
        onSelect={(selectedItem) => {
          setNewItem({ ...newItem, Tipo: selectedItem.title });
        }}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
            )}
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Tipo de crimen"}
            </Text>
            <Icon name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
      />
      
      <Text style={styles.texto}>Seleccione la fecha del crímen</Text>
      {showDatePicker && (
        <DateTimePicker
          value={newItem.Fecha}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
        />
      )}

      {!showDatePicker && (
        <Pressable onPress={toggleDatePicker}>
        <TextInput
        style={styles.inputContainer}
        placeholder={newItem.Fecha.toDateString()}
        value={Fecha}
        onChangeText={setFecha}
        editable={false}/>
        </Pressable>
      )}

      <Text style={styles.texto}>Ingrese la dirección del crímen</Text>
        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Direccion: text})}
        style={styles.inputContainer} placeholder="Dirección" require/>
        <SelectDropdown
        data={dataBarrio}
        onSelect={(selectedItem) => {
          setNewItem({ ...newItem, Barrio: selectedItem.title });
        }}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Barrio"}
            </Text>
            <Icon name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
        search
        searchInputStyle={styles.dropdownItemStyle}
        searchInputTxtColor={'#151E26'}
        searchPlaceHolder={'Buscar Barrio'}
        searchPlaceHolderColor={'#72808D'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#72808D'} size={20} />;
        }}
      />
        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Observacion: text})}
        style={styles.inputObservaciones}placeholder="Observaciones"
        multiline={true}
         require/>
        <TouchableOpacity onPress={onSend} style={styles.boxbutton}>
              <Text style={styles.Registro}>Registrar</Text>
              </TouchableOpacity>
        </ScrollView>
);

}

const styles = StyleSheet.create({

      imagefondo: {
        // width: '100%',
        height: '120%',
        resizeMode: 'cover',
      },
      tittle: {
        fontSize: 30,
        color: '#4d82bc',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      texto: {
        color: '#000',
        fontSize: 15,
        marginTop: 10,
      },
      imageStyle: {
        width: 200, 
        height: 200, 
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
        marginTop: 10,
      },

      dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff90',
        width: 300,
        borderColor: '#fff',
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
        backgroundColor: '#ffffff90',
      },
      inputContainer: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
      },
      inputContainerbarrio: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        marginTop: 10,
      },
      inputObservaciones: {
        width: 250,
        height: 200,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        textAlignVertical: 'top',
        padding: 10,
        marginTop : 10,
        
      },
      Registro: {
        color: "#000",
        fontWeight: 'bold',
  
      },
     boxbutton: {
      backgroundColor: "#ffffff80",
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#fff',
      margin: 10,
      alignItems: 'center',
      },
});