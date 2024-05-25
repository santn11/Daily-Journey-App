import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useRoute } from '@react-navigation/native';

const CircleProgressBar = () => {
  const route = useRoute();
  const { xp } = route.params || {};

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={270}
        width={7}
        fill={100}
        tintColor="" 
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
              style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'flex-end'}}
              resizeMode="contain"
            />
          </View>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.xp}>XP: {xp}0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 15
  },

  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerCircle: {
    width: 235,
    height: 235,
    borderRadius: 117,
   /* backgroundColor: '#252731',*/
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  xp: {
    fontSize: 12,
    fontWeight: "300",
    color: "#9A83FF"
  }
});

export default CircleProgressBar;
