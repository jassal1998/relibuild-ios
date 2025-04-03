import axios from "axios";

export const postData = async (requestData: any) => {
  const url = 'https://api.relibuild.com:3000/contract/create-escrow-req'; 

  console.log('Request Data being sent:', requestData);

  if (!requestData || Object.keys(requestData).length === 0) {
    throw new Error('Request data cannot be empty');
  }

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_TOKEN_HERE`, 
      },
      timeout: 10000, 
    });
    console.log('Response Data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error:', error);
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('General error:', error.message);
    }
    throw error.response ? error.response.data : error.message;
  }
};