import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LocalText from "./LocalText";
const CardDetails = ({ last4Digits, cardholderName, cardType }) => {
  // Images for card types (you can replace these with your assets)
  const cardIcons = {
    Visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    MasterCard: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg",
    AmEx: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg",
  };

  return (
    <View style={styles.cardContainer}>
      {/* Card Type Icon */}
      <Image
        source={{ uri: cardIcons[cardType] || cardIcons.Visa }}
        style={styles.cardIcon}
        resizeMode="contain"
      />

      {/* Card Details */}
      <View style={styles.cardDetails}>
        <LocalText style={styles.cardNumber}>**** **** **** {last4Digits}</LocalText>
        <LocalText style={styles.cardholderName}>{cardholderName}</LocalText>
        <LocalText style={styles.cardType}>{cardType}</LocalText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardIcon: {
    width: 50,
    height: 30,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardholderName: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  cardType: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default CardDetails