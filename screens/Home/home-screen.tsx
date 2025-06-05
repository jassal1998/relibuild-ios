import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import SearchSection from '../../GlobalComponents/search';
import ContractorSection from './components/contractor';
import BannerSection from './components/banner';
import Services from './components/homeServices';
import CoursalBanner from '../../GlobalComponents/coursel-banner';
import { useDispatch } from 'react-redux';
import { getContractor, getServices } from '../../slices/thunk';
import NearByContractors from './components/NearByContractors';
import Properties from './components/properties';
import Serach from '../../GlobalComponents/serach';
import { requestPermissionsvediio } from '../Submit-Query/submitQuery';
import messaging from '@react-native-firebase/messaging';

const { width } = Dimensions.get('screen');

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const hasPermissions = await requestPermissionsvediio();
      if (!hasPermissions) {
        // Alert.alert('Permission Required', 'Please allow camera, microphone, and storage permissions to continue.');
      } else {
        console.log('✅ All permissions granted');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const askNotificationPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('✅ Firebase messaging permission granted');
        }

        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('✅ Android POST_NOTIFICATIONS permission granted');
          } else {
            console.log('❌ Android POST_NOTIFICATIONS permission denied');
          }
        }
      } catch (err) {
        console.log('❌ Permission error:', err);
      }
    };

    askNotificationPermission();

    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('📩 Notification Opened:', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('🚀 App opened by Notification:', remoteMessage);
        }
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        dispatch(getContractor()),
        dispatch(getServices()),
        // Add more API calls here if needed
      ]);
    } catch (e) {
      console.log('❌ Data fetch error:', e);
      Alert.alert('Error', 'Something went wrong while loading data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInitialData();
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2f5272" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2f5272']}
          />
        }>
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: width }}>
            <Serach loading={loading} />
            <CoursalBanner loading={loading} />
            <Services loading={loading} />
            <ContractorSection loading={loading} />
            <BannerSection />
            <NearByContractors />
            <Properties />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
