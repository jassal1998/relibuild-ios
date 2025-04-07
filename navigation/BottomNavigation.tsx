import React, { useEffect, useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from '@rneui/themed';
// import HomeScreen from '../screens/Home/home-screen';
//import DashboardScreen from "../screens/Dashboard";
// import ServicesScreen from '../screens/Services';
import {GlobalStyles} from '../constants/style';
import {useWindowDimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ServicesScreen from '../screens/Services/ServicesScreen';
import HomeScreen from '../screens/Home/home-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { initializeNotifications } from '../screens/notification/notificationItem';
const BottomTabs = createBottomTabNavigator();

function BottomNavigation() {
  const navigation: any = useNavigation();
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const [unreadCount, setUnreadCount] = useState<number>(0);
const [notifications, setNotifications] = useState<any[]>([]);
 
// useEffect(() => {
//   const initialize = async () => {
//     console.log('Starting Notification Initialization...');
//     await initializeNotifications(setUnreadCount, setNotifications);
//   };

//   initialize(); // ✅ Safe async call
// }, []); 
  return (
    <BottomTabs.Navigator
      screenOptions={({route, navigation}: {route: any; navigation: any}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.white},
        headerTintColor: GlobalStyles.colors.primary,
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.white,

          height: 80,
          tabBarStyle: style.tabBar,
        },
        tabBarActiveTintColor: GlobalStyles.colors.primary,
        headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'center',
        headerTitle: () => (
          <Image
            source={require('../assets/images/relibuild.png')}
            style={style.headerImage}
          />
        ),

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={style.iconContainerLeft}>
            <MaterialIcons name="menu" size={20} color="grey" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={style.iconContainerRight}>
              <View>
                <Icon
                  name="notifications"
                  size={20}
                  color="grey"
                  type="material"
                />
                {unreadCount > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: -5,
                      backgroundColor: 'red',
                      borderRadius: 20,
                      minWidth: 20, 
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 5, 
                    }}>
                    <Text style={{color: 'white', fontSize: 10}}>
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{top: 8, right: 10}}></TouchableOpacity>
          </View>
        ),
      })}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: {color: 'white'},
          title: 'Home',
          tabBarLabel: '',
          tabBarIcon: ({focused, size}: {focused: any; size: any}) => (
            <Icon
              color={
                focused
                  ? GlobalStyles.colors.lightGrey
                  : GlobalStyles.colors.secondary
              }
              name="home"
              containerStyle={[
                GlobalStyles.iconContainerStyle,
                focused
                  ? {backgroundColor: GlobalStyles.colors.primary, top: 10}
                  : {top: 10},
              ]}
              iconStyle={{padding: 0, margin: 0}}
              size={20}
              type="material"
            />
          ),
        }}
      />
      {/* <BottomTabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ focused, size }) => (
            <Icon
              color={
                focused
                  ? GlobalStyles.colors.white
                  : GlobalStyles.colors.secondary
              }
              containerStyle={[
                GlobalStyles.iconContainerStyle,
                focused ? { backgroundColor: GlobalStyles.colors.primary } : {},
              ]}
              name="dashboard"
              size={size}
              type="material"
            />
          ),
        }}
      /> */}
      <BottomTabs.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          headerShown: true,

          tabBarLabel: '',
          tabBarLabelStyle: {color: 'white'},
          tabBarIcon: ({focused, size}: {focused: any; size: any}) => (
            <Icon
              color={
                focused
                  ? GlobalStyles.colors.white
                  : GlobalStyles.colors.secondary
              }
              containerStyle={[
                GlobalStyles.iconContainerStyle,
                focused
                  ? {backgroundColor: GlobalStyles.colors.primary, top: 10}
                  : {top: 10},
              ]}
              iconStyle={{padding: 0, margin: 0}}
              name="settings-suggest"
              size={20}
              type="material"
            />
          ),

          headerStyle: {
            // borderBottomLeftRadius: 30,
            backgroundColor: '#325573',
            // borderBottomRightRadius: 30,
            height: 100,
          },
          headerTitleStyle: {color: 'white'},
          headerTitle: 'Services',
          headerLeft: () => null,
          headerRight: () => null,
        }}
      />
    </BottomTabs.Navigator>
  );
}
const style = StyleSheet.create({
  iconContainerRight: {
    marginRight: 15, // Adjust for right side
    padding: 8, // Padding to make the icon's container larger
    backgroundColor: GlobalStyles.colors.white, // Background color for round shape
    borderBottomRightRadius: 30, // Round bottom-right corner
  },
  iconContainerLeft: {
    marginLeft: 15, // Adjust for left side
    padding: 8, // Padding to make the icon's container larger
    backgroundColor: GlobalStyles.colors.white, // Background color for round shape
    borderBottomLeftRadius: 30, // Round bottom-left corner
  },
  tabBar: {
    backgroundColor: GlobalStyles.colors.white,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: -2},
    shadowRadius: 8,
  },
  headerImage: {
    resizeMode: 'contain',
  },
});

export default BottomNavigation;
