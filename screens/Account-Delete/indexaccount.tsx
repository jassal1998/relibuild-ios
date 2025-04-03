import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { create, get, cancel } from "../../slices/thunk";
import Toast from "react-native-toast-message";

const AccountDelete = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  // Redux state
  const isDeleted: any = useSelector(
    (state: any) => state.accountDelete?.accountStatus
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
    dispatch(get());
  }, []); // Fetch once on component mount

  useEffect(() => {
    if (isDeleted) {
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Deletion Status",
        text2: "Account deletion in progress.",
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 100,
      });
    }
  }, [isDeleted]); // Trigger when deletion status changes

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("authUser");
    setIsLoggedIn(!!token);
  };

  const handleAccountDelete = () => {
    dispatch(create()).then((resp: any) => {
      dispatch(get());
    });

    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success",
      text2: "Account delete request created successfully.",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 100,
    });
  };

  const handleCancelAccountDelete = () => {
    dispatch(cancel());
    dispatch(get());
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Success",
      text2: "Account deletion cancelled successfully.",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 100,
    });
  };

  const handleDeleteConfirmation = () => {
    Alert.alert(
      "Delete Account",
      "Once you confirm, your account will be deleted within 10 days. You can cancel the deletion process anytime during this period.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: handleAccountDelete },
      ]
    );
  };

  const handleCancelDelete = () => {
    Alert.alert(
      "Cancel Deletion",
      "Are you sure you want to cancel the deletion process?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: handleCancelAccountDelete },
      ]
    );
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      {!isLoggedIn ? (
        <View style={styles.loginPrompt}>
          <Text style={styles.promptText}>
            Please log in or sign up first to delete your account.
          </Text>
          <Button title="Login" onPress={navigateToLogin} />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.deleteText}>
            The account deletion process will take 10 days to complete. You can
            cancel it at any time within this period.
          </Text>
          {!isDeleted ? (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteConfirmation}
            >
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.deleteContainer}>
              <Text style={styles.deleteText}>
                Account deletion in progress. You can cancel the process anytime
                within 10 days.
              </Text>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelDelete}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel Delete Process
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default AccountDelete;

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  loginPrompt: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  promptText: {
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  deleteText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
