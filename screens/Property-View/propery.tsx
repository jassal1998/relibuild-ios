import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card, Icon } from "@rneui/themed";
import Video from 'react-native-video';

import { useNavigation } from "@react-navigation/native";
import Toast ,{ToastRef} from 'react-native-toast-message';


const { height: screenHeight } = Dimensions.get("window");
const { width } = Dimensions.get('window'); 





const PropertyView = ({ route }:{route:any}) => {
  const { data } = route.params;
  const [isLoading, setIsLoading] = useState(false); 
  const [imagesLoaded, setImagesLoaded] = useState(0); 
  const [videoLoaded, setVideoLoaded] = useState(false); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false);
  const videoRef = useRef<any>(null);
  const navigation = useNavigation();

  let property = data;
  const images = JSON.parse(property.rep_images);
  const videos = JSON.parse(property.rep_video);
  const additionalFeatures = JSON.parse(property.rep_additional_features);

  const totalImages = images.length;
  

  // Modal form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: `I'm interested in [ ${property.rep_title} ]`,
  });
    const toastRef = useRef<ToastRef>(null);

  
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (videoRef.current) {
        videoRef.current.pause(); 
      }
    });
    return unsubscribe;
  }, [navigation]);

  
  const handleImageLoaded = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  
  const handleVideoLoaded = () => {
    setVideoLoaded(true); 
  };

  useEffect(() => {
  
    if (imagesLoaded === totalImages || videoLoaded) {
      setIsLoading(false);
    }
  }, [imagesLoaded, videoLoaded, totalImages]);

  const handleGetQuote = () => {
    setIsModalVisible(true);
  };
  

   const handleFormSubmit = () => {
      Toast.show({
      type: 'success', 
      position: "bottom", 
      text1: 'Success', 
      text2: 'Your request has been submitted successfully!', 
      visibilityTime: 3000, 
      autoHide: true,
      bottomOffset:100
    });

    
    setIsModalVisible(false);
    setIsThankYouModalVisible(true); 
  };
 
  
  return (
    <>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!isLoading && (
        <>
          <ScrollView style={styles.container}>
            <View style={styles.cardContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{flex: 1}}>
                {images.map((image: any, index: any) => (
                  <Image
                    key={index}
                    source={{uri: image}}
                    style={styles.propertyImage}
                    onLoad={handleImageLoaded}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{property.rep_title}</Text>
              <Text style={styles.description}>{property.rep_description}</Text>
              <Text style={styles.price}>Price: ${property.rep_price}</Text>
              <View style={styles.detailsContainer2}>
                <View style={styles.infoRow}>
                  <View style={styles.detailCard}>
                    <Icon name="bed" type="material" size={30} />
                    <Text style={styles.detailText} allowFontScaling={false}>
                      {property.rep_bedroom} Bedrooms
                    </Text>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.detailCard}>
                    <Icon name="bathtub" type="material" size={30} />
                    <Text style={styles.detailText} allowFontScaling={false}>
                      {property.rep_bathroom} Bathrooms
                    </Text>
                  </View>
                </View>
                <View style={styles.infoRow}>
                  <View style={styles.detailCard}>
                    <Icon name="location-on" type="material" size={30} />
                    <Text style={styles.detailText} allowFontScaling={false}>
                      {/* {property.rep_street_address},  */}
                      {property.rep_state},{property.rep_country}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.featuresTitle}>Additional Features</Text>
              {additionalFeatures && Array.isArray(additionalFeatures) ? (
                additionalFeatures.map((feature, index) => (
                  <Text key={index} style={styles.feature}>
                    {feature}
                  </Text>
                ))
              ) : (
                <Text>No additional features available</Text>
              )}

              {videos.length > 0 && (
                <Video
                  ref={videoRef}
                  source={{uri: videos[0]}}
                  paused={false}
                  controls={true}
                  style={{width: '100%', height: 200}}
                  onLoad={handleVideoLoaded}
                />
              )}
            </View>

            <Card containerStyle={styles.ownerCard}>
              <Card.Title>Published By</Card.Title>
              <Card.Divider />
              <View style={styles.ownerInfo}>
                <Image
                  source={{uri: property.ua_profile_pic}}
                  style={styles.ownerImage}
                  onLoad={handleImageLoaded} // Call handleImageLoaded after profile pic loads
                />
                <View>
                  <Text style={styles.ownerName}>
                    {property.user_first_name} {property.user_last_name}
                  </Text>
                </View>
              </View>
            </Card>

            <View style={{height: 100}} />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getQuoteButton}
              onPress={handleGetQuote}>
              <Text style={styles.getQuoteText}>Get Quote</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for Get Quote Form */}
          <View>
            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.modalContainer}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Request a Quote</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Your Name"
                        value={formData.name}
                        onChangeText={text =>
                          setFormData({...formData, name: text})
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={formData.phone}
                        keyboardType="phone-pad"
                        onChangeText={text =>
                          setFormData({...formData, phone: text})
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={formData.email}
                        keyboardType="email-address"
                        onChangeText={text =>
                          setFormData({...formData, email: text})
                        }
                      />
                      <TextInput
                        style={styles.textArea}
                        placeholder="I'm interested in..."
                        value={formData.message}
                        multiline
                        numberOfLines={4}
                        onChangeText={text =>
                          setFormData({...formData, message: text})
                        }
                      />
                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleFormSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsModalVisible(false)}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <View>
              <Toast />
            </View>
          </View>
          {/* Thank You Modal */}
          <View>
            <Modal
              visible={isThankYouModalVisible}
              animationType="fade"
              transparent={true}>
              <View style={styles.thankYouModalContainer}>
                <View style={styles.thankYouModalContent}>
                  <Text style={styles.thankYouModalText}>
                    Thank you for your interest! We have captured your details
                    and will share them with our sales team.
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsThankYouModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  propertyImage: {
   width: width,
    height: 200,
    borderRadius: 30,
    resizeMode:'cover',
    marginHorizontal: 10
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    color: "#000",
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  video: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  ownerCard: {
    marginTop: 20,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  getQuoteButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#2f5272",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  getQuoteText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#2f5272",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  closeButton: {
    backgroundColor: "#F4511E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
    width: "100%",
  },
  closeButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  thankYouModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  thankYouModalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  thankYouModalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
   detailCard: {
     width: 100,                 
  height: 100,              
  borderRadius: 10,
  backgroundColor: "#ffffff",  
  alignItems: "center",       
  padding: 10,
  elevation: 10,              
  shadowColor: "#000",         
  shadowOffset: { width: 0, height: 5 },  
  shadowOpacity: 0.3,                     
  shadowRadius: 10,                       
  },
  detailsContainer2: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
detailText: {
    marginTop: 8,
  
    fontSize: 12,
    textAlign: "center",
    color: "#325573",
    fontWeight: "600",
  },

   cardContainer: {
    // width: '100%', // Full width of the screen
    // borderRadius: 10, // Optional: Add rounded corners to the card
    // overflow: 'hidden', // To make sure the image doesn't overflow
    //  marginHorizontal: 10,
    // backgroundColor: 'white', // Optional: Set background color for card
    // marginBottom: 20, // Optional: Add some spacing below the card
  },


});

export default PropertyView;
