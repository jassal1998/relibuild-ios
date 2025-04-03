import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, StyleSheet } from "react-native";
import Us from '../img/us.png'
import Spanish from '../img/spain.png'
import Icon from 'react-native-vector-icons/Ionicons'
import LocalText from "./LocalText";
const LanguageSelectModal = ({ visible, onClose, onSelect }) => {
  
  return (
    <Modal visible={visible}  transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'row',
marginBottom:10,
            alignItems:'center',
          }}>
            <LocalText style={styles.title}>Select Language</LocalText>

            <View>
            <TouchableOpacity style={{
              width:25,
            }} onPress={()=>{
  onClose()
}}>
  <Icon name='close' size={25} color='red' />
</TouchableOpacity>
            </View>

          </View>
          
          <TouchableOpacity style={styles.option} onPress={() => onSelect("en")}> 
            <Image source={Us} style={styles.flag} />
            <Text style={styles.text}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => onSelect("es")}> 
            <Image source={Spanish} style={styles.flag} />
            <Text style={styles.text}>Español</Text>
          </TouchableOpacity>

  
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex:1
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  closeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LanguageSelectModal;
