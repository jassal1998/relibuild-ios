import React, { useEffect } from "react";
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@rneui/base";
import Services from "../../GlobalComponents/services";
import { getAllServices } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";

const { width } = Dimensions.get("screen");

const ServicesScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const services = useSelector((state: any) => state.Services.allServices);

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    dispatch(getAllServices());
  };

  let serviceData = services.map((item: { cat_id: any; cat_name: any; cat_img: any; }) => ({
    service_Id: item.cat_id,
    service_name: item.cat_name,
    service_img_url: item.cat_img,
  }));

  const navigateToServices = () => {
    navigation.navigate("Services");
  };

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.container}>
        {/* <Text allowFontScaling={true} style={styles.title}>
          Services
        </Text> */}

        <View style={styles.gridContainer}>
          {serviceData.map((item:any) => (
            <View style={styles.gridItem} key={item.service_Id} >
                
              <Services data={item} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    ...GlobalStyles.title,
    marginTop: 5,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly", // Ensures equal space around items
    paddingHorizontal: 10, // Adjusted padding on both sides
    marginTop: 20,
  },
  gridItem: {
    width: "45%", // Two items per row, with equal spacing
    marginBottom: 20,
  },
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: width / 1.5,
    height: 45,
  },
   cardImage: {
      flex: 1, // Make the image fill the entire card
    justifyContent: 'flex-end', // Align the content at the bottom of the card
    width: '100%', // Ensure the image covers the full width
    height: '130%',
    
    
    },


    card: {
    width: '100%', // Make card full width of the parent container
    aspectRatio: 1, // Ensures the card is square (height = width)
    backgroundColor: '#fff', // White background for the card (fallback color)
    borderRadius: 10, // Rounded corners for the card
    overflow: 'hidden', // Ensures the image and text are contained within the rounded corners
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
  },

  cardText: {
    color: 'balck',
    backgroundColor:'silver', // White text color for contrast against the image
    fontSize: 15,
    fontWeight: 'black',
    textAlign: 'center', // Center the text horizontally
    
  },
});

export default ServicesScreen;
