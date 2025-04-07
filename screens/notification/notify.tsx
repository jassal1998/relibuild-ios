import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  AppState,
  TouchableOpacity,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  requestPermission,
  getFcmToken,
  loadNotifications,
  handleNotification,
  initializeNotifications,
  processNotification,
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
    requestPermission();
    getFcmToken();

    initializeNotifications(setUnreadCount, setNotifications);

    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      if (AppState.currentState === 'active') {
        processNotification(remoteMessage);
        const storedNotifications = await loadNotifications();
        setNotifications(storedNotifications);
        setUnreadCount(storedNotifications.filter((n: { read: any; }) => !n.read).length);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      await AsyncStorage.setItem('lastNotification', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
     
      }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // navigation.navigate('Notification');
        }
      });

    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });

    return () => {
      unsubscribeOnMessage();
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  const markAllAsRead = async () => {
    const updated = notifications.map(n => ({...n, read: true}));
    setNotifications(updated);
    setUnreadCount(0);
    await AsyncStorage.setItem('notifications', JSON.stringify(updated));
  };

  const markAsRead = async (id: string) => {
    const updated = notifications.map(n =>
      n.id === id ? {...n, read: true} : n,
    );
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    await AsyncStorage.setItem('notifications', JSON.stringify(updated));
  };

  const deleteNotification = async (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.read).length);
    await AsyncStorage.setItem('notifications', JSON.stringify(updated));
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
          <View
            style={[
              styles.notificationCard,
              item.read && styles.readNotification,
            ]}>
            <TouchableOpacity
              style={styles.notificationContent}
              onPress={() => markAsRead(item.id)}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationBody}>{item.body}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteNotification(item.id)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noNotification}>No notifications yet</Text>
        }
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
