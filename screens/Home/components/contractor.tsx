import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Card } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../../constants/style";
import CustomAvatar from "./custom-avtar";
import { useSelector } from "react-redux";
import Carousel from "../../../GlobalComponents/custom-coursol"; // Adjust the import path to your custom Carousel component

import Modalscreen from "../../Help/modalscreen";
import Services from "../../../GlobalComponents/services";

import ShimmerPlaceholder from "react-native-shimmer-placeholder";
interface Contractor {
  id: number;
  firstName: string;
  img: string;
  rating: string;
  profile:string;
}
interface ContractorSection{
  loading:any
}

const width = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");

const ContractorSection:React.FC<ContractorSection> =({loading})=> {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [viewMore, setViewMore] = useState<boolean>(false);
  const navigation: any = useNavigation();
  const contractors = useSelector(
    (state: any) => state.Contractors.contractors
  );

  const navigateToContractor = (data: Contractor) => {
    navigation.navigate("Contractor", { data });
  };



  
const [modalVisible, setModalVisible] = useState(false);
// Function to open the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
  };

const handlePress = () => {
  setViewMore(true);
  navigation.navigate('Contractorview', { contractors, viewMore: true });
  console.log('Navigating to Chosecontractor with contractors:', contractors);
 
};







  // Add a "View More" button item if needed
  const carouselItems: Contractor[] = [
    ...contractors.slice(0, 50).map((item: any) => ({
      id: item.id,
      firstName: item.user_first_name,
      profile: item.ua_profile ? JSON.parse(item.ua_profile).label : "NA",
      img: item.ua_profile_pic == null ? "https://res.cloudinary.com/dvnxszfqa/image/upload/v1718022473/contractor-relibuild_his9if.jpg":item.ua_profile_pic,
      rating: "5",
    })),
    {
      id: -1, // Unique ID for the "View More" item
      firstName: "View More",
      img: "", // Empty image source
      rating: "", // Empty rating
    },
  ];

  const _renderItem = ({ item }: { item: Contractor }) => {
    if (item.firstName === "View More") return null
    return item.id === -1 ? ( // Check for "View More" item
      <View></View>
    ) : (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: width / 3,
        }}
      >
        <CustomAvatar
          source={{ uri: item.img }}
          onPress={() => navigateToContractor(item)}
          rating={item.rating}
        />
        <Text
          allowFontScaling={false}
          maxFontSizeMultiplier={1}
          style={{ color: "#2E2E2E", fontSize: 12, marginTop: 5,fontWeight:'bold',textTransform: "uppercase",  }}
        >
          {item.firstName}
        </Text>
        <Text style={{ color: "#2E2E2E", fontSize: 12, }}allowFontScaling={false}>
          {item.profile}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.container2}>
          <View>
          {/* <ShimmerPlaceholder visible={!loading} style={styles.title} duration={100}> */}
        <Text allowFontScaling={false} style={styles.title}>
          Contractors in your area
        </Text>
        {/* </ShimmerPlaceholder> */}
        </View>
        <View>
          {/* <ShimmerPlaceholder visible={!loading} style={{width:100}} duration={100}> */}
        <View>
          <TouchableOpacity 
            onPress={handlePress}
             ><Text style={styles.view} allowFontScaling={false}> View all</Text>
         </TouchableOpacity>
        </View>
        {/* </ShimmerPlaceholder> */}
        </View>
        </View>


      <Card
        containerStyle={{
     borderColor:"#fff",
          marginTop: 10,
          marginLeft:0,
          marginRight:0,
          borderWidth: 0,
          padding: 0,
        
          
          
          shadowColor: 'transparent', // No shadow on iOS
        }}
        wrapperStyle={{
          
        }}
      >
        <Carousel
          data={carouselItems}
          renderItem={_renderItem}
          itemWidth={width / 0}
        />
      </Card>
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
    maxWidth:200,
    fontFamily:'Unbounded-Regular',
    ...GlobalStyles.title,
  
  
    
  },
   container: {
    flex: 1,
    marginBottom: 10,
  },
  container2:{
  flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space out the elements
    alignItems: 'center', // Vertically align both the text and button
    paddingHorizontal: 20, // Add horizontal padding
    marginVertical: 5,
 },
sreach:{
  backgroundColor: "#fff",
      borderRadius: 10,
      
      borderColor: '#ccc',  
      paddingHorizontal: 20, 
      paddingVertical: 12,    
      width: width * 0.8,     
      height: 45,            
    
      justifyContent: 'center', 
      shadowColor: '#000',  
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,      
      elevation: 5,    },

      roundedContainer: {
    overflow: 'hidden',
    borderRadius:35,
    elevation: 3,      
    backgroundColor: 'white', 
  },
  image:{
     height: 200,        // Adjust the height as needed
    width: '100%',      // Takes full width of the container
  }

});
export default ContractorSection;