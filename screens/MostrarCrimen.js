import {Text, View, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import {database} from '../src/config/firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";

export default function MostrarCrimen(props) {
    const navigation = useNavigation();

    const [crimen, setCrimen] = useState({});
    const [fecha, setFecha] = useState("");
    const getCrimen = async (id) => {
        try {
            const docRef = doc(database, 'crimenes', id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setCrimen(data);

            if (data && data.Fecha) {
                const fechaDate = new Date(data.Fecha.seconds * 1000);
                setFecha(fechaDate.toLocaleDateString());
            }
        } catch (error) {
            console.error("Error obteniendo crimen: ", error);
        }
    };
    useEffect(() => {
        getCrimen(props.route.params.crimenesId);
    },[]);

return(
    <View style={styles.container}>
        <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 90,
      }}>
        
        <BlurView intensity={100} style={styles.blurPrincipal}> 
            <View style={styles.contenedorcentro}>
            <Text style={styles.tittle}>{crimen.Tipo}</Text>
            <View style={styles.contenedorinfo}>
        <Text style={styles.info}>
         <Text style={styles.tittleinfo}>Fecha:</Text>  {fecha}
          </Text>
        <Text style={styles.info}>
        <Text style={styles.tittleinfo}>Dirección:</Text>  {crimen.Direccion}</Text>
        <Text style={styles.info}>
        <Text style={styles.tittleinfo}>Observación:</Text>  {crimen.Observacion}</Text>
        </View>
        </View>
          </BlurView>
        </ScrollView>
        </View>
);

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      blurPrincipal: {
        height: '80%',
        borderRadius: 10,
        overflow: 'hidden',
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
     contenedorcentro: {
        width: 350,
        height: '100%',
        borderColor: '#4d82bc',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
      },
      contenedorinfo: {
        width: '100%',
        marginTop: 10,
      },
      info: {
        fontSize: 20,
        color: '#000',
        marginTop: 20,
      },
      tittleinfo:{
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
      },
});