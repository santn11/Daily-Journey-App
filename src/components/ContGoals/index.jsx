import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function ContGoals() {

    const [isVisible2, setIsVisible2] = useState(false);

    const openModal2 = () => {
        setIsVisible2(true);
    }

    const closeModal2 = () => {
        setIsVisible2(false);
    }

    return (
        <View style={styles.contGoals}>
            <TouchableOpacity onPress={openModal2} style={{alignItems: "center", gap: 10}}>
                <Icon name="cash-multiple" size={40} color="#00A36C" />
                <Text style={{color: "#fff", fontSize: 13, fontWeight: "500"}}>3 METAS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal2} style={{alignItems: "center", gap: 10}}>
                <Icon name="heart-multiple" size={40} color="#D94862" />
                <Text  style={{color: "#fff", fontSize: 13, fontWeight: "500"}}>3 METAS</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openModal2} style={{alignItems: "center", gap: 10}}>
                <Icon name="account-box-multiple" size={40} color="#7795DF" />
                <Text  style={{color: "#fff", fontSize: 13, fontWeight: "500"}}>3 METAS</Text>
            </TouchableOpacity>

            <Modal visible={isVisible2} transparent animationType="slide">
                <View style={styles.modal}>
                    <TouchableOpacity onPress={closeModal2}>
                        <Icon name="close" size={30} color="#000" />
                    </TouchableOpacity>

                    <View style={{ alignItems: "flex-start", gap: 35, padding: 15 }}>
                        <View style={styles.informations}>
                            <Icon name="cash-multiple" size={25} color="#00A36C" style={styles.iconInfo} />
                            <Text style={styles.description}>
                                <Text style={styles.fin}>FINANCEIRO:</Text> Controle seus gastos e investimentos
                            </Text>
                        </View>

                        <View style={styles.informations}>
                            <Icon name="heart-multiple" size={25} color="#D94862" style={styles.iconInfo} />
                            <Text style={styles.description}>
                                <Text style={styles.saude}>SAUDE:</Text> Crie metas para sua mente e corpo
                            </Text>
                        </View>

                        <View style={styles.informations}>
                            <Icon name="account-box-multiple" size={25} color="#7795DF" style={styles.iconInfo} />
                            <Text style={styles.description}>
                                <Text style={styles.prof}>PROFISSIONAL:</Text> Cresça na carreira com bons hábitos
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    contGoals: {
        flexDirection: "row",
        width: (width) * .9,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 15,
        backgroundColor: "#252731",
        gap: 20,
        padding: 25
    },

    modal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        width: (width) * 1,
        height: (width) * .95,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#fff",
        padding: 30
    },

    informations: {
        flexDirection: "row",
    },

    iconInfo: {
        marginRight: 20
    },

    description: {
        color: "#212226",
        fontSize: 15,
    },

    fin: {
        fontSize: 15,
        fontWeight: "600",
        color: "#00A36C"
    },

    saude: {
        fontSize: 15,
        fontWeight: "600",
        color: "#D94862"
    },

    prof: {
        fontSize: 15,
        fontWeight: "600",
        color: "#7795DF"
    }
});