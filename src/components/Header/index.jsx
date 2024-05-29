import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Modal, Animated, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTempParams } from "../../database/services/signIn"; // Importa a função getTempParams
import db from "../../database";
const { width, height } = Dimensions.get('window');

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name: initialName = "" } = route.params || {};  
  const [name, setName] = useState(initialName); // Nome do usuário

  useEffect(() => {
    // Atualiza o nome do usuário quando a rota muda
    const { name } = getTempParams();
    setName(name);
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [areasModalVisible, setAreasModalVisible] = useState(false); // Novo estado para o modal "SOBRE AS ÁREAS"
  const [appModalVisible, setAppModalVisible] = useState(false); // Novo estado para o modal "SOBRE O APP"
  const [modalWidth] = useState(new Animated.Value(0));

  const navTrophy = () => {
    Animated.timing(modalWidth, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      navigation.navigate("trophy");
    });
  };

  const navGoals = () => {
    Animated.timing(modalWidth, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      navigation.navigate("goals");
    });
  };

  const navMotivational = () => {
    Animated.timing(modalWidth, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
      navigation.navigate("motivational");
    });
  };

  const handleLogOff = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }]
    });
  };

  const toggleModal = () => {
    if (modalVisible) {
      Animated.timing(modalWidth, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start(() => setModalVisible(false));
    } else {
      Animated.timing(modalWidth, {
        toValue: width * 0.5,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setModalVisible(true));
    }
  };

  const openConfirmDrop = () => {
    setConfirmModalVisible(true);
  };

  const closeConfirmDrop = () => {
    setConfirmModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    try {
      // Certifique-se de substituir `runAsync` pelo método correto para excluir a conta no banco de dados
      await db.runAsync('DELETE FROM users WHERE name = ?', [name]);
      // Exibe um alerta de sucesso
      Alert.alert('Sucesso', 'Conta excluída com sucesso!');
      // Redefine a navegação para a tela de boas-vindas
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }]
      });
    } catch (error) {
      // Se ocorrer um erro ao excluir a conta, exibe um alerta de erro
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a conta: ' + error);
    }
  };

  const openAreasModal = () => {
    setAreasModalVisible(true);
  };

  const closeAreasModal = () => {
    setAreasModalVisible(false);
  };

  const openAppModal = () => {
    setAppModalVisible(true);
  };

  const closeAppModal = () => {
    setAppModalVisible(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleModal}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.user}>{name}</Text>
      <TouchableOpacity onPress={navTrophy}>
        <Icon name="trophy" size={30} color="#F6B933" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={toggleModal}
        >
          <Animated.View style={[styles.modalContainer, { width: modalWidth, paddingVertical: 15 }]}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.userBar} onPress={() => {}}>{name}</Text>
            <TouchableOpacity onPress={navTrophy} style={styles.bar}>
              <Text style={styles.text}>CONQUISTAS</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={navGoals} style={styles.bar}>
              <Text style={styles.text}>METAS</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={navMotivational} style={styles.bar}>
              <Text style={styles.text}>MOTIVACIONAL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openAreasModal} style={styles.bar}>
              <Text style={styles.text}>SOBRE AS ÁREAS</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={openAppModal} style={styles.bar}>
              <Text style={styles.text}>SOBRE O APP</Text>
            </TouchableOpacity>  
            <TouchableOpacity onPress={handleLogOff} style={[styles.bar, {backgroundColor: "#D94862", marginTop: 15}]}>
              <Text style={styles.text}>LOGOFF</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openConfirmDrop} style={[styles.bar, {backgroundColor: "#D94862", marginTop: 1}]}>
              <Text style={styles.text}>EXCLUIR CONTA</Text>
            </TouchableOpacity>  
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={confirmModalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={closeConfirmDrop}
        >
          <View style={styles.confirmModal}>
            <Text style={{ fontSize: 17, fontWeight: "bold", color: "#212226", marginVertical: 20 }}>CONFIRMAR EXCLUSÃO DA CONTA?</Text>
            <View style={{ flexDirection: "row", gap: 40 }}>
              <TouchableOpacity style={styles.btnDrop} onPress={handleDeleteAccount}>
                <Text style={styles.confirmDropText}>SIM</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDrop} onPress={closeConfirmDrop}>
                <Text style={styles.cancelDropText}>NÃO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={areasModalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <TouchableOpacity onPress={closeAreasModal}>
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
                <Text style={styles.saude}>SAÚDE:</Text> Crie metas para sua mente e corpo
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

      <Modal visible={appModalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={[styles.buttonText, {fontSize: 17}]}>
              <Text style={{color: "#9A83FF"}}>Daily</Text>Journey
          </Text>
          <Text style={{textAlign: "center"}}>
            Somos um aplicativo de metas, sugerimos as metas para melhorar seu estilo de vida, 
            ter bons hábitos e sucesso nas diferentes áreas!
          </Text>
          <TouchableOpacity onPress={closeAppModal}>
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
    width: width,
  },

  user: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    height: height,
    width: width * 0.5,
    backgroundColor: '#252731',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: "absolute",
    left: 0,
    top: 0
  },

  bar: {
    width: '100%',
    padding: 15,
    alignItems: "center",
  },

  userBar: {
    textTransform: "uppercase",
    color: "#fff",
    fontSize: 15,
    padding: 15,
    marginVertical: 20, 
    borderRadius: 15, 
    backgroundColor: "#212226", 
    width: '90%', 
    alignItems: "center",
    textAlign: "center"
  },

  text: {
    color: "#fff"
  },

  confirmModal: {
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
    height: height * 0.3,
    width: width * 0.9,
  },

  btnDrop: {
    width: width * 0.3,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmDropText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#D94862"
  },

  cancelDropText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#a1a1a1"
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: width,
    height: width * 0.95,
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
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
