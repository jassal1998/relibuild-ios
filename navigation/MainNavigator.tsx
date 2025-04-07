import React, {useState, useEffect} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import WelcomeScreen from '../screens/Auth/welcome';
import HomeScreen from '../screens/Home/home-screen';
import ContractorScreen from '../screens/Contractor/indexContractor';
import PropertyViewScreen from '../screens/Property-View/propery';
import ProfileScreen from '../screens/Profile/Profile';
import ServicesScreen from '../screens/Services/ServicesScreen';
//import DashboardScreen from "../screens/Dashboard";
import LoginScreen from '../screens/Auth/login';
import RegisterScreen from '../screens/Auth/register';
import OtpScreen from '../screens/Auth/otp';
import SubmitQueryScreen from '../screens/Submit-Query/submitQuery';
import SelectContractorsScreen from '../screens/Submit-Query/component/contractors';
import LeadOverview from '../screens/Leads-overview/LeadsOverview';

import MyDrawer from './DrawerContent';
import {GlobalStyles} from '../constants/style';
import {useSelector, useDispatch} from 'react-redux';
import {checkAuthToken} from '../slices/thunk';
import ThankyouScreen from '../screens/Submit-Query/component/Thankyou';
import Leads from '../screens/Leads/lead';

import Notification from '../screens/notification/notify';
import AccountDelete from '../screens/Account-Delete/indexaccount';
import Help from '../screens/Help/indexhelp';
import Escrow from '../screens/Help/Escrow';
import Contractorview from '../screens/Contractors-Screen/contractscreen';
import AllProperties from '../screens/Home/components/Allproperties';

import AllPropertie from '../screens/Home/components/Allproperties';
import OnboardingScreen from '../screens/onBorading/OnBorading';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Avatar, Icon } from 'react-native-elements';
import Create from '../contract/create';
import ContractFillPage from '../contract/contract';
import Milestones from '../contract/projectmilestones';
import Details from '../contract/details';
import Homeowner from '../contract/Homeowner';
import Finish from '../contract/finish';
import ProfileSetting from '../contract/profile';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Notification: undefined;
};
interface MainNavigatorProps {}

const MainNavigator: React.FC<MainNavigatorProps> = () => {
  const dispatch: any = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(checkAuthToken());
  }, []);



  const loginStatus = useSelector((state: any) => state.Login.isUserLogout);
  console.log(loginStatus, 'loginstatus main');
  const headerOptions: StackNavigationOptions = {
    headerStyle: {backgroundColor: GlobalStyles.colors.primary, height: 131},
    headerTintColor: GlobalStyles.colors.white,
    headerTitleAlign: 'center',
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={headerOptions}
        initialRouteName="OnboardingScreen">
        {!loginStatus ? (
          <>
            <Stack.Screen
              name="Home"
              component={MyDrawer}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={MyDrawer}
              options={{headerShown: false}}
            />
          </>
        )}
        <Stack.Screen
          name="Contractor"
          component={ContractorScreen}
          options={({route, navigation}: {route: any; navigation: any}) => {
            ``;
            const params: any = route.params;
            const contractorData = params?.data;
            console.log('Params data: ', params.data);
            console.log('Contractor Data yes: ', contractorData);
            const combinedName = `${params?.data.firstName || ''} ${
              contractorData?.user_first_name || ''
            }`.trim();
            console.log('Combined Name: ', combinedName);
            const profileLabel = contractorData?.ua_profile
              ? JSON.parse(contractorData.ua_profile).label
              : '';
            const combinedProfile = `${
              params.data?.profile || ''
            } ${profileLabel}`;

            return {
              headerStyle: {
                // borderBottomLeftRadius: 50,
                backgroundColor: '#325573',
                // borderBottomRightRadius: 50,
                height: 130,
              },
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '700',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {combinedName}
                    </Text>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '500',
                        fontSize: 10,
                        marginTop: 5,
                        textAlign: 'center',
                      }}>
                      {combinedProfile || 'No profile information available'}
                    </Text>
                  </View>
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
                  
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // Your action here
                  }}
                  style={{marginRight: 20}}>
                  <View style={{borderRadius: 20, overflow: 'hidden'}}>
                  <Avatar
    rounded
    source={{
      uri: contractorData?.ua_profile_pic || contractorData?.img || 'https://res.cloudinary.com/dvnxszfqa/image/upload/v1718022473/contractor-relibuild_his9if.jpg',
    }}
    size="medium"
  />
                  </View>
                </TouchableOpacity>
              ),
              gestureEnabled: false,
            };
          }}
        />

        {/*Realestate full property screen*/}
        <Stack.Screen
          name="propertyView"
          component={PropertyViewScreen}
          options={({route, navigation}: {route: any; navigation: any}) => {
            console.log(route, 'dmkmdm');
            const params: any = route.params;
            return {
              headerStyle: {
                // borderBottomLeftRadius: 30,
                backgroundColor: '#325573',
                // borderBottomRightRadius: 30,
                height: 130,
              },
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '700',
                        fontSize: 16,
                        textAlign: 'center',
                      }}>
                      {params.data?.rep_title}
                    </Text>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '500',
                        fontSize: 12,
                        marginTop: 5,
                        textAlign: 'center',
                      }}>
                      {params.data?.rep_state}
                    </Text>
                  </View>
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 20,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
                    
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // Your action here
                  }}
                  style={{marginRight: 10}}>
                  <View style={{borderRadius: 20, overflow: 'hidden'}}>
                    <Avatar
                      rounded
                      source={{
                        uri: JSON.parse(params.data?.rep_images)[0],
                      }}
                      size="medium"
                    />
                  </View>
                </TouchableOpacity>
              ),
              gestureEnabled: false,
            };
          }}
        />
        {/*Real estatfull property ends here */}

        <Stack.Screen
          name="Leads"
          component={Leads}
          options={({route, navigation}: {route: any; navigation: any}) => {
            const params: any = route.params;
            return {
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '700',
                        fontSize: 22,
                        textAlign: 'center',
                      }}>
                      My Projects
                    </Text>
                  </View>
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
                 
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),

              gestureEnabled: false,
            };
          }}
        />

        {/* Account Delete  */}
        <Stack.Screen
          name="DeleteAccount"
          component={AccountDelete}
          options={({route, navigation}: {route: any; navigation: any}) => {
            const params: any = route.params;
            return {
              headerTitle: () => (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text
                      allowFontScaling={true}
                      maxFontSizeMultiplier={1}
                      style={{
                        color: GlobalStyles.colors.white,
                        fontWeight: '700',
                        fontSize: 22,
                        textAlign: 'center',
                      }}>
                      Account Delete
                    </Text>
                  </View>
                </View>
              ),
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
                   
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),

              gestureEnabled: false,
            };
          }}
        />

        {/* Account Delete */}

        <Stack.Screen
          name="Notification"
          component={Notification}
          options={({route, navigation}: {route: any; navigation: any}) => {
            const params: any = route.params;
            return {
              headerTitle: () => (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={true}
                    maxFontSizeMultiplier={1}
                    style={{
                      color: GlobalStyles.colors.white,
                      fontWeight: '700',
                      fontSize: 22,
                    }}>
                    Notifications
                  </Text>
                </View>
              ),

              headerStyle: {
                height: 130,
                backgroundColor: GlobalStyles.colors.primary,
                // borderBottomLeftRadius: 30, // Bottom-left radius
                // borderBottomRightRadius: 30, // Bottom-right radius
                overflow: 'hidden', // Ensure the content respects the border radius
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 10,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
               
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),
              gestureEnabled: false, // Disable swipe gestures
            };
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerShown: false,
            headerTitle: '',
            headerStyle: {backgroundColor: '#fff', borderWidth: 0},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: '#E8ECF4',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
               
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerTitle: '',
            headerShown: false,
            headerStyle: {backgroundColor: '#fff', borderWidth: 0},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: '#E8ECF4',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                 
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerShown: false,
            headerTitle: '',
            headerStyle: {backgroundColor: '#fff', borderWidth: 0},
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: '#E8ECF4',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                 
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="SubmitQuery"
          component={SubmitQueryScreen}
          options={({route, navigation}: {route: any; navigation: any}) => {
            const params: any = route.params;
            return {
              headerTitle: () => (
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    allowFontScaling={false}
                    maxFontSizeMultiplier={1}
                    style={{
                      color: GlobalStyles.colors.white,
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    {params.data?.serviceName}
                  </Text>
                </View>
              ),
              headerStyle: {
                height: 130,
                backgroundColor: GlobalStyles.colors.primary,
                // borderBottomLeftRadius: 30, // Bottom-left radius
                // borderBottomRightRadius: 30, // Bottom-right radius
                overflow: 'hidden', // Ensure the content respects the border radius
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                    marginLeft: 15,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Icon
               
                    name="chevron-left"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    // Your action here
                  }}
                  style={{marginRight: 10}}>
                  <View style={{borderRadius: 20, overflow: 'hidden'}}>
                 
                    {params.contractorId != null &&
                    
                    params.contractorId != '' ? (
                      
                      <Avatar
                        rounded
                        source={{
                          uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        size="medium"
                      />
                    ) : (
                      <Avatar
                        rounded
                        source={{
                          uri: `${params.serviceBgImg}`,
                        }}
                        size="medium"
                      />
                    )}
                  </View>
                  
                </TouchableOpacity>
                
              ),
              gestureEnabled: false, // Disable swipe gestures
            };
          }}
        />

        <Stack.Screen
          name="SelectContractors"
          component={SelectContractorsScreen}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerTitle: () => (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={true}
                  maxFontSizeMultiplier={1}
                  style={{
                    color: GlobalStyles.colors.white,
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  Select contractor
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 15,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
          
                  name="chevron-left"
                  size={24}
                  color="white"
                />{' '}
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="leadOverview"
          component={LeadOverview}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerTitle: () => (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={true}
                  maxFontSizeMultiplier={1}
                  style={{
                    color: GlobalStyles.colors.white,
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  Lead Overview
                </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="Thankyou"
          component={ThankyouScreen}
          options={({route, navigation}: {route: any; navigation: any}) => ({
            headerTitle: () => (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  allowFontScaling={true}
                  maxFontSizeMultiplier={1}
                  style={{
                    color: GlobalStyles.colors.white,
                    fontWeight: '700',
                    fontSize: 22,
                  }}>
                  Thank You
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{
            headerTitle: 'Search',
            headerBackTitle: '',
            // headerBackTitleVisible: false,
            headerStyle: {
              // borderBottomLeftRadius: 30,
              backgroundColor: '#325573',
              // borderBottomRightRadius: 30,
              height: 130,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 20,
                  borderWidth: 1,

                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
             
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Escrow" component={Escrow} />
        <Stack.Screen
          name="Contractorview"
          component={Contractorview}
          options={{
            headerTitle: 'Contractor',
            headerBackTitle: '',
            // headerBackTitleVisible: false,
            headerStyle: {
              // borderBottomLeftRadius: 30,
              backgroundColor: '#325573',
              // borderBottomRightRadius: 30,
             height: 130
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 20,
                  borderWidth: 1,

                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AllPropertie"
          component={AllPropertie}
          options={{
            headerTitle: 'All Propertie',
            headerStyle: {
              // borderBottomLeftRadius: 30,
              backgroundColor: '#325573',
              // borderBottomRightRadius: 30,
              height: 120,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 15,
                  borderWidth: 1,

                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          }}
        />
        {/* <Stack.Screen name="Helpbar" component={Helpbar}/> */}
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{
            headerTitle: 'Contracts',
            headerStyle: {
              // borderBottomLeftRadius: 20,
              backgroundColor: '#325573',
              // borderBottomRightRadius: 30,
              height: 130,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 15,
                  borderWidth: 1,

                  borderColor: 'white',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Icon
                
                  name="chevron-left"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="ContractFillPage" component={ContractFillPage} 
        options={{headerTitle: 'Project Detail',  headerBackTitle: '' }}/>
        <Stack.Screen name='Milestones' component={Milestones}   options={{   headerBackTitle: '' }} />
        <Stack.Screen name='Details' component={Details}
        options={{headerTitle: 'Sub Contractors',  headerBackTitle: '' }}/>
        <Stack.Screen name='Homeowner' component={Homeowner}  options={{   headerBackTitle: '' }}/>
        <Stack.Screen name='Finish' component={Finish}  options={{   headerBackTitle: '' }}/>
        <Stack.Screen name='ProfileSetting' component={ProfileSetting}   options={{   headerBackTitle: '' }}/>
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default MainNavigator;
