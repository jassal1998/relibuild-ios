import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";

import { Card, Checkbox, PaperProvider, RadioButton,  } from 'react-native-paper';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
import { CallAPIPostPromise, LocalButton, getUserId, grayColor, primaryColor } from '../contract/utility/comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setSpinnerLoading } from '../contract/utility/redux/profile';
import Toast from 'react-native-toast-message';
import SpinnerLoading from '../contract/utility/comp/spinnerLoading';
import PickerModal from '../contract/utility/comp/pickerModal';
import LocalText from '../contract/utility/comp/LocalText';
// import { useTranslation } from 'react-i18next';
import LocalTextInput from '../contract/utility/comp/localTextInput';
const {height,width} = Dimensions.get('window')


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
const completionDateOptions = ["specificDate","industryStandards","other"]

const SaveSubContractModal = ({
  projectDetails,
    setModalVisible,
    selectedSubContracterFromFlatList,
    modalVisible,

   handleSubmit
}) => {
const [country,setCountry] =useState('')
const [countryStatus,setCountryStatus]= useState(false)
  const token = useSelector(selectToken)
  const homeOwnerDetails = projectDetails?.home_owner?projectDetails?.home_owner:""
  const contractorDetails = projectDetails?.contractor?projectDetails?.contractor:""
   const subcontractorDetails = projectDetails.subcontractors.filter(s=>s.ps_subcontractor_id.toString()===selectedSubContracterFromFlatList.toString())
   const [responsibilities, setResponsibilities] = useState([]);
const [selectedDateField,setSelectedDateField] = useState('')
   // Toggle the responsibility in the state
   const handleToggle = (responsibility) => {
     setResponsibilities((prev) =>
       prev.includes(responsibility)
         ? prev.filter((item) => item !== responsibility) // Remove if already selected
         : [...prev, responsibility] // Add if not selected
     );
   };
    const [error,setErr]=useState('')
    const [startDateVisible,setStartDateVisibl] = useState(false)
    const date = new Date()
    const [saveData,setSaveData] = useState({
            "projectSubId": "",
            "projectId": "",
            "state": "",
            "additionalHomeOwnerName": "",
            "contractorAuthorizedRepresentative": "",
            "contractorInsuranceOption": "",
            "contractorInsuranceProviderName": "",
            "workerCompensationInsuranceOption": "",
            "workerCompensationInsuranceLimit": "",
            "descriptionOfServices": "",
            "subContratorResponsibilities":[],
            "descriptionOfOtherResponsibilities": "",
            "commencementDate": "",
            "completionDateOptions": "",
            "completionDateSpecific": "",
            "completionDateOther": null,
            "substantialCompletionDateOptions": "",
            "substantialCompletionDateSpecific": null,
            "substantialCompletionDateOther": null,
            "paymentAmountOptions": "",
            "paymentAmountTotalAmount": "",
            "paymentAmountHourlyRate": "",
            "paymentAmountOtherDescription": "",
            "paymentMethodOptions": "",
            "paymentMethodOptionsOther": "",
            "paymentFrequencyOptions": "",
            "paymentFrequencyOptionsOther": "",
            "rightToSubcontractingOptions": "",
            "assignmentRightOptions": "",
            "subcontractorInsuranceOption": "",
            "subContractorInsuranceProviderName": "",
            "subcontractorWorkerCompensationInsuranceOptions": "",
            "subcontractorWorkerCompensationInsuranceLimit": "",
            "subcontractorAuthorizedRepresentative": "",
            "additionalProvisions": "",
            "fileName": "",
            "contractorSignatureUrl": null,
            "subcontractorSignatureUrl": null,
            "contractorSignedAt": null,
            "subContractorSignedAt": null,
            "contractorSentAt": null,
            "subcontractorSentAt": null,
            "userId": "",
    })
    const {t} = useTranslation()
const dispatch = useDispatch()
    const handleSave = ()=>{
    if(saveData.contractorInsuranceOption && saveData.workerCompensationInsuranceOption && saveData.descriptionOfServices && saveData.subContratorResponsibilities && saveData.commencementDate && saveData.completionDateOptions && saveData.substantialCompletionDateOptions && saveData.paymentAmountOptions && saveData.paymentMethodOptions && saveData.rightToSubcontractingOptions && saveData.assignmentRightOptions && saveData.subcontractorInsuranceOption && saveData.subcontractorWorkerCompensationInsuranceOptions && saveData.additionalProvisions && saveData.fileName ){
      dispatch(setSpinnerLoading('Saving'))
      CallAPIPostPromise('/contract/create-sub-contract',{
        ...saveData,
        projectSubId:selectedSubContracterFromFlatList,
        projectId:projectDetails.p_id,
        state:projectDetails.p_state,
        userId:getUserId(token),
        subContratorResponsibilities:responsibilities


      },token,dispatch).then((res)=>{
Toast.show({
  text1:t('Sub contract saved')
})
setModalVisible(false)
handleSubmit()
      }).finally(()=>{
        dispatch(setSpinnerLoading(false))
      })
    }else{
      if(!saveData.contractorInsuranceOption){
        setErr(`Contractor's Insurance option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.workerCompensationInsuranceOption){
        setErr(`Worker's Compensation Insurance option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.descriptionOfServices){
        setErr(`Description of services required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.subContratorResponsibilities){
        setErr(`Subcontractor Responsibilites required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.completionDateOptions){
        setErr(`Subcontractor Start Date required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.completionDateOptions){
        setErr(`Completion Date required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.substantialCompletionDateOptions){
        setErr(`Substantial Completion Date required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.paymentAmountOptions){
        setErr(`Payment Amount Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.paymentMethodOptions){
        setErr(`Payment Method Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.rightToSubcontractingOptions){
        setErr(`Right to SubContracting Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.assignmentRightOptions){
        setErr(`Assignment right Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.subcontractorInsuranceOption){
        setErr(`Subcontractor Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.subcontractorWorkerCompensationInsuranceOptions){
        setErr(`Subcontractor worker compensation insurance Option required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.additionalProvisions){
        setErr(`Additional Provisions required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }

      if(!saveData.fileName){
        setErr(`Document name required`)
        setTimeout(() => {
          setErr('')
        }, 4000);
      return

      }
    }



    }
    useEffect(()=>{
if(modalVisible){
  const subContractorDetails =projectDetails.subcontractors.filter(s=>s.ps_subcontractor_id.toString()===selectedSubContracterFromFlatList.toString())
  
  // const isUpdateAbleData = projectDetails?.contractDetails.filter(o => o.sc_project_subcontractor_id.toString()===selectedSubContracterFromFlatList.toString())
 const contractdetails = subContractorDetails[0]?subContractorDetails[0].contractDetails:[]
if(contractdetails[0]){
  setSaveData({
      "projectSubId": contractdetails[0].sc_project_subcontractor_id,
      "projectId": contractdetails[0].sc_project_id,
      "state": contractdetails[0].sc_state,
      "additionalHomeOwnerName": contractdetails[0].sc_additional_homeowner_name,
      "contractorAuthorizedRepresentative": contractdetails[0].sc_contractor_authorized_representative,
      "contractorInsuranceOption": contractdetails[0].sc_contractor_insurance_option,
      "contractorInsuranceProviderName": contractdetails[0].sc_contractor_insurance_provider_name,
      "workerCompensationInsuranceOption": contractdetails[0].sc_worker_compensation_insurance_option,
      "workerCompensationInsuranceLimit": contractdetails[0].sc_worker_compensation_insurance_limit,
      "descriptionOfServices": contractdetails[0].sc_description_of_services,
      "subContratorResponsibilities":JSON.parse(contractdetails[0].sc_sub_contrator_responsibilites),
      "descriptionOfOtherResponsibilities":contractdetails[0].sc_sub_contrator_responsibilites,
      "commencementDate": contractdetails[0].sc_commencement_date,
      "completionDateOptions": contractdetails[0].sc_completion_date_options,
      "completionDateSpecific": contractdetails[0].sc_completion_date_specific,
      "completionDateOther": contractdetails[0].sc_completion_date_other,
      "substantialCompletionDateOptions": contractdetails[0].sc_substantial_completion_date_options,
      "substantialCompletionDateSpecific": contractdetails[0].sc_substantial_completion_date_specific,
      "substantialCompletionDateOther": contractdetails[0].sc_completion_date_other,
      "paymentAmountOptions": contractdetails[0].sc_payment_amount_options,
      "paymentAmountTotalAmount": contractdetails[0].sc_payment_amount_total_amount,
      "paymentAmountHourlyRate": contractdetails[0].sc_payment_amount_hourly_rate,
      "paymentAmountOtherDescription": contractdetails[0].sc_payment_amount_other_description,
      "paymentMethodOptions": contractdetails[0].sc_payment_method_options,
      "paymentMethodOptionsOther": contractdetails[0].sc_payment_method_options_other,
      "paymentFrequencyOptions": contractdetails[0].sc_payment_frequency_options,
      "paymentFrequencyOptionsOther": contractdetails[0].sc_payment_frequency_options_other,
      "rightToSubcontractingOptions": contractdetails[0].sc_right_to_subcontracting_options,
      "assignmentRightOptions": contractdetails[0].sc_assignment_right_options,
      "subcontractorInsuranceOption": contractdetails[0].sc_subcontractor_insurance_option,
      "subContractorInsuranceProviderName": contractdetails[0].sc_sub_contractor_insurance_provider_name,
      "subcontractorWorkerCompensationInsuranceOptions": contractdetails[0].sc_worker_compensation_insurance_option,
      "subcontractorWorkerCompensationInsuranceLimit": contractdetails[0].sc_worker_compensation_insurance_limit,
      "subcontractorAuthorizedRepresentative": contractdetails[0].sc_subcontractor_authorized_representative,
      "additionalProvisions": contractdetails[0].sc_additional_provisions,
      "fileName": contractdetails[0].sc_file_name,
      "subcontractorSignatureUrl": contractdetails[0].sc_subcontractor_signature_url,
      "contractorSignedAt": contractdetails[0].sc_contractor_signed_at,
      "subContractorSignedAt": contractdetails[0].sc_sub_contractor_signed_at,
      "contractorSentAt": contractdetails[0].sc_contractor_sent_at,
      "subcontractorSentAt": contractdetails[0].sc_subcontractor_sent_at,
      "userId": projectDetails.p_contractor_id,
  })
}
}
    },[modalVisible])
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
  
    onRequestClose={() => setModalVisible(false)}
  >
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.modalContainer}>
        <View style={style.modalView}>
      <View style={{
        backgroundColor:'#3762EA',
        padding:15,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:'center'
      }}>
      <LocalText style={style.modalTitle}>Contract</LocalText>
<TouchableOpacity                 onPress={() => setModalVisible(false)}>
    <Ionicons name={'close'} color={'white'}  size={24}/>
</TouchableOpacity>
      </View>

          <ScrollView
            style={{ flex: 1, padding: 20 }}
            keyboardShouldPersistTaps="always" // Set to "always"
            contentContainerStyle={{ paddingBottom: 100 ,
            
            paddingTop:10,
        }}
          >
            <LocalText style={style.add}>ADD SUBCONTRACTOR CONTRACT</LocalText>
            <LocalText style={style.disc}>Home Improvement Contract</LocalText>
<Card style={[style.paperCard,style.elevatedCard,{
    marginTop:20
}]}>
<Card.Content>
    <LocalText style={style.sectionTitle}>
    Contract type 
  </LocalText>
    <Text style={style.description}>
    {t("Governing Law State")} <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
  </Text>
    {Platform.OS==="ios" &&     <TouchableOpacity onPress={()=>{
      setCountryStatus(true)
    }} style={{...style.inputPaper,borderColor:'gray',borderWidth:1,height:45,borderRadius:6,
  flexDirection:'row',
  alignItems:'center',paddingLeft:15}}>
 <LocalText>
  {country}
 </LocalText>
    </TouchableOpacity>}



    <PickerModal
        options={['Connecticut','Ohio'].map(s=>{
          return {
            label:s,
            value:s
          }
        })}
        selectedValue={country}

        onValueChange={(itemValue, itemIndex) =>{
          setCountry(itemValue)
            }
          
            }
        isVisible={countryStatus}
        onClose={() => {setCountryStatus(false)}}
      />


</Card.Content>
</Card>


   
<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Homeowner details
  </LocalText>
    <LocalText style={style.description}>
    Most details are already prefilled by a homeowner. You
                can add additional homeowner name if you wish.
  </LocalText>

    <LocalTextInput
                style={style.inputPaper}
                value={homeOwnerDetails?homeOwnerDetails.user_first_name+ " " + homeOwnerDetails.user_last_name:""}
                readOnly
                label="First and last name"
                mode="outlined"
              />

<LocalTextInput
                style={style.inputPaper}
                value={saveData.additionalHomeOwnerName}
                onChangeText={(text) =>
                 setSaveData(c=>{
                  return {
                    ...c,
                    additionalHomeOwnerName:text
                  }
                 })
                }
                label="Additional Homeowner Name"
                mode="outlined"
              />
    </Card.Content>
</Card>
      

        
<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Contractor details
  </LocalText>
    <LocalText style={style.description}>
    All necessary details are already prefilled.
  </LocalText>

    <LocalTextInput
                style={style.inputPaper}
                value={contractorDetails?contractorDetails.user_first_name+ " "+contractorDetails.user_last_name:""}
               
                readOnly
                label="First and last name"
                mode="outlined"
              />

<LocalTextInput
                style={style.inputPaper}
                value={contractorDetails?contractorDetails.company_name:""}
               
                readOnly
                label="Contractor Company Name"
                mode="outlined"
              />

    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Subcontractor details
  </LocalText>
    <LocalText style={style.description}>
    All necessary details are already prefilled by Subcontractor.
  </LocalText>

    <LocalTextInput
                style={style.inputPaper}
                value={subcontractorDetails[0]?subcontractorDetails[0].user_first_name+ " "+subcontractorDetails[0].user_last_name:""}
               
                readOnly
                label="First and last name"
                mode="outlined"
              />

<LocalTextInput
                style={style.inputPaper}
                value={subcontractorDetails[0]?subcontractorDetails[0]?.company_name:""}
               
                readOnly
                label="Subcontractor Company Name"
                mode="outlined"
              />

    </Card.Content>
</Card>
    

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Project address
  </LocalText>
    <LocalText style={style.description}>
    All necessary details are already prefilled by you.

  </LocalText>

    <LocalTextInput
                style={style.inputPaper}
                value={projectDetails?projectDetails.p_street_address:""}
                 
                readOnly
                label="Street address"
                mode="outlined"
              />


<LocalTextInput
                style={style.inputPaper}
                value={projectDetails?projectDetails.p_city:""}
              
                readOnly
                label="City"
                mode="outlined"
              />

<LocalTextInput
                style={style.inputPaper}
                 
                readOnly
                label="State"
                mode="outlined"
                value={projectDetails?projectDetails.p_state:""}
                />

<LocalTextInput
                style={style.inputPaper}
                value={projectDetails?projectDetails.p_zip:""}
                
                readOnly
                label="Zip"
                mode="outlined"
              />



    </Card.Content>
</Card>








       
        
        
   





<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
  {t("Total Sale Price")}    <LocalText style={{ color: "red" }}>*</LocalText>
  </Text>
    <Text style={style.description}>
  {t("All necessary details are already prefilled by you.")}  
  </Text>

    <LocalTextInput
                style={style.inputPaper}
                value={projectDetails.p_total_cost}
               
                readOnly
                label="Total Sale Price"
                mode="outlined"
              />


    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
  Allowances
</LocalText>


    <LocalTextInput
                style={style.inputPaper}
                // value={saveData.}
                onChangeText={(text) =>{
                //   setSaveData(prev =>{
                //     return {
                //       ...prev,
                //       totalAllowance:text
                //     }
                //   })
                }
                  
                }
                label="Total Allowances"
                mode="outlined"
              />


    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Contractor’s Insurance")}  <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>


  <LocalText
                style={{
                  fontSize: 15,
                  paddingTop: 5,
                  left: 5,
                  paddingTop: 15,
                  color:'gray'

                }}
              >
                Choose one option.
            </LocalText>
              <View style={{ paddingTop: 10 }}>
                {/* Option 1 */}
                <TouchableOpacity
                  style={style.radioButton}
                  onPress={() => {
                    setSaveData(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[0]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {saveData.contractorInsuranceOption === contractorInsuranceOptionList[0] && (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    Carries commercial general liability insurance
                </LocalText>
                </TouchableOpacity>

                {/* Show the LocalTextInput when option 1 is selected */}
            {saveData.contractorInsuranceOption === contractorInsuranceOptionList[0]&& (
                    <LocalTextInput
                    style={style.inputPaper}
                    label="Insurance Provider Name:"
                    value={saveData.contractorInsuranceProviderName}
                    onChangeText={(text)=>{
                      setSaveData(prev=>{
                        return {
                          ...prev,
                          contractorInsuranceProviderName:text
                        }
                      })
                    }}
                    mode="outlined"
                  />
                  
              
              
                )} 

                {/* Option 2 */}
                <TouchableOpacity
                  style={style.radioButton}
                  onPress={() => {
                    setSaveData(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[1]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {saveData.contractorInsuranceOption === contractorInsuranceOptionList[1]&& (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    The Contractor does not carry commercial{"\n"}{" "}
                    general liability insurance
                </LocalText>
                </TouchableOpacity>

                {/* Option 3 */}
                <TouchableOpacity
                  style={style.radioButton}
                  onPress={() => {
                    setSaveData(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[2]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {saveData.contractorInsuranceOption === contractorInsuranceOptionList[2]&& (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    The Contractor is self-insured
                </LocalText>
                </TouchableOpacity>
              </View>




    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
 {t("Worker's Compensation Insurance")}    <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>


  <LocalText
              style={{
                fontSize: 15,
                paddingTop: 5,
                left: 5,
                paddingTop: 15,
                color:'gray'

              }}
            >
              Choose one option.
          </LocalText>
            <View>
              {/* Option 1 */}
              <TouchableOpacity
                style={style.radioButton}
                onPress={() => {
                  setSaveData(prev=>{
                    return {
                      ...prev,
                      workerCompensationInsuranceOption:workerCompensationInsuranceOptionList[0]
                    }
                  })
                }}
              >
                <View style={style.radioCircle}>
                  {saveData.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[0]&& (
                    <View style={style.selectedRb} />
                  )}
                </View>
                <LocalText style={style.radioText}>
                  Contractor has no employees and is exempt from
                  Workers’ Compensation Laws or Requirements or
                  Insurance Regulations
              </LocalText>
              </TouchableOpacity>
              <View>
                {/* Option 2 */}
                <TouchableOpacity
                  style={style.radioButton}
                  onPress={() => {
                    setSaveData(prev=>{
                      return {
                        ...prev,
                        workerCompensationInsuranceOption:workerCompensationInsuranceOptionList[1]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {saveData.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[1]&& (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    Contractor carries Workers’ Compensation {"\n"}
                    Insurance for all employees
                </LocalText>
                </TouchableOpacity>

                {/* Text Input for Option 2 */}
             {saveData.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[1]&& (
                  <View style={{ marginTop: 10 }}>
                    <LocalText style={style.description}>
                    Worker's Compensation Insurance Limit *
                  </LocalText>
                    <LocalTextInput
                      label=""
                      value={saveData.workerCompensationInsuranceLimit} // Changed state name
                      onChangeText={(text)=>{
                        setSaveData(prev=>{
                          return {
                            ...prev,
                            workerCompensationInsuranceLimit:text
                          }
                        })
                      }} 
                      style={style.inputPaper}
                      mode="outlined"
                   
                    />
                  </View>
                )} 
              </View>
              
             
            </View>


    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
  {t("Description of services")}   <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>
  <LocalText style={{
    color:'gray',
    marginBottom:5
  }}>
  Description of Services to Be Provided By Subcontractor 
</LocalText>


    <LocalTextInput
                style={style.inputPaper}
                value={saveData.descriptionOfServices}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      descriptionOfServices:text
                    }
                  })
                }}
                label="Description"
                mode="outlined"
              />


    </Card.Content>
</Card>






<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Authorized Representatives
</LocalText>

  <LocalText style={style.description}>
  Contractor Authorized Representative First and Last
                  Name
</LocalText>


    <LocalTextInput
                style={style.inputPaper}
                mode="outlined"

                value={saveData.contractorAuthorizedRepresentative}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      contractorAuthorizedRepresentative:text
                    }
                  })
                }}
              />


<LocalText style={style.description}>
Subcontractor Authorized Representative First and Last Name
</LocalText>

  <LocalTextInput
                style={style.inputPaper}
                value={saveData.subcontractorAuthorizedRepresentative}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      subcontractorAuthorizedRepresentative:text
                    }
                  })
                }}
                mode="outlined"
              />
    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
  {t("Subcontractor Responsibilities")}  <LocalText style={{
        color:'red'
    }}>
         *
  </LocalText>
</Text>

  <LocalText style={style.description}>
    You can select multiple options.
  </LocalText>



    {[
          { label: 'Labor. Including, but not limited to, employees, subcontractors, and any other individuals or agents.', value: 'labor' },
          { label: 'Materials. Including, but not limited to, all supplies and products.', value: 'materials' },
          { label: 'Equipment. Including, but not limited to, machinery, accessories, or devices.', value: 'equipment' },
          { label: 'Travel. Including, but not limited to, ensuring that the above-mentioned responsibilities are provided at the location mentioned in Section V.', value: 'travel' },
          { label: 'Other', value: 'other' },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: index === 0 ? 0 : 10,
            }}
          >
            <Checkbox
              status={responsibilities.includes(item.value) ? 'checked' : 'unchecked'}
              onPress={() => handleToggle(item.value)}
            />
                       
            <LocalText style={{ flex: 1 ,color:'gray'}}>{item.label}</LocalText>
          </View>
        ))}

{
  responsibilities.includes('other') ?

  <LocalTextInput       style={style.inputPaper}
  value={saveData.descriptionOfOtherResponsibilities}
  onChangeText={(text) =>{
    setSaveData(prev =>{
      return {
        ...prev,
        descriptionOfOtherResponsibilities:text
      }
    })
  }}
  label={"Description of Other Responsibilities *"}
  mode="outlined"/>:null
}



      </Card.Content>

</Card>


<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
 
    <Text style={style.sectionTitle}>
   {t("Subcontractor Start Date")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
</Text>
  <TouchableOpacity onPress={()=>{
    setSelectedDateField('commencementDate')
  setStartDateVisibl(e => !e)
}}>

<View
                style={[style.inputPaper,{borderWidth:1,borderColor:'gray',height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:15}]}
              >
                <LocalText style={{
                  fontSize:15,
                  color:'gray'
                }}>
                {saveData?.commencementDate?moment(saveData?.commencementDate).format('DD-MM-YYYY'):"Select Date"}

              </LocalText>
              </View>
</TouchableOpacity>


  {(
        <DateTimePicker
          isVisible={startDateVisible}
          mode="date" // Can be "date", "time", or "datetime"
          onConfirm={(date)=>{
            setStartDateVisibl(false); 
            setSaveData(prev=>{
              return{
                ...prev,
                [selectedDateField]:date
              }
            })
          }}
          onCancel={()=>{
            setStartDateVisibl(false)
          }}
        />
      )}

<View>

</View>

    </Card.Content>

</Card>

<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t(" Completion Date Options")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
  </Text>
   
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton    value="specificDate"
            status={saveData.completionDateOptions === "specificDate" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                completionDateOptions:"specificDate"
              }
              })}}
              />
 <LocalText style={{
  color:'gray'
 }}>
By the specific date of

</LocalText>


</View>
{saveData.completionDateOptions==="specificDate"?<TouchableOpacity
onPress={()=>{
  setSelectedDateField('completionDateSpecific')
  setStartDateVisibl(true)

}}
                style={[style.inputPaper,{borderWidth:1,borderColor:'gray',height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:15}]}
              >
                <LocalText style={{
                  fontSize:15,
                  color:'gray'
                }}>
                {saveData?.completionDateSpecific?moment(saveData?.completionDateSpecific).format('DD-MM-YYYY'):"Select Date"}

              </LocalText>
              </TouchableOpacity>:""}
<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="industryStandards"
            status={saveData.completionDateOptions === "industryStandards" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                completionDateOptions:"industryStandards"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
In accordance with industry standards

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="other"
            status={saveData.completionDateOptions === "other" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                completionDateOptions:"other"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
Other

</LocalText>
</View>
{saveData.completionDateOptions==="other"?<TouchableOpacity
onPress={()=>{
  setSelectedDateField('completionDateOther')
  setStartDateVisibl(true)

}}
                style={[style.inputPaper,{borderWidth:1,borderColor:'gray',height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:15}]}
              >
                <LocalText style={{
                  fontSize:15,
                  color:'gray'
                }}>
                {saveData?.completionDateOther?moment(saveData?.completionDateOther).format('DD-MM-YYYY'):"Select Date"}

              </LocalText>
              </TouchableOpacity>:""}




<View>

</View>

    </Card.Content>

</Card>


<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Substantial Completion Date Options ")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
  </Text>
  
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton    value="specificDate"
            status={saveData.substantialCompletionDateOptions === "specificDate" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                substantialCompletionDateOptions:"specificDate"
              }
              })}}
              />
 <LocalText style={{
  color:'gray'
 }}>
By the specific date of

</LocalText>


</View>
{saveData.substantialCompletionDateOptions==="specificDate"?<TouchableOpacity
onPress={()=>{
  setSelectedDateField('substantialCompletionDateSpecific')
  setStartDateVisibl(true)

}}
                style={[style.inputPaper,{borderWidth:1,borderColor:'gray',height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:15}]}
              >
                <LocalText style={{
                  fontSize:15,
                  color:'gray'
                }}>
                {saveData?.substantialCompletionDateSpecific?moment(saveData?.substantialCompletionDateSpecific).format('DD-MM-YYYY'):"Select Date"}

              </LocalText>
              </TouchableOpacity>:""}
<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="industryStandards"
            status={saveData.substantialCompletionDateOptions === "industryStandards" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                substantialCompletionDateOptions:"industryStandards"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
In accordance with industry standards

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="other"
            status={saveData.substantialCompletionDateOptions === "other" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                substantialCompletionDateOptions:"other"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
Other

</LocalText>
</View>
{saveData.substantialCompletionDateOptions==="other"?<TouchableOpacity
onPress={()=>{
  setSelectedDateField('substantialCompletionDateOther')
  setStartDateVisibl(true)

}}
                style={[style.inputPaper,{borderWidth:1,borderColor:'gray',height:50,display:'flex',flexDirection:'row',alignItems:'center',paddingLeft:15}]}
              >
                <LocalText style={{
                  fontSize:15,
                  color:'gray'
                }}>
                {saveData?.substantialCompletionDateOther?moment(saveData?.substantialCompletionDateOther).format('DD-MM-YYYY'):"Select Date"}

              </LocalText>
              </TouchableOpacity>:""}




<View>

</View>

    </Card.Content>

</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Escrow
  
</LocalText>

  <View>
                {/* Escrow Switch */}
                <View style={style.escrowContainer}>
                    <View>
                    <LocalText style={style.escrowStatus}>
                  Enable Escrow Service:
                  {/* {projectDetail.p_escrow ==="1" ? "Enabled" : "Disabled"} */}
              </LocalText>
                    </View>

                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={
                      projectDetails.p_escrow ==="1" ? "lightblue" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    value={projectDetails.p_escrow ==="1"}
                    disabled
                  />
                </View>
               
              </View>


    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Payment Amount Options ")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
  </Text>
  
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
  <RadioButton value="totalAmount"
            status={saveData.paymentAmountOptions === "totalAmount" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentAmountOptions:"totalAmount"
              }
              })}}  />

<LocalText style={{color:'gray'}}>
Total Amount

</LocalText>
</View>
{ saveData.paymentAmountOptions==="totalAmount" &&<LocalTextInput
                style={style.inputPaper}
                value={saveData.paymentAmountTotalAmount}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      paymentAmountTotalAmount:text
                    }
                  })
                }}
                label={'Payment Amount - Total Amount *'}
                mode="outlined"
              />}
<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="hourlyRate"
            status={saveData.paymentAmountOptions === "hourlyRate" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentAmountOptions:"hourlyRate"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Hourly Rate

</LocalText>
</View>
{ saveData.paymentAmountOptions==="hourlyRate" &&<LocalTextInput
                style={style.inputPaper}
                value={saveData.paymentAmountHourlyRate}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      paymentAmountHourlyRate:text
                    }
                  })
                }}
                label={'Payment Amount - Hourly Amount *'}
                mode="outlined"
              />}
<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="hourlyRate"
            status={saveData.paymentAmountOptions === "other" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentAmountOptions:"other"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Other

</LocalText>
</View>

{ saveData.paymentAmountOptions==="other" &&<LocalTextInput
                style={style.inputPaper}
                value={saveData.paymentAmountOtherDescription}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      paymentAmountOtherDescription:text
                    }
                  })
                }}
                label={'Payment Amount - Other Description *'}
                mode="outlined"
              />}


<View>

</View>

    </Card.Content>

</Card>


<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Payment Method Options")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
  </Text>

<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="immediate"
            status={saveData.paymentMethodOptions === "immediate" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentMethodOptions:"immediate"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Immediately upon completion of the Services to the satisfaction of the Contractor.

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="within7days"
            status={saveData.paymentMethodOptions === "within7days" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentMethodOptions:"within7days"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Within (7) business days after completion of the Services to the satisfaction of the Contractor.


</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="regular"
            status={saveData.paymentMethodOptions === "regular" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentMethodOptions:"regular"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
Weekly/monthly/quarterly/other regular payment


</LocalText>
</View>


<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="other"
            status={saveData.paymentMethodOptions === "other" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentMethodOptions:"other"
              }
              })}}/>
 <LocalText style={{
  color:'gray'
 }}>
Other

</LocalText>
</View>

{ saveData.paymentMethodOptions==="other" &&<LocalTextInput
                style={style.inputPaper}
                value={saveData.paymentMethodOptionsOther}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      paymentMethodOptionsOther:text
                    }
                  })
                }}
                label={'Payment Method option - Other *'}
                mode="outlined"
              />}

    </Card.Content>

</Card>

{saveData.paymentMethodOptions==='regular' && <Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Payment Frequency Options")}  <Text style={{
        color:'red'
    }}>
        *
  </Text>
  </Text>
  
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="weekly"
            status={saveData.paymentFrequencyOptions === "weekly" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentFrequencyOptions:"weekly"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Weekly

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="monthly"
            status={saveData.paymentFrequencyOptions === "monthly" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentFrequencyOptions:"monthly"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Monthly

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="quarterly"
            status={saveData.paymentFrequencyOptions === "quarterly" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentFrequencyOptions:"quarterly"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Quarterly


</LocalText>
</View>


<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="other"
            status={saveData.paymentFrequencyOptions === "other" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                paymentFrequencyOptions:"other"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Other

</LocalText>
</View>

{ saveData.paymentMethodOptions==="other" &&<LocalTextInput
                style={style.inputPaper}
                value={saveData.paymentMethodOptionsOther}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      paymentMethodOptionsOther:text
                    }
                  })
                }}
                label={'Payment Method option - Other *'}
                mode="outlined"
              />}

    </Card.Content>

</Card>}

<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
      
    <Text style={style.sectionTitle}>
    {t("Right to Subcontracting Options")} <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="Right to Subcontracting"
            status={saveData.rightToSubcontractingOptions === "Right to Subcontracting" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                rightToSubcontractingOptions:"Right to Subcontracting"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Right to Subcontracting

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
}}>
<RadioButton value="No Right to Subcontracting"
            status={saveData.rightToSubcontractingOptions === "No Right to Subcontracting" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                rightToSubcontractingOptions:"No Right to Subcontracting"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
No Right to Subcontracting

</LocalText>
</View>





    </Card.Content>

</Card>


<Card style={[style.paperCard,style.elevatedCard,]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Assignment Right Options")}  <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>
<LocalText style={style.description}>
Choose one option.
</LocalText>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="subcontractorCanAssign"
            status={saveData.assignmentRightOptions === "subcontractorCanAssign" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                assignmentRightOptions:"subcontractorCanAssign"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Subcontractor shall have the right to assign any rights under this Agreement or any part of the Services issued herein.

</LocalText>
</View>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="subcontractorCannotAssign"
            status={saveData.assignmentRightOptions === "subcontractorCannotAssign" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                assignmentRightOptions:"subcontractorCannotAssign"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Subcontractor shall not have the right to assign any rights under this Agreement or any part of the Services issued herein.
</LocalText>
</View>





    </Card.Content>

</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
  {t("Subcontractor’s Insurance")}   <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>


  <LocalText
                style={{
                  fontSize: 15,
                  paddingTop: 5,
                  left: 5,
                  color:'gray',

                  paddingTop: 15,
                }}
              >
                Choose one option.
            </LocalText>
              <View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="yes"
            status={saveData.subcontractorInsuranceOption === "yes" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                subcontractorInsuranceOption:"yes"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
Carries commercial general liability insurance
</LocalText>
</View>

{saveData.subcontractorInsuranceOption === "yes"&& <LocalTextInput
                style={style.inputPaper}
                value={saveData.subContractorInsuranceProviderName}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      subContractorInsuranceProviderName:text
                    }
                  })
                }}
                label={'Insurance Provider Name'}
                mode="outlined"
              />}

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="no"
            status={saveData.subcontractorInsuranceOption === "no" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                subcontractorInsuranceOption:"no"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
The Contractor does not carry commercial general liability insurance
</LocalText>
</View>


<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center'
}}>
<RadioButton value="selfInsured"
            status={saveData.subcontractorInsuranceOption === "selfInsured" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                subcontractorInsuranceOption:"selfInsured"
              }
              })}} />
 <LocalText style={{
  color:'gray'
 }}>
The Contractor is self-insured
</LocalText>
</View>




    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
    {t("Options for Subcontractor’s Worker's Compensation Insurance ")} <LocalText style={{
        color:'red'
    }}>
        *
  </LocalText>
</Text>


  <LocalText
              style={{
                fontSize: 15,
                paddingTop: 5,
                left: 5,
                paddingTop: 15,
                paddingBottom:10,
                color:'gray'

              }}
            >
              Choose one option.
          </LocalText>
            <View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
}}>
<RadioButton value="noEmployees"
            status={saveData.subcontractorWorkerCompensationInsuranceOptions === "noEmployees" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                subcontractorWorkerCompensationInsuranceOptions:"noEmployees"
              }
              })}} />
<LocalText style={{
  flex:1,
  color:'gray'

}}>
Subcontractor’s has no employees and is exempt from Workers’ Compensation Laws or Requirements or Insurance Regulations
</LocalText>
</View>


<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  marginTop:10
}}>
<RadioButton value="hasInsurance"
            status={saveData.subcontractorWorkerCompensationInsuranceOptions === "hasInsurance" ? "checked" : "unchecked"}
            onPress={() => {
              setSaveData((p)=>{
              return {
                ...p,
                subcontractorWorkerCompensationInsuranceOptions:"hasInsurance"
              }
              })}} />
<LocalText style={{
  flex:1,
  color:'gray'


}}>
Subcontractor’s carries Workers’ Compensation Insurance for all employees
</LocalText>
</View>

{saveData.subcontractorWorkerCompensationInsuranceOptions === "hasInsurance"&& <LocalTextInput
                style={style.inputPaper}
                value={saveData.subcontractorWorkerCompensationInsuranceLimit}
                onChangeText={(text) =>{
                  setSaveData(prev =>{
                    return {
                      ...prev,
                      subcontractorWorkerCompensationInsuranceLimit:text
                    }
                  })
                }}
                label={`Subcontractor’s Worker's Compensation Insurance Limit`}
                mode="outlined"
              />}

    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Additional Provisions")} <LocalText style={{
        color:'red'
    }}>
         *
  </LocalText>
</Text>




    <LocalTextInput
                style={style.inputPaper}
                value={saveData.additionalProvisions}
                onChangeText={(text)=>{
                  setSaveData(prev=>{
                    return {
                      ...prev,
                      additionalProvisions:text
                    }
                  })
                }}
                label="Additional Provisions"
                mode="outlined"
              />


    </Card.Content>
</Card>
<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <Text style={style.sectionTitle}>
   {t("Document name")} <LocalText style={{
        color:'red'
    }}>
         *
  </LocalText>
</Text>

  <LocalText
                  style={style.description}
                >
                  Please indicate what you would like the {"\n"}
                  contract’s PDF file name to be. This name will be
                  shared with all signing parties
              </LocalText>


    <LocalTextInput
                style={style.inputPaper}
                value={saveData.fileName}
                onChangeText={(text)=>{
                  setSaveData(prev=>{
                    return {
                      ...prev,
                      fileName:text
                    }
                  })
                }}
                label="Document name"
                mode="outlined"
              />


    </Card.Content>
</Card>




<LocalText style={{ paddingTop: 10, color: "red" }}>
                 {error}
              </LocalText>

<LocalButton bg={primaryColor} color={'white'} title={'Submit'}    onPress={handleSave}/>

<LocalButton bg={grayColor} color={'black'} title={'Cancel'}  marginTop={20}       onPress={() => setModalVisible(false)}/>

      
     

            <View
              style={{
                flexDirection: "row",
                marginTop: "20%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >

            </View>
          </ScrollView>
        </View>
        <SpinnerLoading />
      </View>
    </KeyboardAvoidingView>
  </Modal>
  )
}
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
  justifyContent:'flex-end',
    },
    modalView: {
      backgroundColor: "white",
      margin: 10,
      borderRadius: 10,
  height:height-100,
  overflow:'hidden'
    },
  
    add: {
      fontSize: 20,
      fontWeight:'600',
      color:'gray'
    },
    disc: {
      fontSize: 13,
      fontWeight:'600',
      color:'gray'
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
      color:'gray'
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
    LocalTextInput: {
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
      color:'black'
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
export default SaveSubContractModal