import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";
import { TabView, SceneMap, TabBar, Route } from "react-native-tab-view";
import { RouteProp, useRoute } from "@react-navigation/native";
import Video from 'react-native-video';


interface ProgressCardProps {
  title: string;
}

const { width } = Dimensions.get("window");

const LeadOverviewCard: React.FC<ProgressCardProps> = ({ title }) => {
  const [index, setIndex] = useState<number>(0);

  const route: any = useRoute();
  const { data } = route.params;
  const [leadVideoUrl, setLeadVideoUrl] = useState<string | null>(null);

  console.log(data, "Route Data data");

  // Scenes for each tab
  const Description = () => (
    <ScrollView contentContainerStyle={styles.sceneContent}>
      <Text style={styles.sceneText}>{data?.lead_description}</Text>
    </ScrollView>
  );

  const ContactInformation = () => (
    <ScrollView contentContainerStyle={styles.sceneContent}>
      <Text style={styles.sceneText}>{data?.lead_address}</Text>
    </ScrollView>
  );

  const Reviews = () => (
    <ScrollView contentContainerStyle={styles.sceneContent}>
      <Text style={styles.sceneText}>Reviews content here</Text>
    </ScrollView>
  );

  const FAQ = () => (
    <ScrollView contentContainerStyle={styles.sceneContent}>
      <Text style={styles.sceneText}>FAQ content here</Text>
    </ScrollView>
  );

  // Routes for tab view
  const routes = [
    { key: "description", title: "Description" },
    { key: "contact", title: "Contact Information" },
    { key: "reviews", title: "Reviews" },
    { key: "faq", title: "FAQ" },
  ];

  // Render function for TabView
  const renderScene = SceneMap({
    description: Description,
    contact: ContactInformation,
    reviews: Reviews,
    faq: FAQ,
  });

  // Custom TabBar component
  const renderTabBar = (props: any) => (
    <View style={styles.tabBarContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          tabStyle={styles.tab}
          renderLabel={({ route, focused }: any) => (
            <Text style={focused ? styles.labelActive : styles.labelInactive}>
              {route.title}
            </Text>
          )}
        />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data?.lead_cat_id}</Text>
          <Text style={styles.subtitle}>{data?.lead_sub_cat}</Text>
        </View>

        <View>
          {data?.lead_video_url ? (
            <Video
              source={{uri: data?.lead_video_url}} // Your video URL
              style={{width: '100%', height: 150}} // Adjust the size of the video
              controls={true} // Enable native video controls (play, pause, etc.)
              resizeMode="contain" // Contain the video within the view's bounds
              onError={e => console.log('Video Error: ', e)} // Catch video errors
            />
          ) : (
            <Text>No video available</Text>
          )}
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.statusBadgeNonEscrow}>
            <Text style={styles.statusTextNonEscrow}>
              {data?.lead_escrow === 0 ? 'Non Escrow' : 'Escrow'}
            </Text>
          </View>
          <View style={styles.statusBadgeOpen}>
            <Text style={styles.statusTextOpen}>{data?.lead_job_status}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data?.lead_budget}</Text>
          <Text style={styles.subtitle}>{data?.user_email}</Text>
          <Text style={styles.subtitle}>
            {' '}
            Last update:{data?.lead_created_at}
          </Text>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width}}
          renderTabBar={renderTabBar}
          style={styles.tabView}
        />
        {/* Delete and Help buttons */}
        {/* <View style={styles.buttonContainer}>
          <Button
            title="Delete"
            color="#FF6C7C"
            onPress={() => console.log("Delete pressed")}
          />
          <Button
            title="Help"
            color="#4FCB73"
            onPress={() => console.log("Help pressed")}
          />
        </View> */}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    borderRadius: 11,
    margin: 0,
    padding: 10,
    marginTop: 20,
    minHeight: 150,
    marginBottom: 10,
  },
  cardImage: {
    padding: 0,
    borderRadius: 11,
  },
  infoContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#A8A8A8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  statusBadgeNonEscrow: {
    backgroundColor: "#FFE9E9",
    padding: 10,
    borderRadius: 2,
    marginRight: 5,
  },
  statusBadgeOpen: {
    backgroundColor: "#E0F7EA",
    padding: 10,
    borderRadius: 2,
  },
  statusTextNonEscrow: {
    color: "#FF6C7C",
    fontSize: 12,
    fontWeight: "800",
  },
  statusTextOpen: {
    color: "#4FCB73",
    fontSize: 12,
    fontWeight: "800",
  },
  tabView: {
    marginTop: 20,
    flex: 2, // Flex to take up remaining space
    minHeight: 200,
  },
  tabBarContainer: {
    backgroundColor: "#fff",
    flex: 0,
  },
  tabBar: {
    backgroundColor: "#f5f5f5",
    height: 60,
  },
  indicator: {
    backgroundColor: "#000",
  },
  tab: {
    width: 120, // Adjust width as needed
  },
  labelActive: {
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
  },
  labelInactive: {
    color: "#A8A8A8",
    fontWeight: "700",
    textAlign: "center",
  },

  sceneContent: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sceneText: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  vediocard: { borderRadius: 8, overflow: "hidden" },
  vediocontainer: {
    height: 200, // Adjust height for the video container
    borderRadius: 8,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: 150,
  },
});

export default LeadOverviewCard;
