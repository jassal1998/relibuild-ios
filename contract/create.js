// Create.js

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CallAPIPostPromise,
  LocalButton,
  apiUrl,
  primaryColor,
} from '../contract/utility/comman.js';
import axios from 'axios';
import {setReduxContractId} from '../contract/utility/redux/contract/reducer';
import {
  selectIsLogin,
  selectToken,
  selectUserID,
  setToken,
  setUserID,
} from '../contract/utility/redux/profile';
import Con_paymentPage from './con_paymentPage';
import HomeHeader from '../contract/utility/comp/header';
import back from '../contract/utility/img/loginImg2.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocalText from '../contract/utility/comp/LocalText';
import {t} from 'i18next';
import LanguageSelectModal from '../contract/utility/comp/lngModal';
import {jwtDecode} from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutUser } from '../slices/thunk.js';






const Create =  () => {
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaidUser, setIsPaid] = useState(true);
  const [isAuth, setIsAuth] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const tokken = await AsyncStorage.getItem('authUser');
        console.log('fff ', tokken); 
        if (tokken) {
          dispatch(setToken(tokken));
          console.log('Token before dispatch:', tokken);
        } else {
          console.log('No token found ');
        }
      } catch (error) {
        console.error('Error loading token:', error); 
      }

    };
    loadToken(); 
  }, [dispatch]);




  const token = useSelector(selectToken); 
 
  console.log('Token from Redux:', token);

 
  useEffect(() => {
    if (token) {
      console.log('Token:', token);
      try {
        const decode = jwtDecode(token);
        console.log('Decoded JWT:', decode);

        if (decode.userId) {
          dispatch(setUserID(decode.userId));
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, [token, dispatch]);
  const userId = useSelector(selectUserID);
  console.log('Decoded userId:', userId);
  
  const defaultProject = {
    p_status: 'No Project Found',
    p_total_cost: '',
    p_name: 'No project available',
    p_id: 'N/A',
    p_home_owner_id: 'N/A',
    p_escrow: 0,
    p_created_at: new Date().toISOString(),
  };

  // Render a single project card
  const renderItem2 = ({item}) => {
    const formatDate = date => {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    };


    return (
      
      <View style={styles.card}>
        <ImageBackground source={back} style={styles.imageBackground}>
          <View style={styles.statusContainer}>
            <LocalText style={styles.statusText}>
              {item.p_status || 'N/A'}
            </LocalText>
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.costText}>
              {item.p_total_cost ? item.p_total_cost + '$' : 'N/A'}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.cardContent}>
          <Text style={styles.projectName}>{item?.p_name || 'N/A'}</Text>
          <Text style={styles.projectId}>ID: {item?.p_id || 'N/A'}</Text>
          <View style={styles.row}>
            <LocalText style={styles.label}>Home Owner ID - </LocalText>
            <Text style={styles.value}>{item.p_home_owner_id || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <LocalText style={styles.label}>Escrow:</LocalText>
            <Switch
              value={Number(item.p_escrow) === 1}
              onValueChange={() => {}}
              thumbColor={Number(item.p_escrow) ? '#1f57d6' : '#ddd'}
              trackColor={{true: '#BBDDF9', false: '#F0F0F0'}}
              disabled
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              {t('Created on')}: {formatDate(item.p_created_at)}
            </Text>
            <LocalButton
  onPress={() => {
    navigation.navigate('ContractFillPage', { contractID: item.p_id });
    dispatch(setReduxContractId(item.p_id)); 
  }}
  padding={8}
  title={'Know more'}
  bg={'#325573'}
  color={'white'}
/>
          </View>
        </View>
      </View>
    );
  };
  useEffect(() => {
    if (token && userId) {
      console.log('Token is ready. Fetching project list...');
      fetchProjectList();
    } else {
      console.log('Waiting for token or userId to load...');
      setLoading(false); // Stop loading when token or userId is missing
    }
  }, [token, userId]);
  
  const fetchProjectList = async () => {
     console.log('Token before API call:', token);
     console.log('UserId before API call:', userId);
    if (!token || !userId) {
     
      console.error('No token or userId found.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      console.log('Calling API with token and userId...');
       console.log('Headers:', {
         Authorization: `Bearer ${token}`,
       });
      const response = await axios.get(
        `${apiUrl}/contract/get-homeowner-contract/${userId}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      console.log('API Response:', response.data); 
      console.log('apl', apiUrl);
      console.log('Tokddddden:', token);
      console.log('dddUser ID:', userId);
  if (response?.data?.result && response.data.result.length > 0) {
    setProjectList(response.data.result);
    console.log('Project List:', response.data.result);
    console.log('Full API Response:', response.data);
  } else {
    // If API returns no projects, set the default project in the list
    console.log('No projects found, adding default project.');
    setProjectList([defaultProject]);
    console.log('dssdsdszzzc', defaultProject);
  }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
      // In case of error, still display the default project card
      setProjectList([defaultProject]);
    } finally {
      setLoading(false);
    }
  };
  

  // Check if the user is a paid subscriber
  // const checkIsPaidUser = () => {
  //   if (!token || !userId) {
  //     setIsPaid(false);
  //     setLoading(false);
  //     return;
  //   }
  //   CallAPIPostPromise(
  //     '/stripe-sub/get-subscription-details',
  //     {userId: userId},
  //     token,
  //     dispatch,
  //   )
  //     .then(() => {
  //       setIsPaid(true);
  //       fetchProjectList();
  //     })
  //     .catch(() => {
  //       setIsPaid(false);
  //       setLoading(false);
  //     });
  // };



  const onClickCreateNew = () => {
    dispatch(setReduxContractId(''));
    navigation.navigate('ContractFillPage');
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProjectList();
    setRefreshing(false);
  };

  // If the user is not paid, show the payment page
  // if (!isPaidUser) {
  //   return <Con_paymentPage />;
  // }

  return (
    <View style={{ flex: 1 }}>
    {/* Header */}
    <View style={styles.headerContainer}>
      {/* <LocalText style={styles.headerText}>Contracts</LocalText> */}
      {/* <TouchableOpacity onPress={onClickCreateNew}>
        <LocalText style={styles.createText}>Create New</LocalText>
      </TouchableOpacity> */}
    </View>

    {/* Loading State */}
    {loading ? (
  <ActivityIndicator color={primaryColor} size={'large'} />
) : !token || !userId ? (
  
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: '#333', fontSize: 18, marginBottom: 10}}>
      Please login first
    </Text>
    <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={{
        backgroundColor: '#325573',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
      }}>
      <Text style={{color: '#fff', fontSize: 16}}>Login</Text>
    </TouchableOpacity>
  </View>
) : projectList.length === 0 || (projectList.length === 1 && projectList[0].p_id === 'N/A') ? (
  // Show No Contracts Message
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{color: '#333', fontSize: 18}}>No Contracts Available</Text>
  </View>
) : (
  // Show Project List if data is available
  <View style={{flex: 1, paddingHorizontal: 15}}>
    <FlatList
      data={projectList}
      onRefresh={onRefresh}
      refreshing={refreshing}
      keyExtractor={item =>
        item.p_id ? item.p_id.toString() : Math.random().toString()
      }
      renderItem={renderItem2}
      contentContainerStyle={styles.flatListContent}
    />
      </View>
    )}
  </View>
);
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  createText: {
    fontWeight: '600',
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageBackground: {
    backgroundColor: 'gray',
    height: 91,
    borderRadius: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
  },
  statusContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    width: 90,
    borderRadius: 14,
  },
  statusText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 13,
    paddingVertical: 2,
  },
  costContainer: {
    backgroundColor: '#00000068',
    alignSelf: 'flex-start',
    padding: 2,
    paddingHorizontal: 10,
  },
  costText: {
    color: 'white',
    fontWeight: '600',
  },
  cardContent: {
    padding: 7,
  },
  projectName: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  projectId: {
    fontSize: 14,
    color: '#8F8F99',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: '#8F8F99',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',     
    backgroundColor: '#fff', 
  },
  loginText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',    
  },
  loginButton: {
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: primaryColor,
    fontSize: 16,
  },
});

export default Create;
