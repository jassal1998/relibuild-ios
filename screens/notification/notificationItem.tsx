import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {AppState, PermissionsAndroid, Platform} from 'react-native';

interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
}

let notificationListeners: ((notification: Notification) => void)[] = [];

// Add listener for notifications
export const addNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners.push(listener);
};

// Remove listener for notifications
export const removeNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners = notificationListeners.filter(l => l !== listener);
};

// Request notification permission

export const requestPermission = async () => {
  // Firebase permission (works for iOS and Android both)
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Firebase permission granted.');
  }

  // Runtime permission for Android 13+
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Android 13+ notification permission granted.');
    } else {
      console.log('❌ Android 13+ notification permission denied.');
    }
  }
};
// Get FCM token
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

// Save notifications to AsyncStorage
const saveNotifications = async (notifications: Notification[]) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Load notifications from AsyncStorage
export const loadNotifications = async () => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Handle notification
export const handleNotification = async (
  remoteMessage: any,
  notifications: Notification[],
  setNotifications: (notifications: Notification[]) => void,
  setUnreadCount: (count: number) => void,
  appState: string,
) => {
  const newNotification: Notification = {
      id: Date.now().toString(),
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      read: false
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
        sound: 'default',
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

// Process notification wrapper to match Firebase API
export const processNotification = async (remoteMessage: any) => {
  const storedNotifications = await loadNotifications();
  handleNotification(
    remoteMessage,
    storedNotifications,
    () => {},
    () => {},
    AppState.currentState,
  );
};



export const initializeNotifications = async (
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
) => {
 
  await getFcmToken();

  messaging().onMessage(async remoteMessage => {
    processNotification(remoteMessage);

    const storedNotifications = await loadNotifications();
    setNotifications(storedNotifications);

    // ✅ Fix: Explicitly type 'n' as a Notification
    const unreadNotifications = storedNotifications.filter(
      (n: Notification) => !n.read,
    );
    setUnreadCount(unreadNotifications.length);
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    processNotification(remoteMessage);

    const storedNotifications = await loadNotifications();
    setNotifications(storedNotifications);

    const unreadNotifications = storedNotifications.filter(
      (n: Notification) => !n.read,
    );
    setUnreadCount(unreadNotifications.length);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        processNotification(remoteMessage);
        setUnreadCount(prevCount => prevCount + 1);
      }
    });

  // Load notifications from AsyncStorage on startup
  const storedNotifications = await loadNotifications();
  setNotifications(storedNotifications);

  // ✅ Fix: Explicitly type 'n' as a Notification
  const unreadNotifications = storedNotifications.filter(
    (n: Notification) => !n.read,
  );
  setUnreadCount(unreadNotifications.length);
};
;