import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import LottieView from 'lottie-react-native';
interface ThankyouModalProps {
  visible: boolean;
  onClose: () => void;
}

const ThankyouModal: React.FC<ThankyouModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thank You!</Text>
          <Text style={styles.modalMessage}>
            Your query has been submitted successfully.
          </Text>
          <View>
        <LottieView
            source={require('../assets/animmation/Animation - 1733292214682.json')}
            autoPlay
            loop
            style={styles.aniimation}
          />
         </View>

          <Pressable onPress={onClose} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Close</Text>
          </Pressable>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:"center"
  },
  modalMessage: {
    fontSize: 16,
   textAlign:"center"
    
  },
  modalButton: {
    padding: 10,
    backgroundColor: "#2f5272",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  aniimation: {
    width:120,
    height: 120,
    marginBottom:20
  },
});

export default ThankyouModal;
