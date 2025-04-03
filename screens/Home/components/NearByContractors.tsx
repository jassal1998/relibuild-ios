import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import {
  Skeleton,
  Input,
  Icon,
  Avatar,
  Badge,
  withBadge,
  Card,
} from "@rneui/themed";
import { GlobalStyles } from "../../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getCountContractor } from "../../../slices/thunk";

const { width, height } = Dimensions.get("screen");

export default function NearByContractors() {
  const dispatch: any = useDispatch();
  const services = useSelector((state: any) => state.Services.services);
    useEffect(() => {
      dispatch(getCountContractor('contractor', 'Connecticut'));
    }, [dispatch]);
   const contractorsCount = useSelector(
     (state: any) => state.Contractors.contractorCount,
   );
   const contractors = useSelector(
     (state: any) => state.Contractors.contractorCountResult,
   );
  const navigation: any = useNavigation();



  const navigateToServices = () => {
    navigation.navigate("Services");
  };
   const service = [
     {
       serviceImg: require('../../../assets/images/image (1).png'),
       serviceTitle: `${contractorsCount} CONTRACTORS`,
       serviceUrl: () => navigation.navigate('Contractorview', {contractors}),
       location: 'Connecticut',
     },
     {
       serviceImg:
         'https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png',
       serviceTitle: '24 CONTRACTORS',
       serviceUrl: () => {},
       location: 'Los Angeles',
     },
     {
       serviceImg:
         'https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png',
       serviceTitle: '24 CONTRACTORS',
       serviceUrl: () => {},
       location: 'New York',
     },
     {
       serviceImg:
         'https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png',
       serviceTitle: '24 CONTRACTORS',
       serviceUrl: () => {},
       location: 'Florida',
     },
   ];
  const { width, height } = Dimensions.get("screen");
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View>
          <Text allowFontScaling={false} style={styles.title}>
            Find contractors in these cities
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {service.map((item, index) => (
          <TouchableOpacity onPress={item.serviceUrl}>
            <View
              style={{
                width: width * 0.6,
                height: 250, // Increase height for larger cards
                marginHorizontal: 10,
              }}
              key={index}>
              <View
                style={{
                  borderRadius: 11,
                }}>
                <Card
                  containerStyle={{
                    borderTopEndRadius: 11,
                    borderTopStartRadius: 11,
                    borderBottomEndRadius: 11,
                    borderBottomStartRadius: 11,
                    borderRadius: 11,
                    borderWidth: 0,
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden', // Ensures the content respects border radius
                    height: 250,
                    backgroundColor: 'white', // Add background color for visibility
                    elevation: 10, // Android shadow
                    shadowColor: '#000', // iOS shadow color
                    shadowOffset: {width: 0, height: 4}, // iOS shadow offset
                    shadowOpacity: 0.2, // iOS shadow opacity
                    shadowRadius: 8, // iOS shadow radius
                  }}>
                  <Card.Image
                    style={{
                      padding: 0,
                      borderTopLeftRadius: 11,
                      borderTopRightRadius: 11,
                      width: '100%',
                      height: '100%',
                    }}
                    source={require('../../../assets/images/contractor.jpg')}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 10,

                      borderBottomLeftRadius: 11,
                      borderBottomRightRadius: 11,
                    }}>
                    <View style={{}}>
                      <Text
                        allowFontScaling={false}
                        maxFontSizeMultiplier={1}
                        style={{
                          fontSize: 14,
                          textAlign: 'right',
                          fontWeight: '700',
                          color: '#fff',
                          top: 5,
                          right: 5,
                        }}>
                        {item.serviceTitle}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                      }}>
                      <Icon
                        name="place"
                        type="material"
                        color="#fff"
                        size={24}
                        style={{textAlign: 'right'}}
                      />
                      <Text
                        allowFontScaling={false}
                        maxFontSizeMultiplier={1}
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '600',
                        }}>
                        {item.location}
                      </Text>
                    </View>
                  </View>
                </Card>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
 
   view:{
  
  fontSize: 15,
    color: '#325573', 
    fontFamily: 'Unbounded-Regular',
 textAlign:'right',
},
 title: {
    maxWidth:300,
    fontFamily:'Unbounded-Regular',
    ...GlobalStyles.title,
  
  
    
  },
   container: {
    flex: 1,
    marginBottom: 20,
  },
  container2:{
  flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space out the elements
    alignItems: 'center', // Vertically align both the text and button
    marginVertical: 10,
    paddingHorizontal: 20, // Add horizontal padding
 },


});

