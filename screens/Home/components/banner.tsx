import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { Skeleton, Input, Icon, Avatar, Badge, withBadge, Card } from '@rneui/themed';
import { GlobalStyles } from "../../../constants/style";
const {height,width} = Dimensions.get('screen')
export default function BannerSection() { 
    const [activeIndex, setActiveIndex] = useState()
    
    return(
        <View style={{ display: 'flex' }}>
            {/* <Card containerStyle={{borderRadius:11, borderWidth:0, borderColor:'#fff', margin:0, padding:0, marginTop:20, marginBottom:20,width:width*0.9,alignSelf:'center'}}>
                    <Card.Image source={require('../../../assets/images/Frame 12.png')}
            style={{ padding: 0, borderRadius:11 }}
          
          />
            </Card> */}
        </View>
    )
}