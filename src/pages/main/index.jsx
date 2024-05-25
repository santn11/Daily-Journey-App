import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Modal, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import ContGoals from "../../components/ContGoals";
import CircleProgressBar from "../../components/Character";

const { width } = Dimensions.get('window');

export default function Main() {

  const navigation = useNavigation();

  const navGoals = () => {
    navigation.navigate("goals")
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const openModal = () => {
    setIsVisible2(true);
  }

  const closeModal = () => {
    setIsVisible2(false);
  }

  const openModal2 = () => {
    setIsVisible(true);
  }

  const closeModal2 = () => {
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#212226"
        networkActivityIndicatorVisible={true}
      />
      <Header />

      <View style={styles.body}>

        <CircleProgressBar />
        <ContGoals />
        <TouchableOpacity style={styles.button} onPress={navGoals}>
          <Text style={styles.buttonText}>VER METAS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal} style={styles.about}>
          <Text style={{ color: "#a1a1a1" }}>Sobre o app</Text>
          <Icon name="account-question" size={20} color="#a1a1a1" />
        </TouchableOpacity>

        <Modal visible={isVisible} transparent animationType="slide">
          <View style={styles.modal}>
            <TouchableOpacity onPress={closeModal}>
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

        <Modal visible={isVisible2} transparent animationType="slide">
          <View style={styles.modal}>
            <Text style={[styles.buttonText, {fontSize: 17}]}>
              <Text style={{color: "#9A83FF"}}>Daily</Text>Journey
            </Text>
            <Text style={{textAlign: "center"}}>
              Somos um aplicativo de metas, sugerimos as metas para melhorar seu estilo de vida, 
              ter bons hábitos e sucesso nas diferentes áreas!
            </Text>

            <TouchableOpacity onPress={closeModal}>
              <Icon name="close" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      {/*</ScrollView>*/}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212226",
    alignItems: "center",
  },

  body: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
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

  phrase: {
    color: "#a1a1a1",
  },

  button: {
    backgroundColor: '#9A83FF',
    borderRadius: 50,
    width: (width) * 0.5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  about: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
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
