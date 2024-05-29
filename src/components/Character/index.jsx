import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { getTempParams } from '../../database/services/signIn';
import db from '../../database';

const { width } = Dimensions.get('window');

// Função para buscar o XP do usuário no banco de dados
const fetchCurrentXP = async (name) => {
  try {
    console.log('Buscando XP para o usuário:', name); // Log para verificação
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

// Função para buscar metas concluídas do usuário no banco de dados
const fetchCurrentMetasConc = async (name) => {
  try {
    console.log('Buscando metas concluídas para o usuário:', name);
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
    console.error('Erro ao buscar metas concluídas do usuário:', error);
    throw error;
  }
};

const CircleProgressBar = () => {
  const route = useRoute();
  const { name: initialName = '', xp: initialXP = 0 } = route.params || {};
  const [name, setName] = useState(initialName);
  const [currentXP, setCurrentXP] = useState(initialXP);
  const [currentMetasConc, setCurrentMetasConc] = useState(0);

  const updateXPAndMetas = async () => {
    try {
      const newXP = await fetchCurrentXP(name);
      setCurrentXP(newXP);
      const newMetasConc = await fetchCurrentMetasConc(name);
      setCurrentMetasConc(newMetasConc);
    } catch (error) {
      console.error('Erro ao atualizar o XP e metas concluídas do usuário:', error);
    }
  };

  useEffect(() => {
    // Atualiza o nome, XP e metas concluídas do usuário quando o componente é montado
    const { name, xp } = getTempParams();
    setName(name);
    setCurrentXP(xp);
    console.log('Nome do usuário:', name);
    console.log('XP inicial do usuário:', xp);
    updateXPAndMetas();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateXPAndMetas();
    }, [name])
  );

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={270}
        width={7}
        fill={100}
        tintColor="#9A83FF"
        backgroundColor="#9A83FF"
        rotation={0}
        lineCap="round"
        duration={1000}
        style={styles.circle}
      >
        {(fill) => (
          <View style={styles.innerCircle}>
            <Image
              source={require('../../img/character.png')}
              style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-end' }}
              resizeMode="contain"
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={{ flexDirection: 'row', width: width * 0.6, justifyContent: 'space-between', alignContent: 'center' }}>
        <Text style={styles.xp}>XP: {currentXP}</Text>
        <Text style={styles.xp}>Metas concluídas: {currentMetasConc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 15,
  },

  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    width: 235,
    height: 235,
    borderRadius: 117,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  xp: {
    fontSize: 12,
    fontWeight: '300',
    color: '#9A83FF',
  },
});

export default CircleProgressBar;
