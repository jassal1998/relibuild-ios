import React from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { deepBlue, primaryColor } from '../utility/comman';
import LocalText from '../utility/comp/LocalText';
const TabsSelector = ({ setActiveTab, activeTab }) => {
  const tabs = [
    // { label: 'Packages', key: 'Packages' },
    { label: 'Personal Details', key: 'Personal Details' },
    // { label: 'Company Details', key: 'Company Details' },
    // { label: 'Financials', key: 'Financials' },
    // { label: 'Recent Work', key: 'Recent Work' },
    // { label: "Portfolio", key: 'Portfolio' },
  ];

const renderItem = ({item}) =>{
  return (
    <Pressable
    key={item.key}
    onPress={() => setActiveTab(item.key)}
    style={[
      styles.tab,
      activeTab === item.key && styles.activeTab,
    ]}
  >
    <LocalText
      style={[
        styles.tabText,
        activeTab === item.key && styles.activeTabText,
      ]}
    >
      {item.label}
  </LocalText>
  </Pressable>
  )}



  return (
    <View style={styles.container}>
      <FlatList horizontal={true} data={tabs} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:2,
borderBottomWidth:1,
borderColor:'gray',
shadowOffset:'2',
width:'100%',
paddingBottom:10,
  },
  tab: {
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor:'white',
    flex:1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor:'#325573',
  },
  tabText: {
    fontSize: 12,
    paddingHorizontal:8
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TabsSelector;
