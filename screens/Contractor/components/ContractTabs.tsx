import React, { useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Tab, TabView } from "@rneui/themed";
import DetailsTab from "./DetailsTab"; // Adjust paths accordingly
import FeaturesTab from "./FeaturesTab";
import LocationsTab from "./LocationsTab";
import PlansTab from "./PlansTab";
import { useSelector } from "react-redux";
import ReviewsTab from "./ReviewsTab";
import CompanyDetails from "./CompanyDetails";
import { useNavigation } from "@react-navigation/native";

interface contractortabsProps {
  isLoading: any;
}
const ContractTabs: React.FC<contractortabsProps> = ({ isLoading }) => {
  const navigation: any = useNavigation();
  const contractorsDetails = useSelector(
    (state: any) => state.Contractors.contractorsDetail
  );

  console.log(contractorsDetails, "contractorsDetailscontractorsDetails");
  const [index, setIndex] = React.useState(0);
  const scrollViewRef: any = useRef(null);
  const tabTitles = ["Details", "Skills", "Video", "Locations"];
  const tabWidth = 190;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: tabWidth * index, // Calculate x offset
        animated: true,
      });
    }
  }, [index]);

  const width = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");
  const navigateToServices = () => {
    let contData = {
      contractorId: contractorsDetails.id,
      serviceId: JSON.parse(contractorsDetails.ua_profile).value,
      serviceBgImg:
        contractorsDetails.cc_logo_url !== null
          ? contractorsDetails.cc_logo_url
          : contractorsDetails.ua_profile_pic,
      contractorName: contractorsDetails.user_first_name,
      serviceName: JSON.parse(contractorsDetails.ua_profile).label,
    };
    navigation.navigate("SubmitQuery", { data: contData });
  };
  console.log(isLoading, "l;m;lm");
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.tabScrollContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={styles.tabIndicator}
            containerStyle={styles.tabContainerStyle}
          >
            {tabTitles.map((title, idx) => (
               <Tab.Item
            key={title}
            title={
              <Text
                allowFontScaling={false}
                style={[
                  styles.tabTitle,
                  { color: index === idx ? "#fff" : "#5C5C5C" },
                ]}
              >
                {title}
              </Text>
            }
            buttonStyle={[
              styles.tabButton,
              { backgroundColor: index === idx ? "#2F5271" : "transparent" },
            ]}
            onPress={() => setIndex(idx)}
            containerStyle={styles.tabItemContainer}
          />
        ))}
      </Tab>
        </ScrollView>
      </View>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <CompanyDetails data={contractorsDetails} />
        </TabView.Item>
        <TabView.Item>
          <FeaturesTab
            data={
              contractorsDetails && contractorsDetails.ua_skills
                ? JSON.parse(contractorsDetails.ua_skills)
                : []
            }
          />
        </TabView.Item>
        <TabView.Item>
          <PlansTab data={contractorsDetails.cc_video_url} />
        </TabView.Item>
        <TabView.Item>
          <LocationsTab data={contractorsDetails} />
        </TabView.Item>
      </TabView>

      <TouchableOpacity style={styles.button} onPress={navigateToServices}>
        <Text style={styles.buttonText}>Hire Contractor</Text>
      </TouchableOpacity>
    </View>
  );
};

const { height: screenHeight ,width:screenWidth} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 10,
    paddingBottom: 60, // Padding for the button
  },
  tabContainer: {
    height: 50,

    marginBottom: 10,
  },
  tabScrollContainer: {
 
    alignItems: "center",
  },
  tabIndicator: {
    backgroundColor: "transparent",
  },
  tabContainerStyle: {
    padding: 10,
  },
  tabItemContainer: {
    
    minWidth: 200,
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "#2F5271",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
   tabTitle: {
    fontSize: 17,
  },
  tabButton: {
    borderRadius: 33,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default ContractTabs;
