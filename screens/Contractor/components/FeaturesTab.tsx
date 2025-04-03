import React from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "@rneui/themed";
import { GlobalStyles } from "../../../constants/style";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
interface SkillsTabProps {
  data: any;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: 20,
 left:'10%'
  },

  card: {
 width: screenWidth * 0.8,
height:screenHeight*0.5,

    borderRadius: 11,
    borderColor: "#fff",
    margin: 0,
    padding: 10,
   
  },
  expertiseContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  expertiseItem: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 23,
    margin: 5,
  },
  expertiseText: {
    color: "#8391A1",
    fontWeight: "400",
    fontSize: 15,
  },
});

const FeaturesTab: React.FC<SkillsTabProps> = ({ data }) => {
  const experties = [
    { title: "Apartment", id: 1 },
    { title: "Kitchens", id: 2 },
    { title: "Bathroom", id: 3 },
    { title: "Electricity", id: 4 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card containerStyle={styles.card}>
          <Text style={[GlobalStyles.title, { fontSize: 24 }]} allowFontScaling={false}>Skills</Text>
          <View style={styles.expertiseContainer}>
            {data.length
              ? data.map((item: any) => (
                  <View style={styles.expertiseItem} key={item.label}>
                    <Text style={styles.expertiseText} allowFontScaling={false}>{item.label}</Text>
                  </View>
                ))
              : ""}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default FeaturesTab;
