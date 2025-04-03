import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import SearchSection from "../../../GlobalComponents/search";
import { GlobalStyles } from "../../../constants/style";
import Services from "../../../GlobalComponents/services";
import { getNearByContrators } from "../../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import Contractors from "../../../GlobalComponents/contractors";
import { submitQuery } from "../../../slices/thunk";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";

interface SelectContractorsProps {
  route: any;
}

const SelectContractors: React.FC<SelectContractorsProps> = ({ route }) => {
  const { data, video } = route.params;
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const services = useSelector((state: any) => state.Services.contractors);
  const [selectIds, setSelectIds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getService();
  }, []);

  const getService = () => {
    dispatch(getNearByContrators("06824", navigation))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  const handleSelectedContractors = (selectedIds: any) => {
    setSelectIds(selectedIds);
  };

  const handleSubmit = () => {
    console.log("Selected Contractor IDs:", selectIds);
    let queryData = {
      data,
      video,
      selectIds,
    };
    dispatch(submitQuery(queryData, navigation));
  };

  const serviceData = services.map((item: any) => ({
    cont_Id: item.id,
    cont_name: item.firstName,
    service_img_url:
      "https://res.cloudinary.com/dinwqfgid/image/upload/c_scale,h_382/v1699944582/istockphoto-1492434373-612x612_rfkg5l.jpg",
  }));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={GlobalStyles.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={{ marginBottom: 120 }}>
          <View>
            <Text
              allowFontScaling={true}
              maxFontSizeMultiplier={1}
              style={[GlobalStyles.title, { marginTop: 5 }]}
            >
              Contractors For You
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {serviceData.map((item: any) => (
              <View style={{ width: "48%" }} key={item.service_Id}>
                <Contractors data={item} onSelect={handleSelectedContractors} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
        }}
      >
        <Button
          onPress={handleSubmit}
          buttonStyle={{
            backgroundColor: GlobalStyles.colors.primary,
            borderRadius: 8,
            padding: 15,
          }}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SelectContractors;
