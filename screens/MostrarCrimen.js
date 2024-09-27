import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import {FIREBASE_DB} from '../src/config/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { fetchUserRole} from "../utils/Acciones";

export default function MostrarCrimen(props) {
    const navigation = useNavigation();
    const [crimen, setCrimen] = useState({});
    const [fecha, setFecha] = useState("");
    const [userRole, setUserRole] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tipo, setTipo] = useState("");
    const [barrio, setBarrio] = useState("");
    const [direccion, setDireccion] = useState(""); 
    const [observacion, setObservacion] = useState("");
 
    const getCrimen = async (id) => {
        try {
            const docRef = doc(FIREBASE_DB, 'crimenes', id);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setCrimen(data);

            if (data && data.Fecha) {
                const fechaDate = new Date(data.Fecha.seconds * 1000);
                setFecha(fechaDate.toLocaleDateString());
            }
            setTipo(data.Tipo || '');
            setDireccion(data.Direccion || '');
            setBarrio(data.Barrio || '');
            setObservacion(data.Observacion || '');
        } catch (error) {
            console.error("Error obteniendo crimen: ", error);
        }
    };
    const getUserRole = async () => {
      const result = await fetchUserRole();
      if (result.statusResponse) {
        setUserRole(result.data);
      }
    };
    useEffect(() => {
        getCrimen(props.route.params.crimenesId);
        getUserRole();
    },[]);

    const handleEditCrimen = async () => {
      if (isEditing) {
          try {
            const docRef = doc(FIREBASE_DB, 'crimenes', props.route.params.crimenesId);
            await updateDoc(docRef, {
                Tipo: tipo,
                Direccion: direccion,
                Barrio: barrio,
                Observacion: observacion
            });
            Alert.alert("Crimen actualizado", "El crimen ha sido actualizado exitosamente.");
            setIsEditing(false);
            getCrimen(props.route.params.crimenesId);
            navigation.goBack();
        } catch (error) {
            console.error("Error al actualizar el crimen:", error);
            Alert.alert("Error", "Hubo un problema al actualizar el crimen.");
        }
      } else {
        setIsEditing(true);
     }
    };
  
    const handleDeleteCrimen = async (id) => {
      try {
        const docRef = doc(FIREBASE_DB, 'crimenes', id);
        await deleteDoc(docRef);
        Alert.alert("Crimen eliminado", "El crimen ha sido eliminado exitosamente.");
        navigation.goBack();
    } catch (error) {
        console.error("Error al eliminar el crimen:", error);
        Alert.alert("Error", "Hubo un problema al eliminar el crimen.");
    }
    };

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
            {userRole === 'usuario' && (
        <Text>Este texto solo lo ve un usuario con rol de usuario</Text>
      )}
      {userRole === 'admin' && (
        <Text>Este texto solo lo ve un usuario con rol de admin</Text>
      )}
            <Text style={styles.tittle}>{crimen.Tipo}</Text>
            <View style={styles.contenedorinfo}>
            {isEditing ? (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tipo"
                                    value={tipo}
                                    onChangeText={setTipo}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Dirección"
                                    value={direccion}
                                    onChangeText={setDireccion}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Barrio"
                                    value={barrio}
                                    onChangeText={setBarrio}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Observación"
                                    value={observacion}
                                    onChangeText={setObservacion}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Fecha:</Text>  {fecha}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Dirección:</Text>  {crimen.Direccion}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Barrio:</Text>  {crimen.Barrio}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Observación:</Text>  {crimen.Observacion}
                                </Text>
                            </>
                        )}
        <TouchableOpacity onPress={handleEditCrimen} style={styles.boxbutton}>
        <Text style={styles.login}>{isEditing ? "Guardar" : "Editar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> handleDeleteCrimen(props.route.params?.crimenesId)} style={styles.boxbutton}>
        <Text style={styles.login}>Eliminar</Text>
        </TouchableOpacity>
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