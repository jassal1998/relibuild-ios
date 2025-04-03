import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Avatar, Icon} from '@rneui/themed';
import {GlobalStyles} from '../constants/style';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import {logoutUser} from '../slices/thunk';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
// import 'core-js/stable/atob';
import 'react-native-gesture-handler';
import { setToken, setUserID } from '../contract/utility/redux/profile';


interface CustomDrawerContentProps {
  navigation: any;
  route: any;
}
interface MyDrawerProps {
  route: any;
}

interface JwtPayload {
  userType: string;
}

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  navigation,
  route,
}) => {
  const [userData, setUserData] = useState<any>([]);
  const dispatch: any = useDispatch();
  const loginStatus = useSelector((state: any) => state.Login.isUserLogout);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleSettingClick = () => {
    setShowDeleteButton(prev => !prev); // Toggle the visibility
  };

  const handleLogout = () => {
    dispatch(logoutUser(navigation));
    dispatch(setToken(null));
    dispatch(setUserID(null));
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    try {
      let authUser = await AsyncStorage.getItem('authUser');
      let decoded: any = '';
      if (authUser) {
        decoded = jwtDecode<JwtPayload>(authUser);
        setUserData(decoded);
        
      } else {
      }
    } catch (error) {
      console.error('Error decoded JWT token:', error);
    }
  };
  console.log(userData, 'hh');
  return (
    <><DrawerContentScrollView style={{ flex: 1 }}>
      {userData.length ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            borderBottomColor: '#EBEBEB',
            borderBottomWidth: 1,
            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
          }}>
          <Avatar
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            size="medium" />
          <View>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                fontSize: 26,
                fontWeight: '600',
                color: '#161616',
                marginBottom: 5,
              }}>
              {userData.userName}
            </Text>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{ fontSize: 12, fontWeight: '500', color: '#161616' }}>
              {userData.email}
            </Text>
          </View>
          <View>
            <Icon
              color={GlobalStyles.colors.white}
              name="edit"
              containerStyle={[
                GlobalStyles.iconContainerStyle2,
                { backgroundColor: GlobalStyles.colors.primary },
              ]}
              iconStyle={{ padding: 0, margin: 0 }}
              size={24}
              type="material" />
          </View>
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            height: 170,
            borderBottomColor: '#EBEBEB',
            borderBottomWidth: 1,
            borderBottomEndRadius: 50,
            borderBottomStartRadius: 50,
          }}>
          <View>
            <Image
              source={require('../assets/images/branding.png')}
              style={{ width: 144, height: 85 }} />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[GlobalStyles.drawerItem, { marginTop: 20 }]}
        onPress={() => navigation.navigate('Leads')}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon
            name="dashboard"
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
          <Text
            allowFontScaling={true}
            maxFontSizeMultiplier={1}
            style={GlobalStyles.drawerLabel}>
            My Projects
          </Text>
        </View>
        <Icon
          name="chevron-right"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon} />
      </TouchableOpacity>

      {/* <TouchableOpacity
      style={[GlobalStyles.drawerItem, { marginTop: 0 ,}]}
      onPress={() => navigation.navigate("DeleteAccount")}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Icon
          name="delete"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon}
        />
        <Text
          allowFontScaling={true}
          maxFontSizeMultiplier={1}
          style={GlobalStyles.drawerLabel}
        >
          Delete Account
        </Text>
      </View>
      <Icon
        name="chevron-right"
        type="material"
        color="#000"
        size={24}
        style={GlobalStyles.drawerIcon}
      />
    </TouchableOpacity> */}

      {/* <TouchableOpacity
      style={GlobalStyles.drawerItem}
      onPress={() => navigation.navigate("Profile")}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Icon
          name="history"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon}
        />
        <Text
          allowFontScaling={true}
          maxFontSizeMultiplier={1}
          style={GlobalStyles.drawerLabel}
        >
          Help
        </Text>
      </View>
      <Icon
        name="chevron-right"
        type="material"
        color="#000"
        size={24}
        style={GlobalStyles.drawerIcon}
      />
    </TouchableOpacity> */}

      {/* <TouchableOpacity
      style={GlobalStyles.drawerItem}
      onPress={() => navigation.navigate("Profile")}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Icon
          name="help-outline"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon}
        />
        <Text
          allowFontScaling={true}
          maxFontSizeMultiplier={1}
          style={GlobalStyles.drawerLabel}
        >
          Help
        </Text>
      </View>
      <Icon
        name="chevron-right"
        type="material"
        color="#000"
        size={24}
        style={GlobalStyles.drawerIcon}
      />
    </TouchableOpacity> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Create")}
        style={[GlobalStyles.drawerItem, { margin: 0 }]}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Icon
            name="edit"
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
          <Text
            allowFontScaling={true}
            maxFontSizeMultiplier={1}
            style={GlobalStyles.drawerLabel}>
            Contract
          </Text>
        </View>
        <Icon
          name="chevron-right"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon} />
      </TouchableOpacity>


      <View>
        {/* <View style={{ flex: 1, justifyContent: "flex-end" }}>
<TouchableOpacity
onPress={()=>navigation.navigate("Welcome")}
    style={[GlobalStyles.drawerItem, { margin:0 }]}
   
  >
    <View style={{ display: "flex", flexDirection: "row" }}>
      <Icon
        name="login"
        type="material"
        color="#000"
        size={24}
        style={GlobalStyles.drawerIcon}
      />
      <Text
        allowFontScaling={true}
        maxFontSizeMultiplier={1}
        style={GlobalStyles.drawerLabel}
      >
       Login
      </Text>
    </View>
    <Icon
      name="chevron-right"
      type="material"
      color="#000"
      size={24}
      style={GlobalStyles.drawerIcon}
    />
  </TouchableOpacity>
</View> */}

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={handleSettingClick}
            style={[GlobalStyles.drawerItem, { margin: 0 }]}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Icon
                name="settings"
                type="material"
                color="#000"
                size={24}
                style={GlobalStyles.drawerIcon} />
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={GlobalStyles.drawerLabel}>
                Setting
              </Text>
            </View>
            <Icon
              name="chevron-right"
              type="material"
              color="#000"
              size={24}
              style={GlobalStyles.drawerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {showDeleteButton && (
          <TouchableOpacity
            style={[GlobalStyles.drawerItem, { margin: 0 }]}
            onPress={() => navigation.navigate('ProfileSetting')}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
           <View style={{left:30}}>
              <Icon
                name="person"
                type="material"
                color="#000"
                size={24}
                style={GlobalStyles.drawerIcon} /></View>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{ fontSize: 16,
                  color: "#161616",left:40}}>
                Profile
              </Text>
            </View>
            <Icon
              name="chevron-right"
              type="material"
              color="#000"
              size={24}
              style={GlobalStyles.drawerIcon} />
          </TouchableOpacity>
        )}
        {showDeleteButton && (
          <TouchableOpacity
            style={[GlobalStyles.drawerItem, { margin: 0 }]}
            onPress={() => navigation.navigate('DeleteAccount')}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={{left:30}}>
              <Icon
                name="delete"
                type="material"
                color="#000"
                size={24}
                style={GlobalStyles.drawerIcon} />
                </View>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{ fontSize: 16,
                  color: "#161616",left:40}}>
                Delete Account
              </Text>
            </View>
            <Icon
              name="chevron-right"
              type="material"
              color="#000"
              size={24}
              style={GlobalStyles.drawerIcon} />
          </TouchableOpacity>
        )}

      </View>


      {/* <TouchableOpacity
        style={[
          GlobalStyles.drawerItem,
          { marginBottom: 20 },
        ]}
        onPress={!loginStatus ? handleLogout : () => navigation.navigate('Welcome')}>

        <View style={{ display: 'flex', flexDirection: 'row', }}>
          <Icon
            name={!loginStatus ? 'logout' : 'login'}
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
          {!loginStatus ? (
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={GlobalStyles.drawerLabel}>
              Logout
            </Text>
          ) : (
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={GlobalStyles.drawerLabel}>
              Login
            </Text>
          )}

          <Icon
            name="chevron-right"
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
        </View>

      </TouchableOpacity> */}
      {/* <TouchableOpacity>
    <View style={{
          
          alignItems: 'center',
          justifyContent: 'center',
          position:"relative",
          top:250,
          padding: 10,
          borderBottomColor: '#EBEBEB',
          borderBottomWidth: 1,
          borderBottomEndRadius: 50,
          borderBottomStartRadius: 50,
        }}>

    </View>
    </TouchableOpacity> */}
      {/* <View >

<TouchableOpacity

      style={[GlobalStyles.drawerItem, { margin:0 }]}
     onPress={handleLogout}
    >
     
      <View style={{  flexDirection: "row" ,justifyContent:"flex-end",}}>
        <Icon
          name="logout"
          type="material"
          color="#000"
          size={24}
          style={GlobalStyles.drawerIcon}
        />
        <Text
          allowFontScaling={true}
          maxFontSizeMultiplier={1}
          style={GlobalStyles.drawerLabel}
        >
        Logout
        </Text>
      </View>
      <Icon
        name="chevron-right"
        type="material"
        color="#000"
        size={24}
        style={GlobalStyles.drawerIcon}
      />
    </TouchableOpacity>
</View> */}

    </DrawerContentScrollView>
    <View style={{ paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',}}>

      </View> <TouchableOpacity
        style={[
          GlobalStyles.drawerItem,
          { marginBottom:"30%",marginLeft:"25%" },
        ]}
        onPress={!loginStatus ? handleLogout : () => navigation.navigate('Welcome')}>

        <View style={{ display: 'flex', flexDirection: 'row', }}>
          <Icon
            name={!loginStatus ? 'logout' : 'login'}
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
          {!loginStatus ? (
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={GlobalStyles.drawerLabel}>
              Logout
            </Text>
          ) : (
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={GlobalStyles.drawerLabel}>
              Login
            </Text>
          )}

          <Icon
            name="chevron-right"
            type="material"
            color="#000"
            size={24}
            style={GlobalStyles.drawerIcon} />
        </View>

      </TouchableOpacity></>
  );
};

const MyDrawer: React.FC<MyDrawerProps> = ({route}) => {
  const loginStatus = useSelector((state: any) => state.Login.isUserLogout);

  return (
    <>
      {/* Left Drawer Navigator */}
      <Drawer.Navigator
        initialRouteName={'Home'}
        screenOptions={({navigation}: {navigation:any}) => ({
          headerShown: false,
          drawerStyle: {width: 320},
        })}
        drawerContent={props => (
          <CustomDrawerContent {...props} route={route} />
        )}>
        <Drawer.Screen name="Home" component={BottomNavigation} />
        
      </Drawer.Navigator>
    </>
  );
};
export default MyDrawer;
