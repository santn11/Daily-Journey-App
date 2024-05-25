import React, {useState, useEffect} from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getTempParams } from "../../database/services/signIn";
const { height, width } = Dimensions.get('window');

export default function Trophy() {
    const navigation = useNavigation();
    const [name, setName] = useState(""); // Estado para armazenar o nome
    const [xp, setXp] = useState(""); // Estado para armazenar o xp

    useEffect(() => {
        // Obtém os parâmetros temporários após a montagem do componente
        const { name, xp } = getTempParams();
        setName(name); // Define o nome obtido nos parâmetros temporários
        setName(xp); // Define o nome obtido nos parâmetros temporários
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#212226"
                translucent={false}
                networkActivityIndicatorVisible={true}
            />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="keyboard-backspace" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>MINHAS{"\n"}CONQUISTAS</Text>
            </View>
            
            <ScrollView contentContainerStyle={styles.cardContainer}>
                <View style={styles.card}>
                    <Text style={[styles.xp, {fontSize: 13, fontWeight: "500"}]}>XP: {xp}0</Text>
                    <View style={styles.trophy}>
                        <Text style={styles.area}>Ganhe 10 pontos de XP</Text>
                        <Text style={styles.xp}>+ 5 XP</Text>
                    </View>
                    <View style={styles.trophy}>
                        <Text style={styles.area}>Ganhe 50 pontos de XP</Text>
                        <Text style={styles.xp}>+ 25 XP</Text>
                    </View>
                    <View style={styles.trophy}>
                        <Text style={styles.area}>Ganhe 100 pontos de XP</Text>
                        <Text style={styles.xp}>+ 50 XP</Text>
                    </View>
                    <View style={styles.trophy}>
                        <Text style={styles.area}>Ganhe 200 pontos de XP</Text>
                        <Text style={styles.xp}>+ 100 XP</Text>
                    </View>
                    <View style={styles.trophy}>
                        <Text style={styles.area}>Ganhe 500 pontos de XP</Text>
                        <Text style={styles.xp}>+ 200 XP</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#212226",
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start'
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: width * 0.9,
        height: (height) * .15
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginVertical: 25,
        textAlign: "right"
    },

    cardContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        width: width * 0.9,
        borderRadius: 15,
        padding: 20,
        backgroundColor: "#252731",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 10,
        height: height * .8
    },

    trophy: {
        borderRadius: 10,
        width: '100%',
        alignItems: "baseline",
        borderWidth: .5,
        borderColor: "#9A83FF",
        padding: 20,
        marginVertical: 10,
    },

    area: {
        color: "#fff",
        fontSize: 15,
    },

    xp: {
        fontSize: 12,
        fontWeight: "300",
        color: "#9A83FF"
    }
});
