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
        Alert.alert("Crimen actualizado", "El crimen ha sido actualizado exitosamente.");
        setModalVisible(false);
        getCrimen(props.route.params.crimenesId);
        // navigation.goBack();
    } catch (error) {
        console.error("Error al actualizar el crimen:", error);
        Alert.alert("Error", "Hubo un problema al actualizar el crimen.");
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
        <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 90,
      }}>
        
        <BlurView intensity={100} style={styles.blurPrincipal}> 
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
            <Text style={styles.titlemodal}>Editar Crímen</Text>
          <Text style={styles.infomodal}>{tipo}</Text>
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
                                    <Text style={styles.infomodal}>Dirección:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="Dirección"
                                      value={direccion}
                                      onChangeText={setDireccion}
                                  />
                                  <Text style={styles.infomodal}>{barrio}</Text>
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
                                    <Text style={styles.infomodal}>Observaciones: </Text>
                                  <TextInput
                                      style={styles.input}
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
                      <TouchableOpacity
                        style={styles.boxbutton2}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textbutton}>Cerrar</Text>
                      </TouchableOpacity>
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
        alignItems: 'center',
        backgroundColor: '#dfe9f5',
      },
      blurPrincipal: {
        height: '60%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 40,
      },
      imagefondo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      title: {
        fontSize: 30,
        color: '#4d82bc',
        fontWeight: 'bold',
        marginTop: 10,
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
        marginTop: 30,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginBottom: 5,
      },
      info: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
      },
      titleinfo:{
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
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    titlemodal: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    infomodal: {
      fontSize: 20,
      color: '#000',
      marginTop: 10,
      backgroundColor: '#dfe9f5',
      borderRadius: 5,
      width: 300,
    },
    contenedorbutton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    boxbutton: {
      flexDirection: 'row',
      backgroundColor: "#ffffff80",
      padding: 5,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#fff',
      marginHorizontal: 20,
    },
    textbutton:{
      fontWeight: "bold",
    },
    boxbutton2: {
      flexDirection: 'row',
      backgroundColor: "#dfe9f580",
      padding: 5,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#dfe9f5',
      marginHorizontal: 20,
    },
    dropdownButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#a7aed3',
      marginTop: 10,
      width: 300,
      borderRadius: 5,
    },
    dropdownButtonTxtStyle: {
      fontSize: 20,
      color: '#000',
    },
    dropdownItemStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 0.5,
    },
    dropdownItemTxtStyle: {
      fontSize: 20,
      color: '#000',
    },
    dropdownMenuStyle: {
      position: 'absolute',
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
      borderRadius: 5,
      backgroundColor: '#ffffff',
    },
    input: {
      backgroundColor: '#a7aed3',
      marginTop: 10,
      width: 300,
      borderRadius: 5,
      fontSize: 20,
    },
});