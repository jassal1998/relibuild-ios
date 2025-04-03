import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import ShimmerPlaceholder from "react-native-shimmer-placeholder";
export default function Placeholder() {

 
  return (
    <>
    <View style={{ flexDirection: "row", alignSelf: 'center', paddingBottom: 10 }}>
            <View style={styles.sreach}>

            </View>
            </View>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  sreach:{
    backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#ccc',  
      paddingHorizontal: 20, 
      paddingVertical: 12,    
      width: '80%',     
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
  shimmerBox: {
   
    
  },
  shimmerBanner: {
    width: "100%",
    
    marginBottom: 20,
    borderRadius: 10,
  },
});
