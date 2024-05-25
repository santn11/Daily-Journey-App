import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');
export default function Welcome() {

    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <View style={style.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../img/logo.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>
        
            <Animatable.View delay={600} animation="fadeInUp" style={style.containerForm}>
                <Text style={style.title}>MONITORE E ORGANIZE SUAS{"\n"}METAS DE QUALQUER LUGAR</Text>
                <Text style={style.text}>Faça login para começar:</Text>

                <TouchableOpacity style={style.button} onPress={() => navigation.navigate("SigIn")}>
                    <Text style={style.buttonText}>LOGIN</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9A83FF'
    },

    containerLogo: {
        flex: 2,
        backgroundColor: '#9A83FF',
        justifyContent: 'center',
        alignItems: 'center'

    },

    containerForm: {
        flex: 1,
        backgroundColor: '#212226',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: "center"
    },

    text: {
        color: '#a1a1a1'
    },

    button: {
        backgroundColor: '#9A83FF',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: (width) * 0.5,
        height: 50,
    },

    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
    },
})