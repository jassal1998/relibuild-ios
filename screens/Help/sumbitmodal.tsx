import React from "react";
import { Modal, View, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../../constants/style";








const {width,height} =Dimensions.get("window")

const FromModal = ({ visible, onClose }:{visible:any,onClose:any}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Escrow Alert</Text>
           <View style={styles.line}></View>
           <View style={styles.card}>
            <Image source={require("../../assets/images/correct (2).png")} style={styles.image}/>
           </View>
         <View>
            <Text style={styles.text}>
                Your Form was
            </Text>
            <Text style={styles.text2}>
                successfully sumbit
            </Text>
         </View>

         <TouchableOpacity style={[styles.button, { backgroundColor: GlobalStyles.colors.primary  }]} 
  onPress={onClose}
>
      <Text style={styles.buttonText}>Close</Text>
    </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    
  },
  modalText: {
    fontSize: 19,
    fontWeight: 'bold',
    justifyContent:'flex-start',
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
   width:width*0.8,
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
  card: {
    top:10,
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: '70%', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 5, 
    alignSelf:'center',
    width:width*0.3, 
    height:110, 
  },
  image: {
     width:width*0.3, 
    alignSelf:'center',
   height:110, 
    bottom:20,
    borderRadius: '70%', 
  },
  text: {
    paddingTop:20,
    fontSize: 15, // Adjust the font size for visibility
    fontWeight: 'bold', // Make the text bold for emphasis
    color: '#333', // Dark grey color for good contrast
    textAlign: 'center', // Center-align the text horizontally
    paddingHorizontal: 20, // Add some horizontal padding to avoid text touching the sides
  },
  text2:{
    fontSize: 15, // Adjust the font size for visibility
    fontWeight: 'bold', // Make the text bold for emphasis
    color: '#333', // Dark grey color for good contrast
    textAlign: 'center', // Center-align the text horizontally
    paddingHorizontal: 20, // Add some horizontal padding to avoid text touching the sides
    },
     button: {
   
    paddingVertical: 10,
    paddingHorizontal: 20, // Horizontal padding for a wider button
    borderRadius: 5, // Rounded corners for a softer look
    alignItems: 'center', // Center the text inside the button
    justifyContent: 'center', // Ensure the text is centered vertically
    marginTop: 20, // Add space above the button
  },
  buttonText: {
    color: 'white', // White text color to contrast with the background
    fontSize: 16, // Font size to make the text more readable
    fontWeight: 'bold', // Bold text for emphasis
  },
});

export default FromModal;
