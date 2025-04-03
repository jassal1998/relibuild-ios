import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
const { height } = Dimensions.get("screen");


export default function Services(props:any ) {
  const navigation: any = useNavigation();

  const contData = {
    contractorId: null,
    serviceId: props.data.service_Id,
    serviceBgImg: props.data.service_img_url,
    serviceName: props.data.service_name,
  };

  const navigateToServices = () => {
    navigation.navigate("SubmitQuery", { data: contData });
  };

  return (
    <TouchableOpacity onPress={navigateToServices}>
      <ShimmerPlaceholder visible={!props.loading} style={[styles.cardImage] } duration={1200} stopAutoRun={false} >
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.cardImage}
            source={{ uri: props.data.service_img_url }}
          />
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text allowFontScaling={false} style={styles.serviceName}>
              {props.data.service_name}
            </Text>
          </View>
        </View>
      </Card>
      </ShimmerPlaceholder>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 11,
    borderWidth: 0,
    width: "100%",
    margin: 0,
  
   
    padding: 0,
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: height / 5, // Adjust height as needed
    borderRadius: 11,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: 11,
  },
  textContainer: {
    position: "absolute",
   bottom:10,
    
  },
  serviceName: {
    fontSize: 13,
 
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
    marginLeft: 5,
    marginTop: 5,
  },
});
