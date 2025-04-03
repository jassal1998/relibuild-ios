import React, { useRef, useState } from "react";
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import SignatureCapture from "react-native-signature-canvas";
import Ionicons from 'react-native-vector-icons/Ionicons'
import SpinnerLoading from "../contract/utility/comp/spinnerLoading";
import LocalText from "../contract/utility/comp/LocalText";

const SignModal = ({ isVisible, onClose ,handleSignature}) => {
  const [isNewCanvas, setIsNewCanvas] = useState(false); // State to force re-render
  const signatureRef = useRef();

  const [error,setError]=useState('')

  const handleReset = () => {
    setIsNewCanvas(!isNewCanvas); // Toggle state to force re-render
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={{
            width: "80%",
            maxHeight: "60%",
            backgroundColor: 'white',
            borderRadius: 12,
            alignItems: "center",
        }}>
          <View style={{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row',
            width:'100%',
            backgroundColor:'#3762EA',
            alignItems:'center',
            paddingHorizontal:10,
            padding:10

          }}>
          <LocalText style={{
               fontSize: 15,
               fontWeight:500,
               color:'white'
          }}>Sign Document</LocalText>
<TouchableOpacity                 onPress={onClose}>
    <Ionicons name={'close'} color={'white'}  size={24}/>
</TouchableOpacity>
          </View>
          <View style={{height:380,width:'100%'}}>
         

<SignatureCapture 
  ref={signatureRef}
  onOK={handleSignature}
  onEmpty={() => {
    setError('Empty Signature')
    setTimeout(() => {
      setError('')
    }, 4000);
  }}
  descriptionText="Sign Here"
  
  clearText="Clear"
  confirmText="Save"

 
/>
<LocalText style={{
  display:'flex',
  justifyContent:'center',
  textAlign:'center',
color:'red'
}}>
{error}

</LocalText>
<SpinnerLoading />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%", // Make the modal width responsive
    maxHeight: "60%", // Adjust height to fit the content
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 20, // Vertical padding for top and bottom
    paddingHorizontal: 20,
    alignItems: "center", // Center items horizontally
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 15, // Space below the title
    alignSelf: "flex-start",
  },
  signature: {
    borderColor: "#DFC57B",
    borderWidth: 1,

    marginBottom: 10, // Space below the signature area
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure buttons span the width of the modal
    marginTop: 10, // Space above the button container
  },
});

export default SignModal;
