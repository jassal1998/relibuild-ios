import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-reanimated';

import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📦 Background message received:', remoteMessage);

  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

 
  await notifee.displayNotification({
    title: remoteMessage.notification?.title ?? '📩 New Message',
    body: remoteMessage.notification?.body ?? 'You have a new message',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher', // make sure this icon exists
      sound: 'default',
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
