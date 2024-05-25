import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get('window');

const motivationalQuotes = [
    { quote: "Acredite em si mesmo!", author: "Norman Vincent Peale" },
    { quote: "Você é mais forte do que imagina.", author: "A.A. Milne" },
    { quote: "Nunca desista dos seus sonhos.", author: "Walt Disney" },
    { quote: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
    { quote: "A jornada de mil milhas começa com um único passo.", author: "Lao-Tsé" }
];

export default function Motivational() {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const navigation = useNavigation();

    const changeQuote = () => {
        const nextIndex = (quoteIndex + 1) % motivationalQuotes.length;
        setQuoteIndex(nextIndex);
    };

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
                <View style={{justifyContent: "center", alignItems: "flex-end"}}>
                    <Text style={styles.title}>MOTIVACIONAL</Text>
                    <Icon name="format-quote-open" size={30} color="#9A83FF" />
                </View>
            </View>
            <TouchableOpacity style={styles.container} onPress={changeQuote} activeOpacity={1}>
                <View style={styles.main}>
                    <Icon name="format-quote-open" size={30} color="#fff" style={styles.quoteOpen} />
                    <View style={styles.words}>
                        <Text style={styles.wordsText}>{motivationalQuotes[quoteIndex].quote}</Text>
                        <Text style={styles.authorText}>- {motivationalQuotes[quoteIndex].author}</Text>
                        <Text style={styles.click}>Clique para mais!</Text>
                    </View>
                    <Icon name="format-quote-close" size={30} color="#fff" style={styles.quoteClose}/>
                </View>

                <View style={styles.footer}>
                    <Icon name="format-quote-close" size={30} color="#9A83FF" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#212226",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width * 0.9,
        paddingVertical: 20,
        height: height * 0.15
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "right",
        marginBottom: 5
    },

    main: {
        height: height * 0.75,
        width: width,
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    quoteOpen: {
        position: "absolute",
        top: 10,
        left: 10
    },

    quoteClose: {
        position: "absolute",
        bottom: 10,
        right: 10
    },

    words: {
        paddingHorizontal: 20,
    },

    wordsText: {
        color: "#fff",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic"
    },

    authorText: {
        color: "#fff",
        textAlign: "right",
        fontSize: 15,
        fontStyle: "italic",
    },

    click: {
        color: "#4E4E50",
        textAlign: "center",
        fontWeight: "400",
        fontSize: 13,
        marginTop: 30
    },

    footer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: width * 0.9,
        height: height * 0.10
    }
});
