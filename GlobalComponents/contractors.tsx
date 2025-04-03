import React, { useState, useEffect } from "react";
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
import { GlobalStyles } from "../constants/style";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";

export default function Contractors(props:any ) {
  const [activeIndex, setActiveIndex] = useState();
  const navigation: any = useNavigation();
  const [selectedIds, setSelectedIds] = useState<any>([]);

  useEffect(() => {
    props.onSelect(selectedIds);
    console.log(selectedIds, "ddd");
  }, [selectedIds]);

  function toggleSelection(itemId: any) {
    setSelectedIds((prevIds:any ) => {
      const index = prevIds.indexOf(itemId);
      if (index === -1) {
        // If the item ID is not in the selectedIds array, add it
        return [...prevIds, itemId];
      } else {
        // If the item ID is already in the selectedIds array, remove it
        return prevIds.filter((id:any ) => id !== itemId);
      }
    });
  }

  return (
    <View style={{ display: "flex" }}>
      <Card
        containerStyle={{
          borderRadius: 11,
          borderColor: "#fff",
          margin: 0,
          padding: 0,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Card.Image
          style={{ padding: 0, borderRadius: 11 }}
          source={{
            uri: props.data.service_img_url,
          }}
        />
      </Card>
      <Text
        allowFontScaling={true}
        maxFontSizeMultiplier={1}
        style={{
          fontSize: 15,
          color: "#304035",
          fontWeight: "600",
          textTransform: "capitalize",
          marginLeft: 5,
        }}
      >
        {props.data.cont_name}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Button
          icon={
            <Icon
              name={
                selectedIds.includes(props.data.cont_Id)
                  ? "bookmark"
                  : "bookmark-border"
              }
              type="material"
              size={20}
              color={
                selectedIds.includes(props.data.cont_Id)
                  ? GlobalStyles.colors.primary
                  : "#fff"
              }
            />
          }
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: selectedIds.includes(props.data.cont_Id)
              ? "#fff"
              : GlobalStyles.colors.primary,
            padding: 10,
          }}
          onPress={() => toggleSelection(props.data.cont_Id)}
        ></Button>
        <Button
          icon={<Icon name="eye" type="font-awesome" size={15} color="white" />}
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: GlobalStyles.colors.primary,
            padding: 10,
          }}
        ></Button>
      </View>
    </View>
  );
}
