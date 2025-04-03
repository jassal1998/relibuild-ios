import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, TextInput, Card} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {
  LocalButton,
  apiUrl,
  getUserId,
  grayColor,
} from '../contract/utility/comman';
import {selectContractId} from '../contract/utility/redux/contract/reducer';
import {
  selectToken,
  setSpinnerLoading,
} from '../contract/utility/redux/profile';
import HomeHeader from '../contract/utility/comp/header';
import StepIndicator from '../contract/utility/comp/stepper';
// import { primaryColor } from "../leadsDashboard/jobCard";
import LocalText from '../contract/utility/comp/LocalText';
import {t} from 'i18next';
import LocalTextInput from '../contract/utility/comp/localTextInput';
import {useTranslation} from 'react-i18next';
const {width} = Dimensions.get('screen');

const Milestones = ({navigation, route}) => {
  const [autoFill, setAutoFill] = useState(false);

  const contractID = useSelector(selectContractId);
  console.log('fkefd', contractID);
  const [milestones, setMilestones] = useState([]);
  const [openBox, setOpenBox] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector(selectToken);

  const fetchDataMilestone = async () => {
    try {
      console.log('Fetching project for contractID:', contractID);
      if (!contractID) {
        console.error('contractID is missing');
        setError('Invalid contract ID');
        setLoading(false);
        return;
      }
      const response = await axios.get(

        `${apiUrl}/contract/get-project/${contractID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("api",apiUrl)
      console.log(' Full API Response:', response.data); 
      console.log('dffggg', token);
      console.log(' contractID:', contractID);
      const mileStones = response.data?.data?.project?.milestones || [];

      console.log('dfff', mileStones);
      setAutoFill(
        response.data?.data?.project?.p_escrow === 1 ||
          response.data?.data?.project?.p_escrow === '0',
      );
      setTotalCost(response.data.data.project.p_cost);
  console.log("bhdjkj",response)
      if (mileStones[0]) {
        setMilestones(
          mileStones.map(m => {
            return {
              name: m.pm_name,
              percentage: m.pm_percentage,
              id: m.pm_id,
            };
          }),
        );
      } else {
        if (autoFill) {
          setMilestones([
            {name: '', percentage: '20'},
            {name: '', percentage: '50'},
            {name: '', percentage: '30'},
            {name: '', percentage: '10'},
          ]);
        } else {
          setMilestones([{name: '', percentage: ''}]);
        }
      }
      setLoading(false);
    } catch (error) {
      setError(`No project found for contract ID: ${contractID}`);
      console.warn(` No project found for contractID: ${contractID}`);
      console.error('Error fetching milestones:', error.message);
      setError(`Error fetching milestones: ${error.message}`);
      setLoading(false);
    }
  };
  const userid = token ? getUserId(token) : '';
  console.log('usewr', userid,token);
  useEffect(() => {
    if (contractID && token) {
      fetchDataMilestone();
    }
  }, [contractID, token]);
  console.log('dfgddf', token);
  console.log('dsssc', contractID);

  const handleInputChange = (index, field, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    console.log("vgdhhd",updatedMilestones)
    if (field === 'percentage') {
      const totalPercentage = milestones.reduce(
        (total, current) => total + Number(current.percentage), // Callback to accumulate percentages
        0, // Initial value for total
      );
      const total = Number(totalPercentage);
      if (total > 100) {
        setError('More then 100% ');
        updatedMilestones[index][field] = 0;
        setMilestones(updatedMilestones);

        setTimeout(() => {
          setError('');
        }, 4000);
      } else {
        setMilestones(updatedMilestones);
      }
    } else {
      setMilestones(updatedMilestones);
    }
  };

  const addMilestoneInput = () => {
    setMilestones(prev => [...prev, {name: '', percentage: ''}]);
  };

  const removeMilestoneInput = index => {
    setMilestones(prev => prev.filter((_, i) => i !== index));
  };
  const {t} = useTranslation();
  const handleSubmit = () => {
    handleCreteMilstone().then(() => {
      Toast.show({
        type: t('success'),
        text1: t('Milestone Created'),
      });
      navigation.navigate('Details');
    });
  };

  const handleCreteMilstone = async () => {
    setSaveLoading(true);
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${apiUrl}/contract/create-milestone`,
          {
            milestones: milestones,
            projectId: contractID,
            totalCost: totalCost,
            userId: userid,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        
        .then(o => {
          if (o.data.success) {
            resolve();
          } else {
            reject('');
          }
        })
        .catch(() => {
          reject();
        })
        .finally(() => {
          setSaveLoading(false);
        });
    });
  };

  const handleTotalCostChange = input => {
    if (/^\d*\.?\d*$/.test(input)) {
      setTotalCost(input);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* <HomeHeader
        title={"Create Contract"}
        subTitle={"Add Milestones"}

      replace={'Create'}
      /> */}
      <StepIndicator currentStep={1} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.form}>
          <Card style={[styles.card, styles.elevatedCard]}>
            <Card.Content>
              <LocalText style={styles.sectionTitle}>Add Milestones</LocalText>
              <LocalText style={styles.description}>
                Total cost (i.e. your part of the total project cost)*
              </LocalText>
              <TextInput
                label="Total cost"
                mode="outlined"
                style={styles.input}
                keyboardType="numeric"
                value={totalCost}
                onChangeText={handleTotalCostChange}
                editable={false}
                disabled={true}
              />
              <Text style={styles.description}>
                {t(' Please indicate names of your')} {'\n'} {t('milestones')}
              </Text>
            </Card.Content>
          </Card>

          {milestones.map((milestone, index) => (
            <Card key={index} style={styles.card}>
              <View>
                <TouchableOpacity
                  onPress={() => setOpenBox(openBox === index ? null : index)}>
                  <View style={styles.arrow1}>
                    <Text style={styles.milestoneText}>
                      {t('Milestones')} {index + 1}
                    </Text>
                  </View>
                </TouchableOpacity>
                {openBox === index && (
                  <View style={styles.box}>
                    <TextInput
                      label="Name of Milestone"
                      mode="outlined"
                      style={styles.input}
                      value={milestone.name}
                      onChangeText={text =>
                        handleInputChange(index, 'name', text)
                      }
                      editable={false}
                      disabled={true}
                    />
                    <TextInput
                      label="Percentage of your fee"
                      mode="outlined"
                      style={styles.input}
                      editable={!autoFill}
                      onChangeText={text =>
                        handleInputChange(index, 'percentage', text)
                      }
                      value={milestone.percentage}
                      disabled={true}
                    />
                    <Text
                      style={{
                        color: 'red',
                      }}>
                      {t(error)}
                    </Text>
                    {/* {!autoFill && (
                      <TouchableOpacity
                        style={styles.removebutton}
                        onPress={() => removeMilestoneInput(index)}>
                        <LocalText style={styles.removeButtonText}>
                          Remove Milestone
                        </LocalText>
                      </TouchableOpacity>
                    )} */}
                  </View>
                )}
              </View>
            </Card>
          ))}

          {/* {!autoFill && (
            <LocalButton
              disabled={true}
              onPress={addMilestoneInput}
              title={'Add Milestone'}
              bg={'#3b8f9d'}
              color={'white'}
            />
          )} */}
          <View
            style={{
              marginTop: 10,
            }}>
            <LocalButton
              loading={saveLoading}
              disabled={saveLoading}
              onPress={() => navigation.navigate('Details')}
              title={'Next'}
              bg={'#325573'}
              color={'white'}
            />
          </View>

          <View
            style={{
              marginTop: 10,
            }}>
            <LocalButton
              onPress={() => {
                navigation.navigate('ContractFillPage');
              }}
              title={'Back'}
              bg={grayColor}
              color={'blck'}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 20,
  },
  form: {
    padding: 20,
    paddingBottom: 200,
    backgroundColor: 'white',
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: 'black',
  },
  arrow1: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 45,
    backgroundColor: '#E1E7FC',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  milestoneText: {
    fontSize: 15,
    color: '#3258D3',
    alignSelf: 'center',
    fontWeight: 700,
  },
  box: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  removebutton: {
    flexDirection: 'row',
    backgroundColor: '#CE4647',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
  rubbish: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: '#3b8f9d',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    display: 'fles',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  BackButton: {
    marginTop: 20,
    backgroundColor: '#cccccc', // Red for undo/back
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
  },
  backButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 600,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Milestones;
