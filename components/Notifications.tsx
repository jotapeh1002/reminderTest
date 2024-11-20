import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef } from 'react';

type NotificationAction = {
  identifier: string;
  buttonTitle: string;
  options: {
    isDestructive: boolean;
    isAuthenticationRequired: boolean;
  };
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const responseListener = useRef();

useEffect(() => {

  registerForPushNotificationsAsync();

}, []);

const registerForPushNotificationsAsync = async (): Promise<void> => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Falha ao obter permissão para notificações!');
    return;
  }
};

export const agendarNotificacao = async ( nedicament:string,quantity:string ): Promise<void> => {
  try {

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de tomar seu Medicamento!",
        body: `Medicamento: ${nedicament} Quantidade: ${quantity}`,
        data: { data: `` },
      },
      trigger: {
        seconds: 2,
        repeats: false,
      }as Notifications.TimeIntervalTriggerInput,
    });
  } catch (error) {
    console.error('Erro ao agendar notificação:', error);
    alert('Erro ao agendar notificação');
  }
};