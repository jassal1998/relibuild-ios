import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
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
import { useSelector } from "react-redux";

export default function ServiceSection() {
  const services = useSelector((state: any) => state.Services.services);
  const navigation: any = useNavigation();

  const navigateToServices = () => {
    navigation.navigate("Services");
  };



  

  const service = [
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
    {
      serviceImg:
        "https://res.cloudinary.com/dinwqfgid/image/upload/v1709550116/tradesmen/Group_76_kixhgz.png",
      serviceTitle: "Service 1",
      serviceUrl: "",
    },
  ];
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {service.map((item, index) => (
        <View style={{ alignItems: "center" }} key={index}>
          <Card
            containerStyle={{
              borderRadius: 11,
              borderColor: "#fff",
              height: 70,
              width: 70,
              margin: 10,
              padding: 0,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Image
              style={{ padding: 0, height: 45, width: 45, borderRadius: 11 }}
              source={{
                uri: item.serviceImg,
              }}
            />
          </Card>
          <Text
            allowFontScaling={false}
            maxFontSizeMultiplier={1}
            style={{ marginBottom: 10, marginTop: 5 }} 
                     >
            {item.serviceTitle}
          </Text>
        </View>
      ))}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 70,
          width: 70,
          margin: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: GlobalStyles.colors.primary,
          }}
        >
          <Icon
            color={GlobalStyles.colors.white}
            name="chevron-right"
            iconStyle={{ padding: 0, margin: 0 }}
            size={20}
            type="material"
            onPress={navigateToServices}
          />
        </View>
      </View>
    </View>
  );
}
