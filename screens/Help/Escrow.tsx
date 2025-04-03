import React, { useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, Easing, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { GlobalStyles } from "../../constants/style";
import { postData } from "../../slices/Escrowthunk/Escrow";
import SubmitModal from "./sumbitmodal";
import FromModal from "./sumbitmodal";




const  {width, height } = Dimensions.get("window")

type Option = {
  label: string;
  value: string;
};




const options: Option[] = [
  { label: 'Accounting', value: 'Accounting' },
  { label: 'Alarm Company', value: 'Alarm_Company' },
  { label: 'Architecture', value: 'Architecture' },
  { label: 'Auto Repair', value: 'Auto_Repair' },
  {label: 'Blacktop-Paver', value: 'Blacktop-Paver'},
   {label: 'Carpenter', value: 'Carpenter'},
    {label: 'Desk-Installer', value: 'Desk-Installer'},
    {label: 'Desk-Installer', value: 'Desk-Installer'},
{label: 'Electrician', value: 'Electrician'},
{label: 'Exterminator Contractor', value: 'Exterminator_Contractor'},
{label: 'Fencing', value: 'Fencing'},
{label: 'Garage Door Campany', value: 'Garage Door_Company'},
{label: 'General Contractor', value: 'General_Contractor'},
{label: 'Gutter Company', value: 'Gutter_Comapany'},
{label: 'Home Automation', value: 'Home_Automation'},
{label: 'HVAC Heating and cooling Contractor', value: 'HVAC Heating and cooling Contractor'},
{label: 'Insulation_Contractor', value: 'Insulation_Contractor'},
{label: 'Irrigation Contractor', value: 'Irrigation_Contractor'},
{label: 'Junk Removal', value: 'Junk_Removal'},
{label: 'Landscape Architect', value: 'Landscape_Architect'},
{label: 'Landscaper', value: 'Landscaper'},
{label: 'Packers and Movers', value: 'Packers and Movers'},
{label: 'Painting Contractor', value: 'Painting_Contractor'},
{label: 'Plumber', value: 'Plumber'},
{label: 'Property Management', value: 'Property Management'},
{label: 'Realtors', value: 'Realtor'},
{label: 'Roofing Contractors', value: 'Roofing Contractors'},
{label: 'Septic Company', value: 'Septic Company '},
{label: 'Sheet Rock', value: 'SHeet Rock'},
{label: 'Siding Contractor', value: 'Siding Conractor '},
{label: 'solar', value: 'Solar '},
{label: 'Stairs and Ralling', value: 'Stairs and Railings '},
{label: 'Tile and Masonry Company ', value: 'Tile and Masonry Company '},
{label: 'Weldors', value: 'Weldors'},
{label: 'Window and Dooor', value: 'Window and Door'},
{label: 'Wood Floor', value: 'WoodFloor'},
];



const Escrow = () =>{
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [isOpen, setIsOpen] = useState(false);
 const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
const [isModalVisible, setModalVisible] = useState(false);
 const [loading, setLoading] = useState(false);


 const handleSubmit = async () => {
    // Check for missing fields
    if (!firstName || !lastName || !phoneNumber || !email || !selectedOption) {
      alert("Please fill in all fields.");
      return;
    }
     setLoading(true);

    const requestData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      selectedOption,
    };

    try {
        
      const response = await postData(requestData);
      console.log('Form submitted successfully:', response);
      setModalVisible(true);
      //alert("Form submitted successfully");
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("An error occurred while submitting the form");
    } finally {
      setLoading(false); // Stop loading
    }
  };

const closeModal = () => {
    setModalVisible(false);
  };











 const animation = useRef(new Animated.Value(0)).current;

  // Toggle function for opening/closing the picker
  const togglePicker = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false, // Can't use native driver for height animations
    }).start();
  };

  // Handle option selection
  const handleOptionPress = (value: string) => {
    setSelectedOption(value);
    togglePicker();
  };

  // Height interpolation for smooth expand/collapse
  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
     outputRange: [0, 3 * 50], // Each option is 50px high
  });

  // Rotate icon interpolation
  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });



    return(
<KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "white", padding: 10 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      enableOnAndroid
      extraHeight={100} // Adjust extra height when keyboard opens
      keyboardShouldPersistTaps="handled" // Allow taps outside to dismiss keyboard
    >
      
        <View >
            <Text style={style.escrow}>Escrow Alert</Text>
            <View style={style.line}></View>
        </View>
        <View style={{ paddingTop: 20 }}>
  <TouchableOpacity onPress={togglePicker} style={style.selector}>
    <Text style={style.selectorText}>
      {selectedOption || "Select an Option"}
    </Text>
    <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
      {/* You can add an icon here if needed */}
    </Animated.View>
  </TouchableOpacity>

  <Animated.View style={[style.optionsContainer, { height: heightInterpolation }]}>
    <ScrollView>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleOptionPress(option.value)}
          style={style.option}
        >
          <Text style={style.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </Animated.View>
  <View style={{paddingTop:20}}>
    <Text style={style.frist}>First Name</Text>
  </View>
  <View>
    <TextInput placeholder="Enter Your First Name"
    value={firstName}
    onChangeText={setFirstName}
     style={style.input}>
    </TextInput>
  </View>
  <View style={{paddingTop:20}}>
    <Text style={style.frist}>Last Name</Text>
  </View>
  <View>
    <TextInput placeholder="Enter Your Last Name" 
    value={lastName}
    onChangeText={setLastName} style={style.input}>
    </TextInput>
    <View style={{paddingTop:20}}>
    <Text style={style.frist}>Phone Number</Text>
  </View>
  <View>
    <TextInput placeholder="Enter Your Phone Number"
     value={phoneNumber}
     onChangeText={setPhoneNumber}
      style={style.input}>
    </TextInput>
  </View>

  
  </View>
  <View style={{paddingTop:20}}>
    <Text style={style.frist}>Email</Text>
  </View>
  <View>
    <TextInput placeholder="Enter Your Email"  value={email}
    onChangeText={setEmail}  style={style.input}>
    </TextInput>
  </View>
  <View style={{paddingTop:20}}>
    <TouchableOpacity onPress={handleSubmit}
     style={[style.sumbitbutton,{backgroundColor:GlobalStyles.colors.primary }]} 
     disabled={loading} >
           <Text style={style.textsumbit}>Submit</Text>
         </TouchableOpacity>

    
     <FromModal visible={isModalVisible} onClose={closeModal} />
    
    
    
    </View>
</View>

        {/* Loading Overlay */}
      {loading && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color={GlobalStyles.colors.primary } />
        </View>
  )}





    </KeyboardAwareScrollView>

    )
}



const style =StyleSheet.create({

escrow:{
     fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android shadow effect
    paddingBottom:15,
},
line:{

    height: 2,
   width:width,
   alignSelf:'center',
    backgroundColor: 'silver', 
    borderRadius: 1,},
     selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectorText: {
    fontSize: 16,
  },
  optionsContainer: {
    bottom:5,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    
    marginTop: 5,
  },
  option: {
    
    padding: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
frist:{ fontSize: 16,
    fontWeight: '600',       
    color: '#333',           
    marginBottom: 8,  },



    input:{
        width:width*0.9,
        height: 45,                   
    borderColor: '#ddd',   
    borderWidth: 1,               
    borderRadius: 8,
    paddingLeft: 10,                
    fontSize: 16,                
    backgroundColor: '#fff',      
  },
sumbitbutton:{
    
    paddingVertical: 12,             
    paddingHorizontal: 30,           
    borderRadius: 25,                
    elevation: 5,                    
    shadowColor: '#000',            
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,              
    shadowRadius: 10,                
    justifyContent: 'center',       
    alignItems: 'center',     
    marginTop:25    
},
textsumbit:{color: '#fff',                 
    fontSize: 18,                    
    fontWeight: 'bold',              
    textTransform: 'uppercase'},

    loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it appears on top of other elements
  },
})
export default Escrow


function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
