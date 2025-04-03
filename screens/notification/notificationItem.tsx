import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform, AppState} from 'react-native';

interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
}


let notificationListeners: ((notification: Notification) => void)[] = [];


export const addNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners.push(listener);
};
export const removeNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners = notificationListeners.filter(l => l !== listener);
};

export const requestPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission(); 

    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('✅ Permission Granted');
    } else if (authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('⚠️ Permission Granted (Provisional)');
    } else {
      console.log('❌ Permission Denied');
    }
  } catch (error) {
    console.error('🚨 Error requesting notification permission:', error);
  }
};

export const getFcmToken = async () => {
  try {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('✅ FCM Token:', fcmToken);
    return fcmToken || null;
  } catch (error) {
    console.error('🚨 Error getting FCM token:', error);
    return null;
  }
};


const saveNotifications = async (notifications: Notification[]) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('🚨 Error saving notifications:', error);
  }
};

export const loadNotifications = async () => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('🚨 Error loading notifications:', error);
    return [];
  }
};


export const handleNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  notifications: Notification[],
  setNotifications: (notifications: Notification[]) => void,
  setUnreadCount: (count: number) => void,
) => {
  const newNotification: Notification = {
    id: Date.now().toString(),
    title: remoteMessage.notification?.title || 'New Notification',
    body: remoteMessage.notification?.body || '',
    read: false,
  };

  notifications = [newNotification, ...notifications];
  await saveNotifications(notifications);
  setUnreadCount(notifications.length);
  notificationListeners.forEach(listener => listener(newNotification));

 
  if (AppState.currentState === 'active') {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
    }
    await notifee.displayNotification({
      title: newNotification.title,
      body: newNotification.body,
      android: {channelId: 'default', sound: 'default'},
      ios: {sound: 'default'},
    });
  }
};

export const initializeNotifications = async (
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
) => {
  await requestPermission();
  await getFcmToken();


  messaging().onMessage(async remoteMessage => {
    const storedNotifications = await loadNotifications();
    handleNotification(
      remoteMessage,
      storedNotifications,
      setNotifications,
      setUnreadCount,
    );
  });


  messaging().setBackgroundMessageHandler(async remoteMessage => {
    const storedNotifications = await loadNotifications();
    handleNotification(
      remoteMessage,
      storedNotifications,
      setNotifications,
      setUnreadCount,
    );
  });


  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        const storedNotifications = loadNotifications();
        storedNotifications.then(notifs =>
          handleNotification(
            remoteMessage,
            notifs,
            setNotifications,
            setUnreadCount,
          ),
        );
      }
    });


  const storedNotifications = await loadNotifications();
  setNotifications(storedNotifications);
  setUnreadCount(
    storedNotifications.filter((n: {read: any}) => !n.read).length,
  );
};
