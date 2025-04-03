// ReviewsTab.js
import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Card, Icon, Avatar } from "@rneui/themed";

const { height: screenHeight } = Dimensions.get("window");

const ReviewsTab = () => {
  let rating = [1, 2, 3, 4, 5];
  let reviews = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <ScrollView>
        {reviews.map((item, index) => (
          <Card key={index} containerStyle={styles.card}>
            <View style={styles.ratingContainer}>
              {rating.map((ratingItem, ratingIndex) => (
                <View style={styles.ratingItem} key={ratingIndex}>
                  <Icon
                    color="#FFE500"
                    name="grade"
                    iconStyle={styles.iconStyle}
                    size={20}
                    type="material"
                  />
                </View>
              ))}
            </View>
            <Text style={styles.reviewTitle}>Exceptional Service!</Text>
            <Text style={styles.reviewText}>
              Our experience with Estatein was outstanding. Their team's
              dedication and professionalism made finding our dream home a
              breeze. Highly recommended!
            </Text>
            <View style={styles.avatarContainer}>
              <Avatar
                rounded
                source={{
                  uri: "https://randomuser.me/api/portraits/men/41.jpg",
                }}
                size="medium"
              />
              <View style={styles.avatarInfo}>
                <Text style={styles.avatarName}>Wade Warren</Text>
                <Text style={styles.avatarLocation}>USA, California</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    minHeight: screenHeight - 200,
    marginLeft: 10,
  },

  card: {
    minHeight: 0,
    borderRadius: 11,
    borderColor: "#fff",
    margin: 0,
    padding: 10,
    marginBottom: 15,
    minWidth: "100%",
  },
  ratingContainer: {
    flexDirection: "row",
  },
  ratingItem: {
    height: 30,
    width: 30,
    margin: 5,
    borderRadius: 100,
    backgroundColor: "#2F2E43",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconStyle: {
    padding: 0,
    margin: 0,
  },
  reviewTitle: {
    fontSize: 22,
    color: "#000",
    marginLeft: 5,
    marginBottom: 10,
  },
  reviewText: {
    color: "#000",
    fontWeight: "400",
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 5,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatarInfo: {
    marginLeft: 20,
  },
  avatarName: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  avatarLocation: {
    fontWeight: "500",
    fontSize: 16,
    color: "#000",
  },
});

export default ReviewsTab;
