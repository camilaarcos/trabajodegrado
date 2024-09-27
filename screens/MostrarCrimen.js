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
                                    <Text style={styles.tittleinfo}>Dirección:</Text>  {crimen.Direccion}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Barrio:</Text>  {crimen.Barrio}
                                </Text>
                                <Text style={styles.info}>
                                    <Text style={styles.tittleinfo}>Observación:</Text>  {crimen.Observacion}
                                </Text>
                            </View>
                            <View>
                            {userRole === 'admin' && (
                              <>
                              <Text>Este texto solo lo ve un usuario con rol de admin</Text>
      
                            <TouchableOpacity onPress={handleEditCrimen} style={styles.boxbutton}>
                              <Text style={styles.login}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> handleDeleteCrimen(props.route.params?.crimenesId)} style={styles.boxbutton}>
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
          <Text style={styles.info}>Tipo</Text>
                                  <SelectDropdown
                                      data={data}
                                      onSelect={(selectedItem, index) => {
                                          setTipo(selectedItem.title);
                                      }}
                                      renderButton={(selectedItem, isOpened) => (
                                        <View style={styles.dropdownButtonStyle}>
                                          <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Tipo"}
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
                                    <Text style={styles.info}>Dirección:</Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="Dirección"
                                      value={direccion}
                                      onChangeText={setDireccion}
                                  />
                                  <Text style={styles.info}>Barrio:</Text>
                                  <SelectDropdown
                                      data={dataBarrio}
                                      onSelect={(selectedItem, index) => {
                                          setBarrio(selectedItem.title);
                                      }}
                                      renderButton={(selectedItem, isOpened) => (
                                        <View style={styles.dropdownButtonStyle}>
                                          <Text style={styles.dropdownButtonTxtStyle}>
                                            {(selectedItem && selectedItem.title) || "Barrio"}
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
                                    <Text style={styles.info}>Observaciones: </Text>
                                  <TextInput
                                      style={styles.input}
                                      placeholder="Observación"
                                      value={observacion}
                                      onChangeText={setObservacion}
                                  />
                                  <TouchableOpacity onPress={handleSaveCrimen} style={styles.boxbutton}>
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