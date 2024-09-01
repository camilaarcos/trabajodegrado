import {Text, View, Image, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity, Alert} from "react-native";
import React, {useState} from "react";
import { Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {database} from '../src/config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";


export default function Registro() {
  const navigation = useNavigation();
  const [newItem,setNewItem] = React.useState({
    Tipo: ' ',
    Fecha: new Date(),
    Direccion: ' ',
    Observacion: ' ',
  });
  const [Fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSend = async() => {
    try {
      await addDoc(collection(database, 'crimenes'), newItem);
      Alert.alert("Registro de crímen", "Registro correctamente");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding document: ", error);
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
    <View style={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <Text style={styles.tittle}>Registro</Text>

        <Picker
        selectedValue={newItem.Tipo}
        style={styles.picker}
        onValueChange={(itemValue) => setNewItem({ ...newItem, Tipo: itemValue })}
      >
        <Picker.Item label="Tipo de crímen" value="" />
        <Picker.Item label="Accidente de tránsito" value="AccidentedeTránsito" />
        <Picker.Item label="Acoso Sexual" value="AcosoSexual" />
        <Picker.Item label="Amenazas" value="Amenazas" />
        <Picker.Item label="Extorsión" value="Extorsión" />
        <Picker.Item label="Homicidio" value="Homicidio" />
        <Picker.Item label="Hurto" value="Hurto" />
        <Picker.Item label="Suicidio" value="Suicidio" />
        <Picker.Item label="Violencia" value="Violencia" />
        <Picker.Item label="Violencia Intrafamiliar" value="ViolenciaIntrafamiliar" />
        
      </Picker>

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
        placeholder="Fecha"
        value={Fecha}
        onChangeText={setFecha}
        editable={false}/>
        </Pressable>
      )}


        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Direccion: text})}
        style={styles.inputContainer} placeholder="Dirección"/>
        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Observacion: text})}
        style={styles.inputObservaciones} />
        <TouchableOpacity onPress={onSend} style={styles.boxbutton}>
              <Text style={styles.Registro}>Registrar</Text>
              </TouchableOpacity>
        </View>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      imagefondo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      tittle: {
        fontSize: 30,
        color: '#4d82bc',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      picker: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
        fontWeight: '400',
      },
      inputContainer: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
        fontWeight: '400',
      },
      inputObservaciones: {
        width: 250,
        height: 200,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        // padding: 10,
        // marginVertical: 10,
        backgroundColor: '#ffffff90',
        // marginBottom: 20,
        fontWeight: '400',
        
      },
      registro: {
        color: "#4d82bc",
        fontWeight: 'bold',
  
      },
     boxbutton: {
      backgroundColor: "#ffffff80",
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#fff',
      margin: 10,
      },
});