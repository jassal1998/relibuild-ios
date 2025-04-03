import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  // Add other form fields if needed
};

const formSlice = createSlice({
  name: "form",
  
  initialState,
  reducers: {
    setFieldValue: (state, action) => {
      
      console.log(action, "action redux")

      const { field, value } = action.payload;
      console.log(`Dispatching action to update field: ${field}`, action.payload);
       console.log(state, "Updated form data (setFieldValue)")
      state[field] = value; // Dynamically update the form field
      console.log("Form data submitted:", state)
    },
    submitForm: (state) => {
     
    },
  },
});

export const { setFieldValue, submitForm } = formSlice.actions;
// console.log("Form data submitted:", ); // Log form data on submission
export default formSlice.reducer;
