import React from "react";
import { Text, View, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }}>
    <Text>First Route</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
    <Text>Second Route</Text>
  </View>
);

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white" }}
    style={{ backgroundColor: "blue" }}
  />
);

export default function LeadOverviewCard() {
  const layout = Dimensions.get("window");

  return (
    <TabView
      navigationState={{
        index: 0,
        routes: [
          { key: "first", title: "Description" },
          { key: "second", title: "Contact Information" },
        ],
      }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={(index) => console.log(index)}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
