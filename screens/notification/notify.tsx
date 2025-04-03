import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, AppState, TouchableOpacity} from 'react-native';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, onMessage, setBackgroundMessageHandler, getInitialNotification } from '@react-native-firebase/messaging';
import {
  requestPermission,
  getFcmToken,
 
} from '../notification/notificationItem';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
}

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [appState, setAppState] = useState(AppState.currentState);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Request permission and get FCM token
    requestPermission();
    getFcmToken();

    // // Load stored notifications
    // loadNotifications().then(setNotifications);

    const app = getApp();
    const messaging = getMessaging(app);

    // Listen for foreground messages
    const unsubscribeOnMessage = onMessage(messaging, remoteMessage => {
      // handleNotification(remoteMessage, notifications, setNotifications, setUnreadCount, );
    });

    // Handle background messages (async callback to return a promise)
    setBackgroundMessageHandler(messaging, async remoteMessage => {
      // await handleNotification(remoteMessage, notifications, setNotifications, setUnreadCount, );
    });

    // Check if app was opened via a notification
    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) {
        // handleNotification(remoteMessage, notifications, setNotifications, setUnreadCount, );
      }
    });

    return () => {
      unsubscribeOnMessage();
    };
  }, [appState, notifications]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', setAppState);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    const updatedNotifications = notifications.map(n => ({...n, read: true}));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  // Mark a single notification as read
  const markAsRead = async (id: string) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.map(n =>
        n.id === id ? {...n, read: true} : n,
      );
      const unreadNotifications = updatedNotifications.filter(n => !n.read);
      setUnreadCount(unreadNotifications.length);
      AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  // Delete a notification
  const deleteNotification = async (id: string) => {
    setNotifications(prevNotifications => {
      const updatedNotifications = prevNotifications.filter(n => n.id !== id);
      const unreadNotifications = updatedNotifications.filter(n => !n.read);
      setUnreadCount(unreadNotifications.length);
      AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
      return updatedNotifications;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Notifications ({unreadCount})</Text>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.notificationCard, item.read && styles.readNotification]}>
            <TouchableOpacity style={styles.notificationContent} onPress={() => markAsRead(item.id)}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationBody}>{item.body}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteNotification(item.id)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noNotification}>No notifications yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  markAllText: {
    fontSize: 14,
    color: 'blue',
  },
  notificationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationBody: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  noNotification: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
  readNotification: {
    backgroundColor: '#f0f0f0',
  },
});
