import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { getTempParams } from "../../database/services/signIn";
import db from "../../database"; 

const { height, width } = Dimensions.get('window');

export default function Trophy() {
    const navigation = useNavigation();
    const [name, setName] = useState(""); 
    const [xp, setXp] = useState(0); 
    const [completedMissions, setCompletedMissions] = useState(0);

    useEffect(() => {
        const { name, xp } = getTempParams();
        setName(name); 
        setXp(xp); 
        fetchCurrentXP(name); 
        fetchCurrentMetasConc(name); 
    }, []);

    useEffect(() => {
        fetchCurrentMetasConc(name);
    }, [name]);

    const fetchCurrentXP = async (name) => {
        try {
            const result = await db.getAllAsync('SELECT xp FROM users WHERE name = ?', [name]);
            if (result && result.length > 0) {
                const experience = result[0].xp;
                setXp(experience);
            } else {
                console.log('Nenhum resultado encontrado para o usuário:', name);
            }
        } catch (error) {
            console.error('Erro ao buscar XP do usuário:', error);
        }
    };

    const fetchCurrentMetasConc = async (name) => {
        try {
            const result = await db.getAllAsync('SELECT metasConc FROM users WHERE name = ?', [name]);
            if (result && result.length > 0) {
                const metasConc = result[0].metasConc;
                setCompletedMissions(metasConc);
            } else {
                console.log('Nenhum resultado encontrado para o usuário:', name);
            }
        } catch (error) {
            console.error('Erro ao buscar metas concluídas do usuário:', error);
        }
    };

    const trophies = [
        { text: "Obtenha 10 pontos de XP", requiredXP: 10 },
        { text: "Obtenha 50 pontos de XP", requiredXP: 50 },
        { text: "Obtenha 100 pontos de XP", requiredXP: 100 },
        { text: "Obtenha 200 pontos de XP", requiredXP: 200 },
        { text: "Obtenha 500 pontos de XP", requiredXP: 500 }
    ];

    const missions = [
        { text: "Conclua 1 meta", requiredMissions: 1 },
        { text: "Conclua 5 metas", requiredMissions: 5 },
        { text: "Conclua 10 metas", requiredMissions: 10 },
        { text: "Conclua 20 metas", requiredMissions: 20 },
        { text: "Conclua 50 metas", requiredMissions: 50 }
    ];

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
                    <Text style={styles.xp}>XP: {xp}</Text>
                    
                    {trophies.map((trophy, index) => {
                        const isAchieved = xp >= trophy.requiredXP;
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.trophy,
                                    isAchieved && { backgroundColor: "#9A83FF" }
                                ]}
                            >
                                <Text style={styles.area}>{trophy.text}</Text>
                                <View style={[styles.success, isAchieved && { backgroundColor: "#252731" }]}>
                                    <Icon
                                        name="check-decagram"
                                        size={30}
                                        color={isAchieved ? "#00A36C" : "#252731"}
                                    />
                                </View>
                            </View>
                        );
                    })}
                        
                    <Text style={[styles.xp, {marginTop: 10}]}>METAS CONCLUIDAS: {completedMissions}</Text>

                    {missions.map((mission, index) => {
                        const isAchieved = completedMissions >= mission.requiredMissions;
                        return (
                            <View
                                key={index}
                                style={[
                                    styles.trophy,
                                    isAchieved && { backgroundColor: "#9A83FF" }
                                ]}
                            >
                                <Text style={styles.area}>{mission.text}</Text>
                                <View style={[styles.success, isAchieved && { backgroundColor: "#252731" }]}>
                                    <Icon
                                           name="check-decagram"
                                           size={30}
                                           color={isAchieved ? "#00A36C" : "#252731"}
                                       />
                                   </View>
                               </View>
                           );
                       })}
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
           height: height * 0.15
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
           minHeight: height * 0.8
       },
   
    xp:{
        fontSize: 13,
        fontWeight: "500",
        color: "#9A83FF",
    },
    
    trophy: {
        borderRadius: 10,
        width: '100%',
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderColor: "#9A83FF",
        marginVertical: 10,
        paddingLeft: 15
    },
    
    area: {
        color: "#fff",
        fontSize: 15,
    },
    
    success: {
        paddingVertical: 20,
        width: '25%',
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    }
    });
    
    