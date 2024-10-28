import {Text, View, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, TextInput} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import {FIREBASE_DB, FIREBASE_AUTH} from '../src/config/firebase';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {fetchUserData} from "../utils/Acciones";
import { dataRol } from "../utils/Ayudas";
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteUser, updateEmail } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../src/componentes/Alertas";
export default function MostrarUsuario(props) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertIcon, setAlertIcon] = useState(null);
    const [Registrosuccess, setRegistroSuccess] = useState(false);
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

        const docRef = doc(FIREBASE_DB, 'usuarios', props.route.params?.usuarioId);
        await updateDoc(docRef, {
            nombre: nombre,
            correo: correo,
            rol: rol,
        });
        setAlertMessage("El usuario ha sido actualizado exitosamente.");
        setAlertIcon(require('../assets/success.png'));
        setAlertVisible(true);
        setRegistroSuccess(true);
        getUsuario(props.route.params.usuarioId);

    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        setAlertMessage('Hubo un problema al actualizar el usuario.');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
    }
    };
  
    const handleDeleteUsuario = async (id) => {
      try {
        const docRef = doc(FIREBASE_DB, 'usuarios', id);
        await deleteDoc(docRef);

        setAlertMessage("El usuario ha sido eliminado exitosamente.");
        setAlertIcon(require('../assets/success.png'));
        setAlertVisible(true);
        setRegistroSuccess(true);
        navigation.goBack();
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        setAlertMessage('Hubo un problema al eliminar el usuario.');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
    }
    };
    const handleCloseAlert = () => {
      setAlertVisible(false);
      if(Registrosuccess){
        setModalVisible(false);
      }
    };

    const handleCloseAlert2 = () => {
      setAlertVisible(false);
      if(Registrosuccess){
        navigation.goBack();
      }
    };

return(
    <View style={styles.container}>
        <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 90,
      }}>
        
        <BlurView intensity={100} style={styles.blurPrincipal}> 
            <View style={styles.contenedorcentro}>
            <Text style={styles.title}>{usuario.nombre}</Text>
            <View style={styles.contenedorinfo}>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Correo electrónico:</Text>  {usuario.correo}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Rol:</Text>  {usuario.rol}
                                </Text>
                            </View>
                            <View>
                            {userRole === 'Administrador' && (
                              <>
                              <View style={styles.contenedorbutton}>
                            <TouchableOpacity onPress={handleEditUsuario} style={styles.boxbutton}>
                              <Text style={styles.textbutton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> handleDeleteUsuario(props.route.params?.usuarioId)} style={styles.boxbutton}>
                             <Text style={styles.textbutton}>Eliminar</Text>
                            </TouchableOpacity>
                            </View>
                            </>
                            )}

                            <CustomAlert
                                visible={alertVisible}
                                message={alertMessage}
                                icon={alertIcon}
                                onClose={handleCloseAlert2}
                              />
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
          <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Ionicons name="close" size={25} color="black" />
                      </TouchableOpacity>
          <Text style={styles.titlemodal}>Editar usuario</Text>
                                    <Text style={styles.textomodal}>Nombre:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="nombre"
                                      value={nombre}
                                      onChangeText={setNombre}
                                  />
                                  <Text style={styles.textomodal}>Correo:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="correo"
                                      value={correo}
                                      onChangeText={setCorreo}
                                  />
                                  <Text style={styles.infomodal}><Text style={styles.textomodal}>Rol:</Text>{usuario.rol}</Text>
                                  <SelectDropdown
                                      data={dataRol}
                                      onSelect={(selectedItem, index) => {
                                          setRol(selectedItem.title);
                                      }}
                                      renderButton={(selectedItem, isOpened) => (
                                        <View style={styles.dropdownButtonStyle}>
                                          <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Rol Nuevo"}
                                          </Text>
                                          <Icon name={isOpened ? "chevron-up" : "chevron-down"} style={styles.dropdownButtonArrowStyle} />
                                        </View>
                                      )}
                                      renderItem={(item, index, isSelected) => (
                                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                                        </View>
                                      )}
                                      showsVerticalScrollIndicator={true}
                                      dropdownStyle={styles.dropdownMenuStyle}
                                    />
                                  <View style={styles.contenedorbutton}>
                                  <TouchableOpacity onPress={handleSaveUsuario} style={styles.boxbutton2}>
                          <Text style={styles.textbutton}>Guardar</Text>
                      </TouchableOpacity>
                      <CustomAlert
                                visible={alertVisible}
                                message={alertMessage}
                                icon={alertIcon}
                                onClose={handleCloseAlert}
                              />
                      </View>
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
        // alignItems: 'center',
        backgroundColor: '#E5F4F1',
      },
      imageArriba: {
        width: 100,
        height: 100,
      },
      title: {
        fontSize: 40,
        color: '#2E3A47',
        fontWeight: 'bold',
        marginTop: 10,
      },
     contenedorcentro: {
      width: 350,
      backgroundColor: '#fefefe',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      },
      contenedorinfo: {
        width: '100%',
        marginTop: 30,
        padding: 10,
      },
      info: {
        fontSize: 14,
        color: '#2E3A47',
        marginTop: 10,
      },
      titleinfo:{
        fontSize: 14,
        color: '#2E3A47',
        fontWeight: 'bold',
      },
      modalView: {
        marginTop: 200,
        justifyContent: 'center',
        margin: 20,
        backgroundColor: '#fefefe',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titlemodal: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#2E3A47',
    },
    textomodal: {
      fontSize: 14,
      color: '#2E3A47',
      fontWeight: 'bold',
      marginTop: 10,
      width: 300,
    },
    infomodal: {
      fontSize: 14,
      color: '#2E3A47',
      marginTop: 10,
      width: 300,
      // fontWeight: 'bold',
    },
    contenedorbutton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    boxbutton: {
      flexDirection: 'row',
      backgroundColor: "#50AB89",
      padding: 5,
      borderRadius: 100,
      marginHorizontal: 20,
      width: 100,
      justifyContent: 'center',
    },
    textbutton:{
      fontWeight: "bold",
      color: "#ffffff",
    },
    boxbutton2: {
      flexDirection: 'row',
      backgroundColor: "#50AB89",
      padding: 5,
      borderRadius: 8,
      width: 100,
      justifyContent: 'center',
      marginLeft: 95,
    },
    dropdownButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#08080810',
      marginTop: 10,
      width: '100%',
      height: 30,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#00AFFF',
      paddingHorizontal: 10,
    },
    dropdownButtonArrowStyle: {
      color: '#2E3A47',
      marginRight: 10,
      contentSize: 10,
    },
    dropdownButtonTxtStyle: {
      fontSize: 14,
      color: '#2E3A47',
    },
    dropdownItemStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 0.5,
    },
    dropdownItemTxtStyle: {
      fontSize: 14,
      color: '#2E3A47',
    },
    dropdownMenuStyle: {
      position: 'absolute',
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
      borderRadius: 5,
      backgroundColor: '#fefefe',
    },
    input: {
      backgroundColor: '#08080815',
      marginTop: 10,
      width: '100%',
      borderRadius: 5,
      fontSize: 14,
      height: 30,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#00AFFF',
      paddingHorizontal: 10,
    },
    modalCloseButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
});