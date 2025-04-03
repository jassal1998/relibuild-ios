import React, { useState,  useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import FileViewer from 'react-native-file-viewer';
import Share from 'react-native-share';
import HomeHeader from "../contract/utility/comp/header";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import CrateNewPropertyOwner from "./createPropertyOwnerModal";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setSpinnerLoading } from "../contract/utility/redux/profile";
import { CallAPIGetPromise, LocalButton, apiUrl, blueColor2, deepBlue, getUserId, getUserType, grayColor, orangeColor, primaryColor } from "../contract/utility/comman";
import { getProjectDetails } from "./func";
import { selectContractId } from "../contract/utility/redux/contract/reducer";
import CreateSubMileStone from "./createSubMilestones";
import SaveSubContractModal from "./subContModal";
import SignModal from "./signmodal";

// import RNFS from 'react-native-fs';
import axios from "axios";
import Toast from "react-native-toast-message";
import moment from "moment";
import StepIndicator from "../contract/utility/comp/stepper";
import LocalText from "../contract/utility/comp/LocalText";
import { useTranslation } from "react-i18next";

const states = [
  { label: "Select a state...", value: "" },
  { label: "Connecticut", value: "CT" },
  { label: "Florida", value: "FL" },
  { label: "New York", value: "NY" },
];


const { width, height } = Dimensions.get("screen");

const Details = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [propertierList,setPropertierList] = useState([])
  const [selectedPropertier,setSelectedProptertier] = useState([])
  const [projectSubContractorsList,setProjectSubContractorsList] = useState([])
  const [subMileStoneVisible,setSubMileStoneVisible]=useState(false)
  const [subContractModalStatus,setSubContractModalStatus] = useState(false)
  const [selectedSubContracterFromFlatList,setSelectedSubContractorFlatList] = useState('')
 const [projectDetails,setProjectDetails]= useState('')
  const token = useSelector(selectToken)
  console.log("hshhshds",token)
  const [filePaths,setFilePaths] = useState([])
 const dispatch = useDispatch()
 const contractID = useSelector(selectContractId)
 console.log("ccc",contractID)
  const [isPickerVisible, setPickerVisible] = useState(false); // For picker visibility
  const [status, setStatus] = useState("Inactive"); // Default status
  const [teamData, setTeamData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
const [signModalStatus,setSignModalStatus] = useState(false)

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible); // Toggle visibility
  };

  const selectStatus = (selectedStatus) => {
    setStatus(selectedStatus); // Update selected status
    setPickerVisible(false); // Close the picker after selection
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


 
const {t} = useTranslation()
  const handleSubmit = () => {
    // Log the form data or handle submission
    closeModal(); // Close the modal after submission


    getPropertierList()
  };

  
  const downloadFile = async (name, fileUrl) => {
    dispatch(setSpinnerLoading("Downloading"));
  
    // Determine the base directory based on the platform
    const base = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
  
    try {
      let filePath = `${base}/${name}.pdf`; // Initial file path
      let counter = 1;
  
      // Check if the file already exists and create a unique file name
      while (await RNFS.exists(filePath)) {
        filePath = `${base}/${name} (${counter}).pdf`;
        counter++;
      }
  
      // Start the file download
      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: filePath,
      }).promise;
  
      if (result.statusCode === 200) {
        setFilePaths((prev) => [
          ...prev,
          {
            name: name,
            path: filePath,
          },
        ]);
  
        // Show success toast with option to open or share the file
        Toast.show({
          type: t("success") ,
          text1: t("File Saved"),
          text2: `${t("File saved to: ")} ${filePath}`,
          onPress: () => {
            // Open the file directly
            openFile(filePath);
          },
        });
  
        // Share the file after it is downloaded (iOS specific share functionality)
        if (Platform.OS === 'ios') {
          await Share.open({
            url: `file://${filePath}`, // Prefix with 'file://' for iOS
            type: 'application/pdf',  // Specify file type
            title: 'Download Complete',
            message: 'You can now share this file.',
          });
        }
  
      } else {
        throw new Error(`Download failed with status code ${result.statusCode}`);
      }
    } catch (error) {
      // Log and show the error message
      console.error("Error downloading file:", error);
      Toast.show({
        type: t("error"),
        text1:t("Download Error") ,
        text2:t(error.message) ,
      });
    } finally {
      // Hide the spinner regardless of success or failure
      dispatch(setSpinnerLoading(false));
    }
  };
  
  
  
  const openFile =async (path)=>{
    console.log(path)
    if (Platform.OS === 'android') {
      // Use FileViewer to open the file
      await FileViewer.open(path);
    } else {
      // Use Linking for iOS
      await Linking.openURL(path);
    }
  }
  const renderItem = ({ item }) => {
const isInProject = projectSubContractorsList.filter(p => Number(p.ps_subcontractor_id) ===Number(item.id) )
const isFileDownloaded = isInProject[0] ?filePaths.filter(o =>o.name===isInProject[0]?.contractDetails[0].sc_file_name) :[]
console.log("projectSubContractorsList",projectSubContractorsList)
return  (
      <View
        style={style.cardContainer}
        // onPress={() => navigation.navigate("Contract")}
      >
        <View style={style.cardHeader}>
          <Text style={style.projectName}>{item.user_first_name + " " + item.user_last_name|| "N/A"}</Text>
          <Text style={style.projectId}>ID: {item.id || "N/A"}</Text>
        </View>
  
        <View style={style.cardBody}>
          <View style={style.row}>
            <LocalText style={style.label}>Phone Number:</LocalText>
            <Text style={style.value}>
              {item.user_phone ? item.user_phone : "N/A"}
          </Text>
          </View>
  
  
          <View style={style.row}>
            <LocalText style={style.label}>Emails :</LocalText>
            <Text style={style.value}>
              {item.user_email ? item.user_email : "N/A"}
          </Text>
          </View>
  
          <View style={style.row}>
            <LocalText style={style.label}>Status :</LocalText>
            <Text style={[style.value, { color: item.sc_is_active === "Active" ? "#1f57d6" : "#FF4C4C" }]}>
              {item.sc_is_active || "N/A"}
          </Text>
          </View>
  
          <View style={style.row}>
            <LocalText style={style.label}>Date :</LocalText>
            <Text style={style.value}>{moment(item.sc_created_at).format('DD MMM YYYY') }</Text>
          </View>
  
  {isInProject[0] ?<View>
    <LocalButton bg={'#3762EA'} marginTop={20}  color={'white'} title={'Milestones'} onPress={()=>{
      setSelectedSubContractorFlatList(item.id)
      setSubMileStoneVisible(true)
    }} />

    
    </View> :<View>
    <LocalButton bg={'#3762EA'} marginTop={20} color={'white'} title={'Add  Milestones'} onPress={()=>{
      setSelectedSubContractorFlatList(item.id)
      setSubMileStoneVisible(true)
    }} />

    
    </View>}
  
    {isInProject[0] ? isInProject[0]?.contractDetails[0]?<View>
      <LocalButton marginTop={10} bg={orangeColor} color={'white'} title={'Update Contract'} onPress={()=>{
      setSelectedSubContractorFlatList(item.id)
   
   setSubContractModalStatus(true)
    }}  />
<LocalButton marginTop={10} color={'white'} bg={blueColor2} title={'Sign Contract'} onPress={()=>{
      setSelectedSubContractorFlatList(item.id)
   setSignModalStatus(true)
  //  setSubContractModalStatus(true)
    }} />
  
    </View>:<View>

      <LocalButton bg={primaryColor} color={'white'} marginTop={10} onPress={()=>{
      setSelectedSubContractorFlatList(item.id)
   
   setSubContractModalStatus(true)
    }} title={"Create Contract"} />
  
    
    </View>  :null}

    {isInProject[0] ? isInProject[0]?.contractDetails[0]?.sc_contract_url?<View>
  <LocalButton bg={deepBlue} color={'white'} marginTop={10} title={'Download'} onPress={()=>{
      downloadFile(isInProject[0]?.contractDetails[0].sc_file_name,isInProject[0]?.contractDetails[0]?.sc_contract_url)
    }}/>

  
    </View>:null :null}


    {isInProject[0] ? isFileDownloaded[0]?<View>
  <LocalButton border={deepBlue} bg={'white'} color={deepBlue} marginTop={10} title={'Open Downloaded File'} onPress={()=>{
      openFile(isFileDownloaded[0].path)
    }}/>

  
    </View>:null :null}


        </View>
      </View>
    );
  }


const userID = token ?getUserId(token):""
console.log("dsdvv",userID)
const refreshProject = ()=>{
  console.log("sfsf,",contractID)
  getProjectDetails(contractID,token,dispatch).then(res=>{
    if(res?.data?.data?.project.subcontractors){
      const data = res.data.data.project.subcontractors
      console.log("API Response for getPropertierList:", res.data);
      setProjectDetails(res.data.data.project)
setProjectSubContractorsList(data)
console.log("dta",data)
if(!selectedPropertier[0]){
data.map((d)=>{
getSelectedPropertierDetail(d.ps_subcontractor_id)
console.log("djfvd",d.ps_subcontractor_id)

})
}

    }
  })
}
  const getPropertierList = ()=>{
    console.log("tokefffn",token)
    console.log("usddder,",userID)

    if (!userID) {
    console.error("🚨 User ID is missing! Skipping API call.");
    return;
  }

    CallAPIGetPromise(`/subcontractor/get-subcontractores/${userID}`,token,dispatch).then(res=>{
      if(res?.data.result){
        console.log("API Response for getPropertierList:", res.data);
      setPropertierList(res.data.result)
     }
    }).finally(()=>{
  refreshProject()
    })
  }

  const getSelectedPropertierDetail = (id)=>{
   
    console.log("Fetching subcontractor details for ID:", id);
    CallAPIGetPromise(`/subcontractor/get-single-subcontractor/${userID}/${id}`,token,dispatch).then(res=>{
      if(res?.data?.subcontractor){
      setSelectedProptertier(prev=>{
        return [
          ...prev,
          res?.data?.subcontractor
        ]
      })
     }
    })
  }
  
  useEffect(()=>{
if(token){
getPropertierList()
}
  },[token])

  const saveBase64ToFile = async (base64, fileName,) => {
    try {
      // Define the file path in the app's document directory
      const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      
      // Write the Base64 string to the file
      await RNFS.writeFile(path, base64, 'base64');
      
      // Prepend the "file://" prefix and return the full URI
      return `file://${path}`;
    } catch (error) {
      console.error("Error saving file:", error.message);
      throw error; // Rethrow the error for external handling
    }
  };
  const handleSaveSign = async(data,contractDetails)=>{
    const userType = getUserType(token)
    return new Promise((resolve,reject)=>{
      dispatch(setSpinnerLoading('uploading'))
      const path = `${apiUrl}/contract/sign-subcontract-contract/${userType}/${contractID}/${contractDetails[0].sc_id}`
      axios.post(path,data
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        },
      }).then(o =>{
      if(o.status ===200){
        resolve(o)
      }else{
        reject()
      }
  
      }).catch(o=>{
        console.log(o)
        reject()
      }).finally(()=>{
        dispatch(setSpinnerLoading(false))
      })
    })

  }

  const handleSignature = (signature)=>{
    const base64 = signature.replace(/^data:image\/\w+;base64,/, "");
 const subContractorD = projectDetails.subcontractors.filter(o=> o.ps_subcontractor_id.toString()===selectedSubContracterFromFlatList.toString())
 const   contractDetails= subContractorD[0].contractDetails

 const fileName = contractDetails[0].sc_file_name
 // Convert Base64 to Blob
    saveBase64ToFile(base64,fileName.replace(".png","")).then(filePath =>{

      const formData = new FormData();
      formData.append("file",{
        uri: filePath,
      name: fileName.replace(".png","")+".png",
      type: "image/png",
      });
    handleSaveSign(formData,contractDetails).then((res)=>{
      Toast.show({
        type: t('success'),
        text1:t('Sign Uploaded')
      })
      setSignModalStatus(false)
   setTimeout(() => {
    refreshProject()
   }, 3000);
    })
    })

    // Create FormDataba
  
  }

  return (
    <AutocompleteDropdownContextProvider>

      <View style={{
        flex:1,
        backgroundColor:'white'
      }}>
        {/* <HomeHeader replace={'Create'} title={'Subcontractor details'} subTitle={'Search for a subcontractor'} /> */}
        <StepIndicator currentStep={2}/>
        <ScrollView contentContainerStyle={style.form}>
          <View>
            <LocalText style={style.sub}>Subcontractor details</LocalText>
            <LocalText numberOfLines={4} style={style.sreach}>
              Search for a subcontractor in our database using their primary email
              address used to register a Tradesmen account.
          </LocalText>
            <AutocompleteDropdown

              dataSet={propertierList.map(p=>{
                return {
                  id: p.id,
                  title: p.user_first_name+ " " +  p.user_last_name
                }
              })}
             
              onSelectItem={(item) => {
                 if(item?.id){
                  const isAlreadyIn = selectedPropertier.filter(o=>o.id ===item.id)
                 if(!isAlreadyIn[0]){
                  getSelectedPropertierDetail(item.id)

                 }

                 }
              }}
              placeholder="Search..."
              useFilter={false} // Filters items based on the input
              clearOnFocus={true} // Clears the input when focused
              closeOnSubmit={false} // Closes the dropdown on submitting
              showClear={true} // Shows a clear button
              editable={false}
              disabled={true}
              onFocus={() => {}}
              textInputProps={{
                style: {
                  marginBottom: 15,
                  backgroundColor: "#f9f9f9",
                  color: 'black'
                }
              }}
              inputContainerStyle={{
                marginBottom: 15,
                backgroundColor: "#f9f9f9",
                color: 'black',
                borderColor: 'gray',
                borderWidth: 1,
                padding: 0,

              }}

            />
            <View style={{ paddingTop: 10 }}>
             {/* <LocalButton bg={'# 4CAF50'} color={'white'} disabled={true}  onPress={openModal}  title={'Make my Team'}/> */}
            
              <CrateNewPropertyOwner style={style} modalVisible={modalVisible} closeModal={ closeModal} teamData={ teamData} setTeamData={ setTeamData} togglePicker={ togglePicker} status={ status} isPickerVisible={isPickerVisible } selectStatus={ selectStatus} handleSubmit={ handleSubmit} />

            </View>
            <View style={{ marginTop: 20 }}>
                 <FlatList
                data={selectedPropertier}
                renderItem={renderItem}
                scrollEnabled={false}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
              />
           
              {/* New Milestone Modal */}
              <CreateSubMileStone projectSubContractorsList={projectSubContractorsList} subContracterID={selectedSubContracterFromFlatList} modalVisible={subMileStoneVisible} closeModal={()=>{
                setSubMileStoneVisible(false)
              }} handleSubmit={()=>{
                setTimeout(() => {
                  refreshProject()
                }, 1000);
              }}/>

{subContractModalStatus &&         <SaveSubContractModal handleSubmit={()=>{refreshProject()}} selectedSubContracterFromFlatList={selectedSubContracterFromFlatList} projectDetails={projectDetails} modalVisible={subContractModalStatus}  setModalVisible={()=>{
setSubContractModalStatus(false)
              }} />}
      
       
 


            </View>

            <LocalButton marginTop={20} title={'Next'} bg={'#325573'} color={'white'} onPress={() => navigation.navigate("Homeowner")}/>

<LocalButton marginTop={20} title={'Back'} bg={grayColor} color={'black'} onPress={() => navigation.navigate("Milestones")}/>
      
<SignModal isVisible={signModalStatus} onClose={()=>{
  setSignModalStatus(false)
}} handleSignature={handleSignature} />
          </View>
        </ScrollView>
      </View>
    </AutocompleteDropdownContextProvider>
  );
};
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: width - 40,
    flex:1
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 10,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f57d6",
  },
  projectId: {
    fontSize: 14,
    color: "#8F8F99",
  },
  cardBody: {
    marginTop: 10,
  },
  form: {
    padding: 20,
    backgroundColor: "#f5f6fa",
    paddingBottom: 200
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
  cardBody: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#8F8F99",
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
    color: "#333",
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
  sub: { fontSize: 20, fontWeight: "bold", marginTop: 10, color: 'black' },
  sreach: { fontSize: 15, paddingVertical: 20, fontWeight: "black", color: 'gray' },
  select: { fontSize: 15, marginLeft: 25, marginTop: 20 },
  arrow: { width: 25, height: 25, right: 10 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width / 1.2,
  },
  cardContent: {
    flexDirection: "column",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  createContractButton: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 100, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  createContractButtonText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },
  team: {
    backgroundColor: "#4CAF50", // Green background
    height: 40, // Fixed height
    width: '100%', // Fixed width
    alignSelf: "flex-end",
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center", // Center the modal content
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background with transparency
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  closeButton: {
    backgroundColor: "#880506", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  closeButtonText: {
    color: "white",

    fontSize: 10,
    padding: 10,
  },
  modalContentWrapper: {
    width: "80%", // Make the modal content take up 80% of screen width
    maxHeight: "80%", // Limit the height so content can scroll
    backgroundColor: "white",
    borderRadius: 10,
  },
  scrollViewContent: {
    padding: 20,
  },
  first: { fontSize: 15, paddingTop: 10, fontWeight: "500" },
  statusButton: {
    paddingVertical: 10,

    paddingTop: 20,

    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  statusButton: {
    backgroundColor: "#ECEBEB",
    padding: 10,
    top: 10,

    borderRadius: 5,
  },
  statusText: {
    color: "black",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    top: 10,
    borderColor: "#ECEBEB",
    borderRadius: 5,

    backgroundColor: "white",
    padding: 5,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: "black",
  },
  submitButton: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5, // Space around the button
  },

  submitButtonText: {
    color: "white",
    // Style for submit button text
  },
  milestoneButton: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 100, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  milestoneButtonText: { color: "white" },
  savemilestone: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5, // Space around the button
  },
  Button: {
    backgroundColor: "#880506", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  cost: { fontSize: 15, fontWeight: "500" },
  Entercost: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    padding: 10,

    borderRadius: 10,
  },
  container: {},
  switchContainer: {
    alignSelf: "flex-end",
  },
  ofmilestone: { fontSize: 15, fontWeight: "500" },

  milestones1: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    padding: 10,

    borderRadius: 10,
  },
  ofmilestone2: { fontSize: 15, fontWeight: "500" },
  milestones2: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    padding: 10,

    borderRadius: 10,
  },
  ofmilestone3: { fontSize: 15, fontWeight: "500" },
  milestones3: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    padding: 10,

    borderRadius: 10,
  },
  createContactButton: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  icon: {
    width: 24,
    height: 24,
    right: 37,
  },

  selectedBox1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    padding: 12,
    width: "96%",

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedText1: {
    fontSize: 16,
    color:'black'
  },
  pickerContainer1: {
    marginTop: 5,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden", // Ensure animation looks smooth
  },
  optionButton1: {
    padding: 10,

    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "black",

  },
  firstinput: {
    borderWidth: 1,
    backgroundColor: "white",
    height: 40,
    padding: 10,
    color: 'black',

    borderRadius: 10,
  },
  modalView: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    maxHeight: "70%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subheading: {
    marginVertical: 10,
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#555",
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    color: 'black'

  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
  optionText: {
    fontSize: 14,
    color: "black",

  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: "#777",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedBox: {
    height: 14,
    width: 14,
    backgroundColor: "#444",
  },
  optionText: {
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
    color: "black",

  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",

    borderRadius: 5,
  },
  dateInput: {
    flex: 1,
    color: 'black',

    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },

  closedate: {
    backgroundColor: "#4CAF50", // Green background
    height: 30, // Fixed height
    width: 80, // Fixed width
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5, // Space around the button
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chooseOptionText: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",

  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButtonText: {
    fontSize: 16,
  },
  radioButton: {
    paddingTop: 10,
    marginRight: 10,
  },
  radioOuterCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelectedOuterCircle: {
    borderColor: "#555",
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
  inputContainer: {
    paddingTop: 10,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  dateInput: {
    flex: 1,
    color: "#333",
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  container2: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,

    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 10,

    width: 10,
    borderRadius: 5,
    backgroundColor: "#444",
  },
  radioLabel: {
    fontSize: 16,
    padding: 10,
  },
  inputContainer: {
    paddingLeft: 30, // Indent input fields to align with radio buttons
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'black'

  },
  radioLabel2: {
    marginLeft: 10,
    fontSize: 16,
    flexShrink: 1,
    left: 27, bottom: 30
  },
});

export default Details;


