import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Slider } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { GlobalStyles } from "../../constants/style";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Picker from "./picker";
import Propertypepicker from "./propertypicker";
import Modalscreen from "./modalscreen";

const { width, height } = Dimensions.get("window");

const data = [
  { id: '1', title: 'Apartment' },
  { id: '2', title: 'Bungalow' },
  { id: '3', title: 'Congo' },
  { id: '4', title: 'House' },
  { id: '5', title: 'Land' },
  { id: '6', title: 'Single Family' },
];

const Help = () => { 
  const navigation: any = useNavigation();
  const searchInputRef = useRef<TextInput | null>(null);
 
  const [filteredData, setFilteredData] = useState(data);
  const [selectedButton, setSelectedButton] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [range, setRange] = useState(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [hasModalShown, setHasModalShown] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [zip, setZip] = useState<string>();
  const [categoryId, setCategoryId] = useState();

  const handlePress = (item:any ) => {
    setSelectedButton(item.id);
  };

  const renderItem = ({ item }:{item:any}) => (
    <TouchableOpacity 
      style={[style.button, selectedButton === item.id && style.buttonSelected]}
      onPress={() => handlePress(item)}>
      <Text style={[style.buttonText, selectedButton === item.id && style.buttonTextSelected]} allowFontScaling={false}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      console.log('HelpScreen focused - Focusing TextInput');
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
          console.log('TextInput focused');
        } else {
          console.log('TextInput ref is null');
        }
      }, 300); 
    }, [])
  );

  const handleRangeChange = (value:any) => {
    setRange(value);
    if (value >= 50000 && !hasModalShown) {
      setModalVisible(true);
      setHasModalShown(true);
    }
  };

  const resetSlider = () => {
    setRange(0);
    setHasModalShown(false);
    setModalVisible(false);
  };

  const handleSearchPress = () => {
    if (selectedButton) {
      const selectedData = filteredData.find(item => item.id === selectedButton);
      if (selectedData) {
        let searchData = {
          propertyType: selectedData.title,
          contractorId: categoryId, 
          budget: range, 
          zipCode: zip,
        };
        navigation.navigate("Contractorview", { searchData });
      }
    }
  };

  const handleCat = (values: any) => {
    setCategoryId(values);
  };

  const openModal = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const renderContent = () => {
    return (
      <>
       <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
        <Picker handlePicker={handleCat} />
        <View style={style.type}>
          <Text style={style.property}allowFontScaling={false}>Property Type</Text>
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Using numColumns to create a grid layout
          contentContainerStyle={style.flatListContainer}
        />

        <View>
          <Text style={style.zip} allowFontScaling={false}>ZipCode</Text>
          <TextInput
            placeholder=""
            value={zip}
            onChangeText={(text) => setZip(text)}
            keyboardType="numeric"
            style={style.code}
          />
        </View>

        <View style={style.sliderRow}>
          <Text style={style.rangeText}allowFontScaling={false}>Budget</Text>
          <Slider
            style={style.slider}
            minimumValue={0}
            maximumValue={70000}
            step={100}
            value={range}
            onValueChange={handleRangeChange}
            minimumTrackTintColor="#325573"
            maximumTrackTintColor="#325573"
            thumbTintColor="#325573"
            thumbStyle={{ width: 20, height: 20 }}
          />
        </View>

        <View style={style.labelRow}>
          <Text style={style.rangeLabel}allowFontScaling={false}>0</Text>
          <Text style={style.rangeLabel}allowFontScaling={false}>{range}</Text>
          <Text style={style.rangeLabel}allowFontScaling={false}>70000</Text>
        </View>

        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity onPress={openModal}>
            <Text style={{ textAlign: 'right', color: '#325573' }}allowFontScaling={false}>Advanced</Text>
          </TouchableOpacity>
        </View>

        <Modalscreen
          visible={modalVisible2}
          onClose={closeModal2}
          content={<Text></Text>} 
        />

        <TouchableOpacity 
          style={[style.searchButton, { backgroundColor: GlobalStyles.colors.primary }]} 
          onPress={handleSearchPress}>
          <Text style={style.buttonText1}allowFontScaling={false}>Search</Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </>
    );
  };

  return (
  <View style={{ backgroundColor: 'white', flex: 1, padding: 20 }}>
    <FlatList
      data={[1]} 
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => (
        <>
          {renderContent()} 
        </>
      )}
      ListFooterComponent={<></>} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  type: { paddingTop: 10 },
  property: {
   
    color: '#676767',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  flatListContainer: {
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    margin: 6,
    width: (width - 60) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonSelected: {
    backgroundColor: '#325573',
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  buttonTextSelected: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  sliderRow: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#676767',
    marginRight: 8,
  },
  slider: {
    flex: 1,
    marginLeft: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  rangeLabel: {
    fontSize: 14,
    color: '#676767',
  },
  searchButton: {
 width:'100%',
    marginTop: 10,
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText1: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zip: {
   
    color: '#676767',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
  code: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    width: '100%',
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default Help;
