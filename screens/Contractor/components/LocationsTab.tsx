import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  PixelRatio,
  StatusBar,
  Platform,
} from "react-native";
import { Card } from "@rneui/themed";

//import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { GlobalStyles } from "../../../constants/style";


const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

Platform.OS === "android"
  ? screenHeight - (StatusBar.currentHeight || 0)
  : screenHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    left: "5%",
  },

  card: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    marginLeft: 20,
    borderRadius: 11,
    borderColor: "#fff",
  },
  map: {
    width: "100%", // Full width of the card
    height: "70%",
    alignSelf: "center",
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 11,
  },
  map1: {
    flex: 1,
  },
});

interface LocationsTabProps {
  data: any;
}

const LocationsTab: React.FC<LocationsTabProps> = ({ data }) => {
  const [location, setLocation] = useState<any>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825, // Default to San Francisco
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // Request permissions and use location if needed
  // const requestPermissions = async () => {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     console.log("Permission to access location was denied");
  //     return;
  //   }
  //   // Use location services if necessary
  // };
  // requestPermissions();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card}>
          <Text style={[GlobalStyles.title, { fontSize: 24 }]}>Location</Text>
          <Text style={{ color: "#A6A6A6", fontWeight: "400", fontSize: 14 }}>
            {data
              ? `${data.ua_address} ${data.ua_city} ${data.ua_country} ${data.ua_zip_code}`
              : ""}
          </Text>
          <View style={styles.map}></View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default LocationsTab;
