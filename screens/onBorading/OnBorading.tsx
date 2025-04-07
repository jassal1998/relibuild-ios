import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({navigation}:{navigation:any}) {
  const [isChecked, setIsChecked] = useState(false);
const swiperRef = useRef<any>(null);


useEffect(() => {
  const checkOnboardingStatus = async () => {
    try {
      const hasCompletedOnboarding = await AsyncStorage.getItem("hasCompletedOnboarding");
      const token = await AsyncStorage.getItem("authUser"); // Check for token

      console.log("Onboarding Completed:", hasCompletedOnboarding);
      console.log("Token:", token);


      if (!token) {
        navigation.navigate("Welcome"); // If no token, navigate to Welcome
      } else if (hasCompletedOnboarding === "true") {
        // If onboarding is completed and token exists, navigate to Home
        navigation.navigate("Home");
      } else {
        // Show onboarding if the user hasn't completed it yet
        setIsChecked(true);
      }
    } catch (error) {
      console.error("Error checking onboarding status:", error);
      setIsChecked(true);
    }
  };

  checkOnboardingStatus();
}, [navigation]);

if (!isChecked) {
  return null; // Wait until onboarding/check is done
}






  const handleSkip = () => {
    navigation.navigate("Home");
  };

  const handleNext = (index:any) => {
    if (index < 2) {
      swiperRef.current.scrollBy(1); // Move to the next slide
    } else {
      handleSkip(); // On the last slide, go to the main screen
    }
  };


  const handleGetStarted = async () => {
    try {
    
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
  
    
      const storedValue = await AsyncStorage.getItem("hasCompletedOnboarding");
      console.log("Stored onboarding value:", storedValue);
  
     
      const token = await AsyncStorage.getItem("userToken");
  
      if (token) {
      
        navigation.navigate("Home");
      } else {
       
        navigation.navigate("Welcome");
      }
    } catch (error) {
      console.error("Error during onboarding process:", error);
    }
  };



  return (
    <Swiper
      ref={swiperRef}
      loop={false}
      activeDotColor="#000"
      dotColor="#ccc"
      paginationStyle={{ bottom: 50 }}
      showsPagination={true}
    >
      {/* Slide 1 */}
       <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/gdd.jpg')} // Change to your image
        style={styles.backgroundImage}
      >
        
       
        <View style={styles.textContainer}>
          

          <Text style={styles.text}>Contractor Service</Text>
          <Text style={{color:'white',textAlign:'center',fontSize:16,marginTop:10,marginBottom:10}}>
            Quickly Find Reliable Experts for Repairs, Renovations, and Small Projects!
</Text>
<View style={styles.buttonContainer}>
           <TouchableOpacity onPress={() => handleNext(0)} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
        </View>
       
      </ImageBackground>
    </View>

      {/* Slide 2 */}
     <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/realestate.jpg')} // Change to your image
        style={styles.backgroundImage}
      >   
        <View style={styles.textContainer}>
          

          <Text style={styles.text}>Real Estate</Text>
          <Text style={{color:'white',textAlign:'center',fontSize:16,marginTop:10,marginBottom:10}}>
        Explore a Wide Range of Properties and Find Your Perfect Home Effortlessly!

              </Text>
<View style={styles.buttonContainer}>
           <TouchableOpacity onPress={() => handleNext(0)} style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View></View>
       
      </ImageBackground>
    </View>

      {/* Slide 3 */}
     <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/escrow.jpg')} // Change to your image
        style={styles.backgroundImage}
      >   
        <View style={styles.textContainer}>
          

          <Text style={styles.text}>Escrow Services</Text>
          <Text style={{color:'white',textAlign:'center',fontSize:16,marginTop:10,marginBottom:10}}>
       Secure High-Budget Projects Over $50,000 with Our Trusted Escrow Services!

              </Text>
<View style={styles.buttonContainer}>
           <TouchableOpacity onPress={() => handleGetStarted()} style={styles.button}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View></View>
       
      </ImageBackground>
    </View>
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor:"#2f5272"
  },
  text: {
     fontSize: 20,                     // Set font size
    fontWeight: 'bold',               // Set font weight
    color: 'white',                 
    textAlign: 'center',              // Center align the text
    textShadowColor: '#000', 
    paddingTop:10,         // Shadow color
    textShadowOffset: {               // Shadow offset for depth effect
      width: 2,
      height: 2,
    },
   
   textShadowRadius: 5,              // Shadow radius for soft edges
    
  },
  buttonContainer: {
    marginBottom:10,
    width:'100%',
    display:'flex',
    alignSelf:'center',
   flexDirection: 'row',           // Arrange buttons in a row
    justifyContent: 'center', // Space out buttons
    marginHorizontal: 20,    
  },
  button: {
   backgroundColor: 'rgba(255,255,255, 0.6)',  // Transparent background
   maxWidth:250,
   width:'100%',
    borderWidth: 0,           // Border for button
    borderColor: '#fff',         // Border color (can be changed)
    paddingVertical: 12,            // Vertical padding
    paddingHorizontal: 20,          // Horizontal padding
    borderRadius: 30,               // Rounded corners
    marginVertical: 10,             // Margin for spacing between buttons vertically
    alignItems: 'center',           // Center text inside the button
    justifyContent: 'center',       // Center content vertically
   
  },
  buttonText: {
        color: '#2f5272',                   // Text color (same as border color)
    fontSize: 16,                       // Text size
    fontWeight: 'bold',                 // Bold text
    textAlign: 'center',  
  },
 container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end', // This aligns the content at the bottom
    alignItems: 'center', // Centers the content horizontally
    width: '100%',
    height: '100%',
  },
  animation: {
    width: '100%',
    height: 300,
  },
  overlay: {
    padding:10,
    width:'100%',
  
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  textContainer: {
    width:'100%',
    padding:5,
    position: 'absolute',
    bottom: 60, // Adjust as needed
    alignSelf: 'center',
  },
  // text: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   textAlign: 'center',
  //   textShadowColor: '#000',
  //   textShadowOffset: { width: 2, height: 2 },
  //   textShadowRadius: 5,
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginBottom: 30, // Adjust for spacing from the bottom
  //   marginHorizontal: 20,
  // },
  // button: {
  //   backgroundColor: 'transparent',
  //   borderWidth: 1,
  //   borderColor: '#3498db',
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   borderRadius: 30,
  //   marginVertical: 10,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // buttonText: {
  //   color: '#3498db',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },

});
