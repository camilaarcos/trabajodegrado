import {Text, View,StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { database } from "../src/config/firebase";
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import Crimenes from "../src/components/crimenes";

export default function Inicio() {
  const navigation = useNavigation();
  const [crimenes, setCrimenes] = React.useState([]);

  React.useEffect(() => {
    const collectionRef = collection(database, 'crimenes');
    const q = query(collectionRef, orderBy('Fecha', 'desc'));

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
    <View style={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        
        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
              <Text>Registrar Crímen</Text>
            </TouchableOpacity>

        <View style={styles.crimenesContainer}>
          {crimenes.map((crimen) => (
            <Crimenes key={crimen.id} {...crimen} />
          ))}
          </View>
        </View>

);

}
const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#84b6f4',
  },
  imagefondo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
 boxbutton: {
  backgroundColor: "#ffffff80",
  padding: 10,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#fff',
  margin: 10,
  marginTop: 100,
  },
  crimenesContainer: {
    width: '100%',
    padding: 10,
  },
});