import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { primaryColor } from '../comman';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectContractId } from '../redux/contract/reducer';
import LocalText from './LocalText';
const steps = [
  { title: 'Project', icon: 'file-document-outline',path:"ContractFillPage" },
  { title: 'Milestones', icon: 'flag-checkered' ,path:"Milestones"},
  { title: 'Subcontractor', icon: 'account-multiple',path:"Details" },

  { title: 'Homeowner', icon: 'home-account',path:"Homeowner" },
  { title: 'Finish', icon: 'check-circle-outline' ,path:"Finish"},
];

const StepIndicator = ({ currentStep }) => {
    const navigation = useNavigation()
    const projectId = useSelector(selectContractId)
    console.log("hgfhyfh",projectId)
  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <TouchableOpacity onPress={()=>{
            if(projectId){
                navigation.navigate(step.path)

            }
        }} key={index} style={styles.stepContainer}>
          <View
            style={[
              styles.iconContainer,
              index <= currentStep ? styles.activeIcon : styles.inactiveIcon,
            ]}
          >
            <MaterialCommunityIcons
              name={step.icon}
              size={20}
            
              color={index <= currentStep ? '#ffffff' : '#aaaaaa'}
            />
          </View>
          <LocalText
            style={[
              styles.label,
              index <= currentStep ? styles.activeLabel : styles.inactiveLabel,
            ]}
          >
            {step.title}
        </LocalText>
          {index < steps.length - 1 && (
            <View
              style={[
                styles.separator,

                index < currentStep ? styles.activeSeparator : styles.inactiveSeparator,
              ]}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    borderWidth: 2,
    zIndex:200,
  },
  activeIcon: {
    backgroundColor: '#325573',
    borderColor: '#325573',
  },
  inactiveIcon: {
    backgroundColor: '#ffffff',
    borderColor: '#aaaaaa',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  activeLabel: {
    color: primaryColor,
  },
  inactiveLabel: {
    color: '#aaaaaa',
  },
  separator: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: '100%',
    height: 2,
    zIndex:0

  },
  activeSeparator: {
    backgroundColor: primaryColor,
  },
  inactiveSeparator: {
    backgroundColor: '#aaaaaa',
  },
});

export default StepIndicator;
