import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert } from 'react-native'
import React from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";

import { Card, TextInput } from 'react-native-paper';
import moment from 'moment';
import { LocalButton, grayColor, primaryColor } from '../contract/utility/comman';
import SpinnerLoading from '../contract/utility/comp/spinnerLoading';
import LocalText from '../contract/utility/comp/LocalText';
import LocalTextInput from '../contract/utility/comp/localTextInput';
const SaveContractModal = ({
    togglePicker,
    states,
    showDatePicker,
    handleConfirmDate,
    isPickerVisible,
    setModalVisible,selectedState,
    Ionicons,
    setCreateHicProjectDetails, 
    createHicprojectDetails,
    setShowDatePicker,
    setActiveInput,
    setSelectedState,
    modalVisible,style,arrowInterpolate,width,
    homeOwnerDetails,contractorDetails,
    projectDetail,options,contractorInsuranceOptionList,
    workerCompensationInsuranceOptionList,error,handleSubmit,isContractCreated,date
}) => {
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
            <LocalText style={style.add}>ADD HOMEOWNER CONTRACT</LocalText>
            <LocalText style={style.disc}>Home Improvement Contract</LocalText>
<Card style={[style.paperCard,style.elevatedCard,{
    marginTop:20
}]}>
<Card.Content>
    <LocalText style={style.sectionTitle}>
    Contract type 
    </LocalText>
    <LocalText style={style.description}>
    Governing Law State <LocalText style={{
        color:'red'
    }}>
        *
    </LocalText>
    </LocalText>

    <View style={style.container}>
              {/* Touchable to open/close picker */}
              <TouchableOpacity
                style={style.selectedBox}
                onPress={togglePicker}
                togglePicker={togglePicker}
              >
                <LocalText style={style.selectedText}>
                  {selectedState
                    ? `State: ${selectedState}`
                    : "Select a State"}
                </LocalText>
                {/* Animated Arrow Icon */}
                <Animated.View
                  style={{ transform: [{ rotate: arrowInterpolate }] }}
                >
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color="black"
                  />
                </Animated.View>
              </TouchableOpacity>

              {/* Animated view to show/hide picker options */}
              {isPickerVisible && (
                <Animated.View
                  style={[
                    style.pickerContainer,
                    { height: 200 },
                  ]}
                >
                  {states.map((state, index) => (
                    <TouchableOpacity
                      key={index}
                      style={style.optionButton}
                      onPress={() => {
                        setSelectedState(state.value);
                        togglePicker(); // Close picker after selection
                      }}
                    >
                      <LocalText style={style.optionText}>
                        {state.label}
                      </LocalText>
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              )}
            </View>
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
                style={style.readOnlyInput}
                value={homeOwnerDetails?homeOwnerDetails.user_first_name+ " " + homeOwnerDetails.user_last_name:""}
                readOnly
                label="First and last name"
                mode="outlined"
              />

<LocalTextInput
                style={style.readOnlyInput}
                value={createHicprojectDetails.additionalHomeOwnerName}
                onChangeText={(text) =>
                 setCreateHicProjectDetails(c=>{
                  return {
                    ...c,
                    additionalHomeOwnerName:text
                  }
                 })
                }
                label="Additional Name (Name)"
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
                style={style.readOnlyInput}
                value={contractorDetails?contractorDetails.user_first_name+ " "+contractorDetails.user_last_name:""}
               
                readOnly
                label="First and last name"
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

    <TextInput
                style={style.readOnlyInput}
                value={projectDetail?projectDetail.p_street_address:""}
                 
                readOnly
                label="Street address"
                mode="outlined"
              />


<TextInput
                style={style.readOnlyInput}
                value={projectDetail?projectDetail.p_city:""}
              
                readOnly
                label="City"
                mode="outlined"
              />

<TextInput
                style={style.readOnlyInput}
                 
                readOnly
                label="State"
                mode="outlined"
                value={projectDetail?projectDetail.p_state:""}
                />

<TextInput
                style={style.readOnlyInput}
                value={projectDetail?projectDetail.p_zip:""}
                
                readOnly
                label="Zip"
                mode="outlined"
              />



    </Card.Content>
</Card>



<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
   Dates <LocalText style={{
        color:'red'
    }}>
        *
    </LocalText>
    </LocalText>

<TouchableOpacity  onPress={() => {

            setActiveInput("startDate");
            setShowDatePicker(true);
          }} >
            <LocalText style={[style.inputEditable,{borderWidth:1,borderColor:'gray',
          padding:15,borderRadius:5}]}>
            {createHicprojectDetails.startDate? moment(createHicprojectDetails.startDate).format('DD-MM-YYYY'):"Start Date"}

            </LocalText>


</TouchableOpacity>

<TouchableOpacity  onPress={() => {
                    setActiveInput("substantialCompletionDate");
                    setShowDatePicker(true);
                  }}>

<LocalText style={[style.inputEditable,{borderWidth:1,borderColor:'gray',
          padding:15,borderRadius:5}]}>
           { createHicprojectDetails.substantialCompletionDate? moment(createHicprojectDetails.substantialCompletionDate).format('DD-MM-YYYY'):"Substantial Completion Date"}

</LocalText>

      
</TouchableOpacity>
  

<TouchableOpacity     onPress={() => {
                    setActiveInput("endDate");
                    setShowDatePicker(true);
                  }}>
                    <LocalText style={[style.inputEditable,{borderWidth:1,borderColor:'gray',
          padding:15,borderRadius:5}]}>
           {createHicprojectDetails.completionDate?moment(createHicprojectDetails.completionDate).format('DD-MM-YYYY'):"End Date"}

</LocalText>


      
</TouchableOpacity>


    </Card.Content>
</Card>
                <DateTimePicker
                  isVisible={showDatePicker}
                  mode="date" 
                  minimumDate={new Date()} 
                  onCancel={()=>{
                    setShowDatePicker(false)
                  }}
                  onConfirm={handleConfirmDate}
                />



       
        
        
 



            <Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>


    <LocalText style={style.sectionTitle}>
    Project Cost Model  <LocalText style={{ color: "red" }}>*</LocalText>
    </LocalText>
    <View style={{
        marginTop:10
    }}>
    {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={style.radioOption}
                  onPress={() => {
                    setCreateHicProjectDetails(prev=>{
                      return {
                        ...prev,
                        projectCostModel:option.value
                      }
                    })
                  }}
                >
                  <View
                    style={[
                      style.radioCircle,
                      createHicprojectDetails.projectCostModel === option.value &&
                        style.selectedRadioCircle,
                    ]}
                  />
                  <LocalText style={style.radioLabel}>{option.label}</LocalText>
                </TouchableOpacity>
              ))}
    </View>
  





    </Card.Content>
</Card>

<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Total Sale Price  <LocalText style={{ color: "red" }}>*</LocalText>
    </LocalText>
    <LocalText style={style.description}>
    All necessary details are already prefilled by you.
    </LocalText>

    <TextInput
                style={style.readOnlyInput}
                value={createHicprojectDetails.totalSalesPrice}
               
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


    <TextInput
                style={style.inputEditable}
                keyboardType={'number-pad'}
                value={createHicprojectDetails.totalAllowance}
                onChangeText={(text) =>{
                  setCreateHicProjectDetails(prev =>{
                    return {
                      ...prev,
                      totalAllowance:text
                    }
                  })
                }
                  
                }
                label="Total Allowances"
                mode="outlined"
              />


    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Description of work <LocalText style={{
        color:'red'
    }}>
        *
    </LocalText>
  </LocalText>


    <TextInput
                style={style.inputEditable}
                value={createHicprojectDetails.workDescription}
                onChangeText={(text) =>{
                  setCreateHicProjectDetails(prev =>{
                    return {
                      ...prev,
                      workDescription:text
                    }
                  })
                }}
                label="Work Description"
                mode="outlined"
              />


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
                  Escrow Service:
                  {projectDetail.p_escrow ==="1" ? "Enabled" : "Disabled"}
                </LocalText>
                    </View>

                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={
                      projectDetail.p_escrow ==="1" ? "lightblue" : "#f4f3f4"
                    }
                    ios_backgroundColor="#3e3e3e"
                    value={projectDetail.p_escrow ==="1"}
                    disabled
                  />
                </View>
               
              </View>


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


    <TextInput
                style={style.inputEditable}
                mode="outlined"

                value={createHicprojectDetails.contractorAuthorizedRepresentative}
                onChangeText={(text) =>{
                  setCreateHicProjectDetails(prev =>{
                    return {
                      ...prev,
                      contractorAuthorizedRepresentative:text
                    }
                  })
                }}
              />


<LocalText style={style.description}>
Homeowner Authorized Representative First and Last
                  Name
  </LocalText>

  <TextInput
                style={style.inputEditable}
                value={createHicprojectDetails.homeownerAuthorizedRepresentative}
                onChangeText={(text) =>{
                  setCreateHicProjectDetails(prev =>{
                    return {
                      ...prev,
                      homeownerAuthorizedRepresentative:text
                    }
                  })
                }}
                mode="outlined"
              />
    </Card.Content>
</Card>


<Card style={[style.paperCard,style.elevatedCard]}>
    <Card.Content>
    <LocalText style={style.sectionTitle}>
    Contractor’s Insurance <LocalText style={{
        color:'red'
    }}>
        *
    </LocalText>
  </LocalText>


  <LocalText
                style={{
                  fontSize: 15,
                  paddingTop: 5,
                  left: 5,
                  paddingTop: 15,
                }}
              >
                Choose one option.
            </LocalText>
              <View style={{ paddingTop: 10 }}>
                {/* Option 1 */}
                <TouchableOpacity
                  style={style.radioButton}
                  onPress={() => {
                    setCreateHicProjectDetails(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[0]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {createHicprojectDetails.contractorInsuranceOption === contractorInsuranceOptionList[0] && (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    Carries commercial general liability insurance
                  </LocalText>
                </TouchableOpacity>

                {/* Show the TextInput when option 1 is selected */}
                {createHicprojectDetails.contractorInsuranceOption === contractorInsuranceOptionList[0]&& (
                    <TextInput
                    style={style.inputEditable}
                    label="Insurance Provider Name:"
                    value={createHicprojectDetails.contractorInsuranceProviderName}
                    onChangeText={(text)=>{
                      setCreateHicProjectDetails(prev=>{
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
                    setCreateHicProjectDetails(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[1]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {createHicprojectDetails.contractorInsuranceOption === contractorInsuranceOptionList[1]&& (
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
                    setCreateHicProjectDetails(prev=>{
                      return {
                        ...prev,
                        contractorInsuranceOption:contractorInsuranceOptionList[2]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {createHicprojectDetails.contractorInsuranceOption === contractorInsuranceOptionList[2]&& (
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
    <LocalText style={style.sectionTitle}>
    Worker's Compensation Insurance <LocalText style={{
        color:'red'
    }}>
        *
    </LocalText>
  </LocalText>


  <LocalText
              style={{
                fontSize: 15,
                paddingTop: 5,
                left: 5,
                paddingTop: 15,
              }}
            >
              Choose one option.
          </LocalText>
            <View>
              {/* Option 1 */}
              <TouchableOpacity
                style={style.radioButton}
                onPress={() => {
                  setCreateHicProjectDetails(prev=>{
                    return {
                      ...prev,
                      workerCompensationInsuranceOption:workerCompensationInsuranceOptionList[0]
                    }
                  })
                }}
              >
                <View style={style.radioCircle}>
                  {createHicprojectDetails.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[0]&& (
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
                    setCreateHicProjectDetails(prev=>{
                      return {
                        ...prev,
                        workerCompensationInsuranceOption:workerCompensationInsuranceOptionList[1]
                      }
                    })
                  }}
                >
                  <View style={style.radioCircle}>
                    {createHicprojectDetails.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[1]&& (
                      <View style={style.selectedRb} />
                    )}
                  </View>
                  <LocalText style={style.radioText}>
                    Contractor carries Workers’ Compensation {"\n"}
                    Insurance for all employees
                  </LocalText>
                </TouchableOpacity>

                {/* Text Input for Option 2 */}
                {createHicprojectDetails.workerCompensationInsuranceOption === workerCompensationInsuranceOptionList[1]&& (
                  <View style={{ marginTop: 10 }}>
                    <LocalText style={style.description}>
                    Worker's Compensation Insurance Limit *
                    </LocalText>
                    <TextInput
                      label=""
                      value={createHicprojectDetails.workerCompensationInsuranceLimit} // Changed state name
                      onChangeText={(text)=>{
                        setCreateHicProjectDetails(prev=>{
                          return {
                            ...prev,
                            workerCompensationInsuranceLimit:text
                          }
                        })
                      }} 
                      style={style.inputEditable}
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
    <LocalText style={style.sectionTitle}>
    Document name<LocalText style={{
        color:'red'
    }}>
         *
    </LocalText>
  </LocalText>

  <LocalText
                  style={style.description}
                >
                  Please indicate what you would like the {"\n"}
                  contract’s PDF file name to be. This name will be
                  shared with all signing parties
                </LocalText>


    <TextInput
                style={style.inputEditable}
                value={createHicprojectDetails.contractFileName}
                onChangeText={(text)=>{
                  setCreateHicProjectDetails(prev=>{
                    return {
                      ...prev,
                      contractFileName:text
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

<LocalButton  bg={primaryColor} color={'white'} onPress={handleSubmit} title={isContractCreated ? "Update Contract" : "Submit"}/>

<LocalButton marginTop={10}  bg={grayColor} color={'black'} onPress={() => setModalVisible(false)} title={"Cancel"}/>

      
           


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
          <SpinnerLoading />
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>
  )
}

export default SaveContractModal