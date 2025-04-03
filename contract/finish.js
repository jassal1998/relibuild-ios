import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import HomeHeader from "../contract/utility/comp/header";
// import { grayColor, primaryColor } from "../leadsDashboard/jobCard";
import { grayColor2, LocalButton } from "../contract/utility/comman";
import { useNavigation } from "@react-navigation/native";
import StepIndicator from "../contract/utility/comp/stepper";
import StatusComponent from "./status";
import { getProjectDetails } from "./func";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../contract/utility/redux/profile";
import { selectContractId } from "../contract/utility/redux/contract/reducer";
import LocalText from "../contract/utility/comp/LocalText";
const { width, height } = Dimensions.get("screen");

const Finish = () => {
  const navigation = useNavigation()
  const [projectDetails,setProjectDetails] = useState('')
  const token = useSelector(selectToken)
  const contractID = useSelector(selectContractId)
  const dispatch = useDispatch()
  useEffect(()=>{
    getProjectDetails(contractID,token,dispatch).then(res=>{
setProjectDetails(res.data.data.project)
    })
  },[])
  return (
    <View style={{
      flex:1
    }}>
      {/* <HomeHeader replace={'Create'} title={'Status'} subTitle={"Sign pending"} /> */}
      <StepIndicator currentStep={4}/>
  <ScrollView contentContainerStyle={{padding: 20,
    backgroundColor: "#f5f6fa",
    paddingBottom:200}}>
      <View>
       
       <StatusComponent project={projectDetails}/>

        <LocalButton onPress={()=>{
navigation.goBack()
        }} title={'Back'} bg={grayColor2}  marginTop={20} />
       </View>
    </ScrollView>
    </View>
  
  );
}
const style = StyleSheet.create({
  view1: {
    height: height / 1,
    flexDirection: "row",

    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 1,

    backgroundColor: "white",
    height: height / 8,
  },
  img: {
    width: 30,
    height: 30,
    right: 30,
    tintColor: "black",
  },
  view2: {
    marginTop: 50,
    marginLeft: 20,
  },
  img2: {
    width: 25,
    height: 25,
  },
  view3: { marginTop: 50, marginLeft: 20 },
  img3: {
    width: 25,
    height: 25,
  },
  View4: { marginTop: 50 },
  img4: { width: 25, height: 25 },
  view5: { marginTop: 50 },
  img5: { width: 25, height: 25 },
  view6: { marginTop: 50 },
  img6: { width: 25, height: 25 },
  view7: { marginTop: 50 },
  style: { backgroundColor: "#F7F7F7", padding: 10 },
  Contract: { marginTop: 20, fontSize: 20, fontWeight: "bold" },
  create: { fontSize: 15, marginTop: 5, color: "#8F8F99" },
  box: {
    backgroundColor: "white",
    width: width / 1.1,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width / 1.2,
    alignSelf: "center",
    height: height / 8,
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: "#EDF0F9",
  },
  project: { fontSize: 15, padding: 10, left: 10, fontWeight: "700" },
  Milestones: { fontSize: 15, padding: 10, left: 10, fontWeight: "700" },
  Home: { fontSize: 15, padding: 10, fontWeight: "700" },
  finish: { flexDirection: "row", justifyContent: "space-around", bottom: 40 },
  subcontrator: { fontSize: 15, padding: 10, fontWeight: "700" },
  finish: { flexDirection: "row", justifyContent: "space-around", bottom: 40 },
});
 
export default Finish;
