import React from "react";
import { Icon } from "@rneui/themed";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
const {width,height} =Dimensions.get('screen')

interface CustomAvatarProps {
  source: ImageSourcePropType;
  onPress: () => void;
  rating: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({
  source,
  onPress,
  rating,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{  height: height * 0.1,  // Set height based on the screen height
  width: height * 0.1,   // Set width equal to height for a circular button
  borderRadius: (height * 0.1) / 2,  }}
    >
      <Image
        source={source}
        style={{ flex: 1, borderRadius: 100 }}
        resizeMode="cover"
      />
      {/* Rating section */}
      <View style={{top:5,left:10}}>
      <View
        style={{
          position: "absolute",
        bottom:0,
          backgroundColor: "#325573",
  
          //width: height * 0.1,   
            borderRadius: 20,
            alignSelf:'flex-end',
          padding: 5,
          flexDirection: "row",
    
          justifyContent: "center",
        }}
      >
        {/* Add star icon */}
        <Icon name="star" type="font-awesome" color="#FFD700" size={10} style={{top:5}} />
        {/* Display rating */}
        <Text
          allowFontScaling={true}
          maxFontSizeMultiplier={1}
          style={{ color: "#fff", marginLeft: 5 }}
        >
          {rating}
        </Text>
        
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomAvatar;
