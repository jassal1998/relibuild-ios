import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Skeleton,
  Input,
  Icon,
  Avatar,
  Badge,
  withBadge,
  Card,
} from "@rneui/themed";
import { GlobalStyles } from "../../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../../../slices/thunk";

const { width, height } = Dimensions.get("screen");

export default function Properties() {
  const dispatch: any = useDispatch();
  const services = useSelector((state: any) => state.Services.services);
  const navigation: any = useNavigation();

  const navigateToProperty = (item:any) => {
    navigation.navigate("propertyView", { data: item });
  };

  

  const properties = useSelector((state: any) => state.RealEstate.properties);

  console.log(properties, "dmkmdkmdm");
  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);
  const service = [
    {
      serviceImg: require("../../../assets/images/mimai.png"),

      serviceTitle: "24 CONTRACTORS",
      serviceUrl: "",
      location: "Miami",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png",
      serviceTitle: "24 CONTRACTORS",
      serviceUrl: "",
      location: "Los Angeles",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png",
      serviceTitle: "24 CONTRACTORS",
      serviceUrl: "",
      location: "New York",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1710483512/Shape_usg6jg.png",
      serviceTitle: "24 CONTRACTORS",
      serviceUrl: "",
      location: "Florida",
    },
  ];
  const { width, height } = Dimensions.get("screen");
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View>
          <Text style={styles.title}>Properties near you</Text>
        </View>
        <View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllPropertie")}
            >
              <Text style={styles.view} allowFontScaling={false}>
                {" "}
                View all
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {properties &&
          properties.length > 0 &&
          properties.map((item: any, index:any) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToProperty(item)}
            >
              <View
                style={{ width: width * 0.6, marginLeft: 16, padding: 10 }}
                key={item.rep_id}
              >
                <Card
                  containerStyle={{
                    borderRadius: 11,
                    width: "100%",
                    paddingTop: 10,
                    borderWidth: 0,

                    margin: 0,
                    padding: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                    elevation: 10, // Android shadow
                    shadowColor: "#000", // iOS shadow
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                  }}
                >
                  <View style={{ flexDirection: "column" }}>
                    <Card.Image
                      style={{
                        width: "100%",
                        borderTopLeftRadius: 11,
                        borderTopRightRadius: 11,
                        overflow: "hidden",
                      }}
                      source={{ uri: JSON.parse(item.rep_images)[0] }}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 15,
                        color: "#FFFFFF",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      
                      1 day ago
                    </Text>

                    <Text
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 15,
                        color: "#FFFFFF",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      4000$
                    </Text>
                  </View>
                  <View>
                    <Text
                      allowFontScaling={false}
                      maxFontSizeMultiplier={1}
                      style={{
                        top: 5,
                        fontSize: 16,

                        fontWeight: "700",
                        color: "balck",
                      }}
                    >
                      {item.rep_title}
                    </Text>
                    <View style={{ paddingTop: 10 }}>
                      <View
                        style={{
                          flexDirection: "row", // Items in a row
                          alignItems: "center", // Vertically center items
                        }}
                      >
                        <View
                          style={{
                            width: 20,
                            alignItems: "center",
                          }}
                        >
                          <Icon
                            name="house"
                            type="material"
                            color="black"
                            size={15} // Icon size
                          />
                        </View>

                        <Text
                          allowFontScaling={false}
                          maxFontSizeMultiplier={1}
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "600",
                            marginLeft: 5,
                          }}
                        >
                          12 Bedrooms
                        </Text>
                      </View>

                      <View>
                        <View
                          style={{
                            flexDirection: "row", // Ensures icon and text are in the same row
                            alignItems: "center", // Vertically aligns both icon and text in the center
                            marginLeft: 3,
                            paddingTop: 10,
                          }}
                        >
                          <Icon
                            name="bathtub"
                            type="material"
                            color="black" // Fixed typo "balck"
                            size={15}
                            style={{
                              marginRight: 10,
                            }}
                          />

                          {/* Text */}
                          <Text
                            allowFontScaling={false}
                            maxFontSizeMultiplier={1}
                            style={{
                              color: "black",
                              fontSize: 12,

                              fontWeight: "600",
                            }}
                          >
                            2 Bathrooms
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 10,

                        marginRight: 10,
                        marginLeft: 0,
                      }}
                    >
                      <View style={{width:25,right:8}}>
                        <Icon
                          name="place"
                          type="material"
                          color="balck"
                          size={15}
                          style={{ marginRight: 10 }}
                        />
                      </View>
                      <Text
                        allowFontScaling={false}
                        maxFontSizeMultiplier={1}
                        style={{
                          color: "balck",
                          fontSize: 10,
                          fontWeight: "600",
                          right:5
                        }}
                      >
                        {`${item.rep_state}, ${
                          item.rep_country == "United States" ? "USA" : null
                        }`}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        bottom: 10,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{ color: "balck", fontSize: 10, top: 10 }}
                        allowFontScaling={false}
                      >
                        Published by Thomas
                      </Text>
                      <View style={{ width: 70 }}>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#325573",
                            height: 30,
                            width: "100%",
                            alignSelf: "flex-end",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              top: 7,
                              fontSize: 10,
                            }}
                            allowFontScaling={false}
                          >
                            Know more
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Card>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    fontSize: 15,
    color: "#325573",
    fontFamily: "Unbounded-Regular",
    textAlign: "right",
  },
  title: {
    maxWidth: 240,
    fontFamily: "Unbounded-Regular",
    ...GlobalStyles.title,
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
  container2: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20, 
    marginVertical: 5,
  },
  sreach: {
    backgroundColor: "#fff",
    borderRadius: 10,

    borderColor: "#ccc",
    paddingHorizontal: 20,
    paddingVertical: 12,
    width: width * 0.8,
    height: 45,

    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  roundedContainer: {
    overflow: "hidden",
    borderRadius: 35,
    elevation: 3,
    backgroundColor: "white",
  },
  image: {
    height: 200, // Adjust the height as needed
    width: "100%", // Takes full width of the container
  },
});
