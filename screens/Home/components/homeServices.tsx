import React, { useEffect } from "react";
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "@rneui/base";
import Services from "../../../GlobalComponents/services";
import { getServices } from "../../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/style";

import ShimmerPlaceholder from "react-native-shimmer-placeholder";
const { width } = Dimensions.get("screen");

interface HomeServiceScreen{
  loading:any
}

const HomeServicesScreen: React.FC<HomeServiceScreen> = ({loading}) => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const services = useSelector((state: any) => state.Services.services);

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    dispatch(getServices());
  };

  let serviceData = services.map((item:any) => ({
    service_Id: item.cat_id,
    service_name: item.cat_name,
    service_img_url: item.cat_img,
  }));

  const navigateToServices = () => {
    navigation.navigate("Services");
  };

  return (
    <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <View style={styles.container2}>
          <View>
          {/* <ShimmerPlaceholder visible={!loading} style={styles.title} duration={100}> */}
        <Text allowFontScaling={false} style={styles.title}>
          Services
        </Text>
        {/* </ShimmerPlaceholder> */}
        </View>
        <View>
          {/* <ShimmerPlaceholder visible={!loading} style={{width:100}} duration={100}> */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            onPress={navigateToServices}
             ><Text style={styles.view}allowFontScaling={false}> View all</Text>
         </TouchableOpacity>
        </View>
        {/* </ShimmerPlaceholder> */}
        </View>
        </View>

        <View style={styles.gridContainer}>
          {serviceData.map((item:any) => (
            <View style={styles.gridItem} key={item.service_Id}>
             {/* <TouchableOpacity  style={styles.card}>
              
              <ImageBackground source={{uri:item. service_img_url}}  style={styles.cardImage}/>
              
              <Text style={styles.cardText}>{item. service_name}</Text>
             </TouchableOpacity> */}
              <Services data={item} loading={loading} />
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
    marginBottom: 10
  },
  title: {
    
    fontFamily:'Unbounded-Regular',
    ...GlobalStyles.title,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Ensures equal space around items
    paddingHorizontal: 20, // Adjusted padding on both sides
    marginTop: 10,
  
  },
  gridItem: {
    width: "48%", // Two items per row, with equal spacing
    marginBottom: 10,
  },
  buttonWrapper: {
    // alignItems: "center",
    // justifyContent: "center",
    // marginVertical: 20,
  },
  loginButton: {
    // backgroundColor: GlobalStyles.colors.primary,
    // borderRadius: 8,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  buttonContainer: {
    // width: width / 1.5,
    // height: 45,
  },
 container2:{
  flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space out the elements
    alignItems: 'center', // Vertically align both the text and button
    paddingHorizontal: 20, // Add horizontal padding
    marginVertical: 5, // Space between the top and botto
   
 },
 view:{
  
  fontSize: 15,
    color: '#325573', 
    fontFamily: 'Unbounded-Regular',
 textAlign:'right',
},

    cardImage: {
      flex: 1, 
    justifyContent: 'flex-end', 
    width: '100%',
    height: '130%',
    
    
    },


    card: {
    width: '100%',
    aspectRatio: 1, 
    backgroundColor: '#fff',
    borderRadius: 10, 
    overflow: 'hidden', 
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1,
    shadowRadius: 5, 
  },

  cardText: {
    color: '#fff', // White text color for contrast against the image
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    
  },

});

export default HomeServicesScreen;
