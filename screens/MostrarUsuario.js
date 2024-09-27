import {Text, View, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, TextInput} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import {FIREBASE_DB, FIREBASE_AUTH} from '../src/config/firebase';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {fetchUserData} from "../utils/Acciones";
import { data, dataBarrio } from "../utils/Ayudas";
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteUser, updateEmail } from "firebase/auth";

export default function MostrarUsuario(props) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const auth = FIREBASE_AUTH;
 
    const getUsuario = async (uid) => {
        try {
            const docRef = doc(FIREBASE_DB, 'usuarios', uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setUsuario(data);

            setNombre(data.nombre || '');
            setCorreo(data.correo || '');
            setRol(data.rol || '');
        } catch (error) {
            console.error("Error obteniendo usuario: ", error);
        }
    };

    useEffect(() => {
        getUsuario(props.route.params?.usuarioId);
        const getUserData = async () => {
          const result = await fetchUserData();
          if (result.statusResponse) {
              setUserRole(result.data.rol);
          } else {
              console.log(result.error);
          }
        };

        getUserData();
    },[]);

    const handleEditUsuario = async () => {
      setModalVisible(true);
          
    };

    const handleSaveUsuario = async () => {
      try {
        // const user = auth.currentUser; // Obtén el usuario actual
        // if (user !== user.email) {
        //   await updateEmail(user, correo); // Actualiza el correo en la autenticación
        // }
        const docRef = doc(FIREBASE_DB, 'usuarios', props.route.params?.usuarioId);
        await updateDoc(docRef, {
            nombre: nombre,
            correo: correo,
            rol: rol,
        });
        Alert.alert("Usuario actualizado", "El usuario ha sido actualizado exitosamente.");
        setModalVisible(false);
        getUsuario(props.route.params.usuarioId);
        // navigation.goBack();
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        Alert.alert("Error", "Hubo un problema al actualizar el usuario.");
    }
    };
  
    const handleDeleteUsuario = async (id) => {
      try {
        const docRef = doc(FIREBASE_DB, 'usuarios', id);
        await deleteDoc(docRef);
        const user = auth().currentUser; 
        if (user) {
          await deleteUser(user); 
        }
        Alert.alert("usuario eliminado", "El usuario ha sido eliminado exitosamente.");
        navigation.goBack();
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        Alert.alert("Error", "Hubo un problema al eliminar el usuario.");
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
            <Text style={styles.tittle}>{usuario.nombre}</Text>
            <View style={styles.contenedorinfo}>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>correo:</Text>  {usuario.correo}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>rol:</Text>  {usuario.rol}
                                </Text>
                            </View>
                            <View>
                            {userRole === 'admin' && (
                              <>
                              <Text>Este texto solo lo ve un usuario con rol de admin</Text>
      
                            <TouchableOpacity onPress={handleEditUsuario} style={styles.boxbutton}>
                              <Text style={styles.login}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> handleDeleteUsuario(props.route.params?.usuarioId)} style={styles.boxbutton}>
                             <Text style={styles.login}>Eliminar</Text>
                            </TouchableOpacity>
                            </>
                            )}
                            </View>
                            </View>
                            
                            
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
          <Text style={styles.info}>editar usuario</Text>
                                    <Text style={styles.info}>nombre:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="nombre"
                                      value={nombre}
                                      onChangeText={setNombre}
                                  />
                                  <Text style={styles.info}>correo:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="correo"
                                      value={correo}
                                      onChangeText={setCorreo}
                                  />
                                  <Text style={styles.info}>rol:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="rol"
                                      value={rol}
                                      onChangeText={setRol}
                                  />
                                  <TouchableOpacity onPress={handleSaveUsuario} style={styles.boxbutton}>
                          <Text style={styles.login}>Guardar</Text>
                      </TouchableOpacity>
          </View>
          </Modal>
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
      modalView: {
        marginTop: 200,
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});