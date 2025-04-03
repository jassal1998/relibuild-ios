import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import logo from '../../utility/img/tlogo.png'
import LocalText from '../../utility/comp/LocalText';
const SplashScreen = () => {
//   useEffect(() => {
//     // Navigate to Home screen after 3 seconds
//     const timer = setTimeout(() => {
//       navigation.replace('Home'); // Replace 'Home' with your next screen
//     }, 3000);
//     return () => clearTimeout(timer); // Cleanup
//   }, []);

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={'#392FE3'} />
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
<Image source={require('../../utility/img/tlogo.png')} style={{
height:90,
width:90
}}/>
          </View>
        </View>
      <LocalText style={styles.text}>The Tradesmens Collective</LocalText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#392FE3', // Change the color to match your branding
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3B33E4',
  },

  text: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginTop:30
  },
});

export default SplashScreen;
