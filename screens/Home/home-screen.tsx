import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import SearchSection from '../../GlobalComponents/search';
import ContractorSection from './components/contractor';
import BannerSection from './components/banner';
import Services from './components/homeServices';
import CoursalBanner from '../../GlobalComponents/coursel-banner';
import {useDispatch} from 'react-redux';
import {getContractor, getServices} from '../../slices/thunk';
import NearByContractors from './components/NearByContractors';
import Properties from './components/properties';
import Serach from '../../GlobalComponents/serach';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import Placeholder from './components/placeholder';

const {width, height} = Dimensions.get('screen');

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: any = useDispatch();

  useEffect(() => {
    getContractors();
  }, []);

  const getContractors = async () => {
    await dispatch(getContractor()); // Assuming getContractor returns a promise
    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true); // Start the refreshing state
    getContractor(); // Fetch contractors

    // Set a timer to stop the refreshing after a specified time (e.g., 3 seconds)
    setTimeout(() => {
      setRefreshing(false); // Stop refreshing after 3 seconds
    }, 3000); // 3000ms = 3 seconds
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#2f5272" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: 'white',
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2f5272']}
          />
        }>
        <View style={{alignItems: 'center'}}>
          <View style={{width: width / 1}}>
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
