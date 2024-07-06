import React from "react";
import Home from "../screens/Home";
import LogIn from "../screens/LogIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/SignIn";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function MyStack({ user }) {
  return (
    <Stack.Navigator initialRouteName={user ? "Inside" : "Home"}>
      {user ? (
        <>
           <Stack.Screen
            name="Insisde"
            component={Home}
            options={{ headerShown: false }}

          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              headerTitle: () => (
                <Image
                  style={{ width: 150, height: 50, resizeMode: 'contain' }}
                  source={require('../assets/adaptive-icon.png')} 
                />
              ),
              headerStyle: {
                backgroundColor: "#D2D9E3", 
              },
            }}
            
          />
          
        </>
      ) : (
        <>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ headerShown: true,
              headerTitle: () => (
                <Image
                style={{ width: 150, height: 50, resizeMode: 'contain' }}
                  source={require('../assets/adaptive-icon.png')} 
                />
              ),
              headerStyle: {
                backgroundColor: "#D2D9E3", 
              },
             }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: true,
              headerTitle: () => (
                <Image
                style={{ width: 150, height: 50, resizeMode: 'contain' }}
                  source={require('../assets/adaptive-icon.png')} 
                />
              ),
              headerStyle: {
                backgroundColor: "#D2D9E3", 
              },
             }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
