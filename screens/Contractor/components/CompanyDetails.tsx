import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Linking,
  Platform
} from "react-native";
import { Card } from "@rneui/themed";
const {height,width}=Dimensions.get('screen')

interface CompanyDetailsProps {
  data: any;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data }) => {
  const companyName = data?.cc_company_name || "Relibuild";
  const description = data?.ua_description || "No description available";
  const contractorId = data?.id ? `#RB${data.id}` : "N/A";
  const availability = data?.ua_work_availbility
    ? JSON.parse(data.ua_work_availbility).label
    : "N/A";
  const workHours = data?.ua_work_hours || "N/A";
  const experience = data?.ua_exp ? `${data.ua_exp} Years` : "N/A";
  const address = data?.cc_address || "N/A";
  const city = data?.cc_city || "N/A";
  const email = data?.cc_company_email || "N/A";
  const phoneNumber = data?.cc_phone_number || "N/A";
  const insuranceUrl = data?.cc_insurance_documentation_url || null;
  const logoUrl = data?.cc_logo_url || "https://via.placeholder.com/150";

  return (
     <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
     
        <Card containerStyle={styles.card}>
          <View style={styles.headerContainer}>
            <Image source={{ uri: logoUrl }} style={styles.logo} />
            <Text style={styles.companyName}>{companyName}</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.header}>Description:</Text>
            <Text style={styles.itemText}>{description}</Text>
          </View>
        </Card>

        <Card containerStyle={styles.card}>
          <View style={styles.detailsContainer}>
            <Text style={styles.header}>Company Details:</Text>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Address: </Text>
              <Text style={styles.itemText}>
                {address}, {city}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Email: </Text>
              <Text
                style={styles.itemText}
                onPress={() => Linking.openURL(`mailto:${email}`)}
              >
                {email}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Phone Number: </Text>
              <Text
                style={styles.itemText}
                onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
              >
                {phoneNumber}
              </Text>
            </View>
            {insuranceUrl && (
              <View style={styles.detailItem}>
                <Text style={styles.label}>Insurance Document: </Text>
                <Text
                  style={styles.itemText}
                  onPress={() => Linking.openURL(insuranceUrl)}
                >
                  View Document
                </Text>
              </View>
            )}
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
      
    </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
  
 
    backgroundColor: "#f0f0f0",
    padding:Platform.select({ios:20,android:15})
   
  },
  scrollContainer: {

    padding:Platform.select({ios:30,android:30})


  
},

  card: {
   width:width/1.2,
      right:Platform.OS==='android' ?30:40, 
    borderRadius: 15,
    borderColor: "#fff",
    backgroundColor: "#fff",
     ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
     
    }),
  },
  
  headerContainer: {
    alignItems: "center",
    
  },
  logo: {
     width: 120,
     height: height/7,
    borderRadius: 15,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F5271",
    textAlign: "center",
  },
  content: {
    flex:1,

    marginBottom: 20,
  },
  detailsContainer: {
    
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: '5%',
 
  },
  header: {
    marginBottom: 20,
    top:10,
    alignSelf:'center',
  
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F5271",
  },
  label: {
    fontWeight: "bold",
    color: "#2F5271",
  },
  itemText: {
    flex:1,
    color: "#4a4a4a",

    fontSize: 16,
   left:10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default CompanyDetails;
