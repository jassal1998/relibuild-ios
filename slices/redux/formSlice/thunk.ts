import axios from "axios";
import { setFieldValue } from './formslice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const submitForm = (formData: any) => async (dispatch: any) => {
   console.log(formData, "dssssdd")
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {

        throw new Error("Error submitting form");
      }
      dispatch(setFieldValue(response))
      
      return await response.json();
    } catch (error) {
      //return rejectWithValue(error.message || "Unknown error occurred");
    }
  }
