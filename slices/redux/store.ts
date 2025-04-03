import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice/formslice"; 
//import { submitForm } from "./formSlice/formslice";

const store = configureStore({
  reducer: {
    form: formReducer // Use the form reducer here
    
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;