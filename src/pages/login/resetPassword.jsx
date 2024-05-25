import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import * as Animatable from 'react-native-animatable'
import { useNavigation } from "@react-navigation/native";
import handleResetPassword from "../../database/services/changePass";

const { width } = Dimensions.get('window');

export default function ResetPassword() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPasswordPress = () => {
        handleResetPassword(email, newPassword, navigation);
    };

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>REDEFINA SUA SENHA</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>EMAIL</Text>
                <TextInput
                    placeholder="Email cadastrado"
                    placeholderTextColor={'#a1a1a1'}
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail} />

                <Text style={styles.title}>NOVA SENHA</Text>
                <TextInput
                    placeholder="Defina uma nova senha"
                    placeholderTextColor={'#a1a1a1'}
                    style={styles.input}
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={setNewPassword} />

                <TouchableOpacity style={styles.button} onPress={handleResetPasswordPress}>
                    <Text style={styles.buttonText}>REDEFINIR SENHA</Text>
                </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9A83FF'
    },

    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },

    message: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },

    containerForm: {
        backgroundColor: '#212226',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center"
    },

    title: {
        marginTop: 28,
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        width: (width) * 0.9,
        textAlign: "left"
    },

    input: {
        borderBottomWidth: 1,
        height: 40,
        justifyContent: "center",
        fontSize: 15,
        width: (width) * .9,
        color: "#fff"
    },

    button: {
        backgroundColor: '#9A83FF',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: (width) * 0.5,
        height: 50,
    },

    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
    },

    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },

    registerText: {
        color: '#a1a1a1'
    }
});
