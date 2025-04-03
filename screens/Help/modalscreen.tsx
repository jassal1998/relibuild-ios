import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, Dimensions, Animated, TouchableOpacity, ScrollView, FlatList, TextInput, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ModalScreenProps {
  visible: boolean;
  onClose: () => void;
  content: React.ReactNode; // Content passed to the modal
}

const Modalscreen: React.FC<ModalScreenProps> = ({ visible, onClose, content }) => {
  const slideAnim = React.useRef(new Animated.Value(height)).current; // Start position off-screen
 const searchInputRef = useRef<TextInput | null>(null);
const [selectedItems, setSelectedItems] = useState<string[]>([]); 
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]); 


const toggleSelection = (itemKey: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemKey)
        ? prevSelectedItems.filter((key) => key !== itemKey) // Deselect item
        : [...prevSelectedItems, itemKey] // Select item
    );
  };


const toggleButtonSelection = (itemKey: string) => {
    setSelectedButtons((prevSelectedButtons) =>
      prevSelectedButtons.includes(itemKey)
        ? prevSelectedButtons.filter((key) => key !== itemKey) // Deselect button
        : [...prevSelectedButtons, itemKey] // Select button
    );
  };









 useFocusEffect(
    React.useCallback(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [])
  );

  const data = [
  { key: '1', label1: 'Addition & Remodeling', label2: 'Ac&Cooling' },
  { key: '2', label1: 'Air Conditioning & Cooling', label2: 'Decorator' },
  { key: '3', label1: 'Electrical', label2: 'Dry' },
  { key: '4', label1: 'Decorators & Designers', label2: 'Barn Repair' },
  { key: '5', label1: 'Addition & Remodeling', label2: 'Ac&Cooling' },
  { key: '6', label1: 'Foundation Installation', label2: 'Bird Removal' },
  { key: '7', label1: 'Decks', label2: 'Dry' },
  { key: '8', label1: 'Garages', label2: 'Ac&Cooling' },
  { key: '9', label1: 'Bathroom Remodeling', label2: 'Gutters' },
  { key: '10', label1: 'Carpentry', label2: 'Door Installation' },
];

  useEffect(() => {
    // When the screen is mounted, focus the TextInput
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    // Clean up: dismiss the keyboard when leaving the screen
    return () => {
      Keyboard.dismiss();
    };
  }, []); // This will run only once when the screen mounts

  React.useEffect(() => {
    if (visible) {
      // Slide up animation when modal is shown
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide down animation when modal is closed
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);



  

  return (
    <Modal
      animationType="slide" // Disable default animation as we're handling it ourselves
      transparent={true}
      visible={visible}
      
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
             <TouchableWithoutFeedback>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Advanced</Text>
            </View>

            {/* Scrollable Content */}
            
              <View style={styles.textContainer}>
                {/* <Text style={styles.text}></Text> */}
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingTop: 10,
                        justifyContent: 'space-around',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => toggleSelection(item.key)}
                        style={[
                          styles.textContainer,
                          selectedItems.includes(item.key) && styles.selectedItem, // Apply selected style for item
                        ]}
                      >
                     <Text
                      style={[
                      styles.itemText,
                     selectedItems.includes(item.key) && styles.selectedItemText, // Change text color when selected
                            ]}
                      allowFontScaling={false}
                                    >
                        {item.label1}
                              </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.additionButton,
                          selectedButtons.includes(item.key) && styles.selectedButton, // Apply selected style for button
                        ]}
                        onPress={() => toggleButtonSelection(item.key)}
                      >
                     <Text
    style={[
      styles.additionButtonText,
      selectedButtons.includes(item.key) && styles.selectedButtonText, // Change text color when selected
    ]}
    allowFontScaling={false}
  >
    {item.label2}
  </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  keyExtractor={(item) => item.key}
                />
      </View>
               
      

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Done</Text>
            </TouchableOpacity>
          </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14, 14, 14, 0.6)', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    width: width,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: height * 0.3, 
    justifyContent: 'flex-start',

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    elevation: 5,
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: -2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow blur radius for iOS
  },
  headerContainer: {
    alignItems: 'center', // Center the header text horizontally
    marginBottom: 10, // Space below the header
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure the content can scroll if needed
    justifyContent: 'flex-start', // Align content to the start
    padding: 10,
    paddingBottom: 20, // Prevents content from being cut off
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
borderRadius:10,
  },
  text: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#446882', // Close button with a distinct color
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
   itemText: {
    top:10,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
  additionButton: {
    // backgroundColor: '#446882',
    paddingVertical: 10,
    paddingHorizontal: 20,
borderRadius:10,
    
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  additionButtonText: {
    color: 'balck',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton1: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#ff6347',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#446882',
    textAlign:'center' // Change to any color for selected item
  },
  selectedButton: {
    backgroundColor: '#446882', // Change to any color for selected button
  },
  selectedItemText:{
    color: 'white', // Change text color when selected
    fontWeight: 'bold',
  },
  selectedButtonText:{
    color: 'white', // Change text color to white when selected
  fontWeight: 'bold',
  }
});

export default Modalscreen;
