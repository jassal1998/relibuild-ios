// import React from "react";
// import { ScrollView, Text, View } from "react-native";
// import SearchSection from "../../GlobalComponents/search";
// import { GlobalStyles } from "../../constants/style";
// import ProgressCards from "./Components/ProgressCards";

// const data = [
//   {
//     title: "Contracts",
//     dataNumber: 2,
//     barColor: "rgb(80, 117, 237)", // Updated format
//     progressNumber: "↑ 02.33%",
//     chartData: [0.8],
//     id: 1,
//   },
//   {
//     title: "Escrow",
//     dataNumber: 1,
//     barColor: "rgb(247, 192, 96)", // Updated format
//     progressNumber: "↑ 02.33%",
//     chartData: [0.5],
//     id: 2,
//   },
//   {
//     title: "Completed",
//     dataNumber: 1,
//     barColor: "rgb(71, 209, 132)", // Updated format
//     progressNumber: "↑ 05.33%",
//     chartData: [0.9],
//     id: 3,
//   },
//   {
//     title: "Disputes",
//     dataNumber: 1,
//     barColor: "rgb(45, 46, 49)", // Updated format
//     progressNumber: "↑ 00.33%",
//     chartData: [0.2],
//     id: 4,
//   },
// ];

// const Dashboard = () => {
//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <View style={{ paddingBottom: 50 }}>
//         <View>
//           <Text
//             allowFontScaling={true}
//             maxFontSizeMultiplier={1}
//             style={[GlobalStyles.title, { marginTop: 5 }]}
//           >
//             Dashboard
//           </Text>
//         </View>
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//           }}
//         >
//           {data.length &&
//             data.map((item: any) => (
//               <ProgressCards
//                 title={item.title}
//                 barColor={item.barColor}
//                 progress={item.progressNumber}
//                 chartData={item.chartData}
//                 dataNumber={item.dataNumber}
//                 key={item.id}
//               />
//             ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Dashboard;
