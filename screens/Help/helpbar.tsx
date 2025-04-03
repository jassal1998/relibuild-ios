// import React, { useEffect, useRef, useState } from "react";
// import { Button, Dimensions, Image, Keyboard, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { Slider } from "react-native-elements";
// import { FlatList } from "react-native-gesture-handler";
// import { GlobalStyles } from "../../constants/style";
// import { useFocusEffect, useNavigation } from "@react-navigation/native";

// import { Ionicons } from "@expo/vector-icons";
// import Picker from "./picker";




// const { width, height } = Dimensions.get("window");

// const data = [
//   { id: '1', title: 'Title  01' },
//   { id: '2', title: 'Title 02' },
//   { id: '3', title: 'Title 03' },
//   { id: '4', title: 'Title 04' },
//   { id: '5', title: 'Title 05' },
//   { id: '6', title: 'Title 06' },

// ];

// const renderItem = ({ item }) => (
//     <TouchableOpacity style={style.button}>
//       <Text style={style.buttonText}>{item.title}</Text>
//     </TouchableOpacity>
//   );



// const Helpbar = () => { 
//   const navigation: any =useNavigation()
// const searchInputRef = useRef<TextInput | null>(null);
//  const [searchText, setSearchText] = useState('');
//   const [filteredData, setFilteredData] = useState(data);





// const handleSearch = (text) => {
//     setSearchText(text);
//     if (text.trim() === '') {
//       setFilteredData(data); // Reset to full data if search is empty
//     } else {
//       const filtered = data.filter((item) =>
//         item.title.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };




//  useFocusEffect(
//     React.useCallback(() => {
//       console.log('HelpScreen focused - Focusing TextInput');
//       setTimeout(() => {
//         if (searchInputRef.current) {
//           searchInputRef.current.focus();
//           console.log('TextInput focused');
//         } else {
//           console.log('TextInput ref is null');
//         }
//       }, 300); 
//     }, [])
//   );

//   useEffect(() => {
    
//     console.log('HelpScreen mounted - Focusing TextInput');
//     setTimeout(() => {
//       if (searchInputRef.current) {
//         searchInputRef.current.focus();
//         console.log('TextInput focused on mount');
//       } else {
//         console.log('TextInput ref is null');
//       }
//     }, 300); 
   
//     return () => {
//       Keyboard.dismiss();
//       console.log('Keyboard dismissed');
//     };
//   }, []); // This ef


//  const [range, setRange] = useState(0); 
//  const [modalVisible, setModalVisible] = useState(false);
//  const [hasModalShown, setHasModalShown] = useState(false);


//   const handleRangeChange = (value) => {
//     setRange(value); 
// if(value>=50000){
//   setModalVisible(true)
//   setHasModalShown(true)
// }

//     };
//     const closeModal =()=>{
//       setModalVisible(false)
//       setHasModalShown(false)
//     }
//      const resetSlider = () => {
//     setRange(0); // Reset the slider value to 0
//     setHasModalShown(false); // Allow modal to appear again when threshold is crossed
//     setModalVisible(false); // Close the modal
//   };


//     return (
//     <ScrollView style={{flex:1}}>
//      <View style={style.container}>
//       <View style={{ alignItems: "center" }}>
//           <TextInput
//             placeholder="Search..." 
//             value={searchText}
//          ref={searchInputRef}
//          onChangeText={handleSearch}
//             style={style.sreach}
//             placeholderTextColor="#999"
//           />
          
//         </View>
//         {filteredData.length === 0 ? (
//         <Text style={style.noDataText}>No data available</Text>
//       ) : (
//         <>
//           <View style={{paddingTop:10,padding:10}}>
//             <Text style={{fontWeight:'bold',fontSize:20}}>Recent searches</Text>
//             <View style={{flexDirection:'row',paddingTop:10}}>
//                 <Ionicons name="search" size={20}/>
//                 <Text style={{fontWeight:'800',fontSize:15,left:10}}>Test Property 1</Text>
//             </View>
//             <View style={{flexDirection:'row',paddingTop:10}}>
//                 <Ionicons name="search" size={20}/>
//                 <Text style={{fontWeight:'800',fontSize:15,left:10}}>Test Property 1</Text>
//             </View>
//             <View style={{flexDirection:'row',paddingTop:10}}>
//                 <Ionicons name="search" size={20}/>
//                 <Text style={{fontWeight:'800',fontSize:15,left:10}}>Test Property 1</Text>
//             </View>
//         </View>
       


//         <View style={style.type}>
//             <Text style={style.property}> Property Type</Text>
//         </View>
       
      

//       <FlatList
//         data={filteredData}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         numColumns={2} // Displays 2 buttons per row
//         contentContainerStyle={style.flatListContainer}
        
//       />
     
//      <View>
//              <Text style={style.zip}>ZipCode</Text>
//              <TextInput placeholder=""
//                    style={style.code}                   >
     
//              </TextInput>
//            </View>
      
//       <View style={{flexDirection:'row',paddingTop:20,alignItems:'flex-start',}}>
//         <View style={{width:'30%',flexDirection:'row',alignItems:'center',}} >
//         <Text style={{fontSize:15,color:'Balck',fontWeight:'bold',paddingRight:10}}>Budget</Text>
//         <TextInput style={{borderWidth:1,width:'100%',height:40,borderColor:"#676767",borderRadius:10,}}></TextInput>
//         <Text style={{textAlign:"center",fontSize:15,color:'Balck',fontWeight:'bold',paddingRight:10,paddingLeft:10}}>to</Text>
//         <TextInput style={{borderWidth:1,width:'100%',height:40,borderColor:"#676767",borderRadius:10,}}></TextInput>
//         </View>
//      </View>
    
//          <View style={style.rangeContainer}>
            
//             <Text style={style.rangeText}>  Budget</Text>
//             <View>
//             <Slider
//                 style={style.slider} // Style for slider
//                 minimumValue={0} // Minimum value
//                 maximumValue={70000} // Maximum value
//                 step={100} // Step value, change as needed
//                 value={range} // Set the current value of the slider
//                 onValueChange={handleRangeChange} // Update state when slider value changes
//                 minimumTrackTintColor="#325573" // Color of the selected portion
//                 maximumTrackTintColor="#325573" // Color of the unselected portion
//                 thumbTintColor="white"
//                  thumbStyle={style.thumbs} // Custom thumb style
//               />
//               </View>
//                 </View>
  
//       <TouchableOpacity style={[style.searchButton, { backgroundColor:GlobalStyles.colors.primary }]}  >
       
//         <Text style={style.buttonText1}>Search</Text>
//       </TouchableOpacity>
      
//        </>



//       )}
//     </View>
//      </ScrollView>
// )
// }

 
// const style = StyleSheet.create({
//     type:{paddingTop:10},
//     property: {
//   color: '#333333',             
//   fontSize: 16,                 
//   fontWeight: '800',                     
//   letterSpacing: 0.5,           
//     lineHeight: 24,               
// },
// container: {
//     flex: 1,
//     padding: 20,
//   },
//   flatListContainer: {
//     flexDirection: 'row', // Ensures items are arranged in rows
//     flexWrap: 'wrap', // Wraps buttons in the row
//     justifyContent: 'space-between',
//   },
//  button: {
//   backgroundColor: '#ffffff',  // White background
            
      
//   paddingVertical: 12,         
//   paddingHorizontal: 15,       
//   borderRadius: 10,           
//   margin: 6,                   
//   width: (width - 60) / 2,     
//   alignItems: 'center',       
//   justifyContent: 'center',    
//   shadowColor: '#000',         
//   shadowOffset: { width: 0, height: 2 },  
//   shadowOpacity: 0.2,          
//   shadowRadius: 3,            
//   elevation: 3,                
// },
// buttonText: {
//   color: '#333333',             
//   fontSize: 16,                 
//   fontWeight: '600',           
//   textAlign: 'center',          
//   letterSpacing: 0.5,           
//   lineHeight: 24,             
// },
//  rangeContainer: {
//     padding:10,
   
    
//   },
//   rangeText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   slider: {
    
//     top:10,
//     width: width*0.8, 
//     height: 50, 
//   },
//    thumb: {
    
//     width: 20, 
//     height: 20, 
//     borderRadius: 10, 
//     borderWidth: 2, 
//     borderColor: "#6200EE",
//   },
//  thumbs: {
    
//     width: 20, 
//     height: 20, 
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: "white", 
//   },
// searchButton: {
//     width:width*0.9,
//    marginTop:10,
//     backgroundColor: '#6200EE', 
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30, 
//    alignSelf:'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5, 
//   },

//   buttonText1: {
// textAlign:'center',
//     color: 'white', 
//     fontSize: 16,
   
//     fontWeight: 'bold',
   
//   },
// sreach:{
  
  
//   backgroundColor: "#F1F1F1", 
//     borderRadius: 20, 
//     paddingHorizontal: 15,
//     height: 40, 
//     width: width * 0.9, 
//     marginTop: 5, 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1,
//     shadowRadius: 4, 
//     elevation: 3, 
//   },
//    noDataText: {
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#999',
//     marginTop: 20,
//   },
//   modalBackground: {
//     flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'rgba(0, 0, 0, 0.7)', 

//   padding: 10,
//   },
//   modalContainer: {
//     width:width,  
//     padding: 10,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     alignItems: 'center',  
//     justifyContent: 'center', 
//     shadowColor: '#000',  
//     shadowOffset: { width: 0, height: 10 }, 
//     shadowOpacity: 0.3,
//     shadowRadius: 10,  
//     elevation: 15, 
//   },
//   modalText: {
//     fontSize: 18,
   
//   },
// highlightedText: {
//   paddingTop:10,
//   paddingBottom:10,
//     fontSize: 24,  
//     fontWeight: 'bold',  
//     color: '#FF5733', 
//     textAlign: 'center',  
//   },
// cardContainer: {
//     width: 300,  
//     height: 150, 
//     borderRadius: 10,  
//     overflow: 'hidden',  
//     borderWidth: 1, 
//     borderColor: '#ddd',  
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.2,  
//     shadowRadius: 3,  
//     elevation: 5,  
//     marginBottom: 15,  
//   },
//   image: {
    
//     width: '100%',  
//     height: '100%', 
//     resizeMode: 'cover',  
//   },
//   container2: {
//     flexDirection: 'row',  // Keeps the first and second text in a row layout
//     flexWrap: 'wrap', // Allows text to wrap when it overflows
//     margin: 10, // Add some margin for spacing
//   },
//   firstText: {
//     color: '#188db9',
//     fontSize: 16, // Adjust font size as needed
//     marginRight: 5, // Space between the two text components
//   },
//   secondText: {
//     fontSize: 16, // Same font size as the first text for consistency
//   },
//   highlightText: {
//     fontWeight: 'bold', // Highlight "essrow" with bold text

//   },
//    touchable: {
//     left: 10,
    
//   bottom:2 
//   },
//   text: {
//     fontSize: 15,
//     color: '#007bff', 
//     fontWeight: '600', 
//     textDecorationLine: 'underline', 
//   },
//   zip:{
//  marginLeft:10,
//   color: '#676767',             
//   fontSize: 16,                 
//   fontWeight: '800',                     
//   letterSpacing: 0.5,           
//     lineHeight: 24,  
//   },
// code:{

// backgroundColor: "#F1F1F1", 
//     borderRadius: 10, 
//     paddingHorizontal: 15,
//     height: 40, 
//    width:'100%',
//     marginTop: 5, 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1,
//     shadowRadius: 4, 
//     elevation: 3, 
// }
// })



// export default Helpbar;