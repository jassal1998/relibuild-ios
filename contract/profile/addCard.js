import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, Alert } from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import { LocalButton, grayColor, primaryColor } from '../utility/comp/LocalText';

import { useSelector } from 'react-redux';
import { selectUserDetails } from '../utility/redux/profile';
import LocalText from '../utility/comp/LocalText';
const FinancialsScreen = () => {
  const { createToken } = useStripe();
  const [cardDetails, setCardDetails] = useState({});
  const [holderName, setHolderName] = useState('');
  const [error, setError] = useState('');
 const [email,setEmail] = useState('')
 const userDetails = useSelector(selectUserDetails)
  // Handle Card Submit
  const handleSubmit = async () => {
    if (!cardDetails.complete || !holderName) {
      setError('Please fill in all valid card details.');
      setTimeout(() => setError(''), 4000);
      return;
    }

    try {
      // Create a token with card details
      const { error, token } = await createToken({
        type: 'Card',
        name: holderName,
      });

      if (error) {
        console.error('Stripe Error:', error.message);
        setError(error.message);
      } else {
        console.log('Token created:', token);
      }
    } catch (err) {
      console.error('Error submitting card:', err);
      setError('Something went wrong. Please try again.');
    }



  };

  const handleReset = () => {
    setHolderName('');
    setError('');
  };

  useEffect(()=>{
if(userDetails){
  setEmail(userDetails.user_email)
}
  },[userDetails])
  return (
    <StripeProvider publishableKey="pk_live_51K6MBVAPzdvW0Lalca5t7QfATaFDZ3hPgoOc6E3A5eYC8Yyc7lNZutsjQGdv5Cxj2YCfjLju65W2gtyWeh5wdfFL00UFyNn7Xz">
      <View style={styles.container}>
        {/* <LocalText style={styles.header}>Add Card Details</LocalText> */}

        {/* Error Message */}
        {error ? <LocalText style={styles.errorText}>{error}</LocalText> : null}

        <LocalText style={styles.label}>Card Details</LocalText>

        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            width: '100%',
            height: 50,
            borderColor:'gray',
            borderWidth:1,
            borderRadius:4
          }}
          style={{
            width: '100%',
            height: 50,
            marginTop:10,
          }}
          
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('Focused field:', focusedField);
          }}
        />

        {/* Holder Name Input */}
        <View style={styles.inputContainer}>
          <LocalText style={styles.label}>Card Holder Name</LocalText>
          <TextInput
            placeholderTextColor="gray"
            value={holderName}
            mode='outlined'
            onChangeText={setHolderName}
            style={styles.textInput}
          />
        </View>

        <View style={styles.inputContainer}>
          <LocalText style={styles.label}>Email</LocalText>
          <TextInput
            placeholderTextColor="gray"
            value={email}
            mode='outlined'
            onChangeText={setEmail}
            style={styles.textInput}
          />
        </View>

        {/* Submit and Reset Buttons */}
        <LocalButton onPress={handleSubmit} title={'Add Card'} color={'white'} marginTop={30} bg={primaryColor} />
        <LocalButton onPress={handleReset} title={'Reset'} color={'black'} marginTop={20} bg={grayColor} />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    paddingBottom:140
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color:'black'
  },
  textInput: {
    height: 50,
    fontSize: 16,
    marginTop: 5,
    backgroundColor:'white',
    color:'black'
  },
  cardField: {
    width: '100%',
    height: 50,

    marginVertical: 10,
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
});

export default FinancialsScreen;
