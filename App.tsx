import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  AppState,
  Alert,
} from 'react-native';
import {StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {configureStore} from '@reduxjs/toolkit';
import {Provider, useDispatch} from 'react-redux';
import rootReducer from './slices';
import MainNavigator from './navigation/MainNavigator';
import Orientation from 'react-native-orientation-locker';
import messaging, {requestPermission} from '@react-native-firebase/messaging';
import * as Animatable from 'react-native-animatable';
import './TextConfig';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {initializeNotifications} from './screens/notification/notificationItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestPermissionsvediio } from './screens/Submit-Query/submitQuery';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigate, navigationRef } from './navigationservice';

const store = configureStore({reducer: rootReducer, devTools: true});

const {width, height} = Dimensions.get('window');

const App = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState<any>(0);
  const [currentImage, setCurrentImage] = useState(-1);
  const [showImages, setShowImages] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false); 

  useEffect(() => {
    const init = async () => {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    };
  
    init();
  
    // Handle foreground push notification
    const unsubscribeMessage = messaging().onMessage(async remoteMessage => {
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        android: {
          channelId: 'default',
          sound: 'default',
          pressAction: { id: 'default' }, // VERY IMPORTANT
        },
        ios: { sound: 'default' },
      });
    });
  
    // Handle click on notification (Foreground)
    const unsubscribeForeground = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        navigate('Notification');
      }
    });
  
    // Handle click on notification (Background / Killed)
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        navigate('Notification');
      }
    });
  
    // Handle cold start launch from notification
    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        navigate('Notification');
      }
    });
  
    return () => {
      unsubscribeMessage();
      unsubscribeForeground();
    };
  }, []);






  const loadingTexts = [
    'Hire Contractors',
    'Explore Properties',
    'Escrow service',
    'and more',
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex: number) => {
        if (prevIndex < loadingTexts.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(textInterval);
          setLoading(false);
          setShowImages(true);
          return prevIndex;
        }
      });
    }, 1000);

    return () => clearInterval(textInterval);
  }, []);

  const handleAnimationEnd = () => {
    setShowImages(false);
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  return (
    <Provider store={store}>
      <StatusBar />
      {loading ? (
        <View style={styles.container}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Animatable.Text
            animation="fadeIn"
            duration={1000}
            style={styles.loadingText}
            key={currentTextIndex}>
            {loadingTexts[currentTextIndex]}
          </Animatable.Text>
        </View>
      ) : (
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <NavigationContainer  ref={navigationRef}>
              <MainNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f5272',
    position: 'relative',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // Adjust the size of the logo
    width: 190,
    height: 80,
    marginBottom: 5, // Add space between logo and text
  },
  loadingText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    top: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
export default App;