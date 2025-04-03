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

const store = configureStore({reducer: rootReducer, devTools: true});

const {width, height} = Dimensions.get('window');

export default function App({navigation}: {navigation: any}) {
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState<any>(0);
  const [currentImage, setCurrentImage] = useState(-1);
  const [showImages, setShowImages] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false); // New state to track app readiness

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  useEffect(() => {
    (async () => {
      console.log('🚀 useEffect running...'); // Debug log

      const hasPermissions = await requestPermissionsvediio();
      if (!hasPermissions) {
        Alert.alert(
          'Permissions Denied',
          'Please enable camera and storage permissions from settings to use this feature.'
        );
      } else {
        console.log('✅ All permissions granted');
      }
    })();
  }, []);



  useEffect(() => {
    requestPermission(messaging());
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📩 Notification Opened:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App opened by Notification:', remoteMessage);
        }
      });
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
    }, 600);

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
            <NavigationContainer>
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
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
