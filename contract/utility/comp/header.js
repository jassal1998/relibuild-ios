import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Modal,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { primaryColor, grayColor } from '../comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLogin, selectToken, setToken } from '../redux/profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalText from './LocalText';
import LanguageSelectModal from './lngModal';
import Us from '../img/us.png'
import Spain from '../img/spain.png'
import i18n from '../translation';
const HomeHeader = ({ title,back,replace,position,hideBottomRadius,setActiveTab,activeTab,subTitle, buttonText, onRightButtonPress,tab1,tab2,onSignoutClick ,})  => {
    const navigation = useNavigation();

    const isLogin = useSelector(selectIsLogin)
    const [modalVisible, setModalVisible] = useState(false);
    const [langModalStatus, setLangModalStatus] = useState(false);
    const [selectedLng,setSelectedLng] = useState('Us')
    const token = useSelector(selectToken)
useEffect(()=>{
    AsyncStorage.getItem('missingTranslations').then(r=>{
        console.log(r)
    })

},[])
   

const dispatch = useDispatch()
    const handleSignOut = () => {
        setModalVisible(false);

     dispatch(setToken(''))
   
    };

    useEffect(()=>{
        AsyncStorage.getItem('I18N_LANGUAGE').then((l)=>{
            setSelectedLng(l)
        })  
if(!isLogin && !token){
    navigation.navigate('Login')
}
    },[isLogin,token])

    

    return (

        <SafeAreaView
            style={{
                backgroundColor: primaryColor,
                borderBottomLeftRadius:24,
                borderBottomRightRadius:24,
           position:position?position:'relative',
           top:0,
           left:0,right:0
            }}
        >

            <View style={{
                     borderBottomRightRadius: hideBottomRadius ? 0 : 30,
                     paddingHorizontal: 15,
                     paddingVertical:12,
            }}>
                        <StatusBar backgroundColor={primaryColor} />

<View
    style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        
    }}
>
    {back ?
        <TouchableOpacity onPress={() => navigation.goBack()}>
     
        <Ionicons name={'arrow-back'} color="white" size={30}/>
          </TouchableOpacity>: replace?  <TouchableOpacity onPress={() => navigation.replace(replace)}>
     
     <Ionicons name={'arrow-back'} color="white" size={30}/>
       </TouchableOpacity> :   <TouchableOpacity onPress={() => navigation.openDrawer()}>
     
     <Ionicons name={'menu'} color="white" size={30}/>
       </TouchableOpacity>
    
}

    <View
        style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            width:100

        }}
    >
  <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => setLangModalStatus(true)}
        >
            <View>

<Image source={selectedLng==="es"? Spain:Us} style={{
    width:30,
    height:25
}} width={20}/>
            </View>
        </TouchableOpacity>
    
        <TouchableOpacity
        onPress={()=>{
            navigation.navigate('Notification')
        }}
            style={{ textAlign: 'center', marginLeft: 12 }}
        >
            <Ionicons
                name={'notifications'}
                color={'white'}
                size={20}
            />
        </TouchableOpacity>

        <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => setModalVisible(true)}
        >
            <Ionicons
                name={'person-circle-outline'}
                color={'white'}
                size={20}
            />
        </TouchableOpacity>
    </View>
    <LanguageSelectModal visible={langModalStatus} onSelect={(l)=>{ 
        setSelectedLng(l)
        setLangModalStatus(false)
        i18n.changeLanguage(l);
        AsyncStorage.setItem("I18N_LANGUAGE", l);
     }} onClose={()=>{
        setLangModalStatus(false)
    }} />
</View>


{title && (
    <View
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20,
        }}
    >
        <View>
            <LocalText
                style={{
                    color: 'white',
                    fontSize: 19,
                    fontWeight: '700',
                }}
            >
                {title}
          </LocalText>
            <LocalText
                style={{
                    color: '#CACBF0',
                    fontSize: 17,
                }}
            >
                {subTitle}
          </LocalText>
        </View>

        {onRightButtonPress && (
            <TouchableOpacity
                onPress={onRightButtonPress}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 13,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 25,
                }}
            >
                <LocalText
                    style={{
                        color: primaryColor,
                        fontWeight: '800',
                        fontSize: 14,
                    }}
                >
                    {buttonText}
              </LocalText>
            </TouchableOpacity>
        )}


    </View>
)}

{tab1 &&           <View style={{
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 7,
    borderBottomRightRadius: 12
}}>
    <TouchableOpacity
        onPress={() => setActiveTab(tab1)}
        style={{
            backgroundColor: activeTab === tab1 ? primaryColor : 'white',
            flex: 1,
            borderTopLeftRadius: 7,
            borderBottomLeftRadius: 7,
            padding: 5
        }}
    >
        <LocalText style={{
            color: activeTab === tab1 ? 'white': primaryColor,
            textAlign: 'center'
        }}>
           {tab1} 
      </LocalText>
    </TouchableOpacity>

    <TouchableOpacity
        onPress={() => setActiveTab(tab2)}
        style={{
            backgroundColor: activeTab === tab2 ? primaryColor : 'white',
            flex: 1,
            borderTopRightRadius: 7,
            borderBottomRightRadius: 7,
            padding: 5
        }}
    >
        <LocalText style={{
            color: activeTab === tab2 ? 'white' : primaryColor,
            textAlign: 'center'
        }}>
            {tab2}
      </LocalText>
    </TouchableOpacity>



</View>}

{/* Modal for Sign Out Confirmation */}
<Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
      
        <View style={{
          width: 300,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5
        }}>
          <MaterialIcons name="logout" size={48} color={primaryColor} style={{ marginBottom: 10 }} />
          <LocalText style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
            Are you sure you want to sign out?
          </LocalText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: grayColor,
                borderRadius: 8,
                alignItems: 'center',
                marginRight: 10
              }}
              onPress={() => setModalVisible(false)}
            >
              <LocalText style={{ color: 'black', fontSize: 16 }}>Cancel</LocalText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                padding: 12,
                backgroundColor: primaryColor,
                borderRadius: 8,
                alignItems: 'center'
              }}
              onPress={handleSignOut}
            >
              <LocalText style={{ color: 'white', fontSize: 16 }}>Sign Out</LocalText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

            </View>
        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: primaryColor,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color:'black'
    },
});

export default HomeHeader;
