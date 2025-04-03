import React from "react";
import { ScrollView, Text, View } from "react-native";
import SearchSection from "../../GlobalComponents/search";
import { GlobalStyles } from "../../constants/style";
import ProgressCards from "./Components/LeadOverviewCard";
import LeadOverviewCard from "./Components/LeadOverviewCard";
import { useRoute } from "@react-navigation/native";

const data = [
  {
    title: "Contracts",
    dataNumber: 2,
    barColor: "80, 117, 237",
    progressNumber: "↑ 02.33%",
    chartData: [0.8],
    id: 1,
  },
  {
    title: "Escrow",
    dataNumber: 1,
    barColor: "247, 192, 96",
    progressNumber: "↑ 02.33%",
    chartData: [0.5],
    id: 2,
  },
  {
    title: "Completed",
    dataNumber: 1,
    barColor: "71, 209, 132",
    progressNumber: "↑ 05.33%",
    chartData: [0.9],
    id: 3,
  },
  {
    title: "Disputes",
    dataNumber: 1,
    barColor: "45, 46, 49",
    progressNumber: "↑ 00.33%",
    chartData: [0.2],
    id: 4,
  },
];

const LeadsOverview = () => {


  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ paddingBottom: 50 }}>
        <View></View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <LeadOverviewCard title={"Lead Overview"} />
        </View>
      </View>
    </ScrollView>
  );
};

export default LeadsOverview;
