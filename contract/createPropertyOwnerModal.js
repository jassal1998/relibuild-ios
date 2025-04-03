import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, TextInput } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { CallAPIPostPromise, getUserId } from '../contract/utility/comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setSpinnerLoading } from '../contract/utility/redux/profile';
import Toast from 'react-native-toast-message';
import PickerModal from '../contract/utility/comp/pickerModal';
import LocalText from '../contract/utility/comp/LocalText';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
const {height} =Dimensions.get('window')

const CrateNewPropertyOwner =({modalVisible, closeModal, handleSubmit}) => {
  const [newPropertiearDetails,setNewPropertierDetails] = useState({
        "subContractorFirstname": " ",
        "subContractorLastName": "",
        "subContractorEmail": "",
        "subContractorPhone": "",
        "subContractorStatus": "",
        "contractorId": ""
  })
  const [statusModal,setStatusModal] = useState(false)
  const [err,setErr] =useState('')
  const token = useSelector(selectToken)
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const handleNewProptier = ()=>{
if(newPropertiearDetails.subContractorEmail&& newPropertiearDetails.subContractorFirstname&& newPropertiearDetails.subContractorLastName&&newPropertiearDetails.subContractorPhone&&newPropertiearDetails.subContractorStatus){
dispatch(setSpinnerLoading('Creating'))
  CallAPIPostPromise('/subcontractor/create-subcontractor',{
    ...newPropertiearDetails,
    contractorId:getUserId(token)
},token,dispatch).then((e)=>{
   if(e.status===200){
 Toast.show({
    text1: t('Property Owner Added'),
 })
 setNewPropertierDetails({
    "subContractorFirstname": " ",
    "subContractorLastName": "",
    "subContractorEmail": "",
    "subContractorPhone": "",
    "subContractorStatus": "",
    "contractorId": ""
 })
 handleSubmit()
    }
}).finally(()=>{
  dispatch(setSpinnerLoading(false))
}).catch((e)=>{
  setErr(e)
})
}else{


    if(!newPropertiearDetails.subContractorFirstname){
        setErr('First Name required')
        setTimeout(() => {
            setErr('')
        }, 4000);
        return 

    }

    if(!newPropertiearDetails.subContractorLastName){
        setErr('Last Name required')
        setTimeout(() => {
            setErr('')
        }, 4000);
        return 

    }
    if(!newPropertiearDetails.subContractorEmail){
        setErr('Email required')
        setTimeout(() => {
            setErr('')
        }, 4000);
        return 

    }
    if(!newPropertiearDetails.subContractorPhone){
        setErr('Contact Number required')
        setTimeout(() => {
            setErr('')
        }, 4000);
        return 

    }
    if(!newPropertiearDetails.subContractorStatus){
        setErr('Status required')
        setTimeout(() => {
            setErr('')
        }, 4000);
        return 

    }
}
  }
  
    return <Modal
      visible={modalVisible}
      transparent={true} // Make the background transparent
      animationType="slide" // Optional: Adds a slide-in animation
      onRequestClose={closeModal} // Close modal when back button is pressed (Android)
    >
        <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.modalContainer}>
        {/* Scrollable Modal Content */}
        <View style={style.modalView}>
        <View style={{
        backgroundColor:'#3762EA',
        padding:15,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
      }}>
      <LocalText style={style.modalTitle}>Add Property Owner</LocalText>
<TouchableOpacity                 onPress={closeModal}>
    <Ionicons name={'close'} color={'white'}  size={24}/>
</TouchableOpacity>
      </View>
          <ScrollView       style={{ flex: 1, padding: 10 }}
            keyboardShouldPersistTaps="always" // Set to "always"
            contentContainerStyle={{ paddingBottom: 100 ,
            
        }}>
            <View>
            <Card style={[style.paperCard,style.elevatedCard]}>
<Card.Content>
           <Text style={style.description}>
           {t("Subcontractor First Name") }
           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
                <TextInput
                  value={newPropertiearDetails.subContractorFirstname}
                
                  onChangeText={(text) => {
                    setNewPropertierDetails(prev =>{
                        return {
                            ...prev,
                            subContractorFirstname:text 
                        }
                    })
                  }}
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>

<Text style={{...style.description}}>
  {t("Subcontractor Last Name")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
           
            
                <TextInput
   value={newPropertiearDetails.subContractorLastName}
                
   onChangeText={(text) => {
     setNewPropertierDetails(prev =>{
         return {
             ...prev,
             subContractorLastName:text 
         }
     })
   }}
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>
        

        <Text style={{...style.description}}>
          {t("Email")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
                <TextInput
                    value={newPropertiearDetails.subContractorEmail}
                
                    onChangeText={(text) => {
                      setNewPropertierDetails(prev =>{
                          return {
                              ...prev,
                              subContractorEmail:text 
                          }
                      })
                    }}
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>
        
        <Text style={{...style.description}}>
          {t("Contract Number")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

                <TextInput
                value={newPropertiearDetails.subContractorPhone}
                
                onChangeText={(text) => {
                  setNewPropertierDetails(prev =>{
                      return {
                          ...prev,
                          subContractorPhone:text 
                      }
                  })
                }}
                  keyboardType="numeric"
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>

<Text style={{...style.description}}>
  {t("Status")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
           <PickerModal
        options={['Active','Inactive'].map(s=>{
          return {
            label:s,
            value:s
          }
        })}
        selectedValue={newPropertiearDetails.subContractorStatus}

        onValueChange={(itemValue, itemIndex) =>
          setNewPropertierDetails(prev =>{
              return {
                  ...prev,
                  subContractorStatus:itemValue 
              }
          })
        }
        isVisible={statusModal}
        onClose={() => {setStatusModal(false)}}
      />
      {Platform.OS ==="ios"&&  <TouchableOpacity onPress={()=>{
                  setStatusModal(true)
                }} style={{...style.inputEditable,
borderWidth:1,borderColor:'gray',
height:50,
borderRadius:6,
flexDirection:'row',
alignItems:'center',
paddingLeft:15
                }}>
                  <LocalText>
                    {newPropertiearDetails.subContractorStatus}
                </LocalText>
 
                </TouchableOpacity>}
               
     
              </Card.Content>
              </Card>
     
       

     <LocalText style={{
        color:'red'
     }}>
        {err}
   </LocalText>
          
              <TouchableOpacity
                style={style.submitButton} // Add styles for your submit button
                onPress={handleNewProptier}
              >
                <LocalText style={{
                    color:'white',
                    fontSize:15,
                    fontWeight:700
                }}>Submit</LocalText>
              </TouchableOpacity>
            </View>
      
          </ScrollView>
        </View>
      </View>
      </KeyboardAvoidingView>
    </Modal>;
  }
  const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
    justifyContent:"center"
      },
      submitButton:{
        backgroundColor: "#3762EA", // Green background
        height: 50, // Fixed height
       flex:1,
        borderRadius: 5, // Rounded corners
        justifyContent: "center", // Center text vertically
        alignItems: "center", // Center text horizontally
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, // Slight elevation for depth
        marginTop: 3, // Space around the button
      
      },
      modalView: {
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
    height:height-100,
    overflow:'hidden'
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color:"white"
      },
      paperCard: {
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: "#ffffff",
      },
      inputPaper: {
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
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
      elevatedCard:{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#2c3e50",
      },
      description: {
        fontSize: 14,
        color: "black",
        fontWeight:600,
        marginBottom: 15,
      },
      container: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
      },
  })
  export default CrateNewPropertyOwner