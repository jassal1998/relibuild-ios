// Contractor.js
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import ContractTabs from "./components/ContractTabs";
import { useDispatch, useSelector } from "react-redux";
import { getContractorDetail } from "../../slices/thunk";

const Contractor = ({ route }:{route:any}) => {
  const { data } = route.params;
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch contractor details
    dispatch(getContractorDetail(data.id)).finally(() => {
      setLoading(false);
    });
  }, [dispatch, data.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ContractTabs isLoading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Contractor;
