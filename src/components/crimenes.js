import React from "react";
import { View,StyleSheet, Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { database } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {AntDesign} from "@expo/vector-icons";


export default function Crimenes({id, Tipo, Fecha, Direccion, Observacion}) {
    return(

        <View style={styles.crimenesContainer}>
        <Text style={styles.crimenesText}>{Tipo}</Text>
        <Text style={styles.crimenesText}>{Fecha}</Text>
        <Text style={styles.crimenesText}>{Direccion}</Text>
        <Text style={styles.crimenesText}>{Observacion}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    crimenesContainer: {
        backgroundColor: "#ffffff80",
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    crimenesText: {
        fontSize: 20,
        fontWeight: "bold",
    }
});