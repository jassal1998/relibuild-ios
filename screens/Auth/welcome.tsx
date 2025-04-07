import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Skeleton, Input, Icon, Avatar, Button} from '@rneui/themed';
import {GlobalStyles} from '../../constants/style';
import {useNavigation} from '@react-navigation/native';

export default function Welcome() {
  const navigation: any = useNavigation();
  const navigateToContractor = (type: any) => {
    console.log(type, 'smkmskms');
    if (type === 'login') {
      navigation.navigate('Login');
    } else {
      navigation.navigate('Register');
    }
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '70%',
        }}>
        <Image
          style={{width: '100%', height: '150%'}}
          source={require('../../assets/images/login.png')}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          minHeight: 50,
        }}>
        <View style={{position: 'absolute', top: -70}}>
          <Image source={require('../../assets/images/branding.png')} />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => navigateToContractor('login')}
          title="Login"
          titleStyle={{fontWeight: '500', fontSize: 16}}
          buttonStyle={{
            backgroundColor: GlobalStyles.colors.primary,
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 8,
            padding: 5,
          }}
          containerStyle={{
            width: 200,
            height: 45,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
        <Button
          title="Register"
          onPress={() => navigateToContractor('register')}
          titleStyle={{
            fontWeight: '500',
            fontSize: 16,
            color: GlobalStyles.colors.primary,
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            borderColor: GlobalStyles.colors.primary,
            borderWidth: 1,
            borderRadius: 8,
            padding: 5,
          }}
          containerStyle={{
            width: 200,
            height: 45,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        />
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: 'transparent',

              borderRadius: 8,
              padding: 5,
            }}
            onPress={() => navigation.navigate('Home')}>
            <Text
              style={{color: GlobalStyles.colors.primary, fontWeight: 'bold'}}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
