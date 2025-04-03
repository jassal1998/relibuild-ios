import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LocalButton } from "../comman";
import moment from "moment";
import LocalText from "./LocalText";
const RecentWorkCard = ({details,onDelete}) => {
  const [expanded, setExpanded] = useState(false); // State to track expand/collapse
const img =  JSON.parse(details.rw_images)
  return (
    <View style={styles.container}>
      {/* Header Section with Expand/Collapse Icon */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <LocalText style={styles.headerText}>{details.rw_name}</LocalText>
        <Icon
          name={expanded ? "chevron-up" : "chevron-down"} // Toggle icon
          size={20}
          color="#000"
        />
      </TouchableOpacity>

      {/* Expandable Content */}
      {expanded && (
        <View style={styles.content}>
          {/* Image */}
          <Image
            source={{
              uri: img ?img[0]:""
            }}
            style={styles.image}
          />

          {/* Details */}
          <View style={styles.details}>
            <LocalText style={styles.description}>{details.rw_description}</LocalText>

            {/* Timestamps */}
            <View style={styles.timestamps}>
              <LocalText style={styles.timestamp}>
                📍 <LocalText style={styles.label}>Started At:</LocalText> {moment(details.rw_started_at).format('DD, MMM YYYY')}
            </LocalText>
              <LocalText style={styles.timestamp}>
                📅 <LocalText style={styles.label}>Completed At:</LocalText> {moment(details.rw_completed_at).format('DD, MMM YYYY')}
            </LocalText>
            </View>

            {/* Delete Button */}
<LocalButton onPress={()=>{
  onDelete(details.rw_id)
}} bg={'#FF6C6C'} color={'#FFFFFF'} title={'Delete'} />
          </View>
        </View>
      )}
    </View>
  );
};

export default RecentWorkCard

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#e3e8fc",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  content: {
    padding: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: "#000",
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
    marginTop:20
  },
  timestamps: {
    marginBottom: 15,
  },
  timestamp: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  deleteButton: {
    backgroundColor: "#FF6961",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});