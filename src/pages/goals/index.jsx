import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, ScrollView, Modal, StatusBar, Image, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTempParams } from "../../database/services/signIn";
import db from "../../database/index";

const { height, width } = Dimensions.get('window');

const FilterGoalButton = ({ selectedButton, handleButtonPress }) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={[styles.button, selectedButton === 1 && styles.buttonSelected1]}
                onPress={() => handleButtonPress(1)}
            >
                <Icon name="cash-multiple" size={30} color="#fff" />
                <Text style={styles.buttonText}>FINANCEIRO</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedButton === 2 && styles.buttonSelected2]}
                onPress={() => handleButtonPress(2)}
            >
                <Icon name="heart-multiple" size={30} color="#fff" />
                <Text style={styles.buttonText}>SAUDE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, selectedButton === 3 && styles.buttonSelected3]}
                onPress={() => handleButtonPress(3)}
            >
                <Icon name="account-box-multiple" size={30} color="#fff" />
                <Text style={styles.buttonText}>PROFISSIONAL</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function ViewGoals() {
    const navigation = useNavigation();
    const route = useRoute();
    const [name, setName] = useState("");
    const scrollViewRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [footerHeight, setFooterHeight] = useState(0);
    const [selectedButton, setSelectedButton] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [goals, setGoals] = useState([]);
    const [filteredGoals, setFilteredGoals] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const verifyAndAddColumns = async () => {
            try {
                const result = await db.getAllAsync("PRAGMA table_info(users)");
                const columns = result.map(column => column.name);
                if (!columns.includes("metasConc")) {
                    await db.runAsync("ALTER TABLE users ADD COLUMN metasConc INTEGER DEFAULT 0");
                    console.log("Coluna metasConc adicionada com sucesso.");
                } else {
                    console.log("Coluna metasConc já existe.");
                }
            } catch (error) {
                console.error("Erro ao verificar/adicionar a coluna metasConc:", error);
            }
        };

        verifyAndAddColumns();

        const { name, xp } = getTempParams();
        setName(name);
        const tempGoals = [
            { id: 1, area: "FINANCEIRO", desc: "Investir R$ 300,00", frequency: "Mensal" },
            { id: 2, area: "SAUDE", desc: "Caminhada 30 min", frequency: "Diária" },
            { id: 3, area: "SAUDE", desc: "Fazer 10 flexões", frequency: "Diária" },
            { id: 4, area: "PROFISSIONAL", desc: "Estudar 1 hora", frequency: "Diária" },
            { id: 5, area: "PROFISSIONAL", desc: "Fazer curso da área", frequency: "Trimestral" },
            { id: 6, area: "FINANCEIRO", desc: "Juntar R$ 1.000,00", frequency: "Anual" },
            { id: 7, area: "PROFISSIONAL", desc: "Ler um livro", frequency: "Mensal" },
            { id: 8, area: "SAUDE", desc: "Ir a academia", frequency: "Diária" },
            { id: 9, area: "FINANCEIRO", desc: "Comprar Memecoin", frequency: "Diária" },
        ];
        setGoals(tempGoals);
        setFilteredGoals(tempGoals);
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.measure((height) => {
                setFooterHeight(height * .20);
            });
        }
    }, []);

    const congrat = async () => {
        try {
            await db.runAsync('UPDATE users SET xp = xp + 10, metasConc = metasConc + 1 WHERE name = ?', [name]);
            setIsVisible(true);
            console.log('Usuário', {name}, 'ganhou +10 pontos XP e +1 meta concluída');
            fetchCurrentMetasConc(name); // Log metasConc after updating
        } catch (error) {
            console.error('Erro ao atualizar a XP e metasConc do usuário:', error);
        }
    };

    const fetchCurrentXP = async (name) => {
        try {
            console.log('Buscando XP para o usuário:', name);
            const result = await db.getAllAsync('SELECT xp FROM users WHERE name = ?', [name]);
            if (result && result.length > 0) {
                const experience = result[0].xp;
                console.log('XP atual do usuário:', experience);
                return experience;
            } else {
                console.log('Nenhum resultado encontrado para o usuário:', name);
                return 0;
            }
        } catch (error) {
            console.error('Erro ao buscar XP do usuário:', error);
            throw error;
        }
    };
    
    const fetchCurrentMetasConc = async (name) => {
        try {
            console.log('Buscando metasConc para o usuário:', name);
            const result = await db.getAllAsync('SELECT metasConc FROM users WHERE name = ?', [name]);
            if (result && result.length > 0) {
                const metasConc = result[0].metasConc;
                console.log('Metas concluídas do usuário:', metasConc);
                return metasConc;
            } else {
                console.log('Nenhum resultado encontrado para o usuário:', name);
                return 0;
            }
        } catch (error) {
            console.error('Erro ao buscar metasConc do usuário:', error);
            throw error;
        }
    };

    const handleButtonPress = async (button) => {
        if (button === 0) {
            try {
                const currentXP = await fetchCurrentXP(name);
                console.log('XP atual do usuário:', currentXP);
                const currentMetasConc = await fetchCurrentMetasConc(name);
                console.log('Metas concluídas do usuário:', currentMetasConc);
                setIsVisible(false);
            } catch (error) {
                console.error('Erro ao buscar XP e metasConc atuais do usuário:', error);
            }
        } else {
            setSelectedButton(button);
            const areaName = getAreaName(button);
            const filtered = goals.filter(goal => goal.area === areaName);
            setFilteredGoals(filtered);
            const results = filtered.filter(goal => goal.desc.toLowerCase().includes(searchText.toLowerCase()));
            setSearchResults(results);
        }
    };

    const handleSearchChange = (text) => {
        setSearchText(text);
        const results = filteredGoals.filter(goal => goal.desc.toLowerCase().includes(text.toLowerCase()));
        setSearchResults(results);
    };

    const renderHeader = () => {
        switch (selectedButton) {
            case 1:
                return (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-backspace" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                            <Text style={[styles.title, { color: "#00A36C" }]}>FINANCEIRO</Text>
                            <Icon name="cash-multiple" size={30} color="#00A36C" />
                        </View>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-backspace" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                            <Text style={[styles.title, { color: "#D94862" }]}>SAUDE</Text>
                            <Icon name="heart-multiple" size={30} color="#D94862" />
                        </View>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-backspace" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{ justifyContent: "center", alignItems: "flex-end" }}>
                            <Text style={[styles.title, { color: "#7795DF" }]}>PROFISSIONAL</Text>
                            <Icon name="account-box-multiple" size={30} color="#7795DF" />
                        </View>
                    </View>
                );
            default:
                return (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="keyboard-backspace" size={30} color="#fff" />
                        </TouchableOpacity>
                        <View style={{justifyContent: "center", alignItems: "flex-end"}}>
                            <Text style={[styles.title, {color: "#fff"}]}>TODAS</Text>
                            <Text style={[styles.title, {color: "#fff"}]}>AS METAS</Text>
                        </View>
                    </View>
                );
        }
    };

    const getAreaName = (button) => {
        switch (button) {
            case 1:
                return "FINANCEIRO";
            case 2:
                return "SAUDE";
            case 3:
                return "PROFISSIONAL";
            default:
                return "";
        }
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

            {renderHeader()}

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar..."
                    value={searchText}
                    onChangeText={handleSearchChange}
                />
            </View>

            <ScrollView contentContainerStyle={[styles.scrollViewContent, { paddingBottom: footerHeight }]} ref={scrollViewRef}>
                {searchResults.length === 0 ? (
                    filteredGoals.map(goal => (
                        <View key={goal.id} style={styles.listGoals}>
                            <View style={{ gap: 5 }}>
                                <Text style={styles.desc}>{goal.desc}</Text>
                                <Text style={styles.frequency}>{goal.frequency}</Text>
                            </View>
                            <TouchableOpacity onPress={congrat}>
                                <Icon name="bookmark-check" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    searchResults.map(goal => (
                        <View key={goal.id} style={styles.listGoals}>
                            <View style={{ gap: 5 }}>
                                <Text style={styles.desc}>{goal.desc}</Text>
                                <Text style={styles.frequency}>{goal.frequency}</Text>
                            </View>
                            <TouchableOpacity onPress={congrat}>
                                <Icon name="bookmark-check" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </ScrollView>

            <FilterGoalButton
                selectedButton={selectedButton}
                handleButtonPress={handleButtonPress}
            />

            <Modal visible={isVisible} transparent animationType="slide">
                <View>
                    <TouchableOpacity onPress={() => handleButtonPress(0)} style={{ height: '100%', width: '100%' }} activeOpacity={1}>
                        <View style={styles.congrats}>
                            <Text style={styles.words}>PARABÉNS! {"\n"}META CONCLUÍDA COM SUCESSO</Text>
                            <Image
                                source={require('../../img/robot.png')}
                                style={{ width: '60%', height: '60%' }}
                                resizeMode="contain"
                            />
                            <Text style={styles.words2}>+10 XP</Text>
                            <Text style={styles.words2}>+1 Meta concluida</Text>
                            <TouchableOpacity style={styles.buttonClose} onPress={() => handleButtonPress(0)}>
                                <Text style={styles.buttonText}>FECHAR</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        backgroundColor: "#212226",
    },

    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
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

    listGoals: {
        width: width * 0.9,
        backgroundColor: "#252731",
        alignItems: "center",
        padding: 25,
        borderRadius: 15,
        flexDirection: "row", 
        justifyContent: "space-between",
        marginVertical: 5
    },

    desc: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        width: width * 0.6
    },

    frequency: {
        fontSize: 14,
        fontWeight: "300",
        color: "#9A83FF"
    },

    congrats: {
        borderRadius: 15,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "absolute",
        top: height * 0.15,
        left: width * 0.05,
        height: height * 0.7,
        width: width * 0.9,
    },

    words: {
        fontSize: 15,
        color: "#212226",
        fontWeight: "700",
        textAlign: "center"
    },

    words2: {
        fontSize: 12,
        color: "#a1a1a1",
        fontWeight: "500",
        textAlign: "center"
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
        width: '100%',
        height: height * 0.15,
        padding: 10,
        margin: 0,
        backgroundColor: "#212226"
    },

    buttonClose: {
        backgroundColor: '#9A83FF',
        borderRadius: 50,
        width: (width) * 0.5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        width: width * 0.29,
        height: height * 0.13,
        gap: 7,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#252731"
    },

    buttonSelected1: {
        backgroundColor: '#00A36C',
    },

    buttonSelected2: {
        backgroundColor: '#D94862',
    },

    buttonSelected3: {
        backgroundColor: '#7795DF',
    },

    buttonText: {
        fontSize: 12,
        textAlign: "center",
        color: "#fff",
    },

    searchContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    searchInput: {
        backgroundColor: '#fff',
        width: '80%',
        height: 40,
        borderRadius: 20,
        paddingLeft: 20,
    }
});
