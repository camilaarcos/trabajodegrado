import {Text, View, Image, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, TextInput} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from 'expo-blur';
import {FIREBASE_DB} from '../src/config/firebase';
import SelectDropdown from 'react-native-select-dropdown';
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {fetchUserData} from "../utils/Acciones";
import { data, dataBarrio } from "../utils/Ayudas";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../src/componentes/Alertas";

export default function MostrarCrimen(props) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [crimen, setCrimen] = useState({});
    const [fecha, setFecha] = useState("");
    const [userRole, setUserRole] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tipo, setTipo] = useState("");
    const [barrio, setBarrio] = useState("");
    const [direccion, setDireccion] = useState(""); 
    const [observacion, setObservacion] = useState("");
    const [inputHeight, setInputHeight] = useState(40);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertIcon, setAlertIcon] = useState(null);
    const [Registrosuccess, setRegistroSuccess] = useState(false);

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

    useEffect(() => {
        getCrimen(props.route.params.crimenesId);
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

    const handleEditCrimen = async () => {
      setModalVisible(true);
          
    };

    const handleSaveCrimen = async () => {
      try {
        const docRef = doc(FIREBASE_DB, 'crimenes', props.route.params.crimenesId);
        await updateDoc(docRef, {
            Tipo: tipo,
            Direccion: direccion,
            Barrio: barrio,
            Observacion: observacion
        });
        setAlertMessage("El crimen ha sido actualizado exitosamente.");
        setAlertIcon(require('../assets/success.png'));
        setAlertVisible(true);
        setRegistroSuccess(true);
        getCrimen(props.route.params.crimenesId);
        // navigation.goBack();
    } catch (error) {
        console.error("Error al actualizar el crimen:", error);
      setAlertMessage('Hubo un problema al actualizar el crimen.');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
    }
    };
  
    const handleDeleteCrimen = async (id) => {
      try {
        const docRef = doc(FIREBASE_DB, 'crimenes', id);
        await deleteDoc(docRef);
        setAlertMessage("El crimen ha sido eliminado exitosamente.");
        setAlertIcon(require('../assets/success.png'));
        setAlertVisible(true);
        setRegistroSuccess(true);
    } catch (error) {
        console.error("Error al eliminar el crimen:", error);
        setAlertMessage('ubo un problema al eliminar el crimen.');
        setAlertIcon(require('../assets/error.png'));
        setAlertVisible(true);
    }
    };

    const handleCloseAlert = () => {
      setAlertVisible(false);
      if(Registrosuccess){
        setModalVisible(false);
        navigation.goBack();
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
        justifyContent: 'center',
      }}>
        {/* <Image source={require('../assets/I1.png')} style={styles.imageArriba} /> */}
            <View style={styles.contenedorcentro}>
            <Text style={styles.title}>{crimen.Tipo}</Text>
              <View style={styles.contenedorinfo}>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Fecha:</Text>  {fecha}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Dirección:</Text>  {crimen.Direccion}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Barrio:</Text>  {crimen.Barrio}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.titleinfo}>Observación:</Text>  {crimen.Observacion}
                                </Text>
                </View>
                            <View>
                            {userRole === 'Administrador' && (
                              <>      
                            <View style={styles.contenedorbutton}>
                            <TouchableOpacity onPress={handleEditCrimen} style={styles.boxbutton}>
                              <Text style={styles.textbutton}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> handleDeleteCrimen(props.route.params?.crimenesId)} style={styles.boxbutton}>
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
            <Text style={styles.titlemodal}>Editar Crímen</Text>
          <Text style={styles.infomodal}><Text style={styles.textomodal}>Tipo de crímen:</Text> {tipo}</Text>
                                  <SelectDropdown
                                      data={data}
                                      onSelect={(selectedItem, index) => {
                                          setTipo(selectedItem.title);
                                      }}
                                      renderButton={(selectedItem, isOpened) => (
                                        <View style={styles.dropdownButtonStyle}>
                                          <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Tipo de crímen nuevo"}
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
                                    <Text style={styles.textomodal}>Dirección:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="Dirección"
                                      value={direccion}
                                      onChangeText={setDireccion}
                                  />
                                  <Text style={styles.infomodal}> <Text style={styles.textomodal}>Barrio:</Text> {barrio}</Text>
                                  <SelectDropdown
                                      data={dataBarrio}
                                      onSelect={(selectedItem, index) => {
                                          setBarrio(selectedItem.title);
                                      }}
                                      renderButton={(selectedItem, isOpened) => (
                                        <View style={styles.dropdownButtonStyle}>
                                          <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Barrio Nuevo"}
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
                                    <Text style={styles.textomodal}>Observaciones: </Text>
                                  <TextInput
                                      style={styles.input2}
                                      placeholder="Observación"
                                      value={observacion}
                                      onChangeText={setObservacion}
                                      multiline={true}
                                      onContentSizeChange={(event) => {
                                        setInputHeight(event.nativeEvent.contentSize.height);
                                      }}
                                  />
                                  <View style={styles.contenedorbutton}>
                                            <TouchableOpacity onPress={handleSaveCrimen} style={styles.boxbutton2}>
                          <Text style={styles.textbutton}>Guardar</Text>
                      </TouchableOpacity>
                      
                      </View>
                      <CustomAlert
                visible={alertVisible}
                message={alertMessage}
                icon={alertIcon}
                onClose={handleCloseAlert}
              />
          </View>
          </Modal>
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
    },
    input2: {
      backgroundColor: '#08080815',
      marginTop: 10,
      width: '100%',
      borderRadius: 5,
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#00AFFF',
    },
    modalCloseButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
});