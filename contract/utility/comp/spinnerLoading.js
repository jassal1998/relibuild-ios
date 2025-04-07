import React from "react";
import { Modal, Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectSpinnerLoading } from "../redux/profile";
import LocalText from "./LocalText";
const SpinnerLoading = () => {

    const spinnerLoading = useSelector(selectSpinnerLoading)
  return (
    <Modal visible={spinnerLoading?true:false} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={30} color="#325573" />
          <LocalText style={styles.loadingText}>{spinnerLoading}</LocalText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    display:'flex',
    flex:1,
    flexDirection:'row',
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  spinnerContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});

export default SpinnerLoading;
