import {Text, View, Image, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity, Alert, ScrollView} from "react-native";
import React, {useState} from "react";
import { Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {database} from '../src/config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
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
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={newItem.Tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setNewItem({ ...newItem, Tipo: itemValue })}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="          Tipo de crímen" value="" />
        <Picker.Item label="Accidente de tránsito" value="Accidente de Tránsito" />
        <Picker.Item label="Acoso Sexual" value="Acoso Sexual" />
        <Picker.Item label="Amenazas" value="Amenazas" />
        <Picker.Item label="Extorsión" value="Extorsión" />
        <Picker.Item label="Homicidio" value="Homicidio" />
        <Picker.Item label="Hurto" value="Hurto" />
        <Picker.Item label="Suicidio" value="Suicidio" />
        <Picker.Item label="Violencia" value="Violencia" />
        <Picker.Item label="Violencia Intrafamiliar" value="Violencia Intrafamiliar" />
        
      </Picker>
      </View>
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
        <TextInput
        onChangeText={(text)=> setNewItem({...newItem, Barrio: text})}
        style={styles.inputContainerbarrio} placeholder="Barrio" require/>
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
      pickerContainer: {
        width: 250,
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: '#ffffff90',
      },
      picker: {
        color: 'gray', 

      },
      pickerItem: {
        color: 'black',
        fontSize: 15,
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