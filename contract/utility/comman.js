import axios from 'axios';
import Ionicons from'react-native-vector-icons/Ionicons'
import { Buffer } from 'buffer';
import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import LocalText from './comp/LocalText';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectToken } from './redux/profile';
export const baseUrl ='https://api.relibuild.com:3000'
export const primaryColor ="#1f57d6"
export const grayColor ="#d9dfdb"
export const orangeColor ="#e96904"
export const  blueColor2 = "#0091e7"
export const deepBlue ="#18202a"
export const grayColor2 = "#F7F7F7"
export const apiUrl = "https://api.relibuild.com:3000";









export const getUserId = (token) => {
    if(token){
        try {
            // Split the token into its parts
            const payloadBase64 = token.split('.')[1]; // Get the payload part of the token
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
            // Access userId from the payload
            return payload.userId; // Change `userId` to the key you're looking for
          } catch (error) {
            console.error("Invalid Token:", error);
            return null;
          }
    }else{
        return ""
    }
   
  };

  

  export const CallAPIPostPromise = (path, data, token, dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(`https://api.relibuild.com:3000${path}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}` ,
            }
          })
          .then((t) => {
            resolve(t);
          })
          .catch((error) => {
            // dispatch(setSpinnerLoading(false));
            console.log(error.response.data.error);
  
            if (error?.response?.data?.error?.name === "TokenExpiredError") {
        Alert.alert('Session expired','Please login again')
            } else {
             
              reject(error?.response?.data?.error?error?.response?.data?.error:error);
            }
          });
      } catch {
        reject("Try Catch");
      }
    });
  };

  export const CallApiPatchpromise = (path, data, token, dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .patch(`https://api.relibuild.com:3000${path}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}` ,
            }
          })
          .then((t) => {
            resolve(t);
          })
          .catch((error) => {
            // dispatch(setSpinnerLoading(false));
            console.log(error.response.data.error);
  
            if (error?.response?.data?.error?.name === "TokenExpiredError") {
        Alert.alert('Session expired','Please login again')
            } else {
             
              reject(error?.response?.data?.error);
            }
          });
      } catch {
        reject("Try Catch");
      }
    });
  };
  export const CallAPIPutPromise = (path, data, token, dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .put(`https://api.relibuild.com:3000${path}`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}` ,
            }
          })
          .then((t) => {
            resolve(t);
          })
          console.log("dsffffds",token)
          .catch((error) => {
            // dispatch(setSpinnerLoading(false));
            console.log(error);
            console.log(path)
  
            if (error.response.data.name === "TokenExpiredError") {
              // dispatch(setSessionExpired(true));
            } else {
             
              reject(error);
            }
          });
      } catch {
        reject("Try Catch");
      }
    });
  };



export const TwoButtonAlert = ({ details, setDetails }) => {
  return (
    <Modal transparent={true} visible={details.visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          {/* Icon */}
          {details.icon && (
            <View style={styles.iconContainer}>
              <Ionicons name={details.icon} size={40} color="black" />
            </View>
          )}

          {/* Title */}
          <Text style={styles.title}>{details.title}</Text>

          {/* Message */}
          <Text style={styles.message}>{details.message}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                details.onButton1Click && details.onButton1Click();
                setDetails({ ...details, visible: false });
              }}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>{details.button1Text}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                details.onButton2Click && details.onButton2Click();
                setDetails({ ...details, visible: false });
              }}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                {details.button2Text}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
  export const CallAPIGetPromise = (path,  token, dispatch) => {
  console.log(path)
    return new Promise((resolve, reject) => {
      try {
        axios
          .get(`https://api.relibuild.com:3000${path}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}` ,
            }
          })
          .then((t) => {
            resolve(t);
          })
          .catch((error) => {
            // dispatch(setSpinnerLoading(false));
            console.log(error);
  
            if (error.response.data.name === "TokenExpiredError") {
              // dispatch(setSessionExpired(true));
            } else {
             
              reject(error);
            }
          });
      } catch {
        reject("Try Catch");
      }
    });
  };
  export const CallAPIDeletePromise = (path,  token, dispatch) => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .delete(`https://api.relibuild.com:3000${path}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization:`Bearer ${token}` ,
            }
          })
          .then((t) => {
            resolve(t);
          })
          .catch((error) => {
            // dispatch(setSpinnerLoading(false));
            console.log(error);
  
            if (error.response.data.name === "TokenExpiredError") {
              // dispatch(setSessionExpired(true));
            } else {
             
              reject(error);
            }
          });
      } catch {
        reject("Try Catch");
      }
    });
  };
  export const getUserType = (token) => {
    if(token){
        try {
            // Split the token into its parts
            const payloadBase64 = token.split('.')[1]; // Get the payload part of the token
            // Decode from Base64
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
            // Access userId from the payload
            return payload.userType; // Change `userId` to the key you're looking for
          } catch (error) {
            console.error("Invalid Token:", error);
            return null;
          }
    }else{
        return ""
    }
   
  };

  export const isTokenExpired = (token) => {
    if (token) {
      try {
        // Split the token into its parts (header.payload.signature)
        const payloadBase64 = token.split('.')[1]; // Get the payload part of the token
  
        // Decode from Base64
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString('utf-8'));
  
        // Get the expiration time (exp is in seconds)
        const expTimestamp = payload.exp;
  
        // Get the current timestamp in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        // Check if the token is expired
        return currentTimestamp > expTimestamp;
      } catch (error) {
        console.error("Invalid Token:", error);
        return true; // If error occurs (e.g., invalid token), consider it expired
      }
    } else {
      return true; // If no token is provided, consider it expired
    }
  };

  export const LocalButton = (({onPress,border,padding,marginTop,loading,title,disabled,bg,color,}) =>{
return (

  <TouchableOpacity onPress={onPress}  disabled={disabled?true:false} style={{
    backgroundColor:bg,
    borderRadius:7,
    display:'flex',
    borderWidth:border?1:0,
    borderColor:border?border:'white',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:25,
    flexDirection:'row',
  padding:padding?padding:15,
  marginTop:marginTop?marginTop:0

  }}>
   {loading?  <Text><ActivityIndicator size={"small"} color={'white'} />    </Text>:null}
    <LocalText style={{
      color:color,
  fontWeight:800,
  fontSize:15,
    }}>
     {title}
  </LocalText>
  </TouchableOpacity>

)
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    alertBox: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
    },
    iconContainer: {
      marginBottom: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    message: {
      textAlign: "center",
      marginTop: 10,
      color: "gray",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      width: "100%",
    },
    button: {
      flex: 1,
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 5,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: "#ccc",
    },
    confirmButton: {
      backgroundColor: "#007BFF",
    },
    buttonText: {
      fontWeight: "bold",
    },
    confirmButtonText: {
      color: "white",
    },
    showAlertButton: {
      backgroundColor: "#007BFF",
      padding: 10,
      borderRadius: 8,
    },
    showAlertButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });
  