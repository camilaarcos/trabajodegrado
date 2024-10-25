import {Text, View, Image, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity, ScrollView} from "react-native";
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {FIREBASE_DB} from '../src/config/firebase';
import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { data, dataBarrio } from '../utils/Ayudas';
// import Loading from "../src/componentes/loading";
import CustomAlert from "../src/componentes/Alertas";
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
  // const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [Registrosuccess, setRegistroSuccess] = useState(false);


  const onSend = async() => {

    // Verificar si los campos obligatorios están completos
  if (!newItem.Tipo || newItem.Tipo.trim() === '' ||
  !newItem.Direccion || newItem.Direccion.trim() === '' ||
  !newItem.Barrio || newItem.Barrio.trim() === '') {
    // Mostrar mensaje de alerta si alguno está vacío
    setAlertMessage('Por favor, completa todos los campos obligatorios: Tipo de crímen, Dirección y Barrio');
    setAlertIcon(require('../assets/error.png'));
    setAlertVisible(true);
    return; // Salir de la función si faltan datos
    }

     // Obtener solo la fecha sin la hora
     const dateOnly = new Date(newItem.Fecha);
     dateOnly.setHours(0, 0, 0, 0);  // Ajustar la hora a medianoche
     
     // Actualizar `newItem` con la fecha ajustada
     const itemToSave = {
       ...newItem,
       Fecha: dateOnly
     };
    // Validar si ya existe un crimen con los mismos valores
  const crimenRef = collection(FIREBASE_DB, 'crimenes');
  const q = query(
    crimenRef,
    where('Tipo', '==', itemToSave.Tipo),
    where('Barrio', '==', itemToSave.Barrio),
    where('Direccion', '==', itemToSave.Direccion)
  );

  const querySnapshot = await getDocs(q);

  // Verificar si existe una fecha idéntica en los resultados
  const duplicateExists = querySnapshot.docs.some(doc => {
    const existingDate = doc.data().Fecha.toDate();
    existingDate.setHours(0, 0, 0, 0); // Asegurarse de que no incluya la hora
    return existingDate.getTime() === dateOnly.getTime();
  });

  if (duplicateExists) {
    // Si existe un registro, mostramos una alerta
    setAlertMessage('Ya existe un crimen registrado con esos datos');
    setAlertIcon(require('../assets/error.png'));
    setAlertVisible(true);
  } else {
    // Si no existe, procedemos a guardar el registro
    try {

     

      await addDoc(collection(FIREBASE_DB, 'crimenes'), itemToSave);
      setAlertMessage('Registro correctamente');
      setAlertIcon(require('../assets/success.png'));
      setAlertVisible(true);
      setRegistroSuccess(true);
    } catch (error) {
      console.error("Error registrando crímen: ", error);
      setAlertMessage('Error al registrar el crímen');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
    }
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

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if(Registrosuccess){
      navigation.goBack();
    }
  };

return(
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FEFEFE',
    }}>
        
        <Text style={styles.tittle}>Registro de crímenes</Text>
       <Image source={require('../assets/I1.png')} style={styles.imageStyle} />
       <View style = {styles.Contenedor}>
          <Text style={styles.texto}>Tipo de crímen</Text>

          <SelectDropdown
          data={data}
          onSelect={(selectedItem) => {
            setNewItem({ ...newItem, Tipo: selectedItem.title });
          }}
          renderButton={(selectedItem, isOpened) => (
            <View style={styles.dropdownButtonStyle}>
              {selectedItem && (
                <Icon name={selectedItem.icon}  />
              )}
              <Text >
                {(selectedItem && selectedItem.title) || "Tipo de crimen"}
              </Text>
              <Icon name={isOpened ? "chevron-up" : "chevron-down"} />
            </View>
          )}
          renderItem={(item, index, isSelected) => (
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#80808035' }) }}>
              <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        
        <Text style={styles.texto}>Fecha</Text>
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

        <Text style={styles.texto}>Dirección</Text>
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
            <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#80808035' }) }}>
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
          search
          searchInputStyle={styles.dropdownItemStyle}
          searchInputTxtColor={'#2E3A47'}
          searchPlaceHolder={'Buscar Barrio'}
          searchPlaceHolderColor={'#2E3A47'}
          renderSearchInputLeftIcon={() => {
            return <FontAwesome name={'search'} color={'#2E3A47'} size={20} />;
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
                <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                icon={alertIcon}
                onClose={handleCloseAlert}
              />
      </View>
              
        </ScrollView>
);

}

export const styles = StyleSheet.create({


      tittle: {
        fontSize: 35,
        color: '#2E3A47',
        fontWeight: 'bold',
        // marginBottom: 10,
      },
      texto: {
        color: '#2E3A47',
        fontSize: 15,
        marginTop: 10,
      },
      imageStyle: {
        width: 150, 
        height: 150, 
      },
      dropdownButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 277,
        height: 44,
        borderColor: '#00AFFF',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#80808035',
        fontWeight: '400',
        marginTop: 10,
      },

      dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: 300,
        borderWidth: 0.5,
      },
      dropdownItemIconStyle: {
        fontSize: 16,
        color: '#2E3A47',
        marginRight: 10,
      },
      dropdownItemTxtStyle: {
        fontSize: 16,
        color: '#2E3A47',
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
        backgroundColor: '#FEFEFE',
      },
      inputContainer: {
        width: 277,
        height: 44,
        borderColor: '#00AFFF',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#80808035',
        fontWeight: '400',
      },
      inputContainerbarrio: {
        width: 277,
        height: 44,
        borderColor: '#00AFFF',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#80808035',
        fontWeight: '400',
        marginTop: 10,
      },
      inputObservaciones: {
        width: 277,
        height: 200,
        borderColor: '#00AFFF',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#80808035',
        fontWeight: '400',
        marginTop: 10,
        textAlignVertical: 'top',
        
      },
      Registro: {
        color: "#fff",
        fontWeight: 'bold',
  
      },
     boxbutton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#50AB89",
      padding: 10,
      gap: 10,
      borderRadius: 10,
      width: 277,
      height: 44,
      marginTop: 10,
      },
});