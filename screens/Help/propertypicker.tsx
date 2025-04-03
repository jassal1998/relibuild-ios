import React, { useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



type Option = {
  label: string;
  value: string;
};
const options: Option[] = [
{ label: 'Apartment', value: 'Apartment' },
  { label: 'Bungalow', value: 'Bungalow' },
  { label: 'Cando', value: 'Cando' },
  { label: 'House', value: 'House' },
  { label: 'Land', value: 'Land' },
  { label: 'Single Family', value: 'Single Family' },
];



    

const Propertypepicker = ()=>{
 const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [isOpen, setIsOpen] = useState(false);




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
 <View style={{}}>
    <View><Text style={style.select}>Property type</Text></View>
<TouchableOpacity onPress={togglePicker} style={style.selector}>
   
    <Text style={style.selectorText}>
      {selectedOption || "Select "}
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
 <View>

 </View>



 </View>
     )
    }
 
const  style=StyleSheet.create({
selectorText: {
    fontSize: 16,
  },
  optionsContainer: {
    bottom:7,
    overflow: "hidden",
 
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
       width:'100%',
        height: 45,                   
    borderColor: '#ddd',   
    borderWidth: 1,               
    borderRadius: 8,
    paddingLeft: 10,                
    fontSize: 16,                
    backgroundColor: '#fff',      
  },
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
select:{ 
  color: '#676767',             
  fontSize: 16,                 
  fontWeight: '800',                     
  letterSpacing: 0.5,           
    lineHeight: 24, }

})





export default Propertypepicker;
