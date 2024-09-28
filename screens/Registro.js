import {Text, View, Image, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity, ScrollView} from "react-native";
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {FIREBASE_DB} from '../src/config/firebase';
import {collection, addDoc} from 'firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { data, dataBarrio } from '../utils/Ayudas';
// import Loading from "../src/componentes/loading";
import CustomAlert from "../src/componentes/Alertas";
export default function Registro() {
  const navigation = useNavigation();
  const [newItem,setNewItem] = React.useState({
    Tipo: ' ',
    Fecha: new Date(),
    Direccion: ' ',
    Barrio: ' ',
    Observacion: ' ',
  });
  const [Fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [Registrosuccess, setRegistroSuccess] = useState(false);

  const onSend = async() => {
    // setLoading(true);
    try {
      await addDoc(collection(FIREBASE_DB, 'crimenes'), newItem);
      setAlertMessage('Registro correctamente');
      setAlertIcon(require('../assets/success.png'));
      setAlertVisible(true);
      setRegistroSuccess(true);
    } catch (error) {
      console.error("Error registando crímen: ", error);
      setAlertMessage('Error al registrar el crímen');
      setAlertIcon(require('../assets/error.png'));
      setAlertVisible(true);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChangeDate = (event, selectedDate) => {
    
    if (event.type === "set") {
      toggleDatePicker(); 
      const currentDate = selectedDate ||newItem.Fecha;
      setShowDatePicker(false);
    setNewItem({ ...newItem, Fecha: currentDate });
    if (Platform.OS === "android") {
      toggleDatePicker();
      setFecha(currentDate.toDateString());
    }
    } else {
      toggleDatePicker(); 
    }
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
    if(Registrosuccess){
      navigation.goBack();
    }
  };

return(
    <ScrollView contentContainerStyle={{
      flexGrow: 1,
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#dfe9f5',
    }}>
        
        <Text style={styles.tittle}>Registro de crímenes</Text>
        <Image source={require('../assets/Info.png')} style={styles.imageStyle} />
        <Text style={styles.texto}>Seleccione el tipo de crímen</Text>

        
        <SelectDropdown
        data={data}
        onSelect={(selectedItem) => {
          setNewItem({ ...newItem, Tipo: selectedItem.title });
        }}
        renderButton={(selectedItem, isOpened) => (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon name={selectedItem.icon}  />
            )}
            <Text >
              {(selectedItem && selectedItem.title) || "Tipo de crimen"}
            </Text>
            <Icon name={isOpened ? "chevron-up" : "chevron-down"} />
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
      
      <Text style={styles.texto}>Seleccione la fecha del crímen</Text>
      {showDatePicker && (
        <DateTimePicker
          value={newItem.Fecha}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
        />
      )}

      {!showDatePicker && (
        <Pressable onPress={toggleDatePicker}>
        <TextInput
        style={styles.inputContainer}
        placeholder={newItem.Fecha.toDateString()}
        value={Fecha}
        onChangeText={setFecha}
        editable={false}/>
        </Pressable>
      )}

      <Text style={styles.texto}>Ingrese la dirección del crímen</Text>
        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Direccion: text})}
        style={styles.inputContainer} placeholder="Dirección" require/>
        <SelectDropdown
        data={dataBarrio}
        onSelect={(selectedItem) => {
          setNewItem({ ...newItem, Barrio: selectedItem.title });
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
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
        dropdownStyle={styles.dropdownMenuStyle}
        search
        searchInputStyle={styles.dropdownItemStyle}
        searchInputTxtColor={'#151E26'}
        searchPlaceHolder={'Buscar Barrio'}
        searchPlaceHolderColor={'#72808D'}
        renderSearchInputLeftIcon={() => {
          return <FontAwesome name={'search'} color={'#72808D'} size={20} />;
        }}
      />
        <TextInput 
        onChangeText={(text)=> setNewItem({...newItem, Observacion: text})}
        style={styles.inputObservaciones}placeholder="Observaciones"
        multiline={true}
         require/>
        <TouchableOpacity onPress={onSend} style={styles.boxbutton}>
              <Text style={styles.Registro}>Registrar</Text>
              </TouchableOpacity>
              <CustomAlert
              visible={alertVisible}
              message={alertMessage}
              icon={alertIcon}
              onClose={handleCloseAlert}
            />
              {/* <Loading isVisible={loading} text="Cargando..."/> */}
        </ScrollView>
);

}

export const styles = StyleSheet.create({

      imagefondo: {
        // width: '100%',
        height: '120%',
        resizeMode: 'cover',
      },
      tittle: {
        fontSize: 30,
        color: '#4d82bc',
        fontWeight: 'bold',
        marginBottom: 10,
      },
      texto: {
        color: '#000',
        fontSize: 15,
        marginTop: 10,
      },
      imageStyle: {
        width: 200, 
        height: 200, 
      },
      dropdownButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 250,
        height: 43,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        marginTop: 10,
      },

      dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        width: 300,
        borderWidth: 0.5,
      },
      dropdownItemIconStyle: {
        fontSize: 16,
        color: '#000',
        marginRight: 10,
      },
      dropdownItemTxtStyle: {
        fontSize: 16,
        color: '#000',
      },
      dropdownMenuStyle: {
        position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -150 }, { translateY: -150 }],
      width: 300,
      zIndex: 1000,
      height: 500,
        borderRadius: 5,
        backgroundColor: '#ffffff',
      },
      inputContainer: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
      },
      inputContainerbarrio: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        marginTop: 10,
      },
      inputObservaciones: {
        width: 250,
        height: 200,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#ffffff90',
        fontWeight: '400',
        textAlignVertical: 'top',
        padding: 10,
        marginTop : 10,
        
      },
      Registro: {
        color: "#000",
        fontWeight: 'bold',
  
      },
     boxbutton: {
      backgroundColor: "#ffffff80",
      padding: 10,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#fff',
      margin: 10,
      alignItems: 'center',
      },
});