import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,hide,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Install with `npm install @react-native-picker/picker`
import { grayColor } from '../comman';
import LocalText from './LocalText';
const PickerModal = ({ options,style, selectedValue, onValueChange, isVisible, onClose }) => {
  const [selected, setSelected] = useState(selectedValue);

  const handleSelect = (value) => {
    setSelected(value);
    onValueChange(value);
    onClose();
  };

  if (Platform.OS === 'ios') {
    return (
      <Modal visible={isVisible} transparent animationType="slide">
        <View style={ styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selected}
              onValueChange={(itemValue) => setSelected(itemValue)}
              style={styles.picker}
            >
              {options.map((option,i) => (
                <Picker.Item key={i} label={option.label} value={option.value}  />
              ))}
            </Picker>
            <TouchableOpacity style={styles.doneButton} onPress={() => handleSelect(selected)}>
              <LocalText style={styles.doneText}>Done</LocalText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  // Android uses a simple Picker dropdown
  return (
    <View style={style?style:{
borderColor:'gray',
borderWidth:1,
borderRadius:6,
paddingLeft:10,
    }}>
      <Picker
        selectedValue={selected}
        onValueChange={(itemValue) => {
          handleSelect(itemValue);
        }}
      
  
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  picker: {
    width: '100%',
    height: 200,
  },
  doneButton: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    width: 100,
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  androidPickerContainer: {
    marginTop: 15,
  },
});

export default PickerModal;
