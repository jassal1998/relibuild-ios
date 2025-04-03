import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const fetchProjectData = async () => {
  // Retrieve the token from AsyncStorage
  const token = await AsyncStorage.getItem('authUser'); 
  console.log("Adadad",token)// Ensure that "Token" is the key used to save the token
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  const response = await fetch(
    "https://api.relibuild.com:3000/contract/getContract/160",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Use the retrieved token for authorization
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data; // Return the parsed data
};

// Axios interceptors remain unchanged
axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export const requestOTP = async (email) => {
  try {
    const response = await axios.post("https://api.relibuild.com:3000/login/login", {
      email,
    });
    return response.data; // Assuming your API returns the token in the response
  } catch (error) {
    console.error("Error in requestOTP:", error);
    // Log the full error response for debugging
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else {
      console.error("Error message:", error.message);
    }
    throw new Error(
      error.response?.data?.message || "An error occurred while requesting OTP"
    );
  }
};
export const fetchContractData = async (id27) => {
  // Retrieve the token from AsyncStorage
  const token = await AsyncStorage.getItem('authUser');

  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  try {
    // Make the API request using axios
    const response = await axios.get(
      `https://api.relibuild.com:3000/contract/get-project/27`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching contract data:",
      error.response || error.message
    );
    throw error;
  }
};


//   export const fetchDatamilestone = async () => {
//   const token = await AsyncStorage.getItem("token");

//   if (!token) {
//     throw new Error("No token found in AsyncStorage.");
//   }

//   try {
//     const response = await axios.get(
//       "https://api.relibuild.com:3000/contract/create-milestone",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data; // Return the milestones data
//   } catch (error) {
//     console.error(
//       "Error fetching milestones:",
//       error.response ? error.response.data : error.message
//     );

//     // Log additional error info
//     if (error.response) {
//       console.error("Response status:", error.response.status);
//       console.error("Response headers:", error.response.headers);
//     }

//     throw error; // Rethrow the error for further handling
//   }
// };