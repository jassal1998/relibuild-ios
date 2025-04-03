import { View, Text,  ScrollView, TouchableOpacity,  Image, Modal, Switch, Animated, Alert, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Card, TextInput } from 'react-native-paper';
import { CallAPIPostPromise, getUserId } from '../contract/utility/comman';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../contract/utility/redux/profile';
import Toast from 'react-native-toast-message';
import { selectContractId } from '../contract/utility/redux/contract/reducer';
import LocalText from '../contract/utility/comp/LocalText';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
const {height} =Dimensions.get('window')

const CreateSubMileStone =({modalVisible,projectSubContractorsList,subContracterID, closeModal, handleSubmit}) => {
  const defaultSubcontractors = {

    totalCost:"",
    subcontractorId:"",
    isTradesmenInspection:false,

    
  }
  const defaultSubContractorMilestones =[
    {
    isTownInspected:false,
    milestoneName:""},
    {
        isTownInspected:false,
        milestoneName:""},
        {
            isTownInspected:false,
            milestoneName:""},
  ]
  const [subcontractors,setSubcontractors] = useState(defaultSubcontractors)
  const [subContractorMilestones,setSubContractorMilestones] = useState(defaultSubContractorMilestones)
const [err,setErr] =useState('')

  const token = useSelector(selectToken)
  const dispatch = useDispatch()
const contractID = useSelector(selectContractId)
const userID = token?getUserId(token):""
const {t} = useTranslation()


  const handleCreatMileStone = ()=>{
    const body = {
      projectId:contractID,
      userId:userID,
      subcontractors:[
        {
          isTradesmenInspection:subcontractors.isTradesmenInspection,
          totalCost:subcontractors.totalCost,
          subcontractorId:subContracterID,
          subContractorMilestones:subContractorMilestones
        }
 
      ]
    }
    CallAPIPostPromise('/contract/create-subcontractor',body,token,dispatch).then((response)=>{
      if(response.data.results[0]){
Toast.show({
  text1: t('Milestones Created'),
  type: t('success'),

})
closeModal()
handleSubmit()

     }
   
    }).catch(e=>{
      console.log(e)
    })
  }

  useEffect(()=>{
if(subContracterID && projectSubContractorsList[0]){
const isOldMileStone = projectSubContractorsList.filter(p => Number(p.ps_subcontractor_id)===Number(subContracterID))
if(isOldMileStone[0]){
  setSubcontractors({
    totalCost:isOldMileStone[0].ps_total_cost,
    subcontractorId:isOldMileStone[0].ps_subcontractor_id,
    isTradesmenInspection:isOldMileStone[0].milestones[0].psm_tradesmen_inspection==="1",
  })
  setSubContractorMilestones(
    isOldMileStone[0].milestones
      .sort((a, b) => a.psm_id - b.psm_id) // Sort by psm_id in ascending order
      .map(d => ({
        isTownInspected: d.psm_is_town_inspection === "1",
        milestoneName: d.psm_name,
      }))
  );
}else{
  setSubcontractors(defaultSubcontractors)
  setSubContractorMilestones(defaultSubContractorMilestones)
}
}
  },[subContracterID,projectSubContractorsList])
    return <Modal
      visible={modalVisible}
      transparent={true} // Make the background transparent
      animationType="slide" // Optional: Adds a slide-in animation
      onRequestClose={closeModal} // Close modal when back button is pressed (Android)
    >
      <View style={style.modalContainer}>
        {/* Scrollable Modal Content */}
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
      <LocalText style={style.modalTitle}>Milestones</LocalText>
<TouchableOpacity                 onPress={closeModal}>
    <Ionicons name={'close'} color={'white'}  size={24}/>
</TouchableOpacity>
      </View>
          <ScrollView    style={{ flex: 1, padding: 10 }}
            keyboardShouldPersistTaps="always" // Set to "always"
            contentContainerStyle={{ paddingBottom: 50 ,
            
            paddingTop:10,
        }}>
            <View>
            <Card style={[style.paperCard,style.elevatedCard]}>
<Card.Content>
           <Text style={{...style.description,fontSize:16}}>
            {t("Total Subcontractor cost (if known)")}
           

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
                <TextInput
                  style={style.inputEditable}
              value={subcontractors.totalCost}
keyboardType="number-pad"
                  onChangeText={(t)=>{
                  setSubcontractors(s=>{
                    return{
                        ...s,
                        totalCost:t
                    }
                  })
                  }}
                  mode="outlined"
                ></TextInput>

<View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:"space-between"
            }}>
                <LocalText style={{...style.description}}>
                Tradesman inspection required

         
         </LocalText>
            <Switch
                                value={subcontractors.isTradesmenInspection}
                                onValueChange={(t)=>{
setSubcontractors(p=>{
    return {
        ...p,
        isTradesmenInspection:t
    }
})
                                }}
                              />
            </View>
                            

        <Text style={{...style.description,marginTop:20,fontSize:16}}>
       {t("Name of Milestone 1")} 
           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>
                <TextInput
                  
                  style={style.inputEditable}
                  mode="outlined"
                  value={subContractorMilestones[0].milestoneName}

                  onChangeText={(t)=>{
                setSubContractorMilestones(prevData =>{
                 const data = prevData.map((p,index)=>{
                    if(index===0){
                        return {
                            ...p,
                            milestoneName:t
                        }
                    }else{
                        return p
                    }
                 })
                 return data

                })
                  }}
                ></TextInput>
        

           
            <View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:"space-between"
            }}>
                <LocalText style={{...style.description}}>
Town inspection waived

         
         </LocalText>
            <Switch
                                value={subContractorMilestones[0].isTownInspected}
                                onValueChange={(value) => {
                                    setSubContractorMilestones(prevData =>{
                                        const data = prevData.map((p,index)=>{
                                           if(index===0){
                                               return {
                                                   ...p,
                                                   isTownInspected:value
                                               }
                                           }else{
                                               return p
                                           }
                                        })
                                        return data
                       
                                       })
                                }}
                              />
            </View>
     
                            
        
        <Text style={{...style.description,marginTop:20,fontSize:16}}>
{t("Name of Milestone 2")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

                <TextInput
                      value={subContractorMilestones[1].milestoneName}

                      onChangeText={(t)=>{
                    setSubContractorMilestones(prevData =>{
                     const data = prevData.map((p,index)=>{
                        if(index===1){
                            return {
                                ...p,
                                milestoneName:t
                            }
                        }else{
                            return p
                        }
                     })
                     return data
    
                    })
                      }}
                 
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>

<View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:"space-between"
            }}>
                <LocalText style={{...style.description}}>
Town inspection waived

         
         </LocalText>
            <Switch
                                            value={subContractorMilestones[1].isTownInspected}
                                            onValueChange={(value) => {
                                                setSubContractorMilestones(prevData =>{
                                                    const data = prevData.map((p,index)=>{
                                                       if(index===1){
                                                           return {
                                                               ...p,
                                                               isTownInspected:value
                                                           }
                                                       }else{
                                                           return p
                                                       }
                                                    })
                                                    return data
                                   
                                                   })
                                            }}
                              />
            </View>
                            
        
<Text style={{...style.description,marginTop:20,fontSize:16}}>
  {t("Name of Milestone 3")}

           <Text style={{
            color:'red',
            marginLeft:1
           }}>
            *
         </Text>
         </Text>

                <TextInput
                value={subContractorMilestones[2].milestoneName}

                onChangeText={(t)=>{
              setSubContractorMilestones(prevData =>{
               const data = prevData.map((p,index)=>{
                  if(index===2){
                      return {
                          ...p,
                          milestoneName:t
                      }
                  }else{
                      return p
                  }
               })
               return data

              })
                }}
                 
                  style={style.inputEditable}
                  mode="outlined"
                ></TextInput>

<View style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:"space-between"
            }}>
                <LocalText style={{...style.description}}>
Town inspection waived

         
         </LocalText>
            <Switch
                                             value={subContractorMilestones[2].isTownInspected}
                                             onValueChange={(value) => {
                                                 setSubContractorMilestones(prevData =>{
                                                     const data = prevData.map((p,index)=>{
                                                        if(index===2){
                                                            return {
                                                                ...p,
                                                                isTownInspected:value
                                                            }
                                                        }else{
                                                            return p
                                                        }
                                                     })
                                                     return data
                                    
                                                    })
                                             }}
                              />
            </View>
                            
        

     
              </Card.Content>
              </Card>
     
     <LocalText style={{
        color:'red'
     }}>
        {err}
   </LocalText>
          
              <TouchableOpacity
                style={style.submitButton} // Add styles for your submit button
                onPress={handleCreatMileStone}
              >
                <LocalText style={{
                    color:'white',
                    fontSize:15,
                    fontWeight:700
                }}>Submit</LocalText>
              </TouchableOpacity>
            </View>
      
          </ScrollView>
        </View>
      </View>
    </Modal>;
  }
  const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Optional: semi-transparent background
    justifyContent:"center"
      },
      submitButton:{
        backgroundColor: "#3762EA", // Green background
        height: 50, // Fixed height
       flex:1,
        borderRadius: 5, // Rounded corners
        justifyContent: "center", // Center text vertically
        alignItems: "center", // Center text horizontally
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3, // Slight elevation for depth
        marginTop: 3, // Space around the button
      
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        height:height-50,
        overflow:'hidden'
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color:"white"
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
   
      inputEditable: {
        marginBottom: 15,
        backgroundColor: "white",
        color: 'black'
      },
      description: {
        fontSize: 14,
        color: "black",
        fontWeight:600,
        marginBottom: 15,
      },
      container: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
      },
  })
  export default CreateSubMileStone