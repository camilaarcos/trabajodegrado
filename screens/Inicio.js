import {Text, View,StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB} from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, getDoc } from "firebase/firestore";
import { styles2 } from './Detalles';
import { fetchCrimenes } from "../utils/Acciones";
export default function Inicio(props) {
  const navigation = useNavigation();
  const [crimenes, setCrimenes] = useState([]);

  useEffect(() => {
    const unsubscribe = fetchCrimenes((result) => {
      if (result.statusResponse) {
        setCrimenes(result.data);
      } else {
        console.log(result.error);
      }
    });
    return () => unsubscribe();
  },[]);

return(
    <ScrollView contentContainerStyle={{flexGrow: 1,
          alignItems: 'center', 
          padding: 16,}}>
      <Image source={require('../assets/fondo.png')} style={[styles2.imagefondo, StyleSheet.absoluteFill]} />

        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles3.boxbutton} >
              <Text style={styles3.texto}>Registrar Crímen</Text>
            </TouchableOpacity>


          {crimenes.map((crimen) => (
            <TouchableOpacity  key={crimen.id} style={styles2.crimenesContainer}
            onPress={()=>props.navigation.navigate('MostrarCrimen',{crimenesId:crimen.id})}>
              <Text style={styles2.textoCrimen}>{crimen.Tipo}</Text>
            </TouchableOpacity>
          ))}
          
        </ScrollView>

);

}
const styles3 = StyleSheet.create({

 boxbutton: {
  backgroundColor: "#ffffff80",
  padding: 10,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#000',
  margin: 10,
  marginTop: 10,
  },
  texto: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});