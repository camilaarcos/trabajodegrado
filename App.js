import { StyleSheet, View, Modal, TouchableOpacity, Text, Button } from 'react-native';
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";
import LogIn from "./screens/LogIn";
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import Inicio from './screens/Inicio';
import Registro from './screens/Registro';
import Mapas from './screens/Mapas';
import Perfil from './screens/Perfil';
import RecoverPassword from './screens/RecuperarContraseña';
import CambiarContraseña from './screens/CambiarContraseña';
import MostrarCrimen from './screens/MostrarCrimen';
import MostrarUsuario from './screens/MostrarUsuario';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from "./src/config/firebase";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabIcon({ name, color, size, backgroundColor }) {
  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
}


function MyTabs({openMenu}) {

  return (
    <Tab.Navigator initialRouteName="Inicio"
    screenOptions={{
      tabBarStyle: {
        padding: 5,
        paddingBottom: 5,
      },
    }} >
      <Tab.Screen name="Inicio" component={Inicio} options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        ),
          headerRight: () => (
            <TouchableOpacity onPress={openMenu}>
            <Ionicons name="menu" size={34} color="black" />
          </TouchableOpacity>
          ),
  }}/>
      <Tab.Screen name=" " component={Registro}
       options={{
        tabBarIcon: ({ color, size, focused }) => (
          <CustomTabIcon 
            name="add" 
            color={focused ? 'white' : 'gray'} 
            size={size + 10} 
            backgroundColor={focused ? color : 'white'} 
          />
        )}} />
     
  <Tab.Screen name="Mapas" component={Mapas}options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bar-chart-outline" color={color} size={size} />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={openMenu}>
          <Ionicons name="menu" size={34} color="black" />
        </TouchableOpacity>
        ),
  }} />

    </Tab.Navigator>
  );
}

function MainStack({setIsLoggedIn}) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCerrarSesion = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      console.log('Cerrando sesión...');
      navigation.navigate('Home'); 
      setIsLoggedIn(false);
      setModalVisible(false); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
    
  };
  return (
    <View style={{ flex: 1 }}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyTabs" options={{ headerShown: false }}>
        {props => <MyTabs {...props} openMenu={() => setModalVisible(true)} />}
      </Stack.Screen>
      <Stack.Screen name="Inicio de sesión" >
      {props => <LogIn {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen> 
        <Stack.Screen name="Registrarse" component={SignIn}  />
        <Stack.Screen name="Inicio" >
          {props => <Inicio {...props} openMenu={() => setModalVisible(true)} />} 
        </Stack.Screen>
  <Stack.Screen name="RecoverPassword" component={RecoverPassword}  />
  <Stack.Screen name="Cambiar Contraseña" component={CambiarContraseña} />
  <Stack.Screen name="Registro de crímenes" component={Registro} />
  <Stack.Screen name="MostrarCrimen" component={MostrarCrimen} />
  <Stack.Screen name="MostrarUsuario" component={MostrarUsuario}/>
  <Stack.Screen name="Perfil" component={Perfil}/>
  <Stack.Screen name="Mapas" >
          {props => <Mapas {...props} openMenu={() => setModalVisible(true)} />} 
        </Stack.Screen>
    </Stack.Navigator>
    
  <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={()=> {navigation.navigate('Perfil'); setModalVisible(false); }
        }
      >
        <Text style={styles.modalButtonText}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalButton}
        onPress={handleCerrarSesion}
      >
        <Text style={styles.modalButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Button title="Cerrar" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>
</View>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <NavigationContainer>
      <MainStack setIsLoggedIn={setIsLoggedIn}/>
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#4d82bc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});