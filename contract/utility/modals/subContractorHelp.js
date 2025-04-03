import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  Text, 
  Modal, 
  StyleSheet 
} from "react-native";

const SubContracterhelp = ({list, onSelect }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSelect = (item) => {
    onSelect(item);
    setIsModalVisible(false);
  };


  return (
    <View>
      {/* Search Input */}
      <LocalText style={{
            fontSize:14,
            fontWeight:'600',
        marginBottom:10,
        display:'flex',
        flexDirection:'row',
        color:'black'
        }}>
Select Subcontractor
<LocalText style={{
    color:'red',
    marginLeft:3
}}>
    *
</LocalText>
      </LocalText>
      <View style={styles.searchBox}>
       
        <TextInput
          placeholder="Select Property owner"
          style={styles.searchInput}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          value={searchText}
        />
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <LocalText style={styles.dropdownIcon}>▼</LocalText>
        </TouchableOpacity>
      </View>

      {/* Modal for Dropdown */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={list}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  style={styles.listItem}
                >
                  <LocalText style={styles.listText}>{item.user_email}</LocalText>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <LocalText style={styles.emptyText}>No results found</LocalText>
              }
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <LocalText style={styles.closeButtonText}>Close</LocalText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
    },
    searchInput: {
      flex: 1,
      padding: 5,
      color:'black'
    },
    dropdownIcon: {
      fontSize: 18,
      marginLeft: 10,
      color: "#7f8c8d",
    },
    modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      width: "80%",
      maxHeight: "50%",
    },
    listItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#dcdde1",
    },
    listText: {
      fontSize: 16,
      color: "#34495e",
    },
    emptyText: {
      textAlign: "center",
      fontSize: 16,
      color: "#7f8c8d",
      marginVertical: 10,
    },
    closeButton: {
      marginTop: 10,
      alignSelf: "center",
    },
    closeButtonText: {
      color: "#3498db",
      fontSize: 16,
    },
  });
  

export default SubContracterhelp;
