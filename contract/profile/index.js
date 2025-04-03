import { View, Text, Image, StyleSheet, Dimensions,ScrollView, TouchableOpacity, Button, Platform, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import HomeHeader from '../utility/comp/header';
import { CallAPIDeletePromise, CallAPIGetPromise, CallAPIPostPromise, CallAPIPutPromise, CallApiPatchpromise, LocalButton, TwoButtonAlert, apiUrl, grayColor, grayColor2} from '../utility/comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUserDetails, selectUserID, setSpinnerLoading, setToken, setUserDetails, setUserID } from '../utility/redux/profile';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { deepBlue, primaryColor } from '../leadsDashboard/jobCard';
import { packages } from '../con_paymentPage';
import { ProfilePackageCard } from '../pricePackage';
import { TextInput } from 'react-native-paper';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
// import Tags from "react-native-tags";
import UploadCard from '../utility/comp/uploadImg';
import CardDetails from '../utility/comp/cardDetails';
import RecentWorkCard from '../utility/comp/recentWork';
import AddRecentWork from './addRecentWork';
import axios from 'axios';
import SpinnerLoading from '../utility/comp/spinnerLoading';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import TabsSelector from './tab';
import FinancialsScreen from './addCard';
// import DropDownPicker from "react-native-dropdown-picker";
import MultiSelectModal from '../utility/comp/multSelectModal';
// import RNPickerSelect from 'react-native-picker-select';
import PickerModal from '../utility/comp/pickerModal';
import LocalText from '../utility/comp/LocalText';
import { useTranslation } from 'react-i18next';
import LocalTextInput from '../utility/comp/localTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


const ProfileSetting = () => {
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
  


  
  
  const [companyDetails, setCompanyDetails] = useState('');
  const userID = useSelector(selectUserID);
  console.log("usefffr,",userID)
  const token = useSelector(selectToken);
  console.log("dsfsfsvv",token)
  const [billingCardInfo,setBillingCardInfo] = useState('')
  const userDetails = useSelector(selectUserDetails);
  const [progress, setProgress] = useState(0.5);
  const [socialUrl,setSocialUrl] = useState({
    linkedIn:"",
    fb:"",
    instagram:"",


  })

  const [twoButtonAlertDetails, setTwoButtonAlertDetails] = useState({
    visible: false,
    title: "",
    message: "",
    icon: "",
    button1Text: "Cancel",
    button2Text: "OK",
    onButton1Click: null,
    onButton2Click: null,
  });
  const screenWidth = Dimensions.get('window').width; // Get screen width for dynamic positioning
  const [activeTab,setActiveTab] = useState('Personal Details')
  const progressBarWidth = screenWidth * 0.9; // Set progress bar width to 80% of the screen width
  const tooltipPosition = progressBarWidth * progress - 30; // Adjust tooltip position based on progress
 const [showDatePicker,setShowDatePicker]= useState(false)
const [servicesList,setServicesList] = useState([])
const [tags, setTags] = useState([]);
const [recentWorkList,setRecentWorkList] = useState([])
const [packageDetails,setPackgeDetails] = useState('')
const [recentWorkStatus,setRecentWorkStatus]= useState(false)
const [localUserDetails,setLocalUserDetails] = useState('')
const [socialMsg,setSocialMsg] = useState('')
const date = new Date()
const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (userID) {
      CallAPIGetPromise(`/company/get-company/${userID}`, {}, token).then((res) => {
        if (res?.data?.data) {
          setCompanyDetails(res.data.data[0]);
        }
      });
    }
  }, [userID]);
console.log("vvv",userID,token)

const dispatch=useDispatch()
useEffect(() => {
  setLoading(true); 
  CallAPIGetPromise(`/user/${userId}`, {})
    .then((res) => {
      console.log("API Response:", res);
      if (res?.data?.data) {
        const userDetails = res.data.data[0];
        console.log("User Details to be set:", userDetails);
        dispatch(setUserDetails(userDetails));
        console.log("dsfs");
      } else {
        console.log("No user details found in the response.");
      }
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
      setLoading(false); 
    });
}, [userId, dispatch]); 


  useEffect(()=>{
CallAPIGetPromise('/service/getServices',token,dispatch).then(res=>{
  if(res?.data?.result){
    setServicesList(res.data.result)
  }
})
  },[])

  useEffect(()=>{
    CallAPIGetPromise(`/stripe/api/get-saved-cards/${userID}`,token,dispatch).then(res=>{
    if(res?.data?.data){
      setBillingCardInfo(res?.data?.data[0])
    }
    })
      },[])

      const getRecenetWorks = ()=>{
        CallAPIGetPromise(`/recent-work/get-recent-work/${userID}`,token,dispatch).then(res=>{
          if(res?.data?.result){
          setRecentWorkList(res.data.result)
          }
          })
      }
      

      useEffect(()=>{
        getRecenetWorks()
          },[])

  useEffect(()=>{
    CallAPIPostPromise('/stripe-sub/get-subscription-details',{
      userId:userID
    },token,dispatch).then(res=>{
     if(res?.data?.data){
setPackgeDetails(res.data.data.subscription)
     }
    })
      },[userID])

      useEffect(()=>{
if(userDetails){
  setLocalUserDetails(userDetails)
 
}
      },[userDetails])
const {t} = useTranslation()
      const saveSocialURLS = ()=>{
        dispatch(setSpinnerLoading('Saving'))
        CallAPIPutPromise('/profile/update-user-social',{
          userId:userID,
          socialLink:JSON.stringify(socialUrl)
        }).then(res=>{
          if(res.data.result){
            Toast.show({
              text1:t(`Social Media Url's Updated.`)
            })
            setLocalUserDetails(prev=>{
              return {
                ...prev,
                ua_social_url:JSON.stringify(socialUrl)
              }
            })
          }
        }).finally(()=>{
          dispatch(setSpinnerLoading(false))
        })
      }


  const handleDeleteRecentWork = (id)=>{
    dispatch(setSpinnerLoading('Deleting'))
    CallAPIDeletePromise(`/recent-work/delete-recent-work/${id}`,token).then((res)=>{
      Toast.show({
        text1:t('Recent Work Deleted')
      })
      getRecenetWorks()
    }).finally(()=>{
      dispatch(setSpinnerLoading(false))
    })
  }


  const handleSaveImg = async(path,data)=>{
    return new Promise((resolve,reject)=>{
      axios.post(`${apiUrl}${path}`,data
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        },
      }).then(o =>{
      if(o.status ===200){
        resolve(o)
      }else{
        reject()
      }
  
      }).catch(o=>{
        console.log(o)
        reject()
      })
    })

  }
  const getImgUrl =(path,file,name,type)=>{
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri, // File path
      name: file.fileName, // File name
      type: file.type, // File type (e.g., image/jpeg, video/mp4)
    });
dispatch(setSpinnerLoading('Uploading'))
    handleSaveImg(path,formData).then(res=>{
  if(res?.data?.data){
setLocalUserDetails(prev=>{
  return {
    ...prev,
    [name]:res.data.data[0].url
  }
})

updateUserImg(res.data.data[0].url,type)
  }
    })
  }

  const updateUserImg = (link,type)=>{
dispatch(setSpinnerLoading('Updating'))
 CallAPIPutPromise(`/profile/update-user-image/${userID}`,{
  image:link,
  imageType:type
 },token,dispatch).then(()=>{
  Toast.show({
    text1:t('Image Updated')
  })
 }).finally(()=>{
  dispatch(setSpinnerLoading(false))
 })
  }
  const onEditCoverPress = ()=>{
    launchImageLibrary({
      mediaType:'photo',

    },).then(res=>{
    if(res?.assets){
getImgUrl("/proposal/upload/cover",res.assets[0],'ua_cover_pic','coverPic')
    }
    })
  }

  const onEditLogoPress = ()=>{
    launchImageLibrary({
      mediaType:'photo',

    },).then(res=>{
    if(res?.assets){
getImgUrl("/proposal/upload/profile",res.assets[0],'ua_profile_pic','profilePic')
    }
    })
  }
  return (
    
    <View style={{
        flex:1,
        backgroundColor:'white'
    }}>
     

      {localUserDetails?.ua_cover_pic ? <ImageBackground
  style={{
    height: 190,
    backgroundColor:'gray',
    position: 'relative', // Ensure child elements respect absolute positioning
  }}
  source={{
    uri: localUserDetails?.ua_cover_pic ? localUserDetails.ua_cover_pic : '',
  }}
>
  <TouchableOpacity
    style={{
      position: 'absolute',
      top: 60, // Adjust distance from the top edge
      right: 10, // Adjust distance from the right edge
      borderRadius: 20, // Rounded background for better aesthetics
      padding: 8, // Add padding around the icon for better clickability
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onEditCoverPress}
  >
    <MaterialCommunityIcons name="pencil" size={24} color="white" />
  </TouchableOpacity>
</ImageBackground> :
<View
  style={{
    height: 190,
    backgroundColor:grayColor,
    justifyContent: 'center',
    flexDirection:'row',
    display:'flex',
    alignItems: 'center',
  }}
  
>

  <TouchableOpacity
    style={{
      justifyContent: 'center',
      flexDirection:'row',
      display:'flex',
      alignItems: 'center',
      height:190
    }}
    onPress={onEditCoverPress}
  >
    <Ionicons name={"camera-outline"} color={'#40514e'} size={40}/>

  </TouchableOpacity>
</View>}


    {/* <HomeHeader 
       position="absolute"
      /> */}
      {  <View style={{
 marginTop:-50,
 marginLeft:30,
 flexDirection:'row',
 alignItems:'baseline',
 marginBottom:10
      }}>
        {localUserDetails?.ua_profile_pic?    <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              overflow: 'hidden',
              borderColor: 'white',
              borderWidth: 5,
            }}
            source={{ uri: localUserDetails?.ua_profile_pic}} /> :<TouchableOpacity onPress={onEditLogoPress} style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#b0b8b4", // Soft border
              backgroundColor: "#f5f5f5", // Neumorphic effect
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
            }}>
              
            <Ionicons name={"camera-outline"} color={'#40514e'} size={40}/>
              </TouchableOpacity>}
         
          
              <LocalText style={{
        fontSize:20,
        fontWeight:'900',
        color:'black',
position:'absolute',
left:105,
bottom:15
    }}>
        {userDetails?.user_first_name+" "+ userDetails?.user_last_name}
  </LocalText>
    <MaterialCommunityIcons onPress={()=>{
      onEditLogoPress()
    }} style={{
      position:'absolute',
      right:20,
      bottom:10
    }} name="pencil" size={24} color="black" />

            </View>
            
           
            }
  
  <TabsSelector setActiveTab={setActiveTab} activeTab={activeTab} />

<ScrollView
        style={{ flex: 1 }}

      >
 


          {/* {tabsSelector(setActiveTab, activeTab)} */}

<View style={{
}}>
  
  {activeTab ==="Portfolio" && <View style={{
    borderBottomColor:grayColor,
    paddingVertical:30
    
}}>
<View style={{
    paddingHorizontal:20,
    
}}>

    <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
        }}>

<View style={{
          width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: '#E8ECF4',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        

    }}>

       
        <Icon name="facebook" size={20} color="#3366FF" />
      </View>


<TextInput    value={socialUrl.fb}  onChangeText={(text)=>{
  setSocialUrl(prev=>{
    return {
      ...prev,
      fb:text
    }
  })
}}     mode="outlined" style={[styles.inputPaper2,{flex:1,marginLeft:10}]} placeholder='www.example.com' />

        </View>

    
        <View style={{
            display:'flex',
            flexDirection:'row',
            marginTop:15,
            alignItems:'center'
        }}>

<View style={{
          width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: '#E0F7EA',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        

    }}>

       
        <Icon name="linkedin-square" size={20} color="#2DCB72" />
      </View>


<TextInput   value={socialUrl.linkedIn}  onChangeText={(text)=>{
  setSocialUrl(prev=>{
    return {
      ...prev,
      linkedIn:text
    }
  })
}}       mode="outlined" style={[styles.inputPaper2,{flex:1,marginLeft:10}]} placeholder='Username'/>

        </View>


        <View style={{
            display:'flex',
            flexDirection:'row',
            marginTop:15,
            alignItems:'center'
        }}>

<View style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: '#FFE9E9',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        

    }}>

       
        <Icon name="instagram" size={20} color="#FF6C6C" />
      </View>


<TextInput  value={socialUrl.instagram}  onChangeText={(text)=>{
  setSocialUrl(prev=>{
    return {
      ...prev,
      instagram:text
    }
  })
}}    mode="outlined" style={[styles.inputPaper2,{flex:1,marginLeft:10}]} placeholder='Username'/>

        </View>

<LocalButton onPress={saveSocialURLS} marginTop={30} title={'Submit'} color={'white'} backgroundColor={"#1f57d6"} />
<LocalButton border={'red'} onPress={()=>{
setTwoButtonAlertDetails({
  title:'Delete Account',
  message:'Are you sure to delete account details',
  button1Text:'Delete',
  button2Text:'Cancel',
  onButton1Click:()=>{
 CallAPIPostPromise('/del-account/v1/create',{
    userId: userID
  },token).then((res)=>{
Toast.show({
  text1:'Request Submited',
  text2:'Account details will be deleted in 10 days'
})
  })
  }
})
 
}} marginTop={20} title={'Delete Account'} color={'red'} bg={'white'} />

<LocalText style={{
  color:'green',
  fontSize:15,
  marginTop:9,
  fontWeight:700
}}>

  {socialMsg} 
</LocalText>


</View>




</View>}

{activeTab ==="Packages" &&
          <PackageDetails setActiveTab={setActiveTab} packageDetails={packageDetails} />
      
          }


          {activeTab ==="Personal Details" && localUserDetails && 
      <PersonalDetails setActiveTab={setActiveTab} token={token} dispatch={dispatch} setLocalUserDetails={setLocalUserDetails} localUserDetails={localUserDetails} setShowDatePicker={setShowDatePicker} date={date} servicesList={servicesList} tags={tags} userID={userID} />
          }

          {activeTab ==="Company Details" && 
            <CompanyDetails next={()=>{
              setActiveTab('Financials')
            }} userID={userID} token={token} setCompanyDetails={setCompanyDetails} companyDetails={companyDetails} />
          }

          {activeTab ==="Financials" && 
                      <View style={{
                        backgroundColor:grayColor2,
                        padding:10,
                      }}>
                
                <View style={{
                              backgroundColor:'white',
                              padding:20
                            }}>
      <LocalText style={{
        fontSize:16,
        fontWeight:700,
        color:'black'
      }}>
    Financials
    </LocalText>
      <View style={{
        marginTop:20
      }}>
{billingCardInfo ?   <CardDetails last4Digits={billingCardInfo.card.last4} cardholderName={billingCardInfo.billing_details.name} cardType={billingCardInfo.card.brand} /> :<FinancialsScreen />}
    
</View>
      </View>
      </View> 
          }

          {activeTab ==="Recent Work" && 
                           <View style={{
                            backgroundColor:'white',
                            padding:20,
                          }}>
                    
                    <View style={{

                                }}>
   
          <View style={{
          }}>
<LocalButton onPress={()=>{
  setRecentWorkStatus(true)
}} title={'Add Recent Work'} bg={"#1f57d6"} color={'white'}/>
            </View>
<View style={{
  marginTop:10
}}>
{recentWorkList.map((r,key)=>{
  return (
<RecentWorkCard onDelete={handleDeleteRecentWork} details={r}  key={key}/>

  )
})}
</View>
            </View>
            </View>
          }

          
</View>
     


            
</ScrollView>
<SpinnerLoading />
<AddRecentWork closeModal={()=>{
  setRecentWorkStatus(false)
  getRecenetWorks()
}}  modalVisible={recentWorkStatus}/>
<TwoButtonAlert  setDetails={setTwoButtonAlertDetails} details={twoButtonAlertDetails}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    progressContainer: {
      position: 'relative',
      width: '80%',
      marginVertical: 20,
    },
    tooltip: {
      position: 'absolute',
      top: -25,
      backgroundColor: '#3366FF',
      borderRadius: 5,
      paddingHorizontal:7,
      paddingVertical: 2,
    },
    tooltipText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    inputPaper: {
      marginBottom: 15,
      backgroundColor: "white",
      color:'black'
    },
    inputPaper2: {
      backgroundColor: "#f9f9f9",
    },
  });
export default ProfileSetting

const PackageDetails = ({packageDetails,setActiveTab}) =>{
  return <View style={{
    backgroundColor: grayColor2,
    padding: 10,
  }}>
    <View style={{
      backgroundColor: 'white',
      padding: 20
    }}>

      <View>
        <LocalText style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 20,
          color: 'black'
        }}>
          Plans & Pricing
      </LocalText>

        <LocalText style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'gray',
          marginTop: 8
        }}>
          Explore our high quality designed Contract Automation Services.
      </LocalText>
      </View>

      <Image source={{ uri: 'https://res.cloudinary.com/dr6rh7hon/image/upload/v1719416705/banner_gydtbh.png' }} style={{
        height: 70,
        marginVertical: 20
      }} />
      {packages.map((pkg, index) => (
        <ProfilePackageCard
          key={index}
          subTitle={pkg.subTitle}
          bg={pkg.title === packageDetails.cpp_package ? primaryColor:"#28A745"}
          title={pkg.title}
          price={pkg.price}
          frequency={pkg.frequency}
          saveText={pkg.saveText}
          features={pkg.features}
          buttonText={pkg.title === packageDetails.cpp_package ? 'Cancel SubScription':pkg.buttonText}
          onButtonPress={() => {
            Alert.alert('Alert',"You can purchase it from web portal")
          }} />
      ))}

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingVertical: 10
      }}>
        <LocalButton onPress={()=>{
          setActiveTab('Personal Details')
        }} title={'Start Building your Profile'} bg={"#1f57d6"} color={'white'} />
      </View>
    </View>

  </View>;
}

const PersonalDetails = ({localUserDetails,setActiveTab, setLocalUserDetails, date, servicesList,  userID,token,dispatch})=> {
const [skillsList,setSkillsList] = useState([])
const [selectedSkills,setSelectedSkills] = useState([]) 
const handleChange = (name,value)=>{
    setLocalUserDetails(prev=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }
  const [showDatePicker,setShowDatePicker] =useState(false)
  const [activeInput,setActiveInput] = useState('')
   
  const handleConfirmDate = (selectedDate)=>{
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false)
    setLocalUserDetails(prev=>{
      return {
        ...prev,
        [activeInput]:currentDate
      }
    })
  }

  const tags =localUserDetails.ua_skill? JSON.parse(localUserDetails.ua_skills).map((p,k)=> p.label):[]
  const handleSavePersonalDetails = ()=>{
    const data = {
        "description": localUserDetails.ua_description,
        "skills":JSON.stringify(selectedSkills.map(o=>{
          return{
            label:o,
            value:o
          }
        })) ,
        "birthDate": localUserDetails.ua_birth_date?moment(localUserDetails.ua_birth_date).valueOf():null,
        // "joiningDate": localUserDetails.ua_joining_date? moment(localUserDetails.ua_joining_date).valueOf():null,
        "workAvailbility":localUserDetails.ua_work_availbility,
        "experience": localUserDetails.ua_exp,
        "workHours": localUserDetails.ua_work_hours,
        "address":localUserDetails.ua_address,
        "city": localUserDetails.ua_city,
        "zipcode":localUserDetails.ua_zip_code,
        "country": localUserDetails.ua_country,
        "coverPic": localUserDetails.ua_cover_pic,
        "profilePic":localUserDetails.ua_profile_pic,
        "socialLink": localUserDetails.ua_social_url,
        "profile": localUserDetails.ua_profile
    }

    dispatch(setSpinnerLoading('Saving'))
    CallAPIPutPromise(`/profile/update-user/${userID}`,data,token,dispatch).then((res)=>{
      Toast.show({
        text1:t('Profile updated')
      })
setActiveTab('Financials')
    }).finally(()=>{
      dispatch(setSpinnerLoading(false))
    })
  }
  const getSkilsAccordingProfession = (id)=>{
    CallAPIGetPromise(`/category/get-sub-categories/${id}`,token,dispatch).then(res=>{
      if(res.data){
        setSkillsList(res.data.result.map(o=>o.sc_category))
      }
    }).catch((e)=>{
      console.log(e)
    })
  }
  

  const [skilsModalStatus, setSkillsModalStatus] = useState(false);
  const [professionModalStatus, setProfessinModalStatus] = useState(false);
  const [workModalStatus, setWorkModalStatus] = useState(false);


  return <View  style={{
    backgroundColor: 'white',
    padding: 20,
  }}>

    <View style={{
     
    }}>

      <LocalTextInput
        label={'First Name'}
        onChangeText={(text) => {
          handleChange('user_first_name',text)
        } }
        value={localUserDetails.user_first_name}

        style={[styles.inputPaper, ]}
        mode="outlined"
      ></LocalTextInput>


      <LocalTextInput
        label={'Last Name'}
        onChangeText={(text) => {
          handleChange('user_last_name',text)
        } }
        value={localUserDetails.user_last_name}

        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>


      <LocalTextInput
   onChangeText={(text) => {
    handleChange('user_phone',text)
  } }
  value={localUserDetails.user_phone}

        label={'Phone Number'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>

      <LocalTextInput
    onChangeText={(text) => {
    handleChange('user_email',text)
  } }
  value={localUserDetails.user_email}
        label={'Email Address'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>


      <TouchableOpacity onPress={() => {
        setShowDatePicker(true);
        setActiveInput('ua_birth_date')
      } }>
        <LocalTextInput
          value={localUserDetails.ua_birth_date?moment(localUserDetails.ua_birth_date).format('DD MMM, YYYY'):""}
          onPress={() => {
            setShowDatePicker(true);
            setActiveInput('ua_birth_date')
          } }
          label={'Date of Birth'}
          readOnly
          style={[styles.inputPaper, { marginTop: 7 }]}
          mode="outlined"
        ></LocalTextInput>
      </TouchableOpacity>
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date"
                 
                  onCancel={()=>{
                    setShowDatePicker(false)
                  }}
                  onConfirm={handleConfirmDate}
                />
      {/* <TouchableOpacity onPress={() => {
        setShowDatePicker(true);
        setActiveInput('ua_joining_date')
      } }>
        <LocalTextInput
          value={localUserDetails.ua_joining_date?moment(localUserDetails.ua_joining_date).format('DD MMM, YYYY'):""}
          onPress={() => {
            setShowDatePicker(true);
            setActiveInput('ua_joining_date')
          } }
          label={'Joining Date'}
          readOnly
          style={[styles.inputPaper, { marginTop: 7 }]}
          mode="outlined"
        ></LocalTextInput>
      </TouchableOpacity> */}


      {/* <LocalText style={{ color: 'gray', marginBottom: 6, marginTop: 5 }}>
       Profession
    </LocalText> */}
      {/* {Platform.OS==="ios"&&      <TouchableOpacity onPress={()=>{
        setProfessinModalStatus(true)
      }} style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 55,
        borderRadius: 6,
        overflow: 'hidden',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15
      }}>
     
<LocalText style={{

}}>
{localUserDetails.ua_profile?JSON.parse(localUserDetails.ua_profile).label:""}

</LocalText>
      </TouchableOpacity>}
 

      <PickerModal
        options={servicesList.map(s=>{
          return {
            label:s.cat_name,
            value:s.cat_name
          }
        })}
        selectedValue={localUserDetails.ua_profile?JSON.parse(localUserDetails.ua_profile).label:""}

        onValueChange={(itemValue, itemIndex) => {
          if(itemValue){
           const filter = servicesList.filter(o=>o.cat_name === itemValue)
             setLocalUserDetails(prev=>{
               return{
                 ...prev,
                 ua_profile:JSON.stringify({
                   value:filter[0].cat_id,
                   label:filter[0].cat_name,
                 })
               }
             })
             if(filter[0]){
               getSkilsAccordingProfession(filter[0].cat_id)
 
             }
          }
      
         } }
        isVisible={professionModalStatus}
        onClose={() => {setProfessinModalStatus(false)}}
      /> */}

      {/* <LocalText style={{ color: 'gray', marginBottom: 6, marginTop: 15 }}>
        Skills(Type the skills and press enter)
    </LocalText> */}
      {/* <MultiSelectModal
        options={skillsList}
        selectedItems={selectedSkills}
        setSelectedItems={setSelectedSkills}
        modalVisible={skilsModalStatus}
setModalVisible={setSkillsModalStatus}
/> */}

  

{/* <LocalText style={{ color: 'gray', marginBottom: 6, }}>
Work Availability
    </LocalText>
      {Platform.OS==="ios" &&      <TouchableOpacity onPress={()=>{
        setWorkModalStatus(true)
      }} style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 55,
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 8,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
      }}> */}

{/* <LocalText>
  {localUserDetails.ua_work_availbility?JSON.parse(localUserDetails.ua_work_availbility).value:""}
</LocalText> */}

      {/* </TouchableOpacity>} */}
 

      {/* <PickerModal
        options={[{
          name: 'Full Time'
        }, {
          name: 'Part Time'
        }].map(s=>{
          return {
            label:s.name,
            value:s.name
          }
        })}
        selectedValue={localUserDetails.ua_work_availbility?JSON.parse(localUserDetails.ua_work_availbility).value:""}
        onValueChange={(itemValue, itemIndex) => {
          handleChange('ua_work_availbility',JSON.stringify({
            label:itemValue,
            value:itemValue
          }))
        } }
        isVisible={workModalStatus}
        onClose={() => {setWorkModalStatus(false)}}
      /> */}
      {/* <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_exp',text)
  } }
  value={localUserDetails.ua_exp}
        label={'Experience (In Years)'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>

      <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_work_hours',text)
  } }
  value={localUserDetails.ua_work_hours}
        label={'Work Hours'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput> */}

      <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_city',text)
  } }
  value={localUserDetails.ua_city}
        label={'City'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>

      <LocalTextInput
 
  value={localUserDetails.ua_country}
        label={'Country'}
        readOnly
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>

      <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_zip_code',text)
  } }
  value={localUserDetails.ua_zip_code}
        label={'Zip Code'}
   
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
      ></LocalTextInput>

      <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_address',text)
  } }
  value={localUserDetails.ua_address}
        label={'Address'}

   
        multiline={true}
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
        numberOfLines={3}
      ></LocalTextInput>

      {/* <LocalTextInput
    onChangeText={(text) => {
    handleChange('ua_address',text)
  } }
  value={localUserDetails.ua_address}
        label={'Description'}

   
        multiline={true}
        style={[styles.inputPaper, { marginTop: 7 }]}
        mode="outlined"
        numberOfLines={3}
      ></LocalTextInput> */}
      <LocalButton onPress={handleSavePersonalDetails} marginTop={20} title={"submit"} color={'white'} bg={'#325573'} />

    </View>


  </View>;
}
<SpinnerLoading />

// const CompanyDetails =({companyDetails,token,setCompanyDetails,userID,next})=> {
//   const [showDatePicker,setShowDatePicker] =useState(false)
//   const [activeInput,setActiveInput] = useState('')
   
//   const handleConfirmDate = (input,selectedDate)=>{
//     const currentDate = selectedDate || new Date();
//     setShowDatePicker(false)
//     setCompanyDetails(prev=>{
//       return {
//         ...prev,
//         [activeInput]:currentDate
//       }
//     })
//   }

//   const date = new Date()
  
//   const handleChange = (name,value)=>{
//     setCompanyDetails(prev=>{
//       return {
//         ...prev,
//         [name]:value
//       }
//     })
//   }
// const dispatch = useDispatch()
//   const handleSaveImg = async(path,data)=>{
//     return new Promise((resolve,reject)=>{
//       dispatch(setSpinnerLoading('uploading'))
//       axios.post(`${apiUrl}${path}`,data
//       ,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",

//         },
//       }).then(o =>{
//         console.log(o)
//       if(o.status ===200){
//         resolve(o)
//       }else{
//         reject()
//       }
  
//       }).catch(o=>{
//         console.log(o)
//         reject()
//       }).finally(()=>{
//         dispatch(setSpinnerLoading(false))
//       })
//     })

//   }
//   const getImgUrl =(path,file,name)=>{
//     const formData = new FormData();
//     formData.append('file', {
//       uri: file.uri, // File path
//       name: file.fileName, // File name
//       type: file.type, // File type (e.g., image/jpeg, video/mp4)
//     });

//     handleSaveImg(path,formData).then(res=>{
//   if(res?.data?.data){
// setCompanyDetails(prev=>{
//   return {
//     ...prev,
//     [name]:res.data.data[0].url
//   }
// })
//   }
//     })
//   }

//   const saveCompany = ()=>{
//     dispatch(setSpinnerLoading('Saving'))
//     CallAPIPutPromise(`/company/update-company/${userID}`,{
//       "companyName": companyDetails.cc_company_name,
//       "companyRegisteredNumber": companyDetails.cc_company_registered_number,
//       "phoneNumber":companyDetails.cc_phone_number,
//       "companyEmail":companyDetails.cc_company_email,
//       "registrationDate": companyDetails.cc_registration_date,
//       "address": companyDetails.cc_address,
//       "city":companyDetails.cc_city,
//       "state":companyDetails.cc_state,
//       "country":companyDetails.cc_country,
//       "zipCode":companyDetails.cc_zip_code,
//       "insuranceDocument":companyDetails.cc_insurance_documentation_url,
//       "licenceDocument":companyDetails.cc_licence_documentation_url,
//       "contractorDocument": companyDetails.cc_licence_documentation_url,
//       "contractorVideoUrl": companyDetails.cc_video_url,
//       "logoUrl": companyDetails.cc_logo_url,
//   },token,dispatch).then(res=>{
//     Toast.show({
//       text1:t('Company Updated')
//     })
//     next()
//   }).finally(()=>{
//     dispatch(setSpinnerLoading(false))
//   })}

//   const handleDeleteDocument = (type)=>{
//     return new Promise((resolve, reject) => {
//       dispatch(setSpinnerLoading('Deleting'))
//       CallApiPatchpromise(`/company/delete-document`,{
//           "userId": userID,
//           "documentType": type
//       }).then(res=>{
//         console.log(res)
//   resolve()
//       }).finally(()=>{
//         dispatch(setSpinnerLoading(false))
//       })
//     })
 
//   }
  
//   return <View style={{
//     backgroundColor: 'white',
//     padding: 20,
//   }}>

//     <View style={{

//     }}>

//       <LocalTextInput
//     onChangeText={(text) => {
//       handleChange('cc_company_name',text)
//     } }
//     value={companyDetails.cc_company_name}
//         label={'Company Name'}
   
//         style={[styles.inputPaper, ]}
//         mode="outlined"
//       ></LocalTextInput>

//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_company_registered_number',text)
//     } }
//     value={companyDetails.cc_company_registered_number}
//         label={'Company Registered Number'}
   
//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>
//                 <DateTimePicker
//                   isVisible={showDatePicker}
//                   mode="date"
 
//                   onCancel={()=>{
//                     setShowDatePicker(false)
//                   }}
//                   onConfirm={handleConfirmDate}
//                 />
//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_phone_number',text)
//     } }
//     value={companyDetails.cc_phone_number}
//         label={'Company Phone Number'}
   
//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>

//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_company_email',text)
//     } }
//     value={companyDetails.cc_company_email}
//         label={'Company Email Address'}
   
//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>

// <TouchableOpacity onPress={()=>{
//   setShowDatePicker(true)
//   setActiveInput('cc_registration_date')
// }}>
// <LocalTextInput

// value={ moment(companyDetails.cc_registration_date).format('DD MMM, YYYY')}
//     label={'Company Registered Date'}
// readOnly
//     style={[styles.inputPaper]}
//     mode="outlined"
//   ></LocalTextInput>
// </TouchableOpacity>
  

//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_address',text)
//     } }
//     value={companyDetails.cc_address}
//         label={'Company Address'}
   
//         multiline={true}
//         numberOfLines={3}
//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>

//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_city',text)
//     } }
//     value={companyDetails.cc_city}
//         label={'City'}

//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>
//       <LocalTextInput
//      readOnly
//     value={companyDetails.cc_country}
//         label={'Country'}

//         style={[styles.inputPaper]}
//         mode="outlined"
//       ></LocalTextInput>

//       <LocalTextInput
//          onChangeText={(text) => {
//       handleChange('cc_zip_code',text)
//     } }
//     value={companyDetails.cc_zip_code}
//         label={'Zip Code'}

//         style={[styles.inputPaper]}
//         mode="outlined"
//         readOnly
//       ></LocalTextInput>

//       <LocalText style={{
//         fontSize: 16,
//         color: 'black',
//         fontWeight: '500'
//       }}>
//         Showing a Corporate Video to your customers can always earn you Integrity and trust

//     </LocalText>

//       <LocalText style={{
//         color: 'gray',
//         marginTop: 10
//       }}>
//         Now you can do it by simply uploading your Official Corporate Video and our system will present it to the Homeowners who are always searching for best certified contractors for their Home Improvement Projects.


//     </LocalText>
//       <View style={{
//         marginTop: 20
//       }}>

//         <UploadCard onDelete={()=>{
//           handleDeleteDocument(profileVideo).then(()=>{
//             setCompanyDetails(prev=>{
//               return{
//                 ...prev,
//                 cc_video_url:""
//               }
//             })
//           })
      
//         }}     allowMediaType="video" // Accept only videos
//   onChange={(file) => {
//     getImgUrl('/proposal/upload/profileVideo',file,'cc_video_url')
//   }} 
//   value={companyDetails.cc_video_url}
// title={'Upload your free video up to 30 seconds now and win more projects'} type={'video'} />
//       </View>

//       <LocalText style={{
//         color: 'black',
//         marginTop: 20,
//         fontWeight: 500
//       }}>
//         Upload your Insurance Document


//     </LocalText>

//       <View style={{
//         marginTop: 20
//       }}>

//         <UploadCard onDelete={()=>{
//         handleDeleteDocument('insuranceDocumentation').then(()=>{
//           setCompanyDetails(prev=>{
//             return{
//               ...prev,
//               cc_insurance_documentation_url:""
//             }
//           })
//         })
      
//         }}   allowMediaType="photo" // Accept only videos
//   onChange={(file) => {
//     getImgUrl('/proposal/upload/insurance',file,'cc_insurance_documentation_url')
//   }} value={companyDetails.cc_insurance_documentation_url} 
  
//   title={'Drop files here or click to upload.'} type={'video'} />
//       </View>

//       <LocalText style={{
//         color: 'black',
//         marginTop: 20,
//         fontWeight: 500
//       }}>
//         Upload your Company Licence Document

//     </LocalText>

//       <View style={{
//         marginTop: 20
//       }}>

//         <UploadCard onDelete={()=>{
//           handleDeleteDocument('licenceDocumentation').then(()=>{
//             setCompanyDetails(prev=>{
//               return{
//                 ...prev,
//                 cc_licence_documentation_url:""
//               }
//             })
//           })
 
//         }}   value={companyDetails.cc_licence_documentation_url}   onChange={(file) => {
//     getImgUrl('/proposal/upload/companyLicence',file,'cc_licence_documentation_url')
//   }} title={'Drop files here or click to upload.'} allowMediaType='photo' />
//       </View>

//       <LocalText style={{
//         color: 'black',
//         marginTop: 20,
//         fontWeight: 500
//       }}>
//         Upload your Contractor Licence Document
//     </LocalText>

//       <View style={{
//         marginTop: 20
//       }}>

//         <UploadCard onDelete={()=>{
//           handleDeleteDocument('contractorLicence').then(()=>{
//             setCompanyDetails(prev=>{
//               return{
//                 ...prev,
//                 cc_contractor_documentation_url:""
//               }
//             })
//           })
       
//         }}  onChange={(file) => {
//     getImgUrl('/proposal/upload/contractorLicence',file,'cc_contractor_documentation_url')
//   }}  allowMediaType='photo' value={companyDetails.cc_contractor_documentation_url} title={'Drop files here or click to upload.'}  />
//       </View>


//       <LocalText style={{
//         color: 'black',
//         marginTop: 20,
//         fontWeight: 500
//       }}>
//         Upload your Company Logo
//     </LocalText>

//       <View style={{
//         marginTop: 20
//       }}>

//         <UploadCard onDelete={()=>{
//           setCompanyDetails(prev=>{
//             return{
//               ...prev,
//               cc_logo_url:""
//             }
//           })
//         }} allowMediaType='photo' onChange={(file) => {
//     getImgUrl('/proposal/upload/companyLogo',file,'cc_logo_url')
//   }}   value={companyDetails.cc_logo_url} title={'Drop files here or click to upload.'}  />
//       </View>

//       <LocalButton onPress={saveCompany} marginTop={20} title={"Next"} bg={"#1f57d6"} color={'white'} />


    



