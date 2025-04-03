import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert, StyleSheet, Dimensions } from 'react-native'
import React, { useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { selectContractId } from '../redux/contract/reducer'
import { apiUrl, getUserId } from '../comman'
import { selectToken } from '../redux/profile'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import PhoneInput from 'react-native-phone-input';
import LocalText from '../comp/LocalText'
import { useTranslation } from 'react-i18next'
const {height}= Dimensions.get('window')
const CreatenewHomieModal = ({
 status,onClose
}) => {
    const [err,seterr] =useState('')
    const [loading,setLoading] = useState(false)
    const token = useSelector(selectToken)
    const [data,setData]=useState({
        "homeownerFirstname": "",
        "homeownerLastName": "",
        "homeownerEmail": "",
        "homeownerPhone": "",
        "contractorId": ""
    })
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const contractorID = getUserId(token)
    const hanleAddNewHommie = async()=>{
        return new Promise((resolve,reject)=>{
    setLoading(true)
    const body = {
        ...data,
        contractorId:contractorID
    }
          axios.post(`${apiUrl}/profile/create-homeowner`,body
          ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(o =>{
            resolve()

          
          }).catch(o=>{
            reject()
          }).finally(()=>{
  setLoading(false)
          })
        })
    
      }
const {t} = useTranslation()
      const handleSave = ()=>{

        if(data.homeownerEmail&& data.homeownerFirstname&& data.homeownerEmail&& data.homeownerLastName&&data.homeownerPhone){
            hanleAddNewHommie().then(()=>{
                onClose()
                Toast.show({
                  type:t('success'),
                    text1:t("New Homeowner added") 
                })
                setData({
                    "homeownerFirstname": "",
                    "homeownerLastName": "",
                    "homeownerEmail": "",
                    "homeownerPhone": "",
                    "contractorId": ""  
                })
        })
        }else{
            if(!data.homeownerFirstname){
                seterr('First Name required')
                firstNameRef.current?.focus()
                setTimeout(() => {
                seterr('')
                    
                }, 4000);
                return
            }
            if(!data.homeownerLastName){
                seterr('Last Name required')
                lastNameRef.current?.focus()
                setTimeout(() => {
                seterr('')
                    
                }, 4000);
                return
            }

            if(!data.homeownerEmail){
                seterr('Email required')
                emailRef.current?.focus()
                setTimeout(() => {
                seterr('')
                    
                }, 4000);
                return
            }

            if(!data.homeownerPhone){
                seterr('Contact required')
                phoneRef.current?.focus()
                setTimeout(() => {
                seterr('')
                    
                }, 4000);
                return
            }
        }
      }
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={status}
  
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.modalContainer}>
        <View style={style.modalView}>
      <View style={{
        padding:15,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
      }}>
      <LocalText style={style.modalTitle}>Add Home owner</LocalText>
<TouchableOpacity                 onPress={onClose}>
    <Ionicons name={'close'} color={'black'}  size={24}/>
</TouchableOpacity>
      </View>

          <ScrollView
            style={{ flex: 1, padding: 20,paddingTop:10 }}
            keyboardShouldPersistTaps="always" // Set to "always"
           
          >
 
 <TextInput ref={firstNameRef} value={data.homeownerFirstname} onChangeText={e=>{
    setData(d=>{
        return {
            ...d,
            homeownerFirstname:e
        }
    })
 }}   mode="outlined" label={'Homeowner First Name *'} style={style.firstinput}></TextInput>
 <TextInput ref={lastNameRef} onChangeText={e=>{
    setData(d=>{
        return {
            ...d,
            homeownerLastName:e
        }
    })
 }} value={data.homeownerLastName}     mode="outlined" label={'Homeowner Last Name *'} style={style.firstinput}></TextInput>
 <TextInput ref={emailRef} onChangeText={e=>{
    setData(d=>{
        return {
            ...d,
            homeownerEmail:e
        }
    })
 }}  value={data.homeownerEmail}    mode="outlined" label={'Homeowner Email *'} style={style.firstinput}></TextInput>

<LocalText style={{
  paddingBottom:5,
  color:'black'
}}>
  Homeowner Contact Number *
</LocalText>
<View style={{
    flex: 1,
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'gray',
    padding:5,
    alignItems:"center",
    height:50,
    borderRadius:5

}}>
<PhoneInput
        ref={phoneRef}
        initialCountry="us" // Default country
        onChangePhoneNumber={(number) => {
          setData(d=>{
            return {
                ...d,
                homeownerPhone:number
            }
        })
        }}
        textStyle={{
          backgroundColor: "#f9f9f9",
        color:'black',

        }}
        flagStyle={{
          width: 30,
          height: 20,

        }}
        style={{
          flexDirection:'row',
          alignItems:'center',
          
        }}
        pickerButtonColor="#000"
      />
</View>

      <LocalText style={{
        color:'red',
        height:20,
        marginBottom:4
      }}>
        {err}</LocalText>   
<View style={{
}}>

<TouchableOpacity
onPress={handleSave}
                style={style.submitButton}
              >
                <LocalText style={style.submitButtonText}>
                 Add
              </LocalText>
              </TouchableOpacity>


              <TouchableOpacity
                style={style.cancelButton}
                onPress={onClose}
              >
                <LocalText style={style.cancelButtonText}>
                 Close
              </LocalText>
              </TouchableOpacity>
</View>

      
         


            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >

            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
  )
}

const style = StyleSheet.create({
    createContractButtonText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
      },
      firstinput: {
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        color:'black'
      },
      readOnlyInput: {
        marginBottom: 15,
        backgroundColor: "#f0f0f0",
        color: '#6c757d'
      },
      inputEditable: {
        marginBottom: 15,
        backgroundColor: "white",
        color: 'black'
      },
      modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
    justifyContent:'center',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
      },
      modalTitle:{
       color:'black',
       fontSize:20,
       fontWeight:800 
      },
      modalView: {
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
    height:500,
    overflow:'hidden',
    width:'90%'

      },
      submitButton: {
        backgroundColor: "#3762EA", // Green background
        height: 40, // Fixed height
        width: "100%", // Fixed width
        borderRadius: 5, // Rounded corners
        justifyContent: "center", // Center text vertically
        alignItems: "center", // Center text horizontally
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, // Slight elevation for depth
        marginVertical: 5, // Space around the button
      },
    
      submitButtonText: {
        color: "white",
        // Style for submit button text
      },
      cancelButton: {
        backgroundColor: "#d5d5db", // Green background
        height: 40, // Fixed height
        width: "100%", // Fixed width
        borderRadius: 5, // Rounded corners
        justifyContent: "center", // Center text vertically
        alignItems: "center", // Center text horizontally
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, // Slight elevation for depth
        marginVertical: 5, // Space around the button
      },
    
      cancelButtonText: {
        color: "black",
        // Style for submit button text
      },
})

export default CreatenewHomieModal