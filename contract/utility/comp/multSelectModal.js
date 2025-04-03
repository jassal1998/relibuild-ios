import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
// import Tags from "react-native-tags";
import LocalText from "./LocalText";
const MultiSelectModal = ({ options ,setModalVisible,selectedItems,setSelectedItems,modalVisible}) => {
  // Toggle item selection
  const toggleSelection = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
 

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LocalText style={styles.modalTitle}>Select Options</LocalText>

       

            {/* Options List */}
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => toggleSelection(item)}
                >
                  <LocalText
                    style={[
                      styles.optionText,
                      selectedItems.includes(item) && styles.optionSelected,
                    ]}
                  >
                    {item}
                </LocalText>
                </TouchableOpacity>
              )}
            />

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <LocalText style={styles.buttonText}>Close</LocalText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MultiSelectModal;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  openButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tagText: {
    backgroundColor: "#d1e7ff",
    color: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    margin: 4,
    borderRadius: 12,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:'black'
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color:'black'
  },
  optionSelected: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
