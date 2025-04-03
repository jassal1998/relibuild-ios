import React from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Skeleton, Input, Icon, Avatar, Badge, withBadge } from '@rneui/themed';
import { GlobalStyles } from "../constants/style";

export default function SearchSection() { 
    return(
    <View style={{ display: 'flex', flexDirection: 'row' ,marginLeft:25,marginTop:10}}>
            <View>
          <Avatar
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
            size="medium"
          />
          <Badge
            status="error"
            containerStyle={{ position: 'absolute', top: 5, left: 40 }}
          />
            </View>
            <View style={{width:'100%',alignSelf:'center'}}>
                <Input
                    placeholder='Search'
                    inputStyle={GlobalStyles.inputStyle}
                    inputContainerStyle={GlobalStyles.formInputContainer}
                    //errorStyle={{ color: 'red' }}
                    //errorMessage='ENTER A VALID ERROR HERE'
                    rightIcon={<Icon name="search" type="material" size={20}  color='#D9D9D9'/>}
                    />
            </View>

        </View>
    )
}