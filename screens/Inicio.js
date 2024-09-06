import {Text, View,StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { database } from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import Crimenes from "../src/components/crimenes";

export default function Inicio(props) {
  const navigation = useNavigation();
  const [crimenes, setCrimenes] = React.useState([]);

  React.useEffect(() => {
    const collectionRef = collection(database, 'crimenes');
    const q = query(collectionRef, orderBy('Fecha', 'asc'));

    const unsubscribe = onSnapshot(q, QuerySnapshot =>{
      setCrimenes(
        QuerySnapshot.docs.map(doc => ({
          id: doc.id,
          Tipo: doc.data().Tipo,
          Fecha: doc.data().Fecha.toDate().toDateString(),
          Direccion: doc.data().Direccion,
          Observacion: doc.data().Observacion,
        }))
      )
    })
    return unsubscribe;
  },[]);

return(
  // <View style={styles.containerfuera}>
  // <LottieView
  //       source={require('../assets/animations/fondoanimado.json')}
  //       autoPlay
  //       loop
  //       style={styles.animation}
  //     />
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        
        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
              <Text style={styles.texto}>Registrar Crímen</Text>
            </TouchableOpacity>


          {crimenes.map((crimen) => (
            <TouchableOpacity  key={crimen.id} style={styles.crimenesContainer}
            onPress={()=>props.navigation.navigate('MostrarCrimen',{crimenesId:crimen.id})}>
              <Text style={styles.textoCrimen}>{crimen.Tipo}</Text>
            </TouchableOpacity>
          ))}
      
        </ScrollView>
        // </View>

);

}
const styles = StyleSheet.create({
  containerfuera: {
    flex: 1,
    justifyContent: 'center',
  },
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
  animation: {
    position: 'absolute',
    width: '200%',
    height: '200%',
  },
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
});