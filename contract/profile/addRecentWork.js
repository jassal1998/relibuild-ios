import { View, Text, Platform, ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert, StyleSheet, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'

import moment from 'moment';
import { baseUrl,  } from '../../utility/comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUserID, setSpinnerLoading, setToken } from '../utility/redux/profile';
import Toast from 'react-native-toast-message';
import UploadCard from '../utility/comp/uploadImg';
import axios from 'axios';
import LocalText from '../utility/comp/LocalText';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

const {height} =Dimensions.get('window')

const AddRecentWork =({modalVisible, closeModal,}) => {
 const userId = useSelector(selectUserID)
 const defaultData = {
  recentWorkName:"",
  recentWorkDescription:"",
  recentWorkContId:"",
  recentWorkvideo:"",
  startedDate:"",
  completedDate:"",
  userId:"",
  images:[]
}
const [activeInput,setActiveInput] = useState('')
  const [showDatePicker,setShowDatePicker] = useState(false)
  const [addRecentWorkDetails,setaddRecentWorkDetails] = useState(defaultData)

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


const date = new Date()
const [err,setErr] =useState('')
  const token = useSelector(selectToken)
  console.log("tokffffen",token)
  const dispatch = useDispatch()
const {t} = useTranslation()


  const handleAddRecentWork = async () => {
    dispatch(setSpinnerLoading('Creating'))
    const formData = new FormData();
    const formattedDate1 = moment(addRecentWorkDetails.startedDate)    .utcOffset("+05:30") // Set to IST (GMT+0530)
    .format("ddd MMM DD YYYY HH:mm:ss [GMT+0530] (India Standard Time)");

    const formattedDate2 = moment(addRecentWorkDetails.completedDate)
    .utcOffset("+05:30") // Set to IST (GMT+0530)
    .format("ddd MMM DD YYYY HH:mm:ss [GMT+0530] (India Standard Time)");

    // Append all fields to the FormData
    formData.append("recentWorkName", addRecentWorkDetails.recentWorkName);
    formData.append("recentWorkDescription", addRecentWorkDetails.recentWorkDescription);
    formData.append("recentWorkContId", userId);
    formData.append("recentWorkvideo", addRecentWorkDetails.recentWorkvideo? addRecentWorkDetails.recentWorkvideo:null); // If video is a URL or string
    formData.append("startedDate", formattedDate1);
    formData.append("completedDate", formattedDate2);
    formData.append("userId", userId);
    // If images is an array of files, append each image
    if ( addRecentWorkDetails.images[0]) {
      addRecentWorkDetails.images.forEach((image, index) => {
        formData.append(`images`, {
          uri: image.uri,
          name: image.fileName || `image_${index}.jpg`,
          type: image.type || "image/jpeg",
        });
      });
    } else if (addRecentWorkDetails.images) {
      // If it's a single image
      formData.append("images", {
        uri: addRecentWorkDetails.images.uri,
        name: addRecentWorkDetails.images.fileName || "image.jpg",
        type: addRecentWorkDetails.images.type || "image/jpeg",
      });
    }

    try {
      const response = await axios.post(`${baseUrl}/recent-work/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization:`Bearer ${token}`
        },
      });
  if(response.data){
    Toast.show({
      text1: t('Recent Work Created')
    })
    closeModal()
    setaddRecentWorkDetails(defaultData)
  }
    } catch (error) {
      console.error("Error submitting data:", error.response || error);
    } finally {
      dispatch(setSpinnerLoading(false))
    }
  };

const handleConfirmDate = (selectedDate)=>{
  const currentDate = selectedDate || new Date();
setShowDatePicker(false)
  const formattedDate = currentDate.toISOString(); // Format the date as needed
setaddRecentWorkDetails(prev=>{
  return {
    ...prev,
    [activeInput]: formattedDate
  }
})
}
    return <Modal
      visible={modalVisible}
      transparent={true} // Make the background transparent
      animationType="slide" // Optional: Adds a slide-in animation
      onRequestClose={closeModal} // Close modal when back button is pressed (Android)
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
      <LocalText style={style.modalTitle}>Add Recent Work</LocalText>
<TouchableOpacity                 onPress={closeModal}>
    <Ionicons name={'close'} color={'white'}  size={24}/>
</TouchableOpacity>
      </View>
          <ScrollView    style={{ flex: 1, padding: 10 }}
            keyboardShouldPersistTaps="always" // Set to "always"
            contentContainerStyle={{ paddingBottom: 50 ,
            
            paddingTop:10,
        }}>
            <View>
            {/* <Card style={[style.paperCard,style.elevatedCard]}> */}

           <Text style={{...style.description,fontSize:16}}>
            {t("Recent Work Images")}
           

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
           <View style={{
            marginTop:20
           }}>
           <UploadCard onChange={(file)=>{
setaddRecentWorkDetails(prev=>{
  return{
    ...prev,
    images:[
      ...prev.images,
      file
    ]
  }
})
           }} allowMediaType='image' title={'Drag & drop some files here, or click to select files'}/>
<LocalText style={{
    marginTop:10,
    fontWeight:'800',
    color:'black'
}}>
    Selected Files : 
</LocalText>
{
      addRecentWorkDetails.images.map((i,key)=>{
        return(
          <View key={key} style={{
            flexDirection:'row',
            marginTop:10
          }}>
          <Image source={{uri:i.uri}} height={50} width={50} />
<LocalText style={{
  marginLeft:10,
  flex:1
}}>
  {i.fileName}
</LocalText>
<TouchableOpacity onPress={()=>{
  setaddRecentWorkDetails(prev=>{
    return {
      ...prev,
      images:prev.images.filter(o => o.uri !==i.uri)
    }
  })
}}>
<Ionicons size={20} color={'#FF0000'} name={'trash-bin-outline'} />

</TouchableOpacity>

          </View>
        )
      })
    }
           </View>


                            

        <Text style={{...style.description,marginTop:20,fontSize:16}}>
{t("Recent Work Title")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
                <TextInput
                  value={addRecentWorkDetails.recentWorkName}
                  onChangeText={(text=>{
                    setaddRecentWorkDetails(prev =>{
                      return {
                        ...prev,
                        recentWorkName:text 
                      }
                    })
                  })}
                  style={style.inputPaper}
                  mode="outlined"
               
                ></TextInput>
        


                            
        
        <Text style={{...style.description,marginTop:20,fontSize:16}}>
 {t("Recent Work Description")}
           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

                <TextInput
                                     value={addRecentWorkDetails.recentWorkDescription}
                                     onChangeText={(text=>{
                                       setaddRecentWorkDetails(prev =>{
                                         return {
                                           ...prev,
                                           recentWorkDescription:text 
                                         }
                                       })
                                     })}
                 multiline={true}
                 numberOfLines={4}
                  style={style.inputPaper}
                  mode="outlined"
                ></TextInput>


                            
        
<Text style={{...style.description,marginTop:20,fontSize:16}}>
  {t("Started At")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

           <TouchableOpacity  onPress={() => {
            setActiveInput("startedDate");
            setShowDatePicker(true);
          }} >

<View
        style={[style.inputPaper,{
          padding:18,
          borderWidth:1,
          borderColor:'gray',
          borderRadius:5
        }]}
      
      >
        <LocalText style={{
          color:'black'
        }}>
        {addRecentWorkDetails.startedDate ?moment(addRecentWorkDetails.startedDate).format('DD MMM, YYYY'):"Started Date"}

      </LocalText>
      </View>



</TouchableOpacity>
                            
        
<Text style={{...style.description,marginTop:20,fontSize:16}}>
  {t("Completed At")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

           <TouchableOpacity  onPress={() => {
            setActiveInput("completedDate");
            setShowDatePicker(true);
          }} >
<View
        style={[style.inputPaper,{
          padding:18,
          borderWidth:1,
          borderColor:'gray',
          borderRadius:5
        }]}
      
      >
        <LocalText style={{
          color:'black'
        }}>
        {addRecentWorkDetails.completedDate ?moment(addRecentWorkDetails.completedDate).format('DD MMM, YYYY'):"Complated At"}

      </LocalText>
      </View>


</TouchableOpacity>
     
             
              {/* </Card> */}
     
     <LocalText style={{
        color:'red'
     }}>
        {err}
   </LocalText>
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                  onCancel={()=>{
                    setShowDatePicker(false)
                  }}
                  onConfirm={handleConfirmDate}
                />
          
              <TouchableOpacity
                style={style.submitButton} // Add styles for your submit button
                onPress={handleAddRecentWork}
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
        borderRadius: 10,
        height:"85%",
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
        color:'black'
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
  export default AddRecentWork