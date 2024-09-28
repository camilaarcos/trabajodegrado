import { StyleSheet, Image, View } from 'react-native';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabIcon({ name, color, size, backgroundColor }) {
  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      <Ionicons name={name} color={color} size={size} />
    </View>
  );
}

function MyTabs() {
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
  }} />
  <Tab.Screen name="Perfil" component={Perfil}options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="bar-chart-outline" color={color} size={size} />
        ),
  }} />
    </Tab.Navigator>
  );
}

function MainStack({setIsLoggedIn}) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
      <Stack.Screen name="Inicio de sesión" >
      {props => <LogIn {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen> 
        <Stack.Screen name="Registrarse" component={SignIn}  />
        <Stack.Screen name="Inicio" component={Inicio}  />
  <Stack.Screen name="RecoverPassword" component={RecoverPassword}  />
  <Stack.Screen name="Cambiar Contraseña" component={CambiarContraseña} />
  <Stack.Screen name="Registro de crímenes" component={Registro} />
  <Stack.Screen name="MostrarCrimen" component={MostrarCrimen} />
  <Stack.Screen name="MostrarUsuario" component={MostrarUsuario}/>
  <Stack.Screen name="Perfil" component={Perfil}/>
  
    </Stack.Navigator>
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
});