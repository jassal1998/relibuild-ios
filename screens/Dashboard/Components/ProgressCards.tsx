import React from "react";
import { Text, View } from "react-native";
import { Card } from "@rneui/themed";
import {ProgressChart} from 'react-native-chart-kit';

interface ProgressCardProps {
  title: string;
  barColor: string;
  progress: string;
  chartData: any;
  dataNumber: number;
}

const ProgressCards: React.FC<ProgressCardProps> = ({
  title,
  barColor,
  progress,
  chartData,
  dataNumber,
}) => {
  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "transparent",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(${barColor}, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={{ width: "100%" }}>
      <Card
        containerStyle={{
          borderRadius: 11,
          margin: 0,
          padding: 20,
          marginTop: 20,
          minHeight: 150,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "50%", justifyContent: "flex-start" }}>
            <View style={{ flex: 1, justifyContent: "flex-start" }}>
              <Text
                allowFontScaling={true}
                maxFontSizeMultiplier={1}
                style={{ fontWeight: "600", fontSize: 17, color: "#000" }}
              >
                {title}
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text
                  allowFontScaling={true}
                  maxFontSizeMultiplier={1}
                  style={{ fontWeight: "600", fontSize: 26, color: "#000" }}
                >
                  {dataNumber}
                </Text>
                <Text
                  allowFontScaling={true}
                  maxFontSizeMultiplier={1}
                  style={{ fontSize: 12, color: "#2DCB73", marginLeft: 5 }}
                >
                  {progress}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "50%",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: 5,
            }}
          >
            <ProgressChart
              data={chartData}
              width={100}
              height={100}
              strokeWidth={16}
              radius={32}
              chartConfig={chartConfig}
              hideLegend={true}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default ProgressCards;
