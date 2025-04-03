import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GlobalStyles } from "../constants/style";
import Modalscreen from "../screens/Help/modalscreen";
import { Icon } from "@rneui/base";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";





const width = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");

interface searchProps{
  loading:any
}
const Search:React.FC<searchProps> = ({loading}) => {
const [isImageLoaded, setIsImageLoaded] = useState(false);

 const [isShimmerVisible, setShimmerVisible] = useState(true);
const navigation:any=useNavigation()
const [modalVisible, setModalVisible] = useState(false);
 const openModal = () => {
    setModalVisible(true);
  };


  const closeModal = () => {
    setModalVisible(false);
  };

    return(
        <><View style={{ flexDirection: "row", alignSelf: 'center', paddingBottom: 10 }}>
          {/* <ShimmerPlaceholder visible={!loading} style={style.shimmerBox} duration={1200}  stopAutoRun={false}> */}
            <TouchableOpacity  onPress={()=>navigation.navigate("Help")}
                style={style.sreach}    >
                <Text style={{
                    color: '#999',
                    fontSize: 16,
                }}  allowFontScaling={false} >Search</Text>
            </TouchableOpacity>
            {/* </ShimmerPlaceholder> */}
          {/* <  ShimmerPlaceholder visible={!loading} style={{height:30, width:45, right:50,borderRadius:10,top:7}} duration={1200} stopAutoRun={false}>
            <TouchableOpacity onPress={openModal} style={{ paddingLeft: 10,  }}> 
                <Icon
                name="menu"
                type="material"
                color={GlobalStyles.colors.primary}
                size={30} />
            </TouchableOpacity>
          </ShimmerPlaceholder>
            {/* Custom Modal */}
            
        </View>
        <View style={style.roundedContainer}>
    {/* <ShimmerPlaceholder style={style.image}
        visible={!loading}
         duration={1500} // Set duration in milliseconds (e.g., 1500ms = 1.5 seconds)
      > */}
        <ImageBackground
          source={require("../assets/images/image.png")}
          style={style.image}
          onLoad={() => setIsImageLoaded(true)} 
        />
      {/* </ShimmerPlaceholder> */}
            </View></>


    )
}

const style = StyleSheet.create({
sreach:{
    backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ccc',  
      paddingHorizontal: 20, 
      paddingVertical: 12,    
width:width*0.9,     
      height: 45,            
    
      justifyContent: 'center', 
      
 
      elevation: 5,    },

      roundedContainer: {
        top:10,
        width:"100%",
    overflow: 'hidden',
    borderRadius:35,
    elevation: 3,      
    backgroundColor: 'white', 
  },
  image:{
     height: 200,        // Adjust the height as needed
    width: '100%',      // Takes full width of the container
  },
    shimmer: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  shimmerBox: {
   backgroundColor: "#fff",
      borderRadius: 10,
      borderColor: '#ccc',  
      width: width * 0.9,     
      height:45,
       
      
      justifyContent: 'center',
  },
})
export default Search;
