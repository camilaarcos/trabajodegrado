import {Text, View,StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';

export default function Inicio() {
  const navigation = useNavigation();

return(
    <View style={styles.container}>
      <Image source={require('../assets/fondo.png')} style={[styles.imagefondo, StyleSheet.absoluteFill]} />
        
        <TouchableOpacity onPress={()=> navigation.navigate('Registro de crímenes')} style={styles.boxbutton} >
              <Text>Registrar Crímen</Text>
            </TouchableOpacity>
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
});