import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AirbnbRating } from "react-native-elements";

import { useDispatch, useSelector } from "react-redux";
import  {getSearch,getSubCategory} from "../../slices/thunk";
import { FlatList } from "react-native-gesture-handler";

interface PickerProps{
    handlePicker: (values:any) => void;
}
const Picker: React.FC<PickerProps>= ({handlePicker}) => {
   
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [secondSelectedOption, setSecondSelectedOption] = useState<string | null>(null);
  const [showNextPicker, setShowNextPicker] = useState(false);
const dispatch: any = useDispatch();

const search = useSelector((state:any)=>state.mainSearch.mainCategory)
console.log(search, ('hhhhhh'))
const setCategory = useSelector((state:any)=>state.mainSearch.subCategory)
console.log(setCategory,('gavy'))

  

const Search = () => {
    console.log('Dispatching getSearch');
    dispatch(getSearch());
  };

 
  useEffect(() => {
    Search();
  }, []);

  


  const [isOpen, setIsOpen] = useState(false);
  const [isSecondPickerOpen, setIsSecondPickerOpen] = useState(false);



  const animation = useRef(new Animated.Value(0)).current;
  const secondAnimation = useRef(new Animated.Value(0)).current;


  
 




  const togglePicker = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    
  };

  const toggleSecondPicker = () => {
    setIsSecondPickerOpen(!isSecondPickerOpen);
    Animated.timing(secondAnimation, {
      toValue: isSecondPickerOpen ? 0 : 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  // Handle option selection
  const handleOptionPress = (value: string, id:any) => {
    console.log(id, "DDDD")
    setSelectedOption(value);
    handlePicker(id)
    setSecondSelectedOption(null);
    dispatch(getSubCategory(id))
    togglePicker();
    setShowNextPicker(true);
    setIsSecondPickerOpen(true); 
  };

  const handleSecondOptionPress = (value: string) => {
    setSecondSelectedOption(value);
    
    Animated.timing(secondAnimation, {
      toValue: 0, // Close animation
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(); // Trigger closing animation
    setIsSecondPickerOpen(false);
  };
  // Height interpolation for smooth expand/collapse for first picker
  const heightInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3 * 50], // Each option is 50px high
  });

  // Height interpolation for second picker
  const secondHeightInterpolation = secondAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3 * 50], // Each option is 50px high
  });

  // Rotate icon interpolation
  const rotateInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>

  <View>
    <Text style={style.select}   allowFontScaling={false}>Select Contractor</Text>
  </View>

  <TouchableOpacity onPress={togglePicker} style={style.selector}>
    <Text style={style.selectorText}allowFontScaling={false}>{selectedOption || "Select"}</Text>
    <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }} />
  </TouchableOpacity>

  <Animated.View style={[style.optionsContainer, { height: heightInterpolation }]}>
    <FlatList
      data={search} 
      keyExtractor={(item, index) => item.cat_id || index.toString()} 
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleOptionPress(item.cat_name, item.cat_id)}
          style={style.option}
        >
          <Text style={style.optionText}>{item.cat_name}</Text>
        </TouchableOpacity>
      )}
      
      ListEmptyComponent={
        <Text style={style.optionText}>No options available</Text>
      }
    
    />
  </Animated.View>

 
  <View style={style.nextPicker}>
    <Text style={style.select}allowFontScaling={false}>Select Sub Category</Text>
    <TouchableOpacity onPress={toggleSecondPicker} style={style.selector}>
      <Text style={style.selectorText}allowFontScaling={false}>{secondSelectedOption || "Select"}</Text>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }} />
    </TouchableOpacity>

    <Animated.View style={[style.optionsContainer, { height: secondHeightInterpolation }]}>
      <FlatList
        data={setCategory} 
        keyExtractor={(item, index) => item.sc_category || index.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSecondOptionPress(item.sc_category)}
            style={style.option}
          >
            <Text style={style.optionText}>{item.sc_category}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={style.optionText}>No options available</Text>
        }

      />
    </Animated.View>
  </View>
</View>
  );
};

const style = StyleSheet.create({
  selectorText: {
    fontSize: 16,
  },
  optionsContainer: {
    bottom: 7,
    overflow: "hidden",
    borderColor: "#ccc",
    borderTopWidth:0,
    borderLeftWidth:1,
    borderRightWidth:1,
    borderEndWidth:1,
    borderRadius: 5,
    marginTop: 5,
  },
  option: {
    padding: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  select: {
    color: "#676767",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  selector: {
    flexDirection: "row",
    
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  nextPicker: {},
});

export default Picker;
