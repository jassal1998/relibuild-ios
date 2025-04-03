import React, { useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRef } from "react";
import { useState } from "react";
import { Card, Text, Button, TextInput, Checkbox, Switch } from "react-native-paper";
// import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// import DocumentPicker from 'react-native-document-picker';


import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { getHomeOwnerById, searchHomeOwner } from "../contract/utility/redux/contract/thunk";
import { searchHomeOwnerSuccess, searchSuccess, selectContractId, selectHomeOwnerData, selectModifyContractorId, selectSearchHomeOwners, setReduxContractId } from "../contract/utility/redux/contract/reducer";
import axios, { all } from "axios";
import { LocalButton, apiUrl, getUserId, primaryColor } from "../contract/utility/comman";
import { selectToken, setSpinnerLoading, setToken } from "../contract/utility/redux/profile";
import { useNavigation } from "@react-navigation/native";
import { ninjasKeys } from "../contract/keys";
import HomeHeader from "../contract/utility/comp/header";
import HomeownerSearchHelp from "./homerownerhelp";
import CreatenewHomieModal from "../contract/utility/modals/createNewHomie";
import SpinnerLoading from "../contract/utility/comp/spinnerLoading";
import UploadCard from "../contract/utility/comp/uploadImg";
import StepIndicator from "../contract/utility/comp/stepper";
import upload from '../contract/utility/img/upload.png'
import LocalText from "../contract/utility/comp/LocalText";
import { useTranslation } from "react-i18next";
import LocalTextInput from "../contract/utility/comp/localTextInput";
import { jwtDecode } from "jwt-decode";
const { width, height } = Dimensions.get("screen");




const ContractFillPage = () => {
  
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const homeOwnerData = useSelector(selectHomeOwnerData) || [];
  const [isAutoFill, setIsAutoFill] = useState(false); // State to manage switch
  const [projectName, setProjectName] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [cost, setCost] = useState("");

  const token = useSelector(selectToken)
  console.log("sdsds",token)







  const [projectStatus, setProjectStatus] = useState('DRAFT')
  const [homeOwnerId, setHomeOwnerId] = useState('')
  const searchHomeOwnerList = useSelector(selectSearchHomeOwners)
  const [createNewHomieStatus, setCreateNewHomieStatus] = useState(false)
  const options = [
    { id: 1, label: "Fill Milestones Automatically", autoFill: true },
    { id: 2, label: "Do Not Fill Milestones", autoFill: false },
  ];
  // useEffect(() => {
  //   if (token) {
  //     console.log("Token:", token);
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log("Decoded JWT:", decoded);
  
  //       if (decoded?.userId) {
  //         console.log("Dispatching userId:", decoded.userId);
  //         dispatch(setReduxContractId(decoded.userId)); // Set in Redux
  //       }
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //     }
  //   }
  // }, [token, dispatch]);
  
  const [selectedOption, setSelectedOption] = useState(options[1]);
  const contractID = useSelector(selectContractId)
  console.log("wdsds",contractID)
  const [document, setDocument] = useState(null);
  const [pdfModalVisible, setPdfModalVisible] = useState(false); // State to control PDF modal visibility
  const [pdfUri, setPdfUri] = useState(null); 
const userId = token ?getUserId(token):""
  const [loading, setLoading] = useState(false); // Loading state
  

  useEffect(() => {
    if (token) {
      fetchContractData(contractID, token);
      console.log("tokeb",contractID)
      console.log("dsssdds",token)
    }
  }, [token, contractID]);
  const fetchContractData = async (id, token) => {
    // Retrieve the token from AsyncStorage
    setLoading(true)
    if (!token) {
      throw new Error("No token found in AsyncStorage.");
    }

    try {
      // Make the API request using axios
      const response = await axios.get(
        `https://api.relibuild.com:3000/contract/get-project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        }
      );
          
console.log("sfsfs",token)
      // Return the response data
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching contract data:",
        error.response || error.message
      );
      throw error;
    } finally {
      setLoading(false)
    }
  };

  const loadContractDetails = async () => {
    const data = await fetchContractData(contractID, token);
    const project = data?.data?.project

    if (project) {
      setProjectName(project.p_name)
      setZip(project.p_zip)
      setAddress(project.p_street_address)
      setCost(project.p_cost)
      setProjectStatus(project.p_status)
      setIsAutoFill(Number(project.p_escrow) === 1)
      setSelectedOption(Number(project.p_escrow) === 1 ? options[0] : options[1])
      if (project?.home_owner) {
        dispatch(searchHomeOwnerSuccess([project.home_owner]))
        setHomeOwnerId(project?.home_owner.p_home_owner_id);

      }
    }

  }

  useEffect(() => {

if(contractID){
  loadContractDetails()
}
  }, [contractID]);

  useEffect(() => {
    if (homeOwnerId) {
      dispatch(getHomeOwnerById(homeOwnerId))
    }
  }, [homeOwnerId])
  useEffect(() => {
    if (zip.length === 5) {
      findAddresByZipCode()
    }
  }, [zip])







  const handlePostData = async () => {
    try {

      if (contractID) {
        handleModifyContract(contractID).then(() => {
          handleNavigate()
        })


      } else {
        handleSaveContract().then(contractID => {

          dispatch(setReduxContractId(contractID))
          handleNavigate()

        }).catch(er=>{
          console.log(er)
        })
      }


    } catch (error) {
      console.error("Failed to post data:", error);
    }
  };



  // const uploadDocument = async () => {
  //   try {
  //     // Open the document picker
  //     const result = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf], // Only allow PDF documents
  //     });

  //     // If the user cancels the selection
  //     if (!result) {
  //       // Alert.alert("Document selection canceled.");
  //       return;
  //     }

  //     // Save document information to state
  //     setDocument(result);
  //     setPdfUri(result.uri); // Set PDF URI directly from the picked document
  //   } catch (error) {
  //     // Handle errors
  //     if (DocumentPicker.isCancel(error)) {
  //       // Alert.alert("Document selection was canceled.");
  //     } else {
  //       // Alert.alert("Error picking document:", error.message);
  //     }
  //   }
  // };

  // const deleteDocument = () => {
  //   setDocument(null);
  //   setPdfUri(null);
  //   Alert.alert("Document deleted.");
  // };

  // const openPdfModal = () => {
  //   if (document) {
  //     setPdfModalVisible(true);
  //   }
  // };

  // const closePdfModal = () => {
  //   setPdfModalVisible(false);
  // };
  // const handleNavigate = () => {

  //   navigation.navigate("Milestone", {
  //     autoFill: selectedOption?.autoFill, // Pass autoFill state
  //   });
  // };

  const findHomeOwner = (e) => {
    if (e) {
      dispatch(searchHomeOwner(e))

    } else {
      dispatch(searchSuccess([]))
    }
  };
  const findAddresByZipCode = () => {
    dispatch(setSpinnerLoading("Loading"))
    axios.get(`https://api.api-ninjas.com/v1/zipcode?zip=${zip}`, {
      headers: {
        "X-Api-Key": ninjasKeys
      }
    }).then(o => {
      if (o.status === 200) {
        if (o.data[0]) {
          setCity(o.data[0].city)
          setState(o.data[0].state)
          setCountry(o.data[0].country)
        }
      }
    }).finally(() => {
      dispatch(setSpinnerLoading(false))
    })
  }


  const handleSaveContract = async () => {
    return new Promise((resolve, reject) => {
      dispatch(setSpinnerLoading('Loading'))

      axios.post(`${apiUrl}/contract/create`, {
        projectName: projectName,
        projectStatus: projectStatus,
        projectHomeOwnerId: homeOwnerId,
        projectContractorId: userId,
        projectCountry: country,
        projectStreetAddress: address,
        city: city,
        state: state,
        zip: zip,
        cost: cost,
        escrow: selectedOption?.autoFill,
        bluePrint: pdfUri ? pdfUri : "",
        userId: userId,
      }
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(o => {
          if (o.status === 200) {
            if (o.data.result.insertId) {
              resolve(o.data.result.insertId)

            } else {
              reject('')
            }
          } else {
            reject()
          }
        }).catch(o => {
          console.log(o)
if(o.response.data.error.name==="TokenExpiredError"){
  Alert.alert('Session expired','Please login again')
  if(dispatch){
    dispatch(setToken(""))

  }
  AsyncStorage.setItem(token,"")
}
          reject()
        }).finally(() => {
          dispatch(setSpinnerLoading(false))
        })
    })

  }

  const handleModifyContract = async (projectID) => {
    return new Promise((resolve, reject) => {
      dispatch(setSpinnerLoading('Loading'))

      axios.patch(`${apiUrl}/contract/update-project`, {
        projectName: projectName,
        projectStatus: projectStatus,
        projectHomeOwnerId: homeOwnerId,
        projectContractorId: userId,
        projectCountry: country,
        projectStreetAddress: address,
        city: city,
        state: state,
        zip: zip,
        cost: cost,
        escrow: selectedOption?.autoFill,
        bluePrint: pdfUri ? pdfUri : "",
        userId: userId,
        projectId: projectID
      }
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(o => {
          if (o.status === 200) {
            resolve()
          } else {
            reject()
          }
        }).catch(o => {

          reject()
        }).finally(() => {
          dispatch(setSpinnerLoading(false))
        })
    })

  }

const {t} = useTranslation()
  return (
  
      <View style={{
        flex:1,
        backgroundColor:'white'
      }}>
        {/* Header */}
        {/* <HomeHeader title={'Create Contract'} subTitle={"Project Details"} replace={'Create'}  /> */}
        <StepIndicator currentStep={0}  />
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <ScrollView contentContainerStyle={styles.form}>
          {/* Section 1: Project Details */}
          <View style={{
            marginTop:10
          }}>
            <View>
              <View style={styles.inputGroup}>
                <TextInput
                  label= {t("Project Name *")}
                  mode="outlined"
                  style={styles.inputEditable}
                  value={projectName}
                  onChangeText={(t) => setProjectName(t)}
                  editable={false}
                  disabled={true} 
                />
                <View style={{
                  flexDirection:'row',

                }}>
               <TextInput
                  label= {t("Zip Code *")}

                  mode="outlined"
                  style={[styles.inputEditable,{flex:1}]}
                  value={zip}
                  onChangeText={(t) => setZip(t)}
                  editable={false}
                  disabled={true} 
                />

               <  TextInput
                  label= {t("City  *")}

                  mode="outlined"
                  style={[ styles.readOnlyInput,{marginLeft:5,flex:1}]}
                  value={city}
                  editable={false}
                  disabled={true} 
                />
                </View>


                <View style={{
                  flexDirection:'row',

                }}>

               <TextInput
                  label= {t("State  *")}

                  mode="outlined"
                  style={[styles.readOnlyInput,{flex:1}]}

                  value={state}
                  editable={false}
                  disabled={true} 
                />
                <TextInput
                  label= {t("Country  *")}

                  mode="outlined"
                  style={[ styles.readOnlyInput,{marginLeft:5,flex:1}]}
                  value={country}
                  editable={false}
                  disabled={true} 
                />



                </View>
            
            
                <TextInput
                  label= {t("Address  *")}

                  mode="outlined"
                  placeholder={t("Type Address here")}
                  multiline={true}
                  style={[styles.inputEditable,{  minHeight: 120, // Adjust this to change the height of the text area
                  textAlignVertical: 'top', // Ensures text starts at the top (for Android)
                
                }]}
                  value={address}
                  onChangeText={(t) => setAddress(t)}
                  editable={false}
                  disabled={true}
                />
             
         
              </View>
            </View>
          </View>

          {/* Section 2: Homeowner Details */}
          <View style={{}}>
            <View>
              <LocalText style={styles.sectionTitle}>Home Owner Details</LocalText>
              <LocalText style={styles.description}>
                Search for a homeowner by email. If not found, you can add their
                information later.
              </LocalText>
              {/* <AutocompleteDropdown
                dataSet={searchHomeOwnerList.map((o, i) => {
                  return {
                    id: o.id,
                    title: o.user_email
                  }
                })}
                onChangeText={(e) => {
                  findHomeOwner(e)
                }}
                onSelectItem={(item) => {
                  if (item?.id) {
                    setHomeOwnerId(item.id);

                  } else {
                    setHomeOwnerId('')
                    dispatch(searchHomeOwnerSuccess([]))
                  }
                }}
                placeholder={t("Search...")}
                useFilter={true} // Filters items based on the input
                clearOnFocus={true} // Clears the input when focused
                closeOnSubmit={true} // Closes the dropdown on submitting
                showClear={true} // Shows a clear button
                textInputProps={{
                  style: {
                    backgroundColor: "white",
                    color: 'black',
                  }
                }}
                inputContainerStyle={{
                  backgroundColor: "white",
                  color: 'black',
                  borderColor: 'gray',
                  borderWidth: 1,
                  padding: 0,
                  height:50

                }}

              /> */}


              {/* <TouchableOpacity onPress={() => {
                setCreateNewHomieStatus(true)
              }} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row'
              }}>
                <LocalText style={{
                  color: '#4044C9',
                  fontWeight: '800'
                }}>
                  Create New
                </LocalText>
              </TouchableOpacity> */}

              {homeOwnerData[0] && (
                <View style={styles.detailsBox}>
                  <TextInput
                    label="First Name"
                    value={homeOwnerData[0].user_first_name}
                    mode="outlined"
                    style={[styles.readOnlyInput, styles.readOnlyInput]}
                    editable={false}
                    disabled={true}
                  />
                  <TextInput
                    label="Last Name"
                    value={homeOwnerData[0].user_last_name}
                    mode="outlined"
                    style={[styles.readOnlyInput, styles.readOnlyInput]}
                    editable={false}
                    disabled={true}
                  />
                  <TextInput
                    label="Email"
                    value={homeOwnerData[0].user_email}
                    mode="outlined"
                    style={[styles.readOnlyInput, styles.readOnlyInput]}
                    editable={false}
                    disabled={true}
                  />
                  <TextInput
                    label="Phone"
                    value={homeOwnerData[0].user_phone}
                    mode="outlined"
                    style={[styles.readOnlyInput, styles.readOnlyInput]}
                    editable={false}
                    disabled={true}
                  />

                </View>

              )}
            </View>
          </View>

          <View  style={{}}>
            <View>
              {/* <LocalText style={styles.sectionTitle}>Upload Documents</LocalText> */}

           
              <TouchableOpacity
        // onPress={uploadDocument}
        disabled={true} 
              
  style={{
    backgroundColor:'#2158D61A',

    borderWidth: 1,
    borderRadius:5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Ensure proper vertical alignment
    padding: 16, // Add some spacing around the content
    flex: 1,
  }}
>
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    
    <Image  source={upload}/>
    {/* <MaterialIcons
      style={{
        padding: 0, // Add padding around the icon for better clickability
        borderRadius: 8, // Rounded edges for better aesthetics
        alignSelf: 'center', // Center the icon within the parent
      }}
      name="upload"
      size={60}
      color="gray" // Better contrast for visibility
    /> */}
    <LocalText
      style={{
        marginTop: 8, // Add spacing between the icon and text
        color: 'gray', // Text color for consistency
        fontSize: 16, // Slightly larger text for readability
        textAlign: 'center', // Center the text within the parent
      }}
    >
      Select File to Upload
  </LocalText>
  </View>
</TouchableOpacity>


              {/* {document && (
                <View style={styles.uploadedFile}>
                  <TouchableOpacity onPress={openPdfModal}>
                    <LocalText style={styles.documentText}>{document?document[0]?.name:""}</LocalText>
                  </TouchableOpacity>
                  <Button mode="text"  onPress={deleteDocument}>
                    Delete
                  </Button>
                </View>
              )} */}

            </View>
          </View>

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:20
          }}>
          
          <LocalText style={{
                ...styles.sectionTitle

              }}>Cost of Project</LocalText>

<TextInput
                mode="outlined"
                placeholder="Cost"
                keyboardType={'number-pad'}
                style={{
                  backgroundColor: "white",
                  color: 'black',
                  height:40,
                  width:100
                }}
                value={cost}
                onChangeText={(t) => setCost(t)}
                editable={false}
                disabled={true}
              />
          </View>
    

          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:15
          }}>
          
          <LocalText style={{
                ...styles.sectionTitle

              }}>Escrow Service</LocalText>

<Switch
                value={isAutoFill}
                onValueChange={(status) => {
                  setIsAutoFill(status);
                  setSelectedOption(status ? options[0] : options[1]);
                }}
                style={styles.switch}
                disabled={true} 
              />
          </View>


  <LocalButton marginTop={80}  title={'Next'} bg={'#325573'} color={"white"}
  onPress={()=> navigation.navigate("Milestones")}
  />

    
        </ScrollView>}

        
      </View>
   
  );
};

export default ContractFillPage;

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    backgroundColor:'white',

    paddingBottom: 100
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  elevatedCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    color: "black",
  },
  inputGroup: {
  },
  readOnlyInput: {
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    color: '#6c757d'
  },
  inputEditable: {
    marginBottom: 15,
    backgroundColor: "white",
    color: 'black',
  },

  description: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 5,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  dropdownIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#dcdde1",
    marginVertical: 10,
  },
  detailsBox: {
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#d5d5db",
    marginVertical: 15,
    borderRadius: 12,

  },
  uploadedFile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  documentText: {
    color: "black",
  },
  switch: {
    marginVertical: 15,
  },
  saveButton: {
    backgroundColor: "#2ecc71",
    marginVertical: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

