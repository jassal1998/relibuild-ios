import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LocalButton, grayColor, grayColor2, primaryColor } from '../contract/utility/comman';
import Feather from 'react-native-vector-icons/Feather'
import LocalText from '../contract/utility/comp/LocalText';
const PackageCard = ({ title, price, frequency, saveText, features, buttonText, onButtonPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <LocalText style={styles.title}>{title}</LocalText>
        {saveText && (
          <View style={styles.saveTag}>
            <LocalText style={styles.saveText}>{saveText}</LocalText>
          </View>
        )}
      </View>
      <LocalText style={styles.price}>{price}</LocalText>
      <LocalText style={styles.frequency}>{frequency}</LocalText>
      <View style={styles.features}>
        {features.map((feature, index) => (
          <LocalText key={index} style={styles.feature}>
            • {feature}
        </LocalText>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        <LocalText style={styles.buttonText}>{buttonText}</LocalText>
      </TouchableOpacity>
    </View>
  );
};

const ProfilePackageCard = ({ subTitle,title,bg, price, frequency, saveText, features, buttonText, onButtonPress }) => {
  return (
    <View style={styles.card2}>
      <View style={styles.header2}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          flex:1
        }}>
        <View style={{
          backgroundColor:'#E0F7EA',
        height:40,
        width:40,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
        }}>
<Feather name={'send'} size={20} color={'#2DCB72'}/>
        </View>
        <View style={{
          marginLeft:10
        }}>
        <LocalText style={styles.title2}>{title}</LocalText>
<LocalText style={{
  color:'gray',
  fontSize:13,
}}>
  {subTitle}
</LocalText>
        </View>
 
        </View>
       
        {saveText && (
          <View style={styles.saveTag}>
            <LocalText style={styles.saveText}>{saveText}</LocalText>
          </View>
        )}
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:20
      }}>

<LocalText style={styles.price}>{price}</LocalText>
      <LocalText style={styles.frequency}>{frequency}</LocalText>
      
      </View>
      
      <View style={styles.features}>
        {features.map((feature, index) => (
         
         <View key={index} style={{
          display:'flex',
          flexDirection:"row",
          paddingBottom:8,
          alignItems:'center'
         }}>
                 <LocalText style={{
            color:primaryColor,
            marginRight:8,
            fontWeight:900,
            fontSize:20
          }}>
          • 
        </LocalText>
          <LocalText key={index} style={styles.feature}>
   
   {feature}
</LocalText>
          </View>
       
        ))}
      </View>

      <LocalButton bg={bg} color={'white'} title={buttonText} onPress={onButtonPress}/>
    
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  card2: {
    backgroundColor:grayColor2,
    borderRadius: 7,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent:'space-between'
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  saveTag: {
    backgroundColor: '#FF6347',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  saveText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  frequency: {
    fontSize: 14,
    color: '#555',
    marginLeft:5,
    paddingTop:5
  },
  features: {
    marginBottom: 16,
  },
  feature: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export {PackageCard,ProfilePackageCard} ;
