import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  FlatList,
  Modal,
  TextInput,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import moment from 'moment'
import { useState } from "react";
import RNFS from 'react-native-fs';

import Toast from "react-native-toast-message";
import { useRef } from "react";
import Share from 'react-native-share';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FileViewer from 'react-native-file-viewer';


import SignModal from "./signmodal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LocalButton, apiUrl, getUserId, getUserType, orangeColor } from "../contract/utility/comman";
import SpinnerLoading from "../contract/utility/comp/spinnerLoading";
import { selectContractId } from "../contract/utility/redux/contract/reducer";
import { selectToken, setSpinnerLoading } from "../contract/utility/redux/profile";
import HomeHeader from "../contract/utility/comp/header";
import { Card } from "react-native-paper";
import SaveContractModal from "./contractModal";
import StepIndicator from "../contract/utility/comp/stepper";
import { primaryColor } from "../leadsDashboard/jobCard";
import LocalText from "../contract/utility/comp/LocalText";
import { useTranslation } from "react-i18next";



const options = [
  {
    label:
      "Total Cost of the Project excluding any allowances agreed to between the parties",
    value: "total_cost",
  },
  {
    label: "Cost of the Work plus the Contractor’s Fee",
    value: "cost_plus_fee",
  },
  {
    label:
      "The work to be performed at the Construction Site / Project Site will be based upon time and materials",
    value: "time_materials",
  },
];
const workerCompensationInsuranceOptionList = ["noEmployees","hasInsurance"]
const contractorInsuranceOptionList = ["yes","no","selfInsured"]

const states = [
  { label: "Select a state...", value: "" },
  { label: "Connecticut", value: "CT" },
  { label: "Florida", value: "FL" },
  { label: "New York", value: "NY" },
];

const { height, width } = Dimensions.get("screen");
const Homeowner = ({ navigation}) => {
  const contractID = useSelector(selectContractId)
  const [projectDetail,setProjectDetails] = useState('')
  const [createHicprojectDetails,setCreateHicProjectDetails] = useState({
    "projectId": "",
    "state": "",
    "additionalHomeOwnerName": "",
    "startDate": "",
    "completionDate": "",
    "substantialCompletionDate": "",
    "projectCostModel": "",
    "totalAllowance": "0",
    "workDescription": "",
    "paymentSchedule": "",
    "contractorAuthorizedRepresentative": "",
    "homeownerAuthorizedRepresentative": "",
    "contractorInsuranceOption": "",
    "contractorInsuranceProviderName": "",
    "workerCompensationInsuranceOption": "",
    "contractFileName": "",
    "homeownerId": "",
    "workerCompensationInsuranceLimit": "",
    "totalSalesPrice": "",
    "contractorSignatureUrl": null,
    "homeownerSignatureUrl":null,
    "contractorSentAt": null,
    "homeownerSentAt": null,
    "additionalHomeownerSignatureUrl":null,
    "contractorSignedAt": null,
    "homeownerSignedAt": null,
    "additionalHomeownerSignedAt": "",
    "previousCorporation": "",
    "contractCreatedAt":null,
    "extraData": "",
    "userId": ""
  })
  const token = useSelector(selectToken)
  console.log("vvcdf",token)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [contractorDetails, setContractor] = useState("");
  const [homeOwnerDetails, setHomeHownerDetails] = useState("");
  const [contractDetails, setContractDetails] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [filePath,setFilePath] = useState("")
const [renderCardDetails,setRenderCardDetails] =useState([])
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
const {t} = useTranslation()
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const [isPickerVisible, setPickerVisible] = useState(false);
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const [heightAnimation] = useState(new Animated.Value(0));

  const [showSignModal, setShowSignModal] = useState(false);
  const [isContractCreated, setIsContractCreated] = useState(false); // Track if the contract is created

  const handleOpenModal = () => {
    setShowSignModal(true);
  };

  const handleCloseModal = () => {
    setShowSignModal(false);
  };

  const downloadFile = async (name, fileUrl) => {
    dispatch(setSpinnerLoading("Downloading"));
    const base = Platform.OS === "ios" ? RNFS.DocumentDirectoryPath : RNFS.DownloadDirectoryPath;
  
    try {
      let filePath = `${base}/${name}.pdf`; // Initial file path
      let counter = 1;
  
      // Check if a file with the same name already exists
      while (await RNFS.exists(filePath)) {
        filePath = `${base}/${name} (${counter}).pdf`;
        counter++;
      }
  
      // Download the file
      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: filePath,
      }).promise;
  
      if (result.statusCode === 200) {
        setFilePath(filePath); 
  
        Toast.show({
          type: t("success"),
          text1:t("File Saved") ,
          text2: `${t("File saved to:")} ${filePath}`,
          onPress:()=>{
            openFile(filePath)
          }
        });
        if (Platform.OS === 'ios') {
          await Share.open({
            url: `file://${filePath}`, // Prefix with 'file://' for iOS
            type: 'application/pdf',  // Specify file type
            title: 'Download Complete',
            message: 'You can now share this file.',
          });
        }
        console.log("hgfhgc",filePath)
      } else {
        throw new Error(`Download failed with status code ${result.statusCode}`);
      }
    } catch (error) {
      // Handle errors gracefully
      console.error("Error downloading file:", error);
      Toast.show({
        type: t("error"),
        text1: t("Download Error"),
        text2:t( error.message),
      });
    } finally {
      // Ensure the spinner is hidden after the operation
      dispatch(setSpinnerLoading(false));
    }
  };
  

  const openFile =async ()=>{
    if (Platform.OS === 'android') {
      // Use FileViewer to open the file
      await FileViewer.open(filePath);
      console.log("Opening file:", filePath);

    } else {
      // Use Linking for iOS
      await Linking.openURL(filePath);
    }
  }
  const handleSaveHicProject = async()=>{
    dispatch(setSpinnerLoading('Creating'))
    return new Promise((resolve,reject)=>{
      axios.post(`${apiUrl}/contract/create-hic-project`,createHicprojectDetails
      ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(o =>{
        if(o.data.success){
          resolve()
        }else{
          reject()
        }
      }).catch(o=>{
        
        reject()
      }).finally(()=>{
        dispatch(setSpinnerLoading(false))
      })
    })

  }

  const handleSubmit = () => {

  if(createHicprojectDetails.startDate && !moment(createHicprojectDetails.startDate ).isBefore(moment(), 'day')&& createHicprojectDetails.substantialCompletionDate&& createHicprojectDetails.completionDate&&createHicprojectDetails.projectCostModel&& createHicprojectDetails.workDescription && createHicprojectDetails.contractorInsuranceOption && createHicprojectDetails.workerCompensationInsuranceOption&& createHicprojectDetails.contractFileName){
    handleSaveHicProject().then(()=>{
      Toast.show({
        type:t('success'),
        text1:t('Contract Created')
      })
      fetchProjectDetails()
      setModalVisible(false); // Close the modal after submission (if applicable)
    
    })

  
  }else{
    if(!createHicprojectDetails.startDate){
      setError("Start Date required")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }
    if(moment(createHicprojectDetails.startDate ).isBefore(moment(), 'day')){
      setError("Past date are not allowed")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }
    if(!createHicprojectDetails.substantialCompletionDate){
      setError("Substantial Completion Date required")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }
    if(!createHicprojectDetails.completionDate){
      setError("End Date required")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }

    if(!createHicprojectDetails.projectCostModel){
      setError("Select any project cost model")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }

    if(!createHicprojectDetails.workDescription){
      setError("Work Description required")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }

    if(!createHicprojectDetails.contractorInsuranceOption){
      setError("Select any contract insurance option")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }

    if(!createHicprojectDetails.workerCompensationInsuranceOption){
      setError("Select any worker insurance option")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }

    if(!createHicprojectDetails.contractFileName){
      setError("Document name is required")

      setTimeout(() => {
      setError("")
        
      }, 5000);

      return 
    }
  }

   

  };

  
  const handleConfirmDate = ( selectedDate) => {
    setShowDatePicker(false)

    const currentDate = selectedDate || new Date();

    const formattedDate = currentDate.toISOString(); // Format the date as needed

    if (activeInput === "startDate") {
      setCreateHicProjectDetails(prev=>{
        return{
          ...prev,
          startDate:formattedDate
        }
      })
    } else if (activeInput === "substantialCompletionDate") {
      setCreateHicProjectDetails(prev=>{
        return{
          ...prev,
          substantialCompletionDate:formattedDate
        }
      })
    } else if (activeInput === "endDate") {
      setCreateHicProjectDetails(prev=>{
        return{
          ...prev,
          completionDate:formattedDate
        }
      })
    }
    setActiveInput(null); // Reset the active input after selection
  };


  const togglePicker = () => {
    if (isPickerVisible) {
      // Collapse picker
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setPickerVisible(false));
    } else {
      setPickerVisible(true); // Open picker
      Animated.timing(heightAnimation, {
        toValue: states.length * 40, // Adjust height based on number of items
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(arrowRotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  const arrowInterpolate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"], // Rotating 180 degrees
  });
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const RenderItemHomeowner = ({ item }) => (
    <View
      style={style.cardContainer}
      onPress={() => navigation.navigate("Contract")}
    >
      <View style={style.cardHeader}>
        <LocalText style={style.projectName}>{item.name || "N/A"}</LocalText>
        <LocalText style={style.projectId}>ID: {item.id || "N/A"}</LocalText>
      </View>

      <View style={style.cardBody}>
      <View style={style.row}>
          <LocalText style={style.label}>Phone Number:</LocalText>
          <LocalText style={style.value}>
            {item.PhoneNumber ? item.PhoneNumber: "N/A"}
        </LocalText>
        </View>


        <View style={style.row}>
          <LocalText style={style.label}>Email :</LocalText>
          <LocalText style={style.value}>
            {item.Email ? item.Email: "N/A"}
        </LocalText>
        </View>

        <View style={style.row}>
          <LocalText style={style.label}>Status :</LocalText>
          <LocalText style={[style.value, { color: item.p_status === "active" ? "#1f57d6" : "#FF4C4C" }]}>
            {item.Status || "N/A"}
        </LocalText>
        </View>
      
        <View style={style.row}>
          <LocalText style={style.label}>Date :</LocalText>
          <LocalText style={style.value}>{formatDate(item.Date)}</LocalText>
        </View>
  
        <View style={style.row}>
          <LocalText style={style.label}>Milestone :</LocalText>
          <LocalText style={style.value}>
            {item.Milestones ? item.Milestones: "N/A"}
        </LocalText>
        </View>
        {projectDetail?.contract?.pc_contract_url ?     <TouchableOpacity
    onPress={()=>{
      downloadFile(projectDetail.contract.pc_contract_file_name,projectDetail.contract.pc_contract_url)
    }}
    style={style.downloadButton}
            >
              <LocalText style={{
                color:'white',
                fontSize:14,
                fontWeight:'bold'
              }}>
              Download
            </LocalText>
            </TouchableOpacity>:null}
            {filePath ?     <TouchableOpacity
    onPress={()=>{
openFile()
    }}
    style={style.openButton}
            >
              <LocalText style={{
                color:orangeColor,
                fontSize:14,
                fontWeight:'bold'
              }}>
              Open Downloded Pdf
            </LocalText>
            </TouchableOpacity>:null}

        {/* Render the Sign button if data has been submitted for this item */}
        {contractDetails && (
          <TouchableOpacity style={style.signButton} onPress={handleOpenModal}>
            <LocalText style={style.signButtonText}>Sign Contract</LocalText>
          </TouchableOpacity>
        )}
        <SignModal isVisible={showSignModal} onClose={handleCloseModal} handleSignature={handleSignature}/>

        {/* Button to open modal for creating the contract */}

        <View style={{
          marginTop:10
        }}>
    {!contractDetails ? (
      <LocalButton  bg={'#3762EA'} color={'white'} onPress={() => setModalVisible(true)} title={'Create Contract'} />
       
        ) : (
          <LocalButton  bg={'#E29C33'} color={'white'} onPress={() => setModalVisible(true)} title={'Update Contract'} />

     
        )}
        </View>
    

      </View>
    </View>
  );


  const fetchProjectDetails = async () => {

    try {
      const response = await axios.get(
        `${apiUrl}/contract/get-project/${contractID}`, // Ensure this is correct
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("contractID",contractID)

      if(response.data){
        const project = response.data.data.project
        const homeOwner = project.home_owner
        const contract = project.contract

        setContractDetails(contract?contract:"")
        console.log("gggg",contract)
        setProjectDetails(project)
        setContractor(project.contractor?project.contractor:"")
        setHomeHownerDetails(homeOwner?homeOwner:"")
          if(contract){
            setCreateHicProjectDetails({
              "projectId": contractID,
              "state":contract.pc_state,
              "additionalHomeOwnerName": contract.pc_additional_home_owner_name,
              "startDate":contract.pc_start_date,
              "completionDate":contract.pc_completion_date,
              "substantialCompletionDate": contract.pc_substantial_completion_date,
              "projectCostModel": contract.pc_project_cost_model,
              "totalAllowance":  contract.pc_total_allowance,
              "workDescription": contract.pc_work_description,
              "paymentSchedule": contract.pc_payment_schedule,
              "contractorAuthorizedRepresentative": contract.pc_contractor_authorized_representative,
              "homeownerAuthorizedRepresentative": contract.pc_homeowner_authorized_representative,
              "contractorInsuranceOption": contract.pc_contractor_insurance_option,
              "contractorInsuranceProviderName": contract.pc_contractor_insurance_provider_name,
              "workerCompensationInsuranceOption": contract.pc_worker_compensation_insurance_option,
              "contractFileName": contract.pc_contract_file_name,
              "homeownerId":homeOwner? homeOwner.user_id:"",
              "workerCompensationInsuranceLimit": contract.pc_worker_compensation_insurance_limit,
              "totalSalesPrice": contract.pc_total_Sales_price,
              "contractorSignatureUrl":  contract.pc_contractor_signature_url,
              "homeownerSignatureUrl": contract.pc_homeowner_signature_url,
              "contractorSentAt":  contract.pc_contractor_sent_at,
              "homeownerSentAt":  contract.pc_homeowner_sent_at,
              "additionalHomeownerSignatureUrl": contract.pc_additional_homeowner_signature_url,
              "contractorSignedAt":  contract.pc_contractor_signed_at,
              "homeownerSignedAt":  contract.pc_homeowner_signed_at,
              "additionalHomeownerSignedAt": contract.pc_additional_homeowner_signed_at,
              "previousCorporation": contract.pc_previous_corporation,
              "contractCreatedAt": contract.pc_contract_created_at,
              "extraData": contract.pc_extra_data,
              "userId":  getUserId(token)
            })
          }else{
            setCreateHicProjectDetails(prev=>{
              return {
                ...prev,
                
                projectId:contractID,
                state:project.p_state,
                homeownerId:homeOwner?homeOwner.user_id:"",
                totalSalesPrice:project.p_total_cost,
        "userId": getUserId(token)
    
              }
            })
          }

      
 

        setRenderCardDetails([
          {
            id:response.data.data.project.home_owner? response.data.data.project.home_owner.user_id:"",
            name: response.data.data.project.home_owner? response.data.data.project.home_owner.user_first_name + " " + response.data.data.project.home_owner.user_last_name :"",
            PhoneNumber:response.data.data.project.home_owner? response.data.data.project.home_owner.user_phone:"",
            Email:response.data.data.project.home_owner? response.data.data.project.home_owner.user_email:"",
            Status:project?project.p_status==="DRAFT"?'Pending':project.p_status: "Pending",
            Date: response.data.data.project.home_owner? moment(response.data.data.project.home_owner.created_at).format('DD-MM-YYYY'):"",
            Milestones: "project",
          },
        ])
      }
     
      setLoading(false); // Set loading to false
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error message:", error.message);
      }
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if(token){
      fetchProjectDetails(); // Call the function to fetch milestones

    }
  }, [token]);

  const saveBase64ToFile = async (base64, fileName) => {
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
  
  const handleSaveSign = async(data)=>{
    const userType = getUserType(token)
    return new Promise((resolve,reject)=>{
      dispatch(setSpinnerLoading('uploading'))
      axios.post(`${apiUrl}/contract/sign-contract/${userType}/${contractID}`,data
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
      })
    })

  }

  const handleSignature = (signature)=>{
    const base64 = signature.replace(/^data:image\/\w+;base64,/, "");
    setShowSignModal(false)

    // Convert Base64 to Blob
    saveBase64ToFile(base64,createHicprojectDetails.contractFileName.replace(".png","")).then(filePath =>{
      const formData = new FormData();
      formData.append("file",{
        uri: filePath,
      name: createHicprojectDetails.contractFileName.replace(".png","")+".png",
      type: "image/png",
      });
      dispatch(setSpinnerLoading('Uploading'))
    handleSaveSign(formData).then((res)=>{
      Toast.show({
        type:t('success'),
        text1:t('Sign Uploaded')
      })
   setTimeout(() => {
       fetchProjectDetails()
   }, 3000);
    })
    }).finally(()=>{
      dispatch(setSpinnerLoading(false))
    })

    // Create FormDataba
  
  }
  return (
    <View style={{
      flex:1,
      backgroundColor:'white'
    }}>
      
   {/* <HomeHeader replace={'Create'}  title={'Homeowner Contract'} subTitle={'Thank you'}  /> */}
   <StepIndicator currentStep={3}  />

    <ScrollView contentContainerStyle={style.form}>
      
      <Card style={[style.paperCard,style.elevatedCard]}>
        {/* <Card.Content>
        <LocalText style={style.sectionTitle}>
        Homeowner Contract
      </LocalText>
        <LocalText style={style.description}>
        Thank you for using the Tradesmen’s, LLC. As a Contractor, it is
          incumbent upon you to ensure delivery of the Notice of Right to
          Cancellation of the contract to each owner of the property. Consumer
          protection laws require that the Contractor provide two (2) copies of
          the Notice of Right to Cancel to each home owner. If you do not hand
          deliver the Notice of Right to Cancellation to each of the homeowners
          that have signed the contract, you may not be able to recover in a
          court action, depending on your jurisdiction and your contract may not
          be valid. If you have sought asset protection through the Tradesmen’s,
          LLC you shall not be able to access asset protection as you are
          required to comply with all aspects of the requirements of having used
          the Tradesmen’s services AND complied with all consumer protection
          laws within your jurisdiction.
             </LocalText>

        </Card.Content> */}
      </Card>
      <FlatList
            data={renderCardDetails}
            renderItem={RenderItemHomeowner}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false} // Hides the horizontal scroll bar
          />
      <View>
    
   
  <SaveContractModal
  togglePicker={togglePicker}
  states={states}
  showDatePicker={showDatePicker}
  handleConfirmDate={handleConfirmDate}
  isPickerVisible={isPickerVisible}
  setModalVisible={setModalVisible} 
  selectedState={selectedState}
  Ionicons={Ionicons}
  setCreateHicProjectDetails={setCreateHicProjectDetails}
  createHicprojectDetails={createHicprojectDetails}
  setShowDatePicker={setShowDatePicker}
  setActiveInput={setActiveInput}
  setSelectedState={setSelectedState}
  modalVisible={modalVisible}
  style={style}
  arrowInterpolate={arrowInterpolate}
  width={width}
  homeOwnerDetails={homeOwnerDetails}
  contractorDetails={contractorDetails}
  projectDetail={projectDetail}
  options={options}
  contractorInsuranceOptionList={contractorInsuranceOptionList}
  workerCompensationInsuranceOptionList={workerCompensationInsuranceOptionList}
  error={error}
  handleSubmit={handleSubmit}
  isContractCreated={isContractCreated}
  date={date}
  />
        <View
          style={{
            borderWidth: 1,
            width: width / 1.4,
            marginTop: 20,
            alignSelf: "center",
            borderColor: "#f0f3fb",
          }}
        ></View>

<LocalButton title={'Check Status'} bg={'#325573'} color={'white'} onPress={() => navigation.navigate("Finish")} />
   

   <View style={{
    marginTop:10
   }}>
   <LocalButton title={'Back'} bg={'#cad2ec'} color={'black'} onPress={() => navigation.navigate("Details")} />

   </View>


      <SpinnerLoading />

      </View>
    </ScrollView>
    </View>

  );
};
const style = StyleSheet.create({
  view: {
    flex: 1,
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
    width:width-40
  },
  readOnlyInput: {
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    color: '#6c757d'
  },
  inputEditable: {
    marginBottom: 15,
    backgroundColor: "white",
    color: 'black'
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
    paddingHorizontal: 20,
    backgroundColor: "#f5f6fa",
    paddingBottom:200
  },
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
  flex: { backgroundColor: "#F7F7F7", padding: 10, height: height / 1 },
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
  paperCard: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  elevatedCard:{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2c3e50",
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 12,
    color: "#8F8F99",
    fontWeight: "bold",
  },
  value: {
    fontSize: 13,
    color: "#333",
  },
  inputPaper: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  project: { fontSize: 15, padding: 10, left: 10, fontWeight: "700" },
  Milestones: { fontSize: 15, padding: 10, left: 10, fontWeight: "700" },
  Home: { fontSize: 15, padding: 10, fontWeight: "700" },
  finish: { flexDirection: "row", justifyContent: "space-around", bottom: 40 },
  subcontrator: { fontSize: 15, padding: 10, fontWeight: "700" },
  contract: { fontSize: 20, fontWeight: "bold", marginLeft: 20, marginTop: 10 },
  thanks: { padding: 15, fontSize: 15, fontWeight: "500" },
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
    backgroundColor: "#3762EA", // Green background
    height: 40, // Fixed height
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
    flex:1,

  },
  createContractButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
justifyContent:"center",
  },
  modalView: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
height:"90%",
overflow:'hidden'
  },

  add: {
    fontSize: 20,
    fontWeight:'600'
  },
  home: {
    fontSize: 14,
    color:'gray',
  },
  type: {
    fontSize: 16,

    padding: 10,
  },
  governingLawContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingStart: 11,
  },

  homeownerDetails: {
    alignSelf: "flex-start",
    marginTop: "2%",
    padding: 10,
    paddingRight: 30,
  },
  nameInputContainer: {
    alignSelf: "flex-start",
    padding: 20,
  },
  submitButton: {
    backgroundColor: "#3762EA", // Green background
    height: 40, // Fixed height
   flex:1,
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginTop: 30, // Space around the button
  
  },

  submitButtonText: {
    color: "white",
    fontSize:17,
    fontWeight:600
  },
  cancelButton: {
    backgroundColor: "#B0BEC5", // Green background
    height: 40, // Fixed height
   flex:1,
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginTop: 20, // Space around the button
  
  },
  cancelButtonText: {
    color: "black",
    fontSize:17,
    fontWeight:600
  },
  Details: { fontSize: 20, fontWeight: "500", padding: 10, top: 10 },
  All: { fontSize: 14, fontWeight: "300", padding: 10, bottom: 15, top: 10 },
  Al: { fontSize: 14, fontWeight: "300", padding: 10, bottom: 10, right: 10 },
  dateInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: width / 1.4,
    backgroundColor: "white",
    padding: 10,
    color:'black'

  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color:'black'
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,

    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: "#680909",
  },
  radioLabel: {
    fontSize: 12,
    paddingRight: 30,
    color:'gray'
  },
  escrowContainer: {
    display:'flex',
    justifyContent:"space-between",
    flexDirection:'row',
alignItems:'center',
  },
  escrowLabel: {
    paddingTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  escrowStatus: {
    width:200,
  },
  subLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioText: {
    fontSize: 13,
    paddingRight: 30,
    color:'gray'
  },
  inputContainer: {},
  inputLabel: {
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: width / 1.3,
    color:'black'

  },

  input: {
    backgroundColor: "#fff",
    paddingRight: 30,
    padding: 12,
    width: width / 1.2,
    borderColor: "#ccc",
    color:'black',

    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  signButtonText: {
    color: "white",
    textAlign: "center",
    fontSize:14,
    fontWeight:'bold'
  },
  signButton: {
    backgroundColor: "#FF6C6C", // Green background
    height: 40, // Fixed height
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
    flex:1
  },
  downloadButton: {
    backgroundColor: "#f5874f", // Green background
    height: 40, // Fixed height
 flex:1,
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },

  openButton: {
    backgroundColor: "white", // Green background
    height: 40, // Fixed height
 flex:1,
 borderColor:orangeColor,
 borderWidth:1,
    borderRadius: 5, // Rounded corners
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3, // Slight elevation for depth
    marginVertical: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color:"white"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    color:'black'

  },
  icon: {
    width: 24,
    height: 24,
    right: 37,
  },
 
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },
  doneButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  doneButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    padding: 12,
    width: "80%",

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedText: {
    fontSize: 16,
    color:"black"
  },
  pickerContainer: {
    marginTop: 5,
    width: 250,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden", // Ensure animation looks smooth
  },
  optionButton: {
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  key: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  updateContractButton: {
    backgroundColor: "#E29C33", // Green background
    height: 40, // Fixed height
flex:1,
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
  updateContractButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  updateText: { color: "white", fontSize: 10, fontWeight: "bold" },
});



export default Homeowner;
