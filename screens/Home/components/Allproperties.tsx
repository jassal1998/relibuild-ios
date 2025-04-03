import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { useSelector } from "react-redux";


const { width } = Dimensions.get("screen");

export default function AllPropertie({ navigation }:{navigation:any}) {
  const properties = useSelector((state: any) => state.RealEstate.properties);
  const [selectedOption, setSelectedOption] = useState('Residential');
 

  const renderPropertyItem = ({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity onPress={() => navigation.navigate("propertyView", { data: item })}>
        <Card containerStyle={styles.card}>
          <Card.Image style={styles.image} source={{ uri: JSON.parse(item.rep_images)[0] }} />
          <View style={styles.overlay}>
            <Text style={styles.priceTag}>4000$</Text>
          </View>
          <Text style={styles.titleText} allowFontScaling={false}>{item.rep_title}</Text>
          <View style={styles.infoRow}>
            <Icon name="house" type="material" size={15} />
            <Text style={styles.infoText} allowFontScaling={false}>12 Bedrooms</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="house" type="material" size={15} />
            <Text style={styles.infoText} allowFontScaling={false}>2 Bathrooms</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="place" type="material" size={15} />
            <Text style={styles.infoText} allowFontScaling={false}>
              {`${item.rep_state}, ${item.rep_country === 'United States' ? 'USA' : ''}`}
            </Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText2} allowFontScaling={false}>Know more</Text>
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',width:'80%',alignSelf:'center',borderWidth:1,borderRadius:30,borderColor:"#325573",backgroundColor:'white'}}>
        <TouchableOpacity style={[styles.button2, selectedOption === 'Residential' ? styles.selectedButton : styles.unselectedButton]} onPress={() => setSelectedOption('Residential')}>
          <Text style={[styles.buttonText, selectedOption === 'Residential' ? styles.selectedText : styles.unselectedText]} allowFontScaling={false}> Residential </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button2, selectedOption === 'Commercial' ? styles.selectedButton : styles.unselectedButton]} onPress={() => setSelectedOption('Commercial')}>
          <Text style={[styles.buttonText, selectedOption === 'Commercial' ? styles.selectedText : styles.unselectedText]}allowFontScaling={false} >Commercial</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties}
        renderItem={renderPropertyItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}  // Display 2 boxes per row
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardWrapper: {
    width: (width - 40) / 2, 
    marginVertical: 15,
    marginHorizontal: 10,
    right: 15 
  },
  card: {
    borderRadius: 11,
    padding: 8,
    width: "100%",          
    height: 250,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  priceTag: {
    position: "absolute",
    top: '38%',
    left: 15,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  titleText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "700",
    color: "black",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 12,
    color: "black",
  },
  button: {
    backgroundColor: "#325573",
    height: 28,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7, 
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: '#325573',
  },
  selectedButton: {
    backgroundColor: '#325573',
    borderColor: '#325573',
  },
  unselectedButton: {
    backgroundColor: 'white',
    borderColor: '#325573',
  },
  button2: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText2: {
    color: "white",
    fontSize: 15,
  },
});
