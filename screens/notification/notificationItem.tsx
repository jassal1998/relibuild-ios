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

// Add listener
export const addNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners.push(listener);
};

// Remove listener
export const removeNotificationListener = (
  listener: (notification: Notification) => void,
) => {
  notificationListeners = notificationListeners.filter(l => l !== listener);
};

// Request permission
export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Firebase permission granted.');
  }

  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('✅ Android 13+ notification permission granted.');
    } else {
      console.log('❌ Android 13+ notification permission denied.');
    }
  }
};

// Get FCM Token
export const getFcmToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};

// Save notifications
const saveNotifications = async (notifications: Notification[]) => {
  try {
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    console.error('Error saving notifications:', error);
  }
};

// Load notifications
export const loadNotifications = async () => {
  try {
    const stored = await AsyncStorage.getItem('notifications');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading notifications:', error);
    return [];
  }
};

// Handle incoming notification
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
    read: false,
  };

  notifications = [newNotification, ...notifications];
  await saveNotifications(notifications);
  setNotifications(notifications);

  const unreadNotifications = notifications.filter((n) => !n.read);
  setUnreadCount(unreadNotifications.length);

  notificationListeners.forEach((listener) => listener(newNotification));

  if (appState === 'active') {
    // Android: create channel first
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
    }

    // ✅ Show notification manually (Android + iOS both)
    await notifee.displayNotification({
      title: newNotification.title,
      body: newNotification.body,
      android: {
        channelId: 'default',
        sound: 'default',
        pressAction: { id: 'default' }, // for tap actions
      },
      ios: {
        sound: 'default',
      },
    });
  }
};

// Process wrapper
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

// Initialize Notifications
export const initializeNotifications = async (
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>,
) => {
  await getFcmToken();

  messaging().onMessage(async (remoteMessage) => {
    await processNotification(remoteMessage);

    const stored = await loadNotifications();
    setNotifications(stored);

    const unread = stored.filter((n: { read: any; }) => !n.read);
    setUnreadCount(unread.length);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await processNotification(remoteMessage);

    const stored = await loadNotifications();
    setNotifications(stored);

    const unread = stored.filter((n: { read: any; }) => !n.read);
    setUnreadCount(unread.length);
  });

  messaging().getInitialNotification().then(async (remoteMessage) => {
    if (remoteMessage) {
      await processNotification(remoteMessage);

      const stored = await loadNotifications();
      setNotifications(stored);

      const unread = stored.filter((n: { read: any; }) => !n.read);
      setUnreadCount(unread.length);
    }
  });

  const stored = await loadNotifications();
  setNotifications(stored);

  const unread = stored.filter((n: { read: any; }) => !n.read);
  setUnreadCount(unread.length);
};
