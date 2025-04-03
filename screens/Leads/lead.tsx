import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getLeads } from "../../slices/thunk";
import ProgressCards from "./Components/LeadCard";

const Leads = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const leads = useSelector((state: any) => state.leads?.leads);

  useEffect(() => {
    checkLoginStatus();
    fetchData();
  }, []);

  // Function to check if user is logged in
  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem("authUser");
    setIsLoggedIn(!!token);
  };

  const fetchData = async () => {
    dispatch(getLeads());
  };

  const navigateToOverview = (item: any) => {
    navigation.navigate("leadOverview", { data: item });
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ paddingBottom: 50 }}>
        {!isLoggedIn ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 300,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Please login to see your projects
            </Text>
            <Button title="Login" onPress={navigateToLogin} />
          </View>
        ) : (
          <View>
            {leads && leads.length > 0 ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {leads.map((item: any) => (
                  <ProgressCards
                    key={item.id}
                    data={item}
                    onPress={() => navigateToOverview(item)}
                  />
                ))}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 300,
                }}
              >
                <Text style={{ fontSize: 18 }}>No data available</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Leads;
