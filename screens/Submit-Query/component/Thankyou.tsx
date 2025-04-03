import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@rneui/base";
import { GlobalStyles } from "../../../constants/style";
import { useNavigation } from "@react-navigation/native";

interface ThankyouScreenProps {
  route: any;
}
const ThankyouScreen: React.FC<ThankyouScreenProps> = ({ route }) => {
  const navigation: any = useNavigation();
  const navigateToHome = () => {
    navigation.navigate("Home");
  };
  return (
    <>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Image source={require("../../../assets/images/Sticker.png")} />
          </View>

          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{ fontWeight: "700", fontSize: 30, color: "#1E232C" }}
            >
              Thank You!
            </Text>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={{
                fontWeight: "500",
                fontSize: 16,
                color: "#8391A1",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              We've recorded your interest, and you can track your progress on
              the dashboard.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={navigateToHome}
              title="Back to Home"
              titleStyle={{ fontWeight: "500", fontSize: 16 }}
              buttonStyle={styles.loginButton}
              containerStyle={styles.buttonContainerStyle}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ThankyouScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.primary,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    padding: 10,
  },
  buttonContainerStyle: {
    width: "100%",
    height: 45,
    marginHorizontal: 50,
    marginVertical: 25,
  },
  registerText: {
    fontWeight: "400",
    fontSize: 15,
  },
  registerLink: {
    color: GlobalStyles.colors.primary,
  },
  loadingContainer: {
    position: "absolute", // Absolute positioning
    top: "50%", // Center vertically
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it's above other elements
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
