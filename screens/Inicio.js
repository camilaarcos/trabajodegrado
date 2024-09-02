import {Text, View,StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
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
  <View style={styles.containerfuera}>
  <LottieView
        source={require('../assets/animations/fondoanimado.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    <ScrollView contentContainerStyle={styles.container}>
      
        
        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
              <Text>Registrar Crímen</Text>
            </TouchableOpacity>

        <View style={styles.crimenesContainer}>
          {crimenes.map((crimen) => (
            <Crimenes key={crimen.id} {...crimen} />
          ))}
          </View>
        </ScrollView>
        </View>

);

}
const styles = StyleSheet.create({
  containerfuera: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center', // Alinea horizontalmente al centro
    padding: 16,
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
  borderColor: '#fff',
  margin: 10,
  marginTop: 10,
  },
  crimenesContainer: {
    width: '100%',
    padding: 10,
  },
});