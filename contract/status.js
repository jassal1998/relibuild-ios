import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { primaryColor } from "../../utility/comman";
import LocalText from "../contract/utility/comp/LocalText";
const StatusComponent = ({ project }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="checkbox" size={50} color={'green'} />
        </View>
      </View>
      <LocalText style={styles.heading}>Status</LocalText>
      <LocalText style={styles.text}>
        {project?.contract?.pc_contractor_signature_url
          ? "Contractor Successfully signed contract"
          : "Sign Pending"}
    </LocalText>
      <LocalText style={styles.text}>
        {project?.contract?.pc_homeowner_signature_url
          ? "Homeowner Successfully signed contract"
          : "Homeowner Sign Pending"}
    </LocalText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
});

export default StatusComponent;
