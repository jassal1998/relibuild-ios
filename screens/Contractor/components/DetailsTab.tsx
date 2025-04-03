// DetailsTab.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from "react-native";
import { Card } from "@rneui/themed";
import { ScreenWidth } from "@rneui/base";

interface ExpertiesItem {
  title: string;
  id: number;
}

interface DetailsTabProps {
  data: any;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ data }) => {
  // Safe data access with default values
  const description = data?.ua_description || "No description available";
  const contractorId = data?.id ? `#RB${data.id}` : "N/A";
  const availability = data?.ua_work_availbility
    ? JSON.parse(data.ua_work_availbility).label
    : "N/A";
  const workHours = data?.ua_work_hours || "N/A";
  const experience = data?.ua_exp ? `${data.ua_exp} Years` : "N/A";
 


  return (
      
    <View style={styles.container}>
    <ScrollView> 
      
        <Card containerStyle={styles.card}>
    
          <View style={styles.content}>
            <Text style={styles.header}>Description:</Text>
            <Text style={styles.itemText}>{description}</Text>
          </View>
        </Card>

        <Card containerStyle={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Contractor Details:</Text>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Contractor Id: </Text>
              <Text style={styles.itemText}>{contractorId}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Availability: </Text>
              <Text style={styles.itemText}>{availability}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Work Timings: </Text>
              <Text style={styles.itemText}>{workHours}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Contractor Status: </Text>
              <Text style={styles.itemText}>Active</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Experience: </Text>
              <Text style={styles.itemText}>{experience}</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
    
  );
};



const styles = StyleSheet.create({
  container: {
    width:23,
    
    
    margin:50,
    
  
    backgroundColor: "#f0f0f0",
    
    
  },
  card: {
    borderRadius: 11,
    borderColor: "#fff",
     padding: 20,
  
    margin: 0,
   
    marginBottom: 20,
  
  },
  content: {
    flexDirection: "row",
  
    flexWrap: "wrap",
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: "column",
    
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    marginBottom: 10,
    marginLeft:10,
    
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
  },
  itemText: {
    color: "#8391A1",
    fontWeight: "400",
    fontSize: 12,
  },
});

export default DetailsTab;
