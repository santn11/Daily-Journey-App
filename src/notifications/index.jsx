import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    scheduleDailyNotifications();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Seu token de push do expo: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Título: {notification && notification.request.content.title} </Text>
        <Text>Corpo: {notification && notification.request.content.body}</Text>
      </View>
    </View>
  );
}

async function scheduleDailyNotifications() {
    // Notificação diária às 9:30 da manhã
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "DailyJourney",
        body: 'Metas te esperam',
        color: "#252731", // Cor de fundo da notificação
        android: {
          color: "#252731", // Cor de fundo da notificação para Android
        },
        titleColor: "#9A83FF", // Cor do título da notificação
        bodyColor: "#fff", // Cor do corpo da notificação
      },
      trigger: {
        hour: 9,
        minute: 30,
        repeats: true,
      },
    });
  
    // Notificação diária às 9:30 da noite
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "DailyJourney",
        body: 'Estamos te esperando pra ver suas metas conquistadas',
        color: "#252731", // Cor de fundo da notificação
        android: {
          color: "#252731", // Cor de fundo da notificação para Android
        },
        titleColor: "#9A83FF", // Cor do título da notificação
        bodyColor: "#fff", // Cor do corpo da notificação
      },
      trigger: {
        hour: 21,
        minute: 45,
        repeats: true,
      },
    });
  }  

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Falha ao obter o token para notificações push!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('É necessário usar um dispositivo físico para notificações push');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
