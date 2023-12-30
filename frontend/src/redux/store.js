import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./reducers/userReducer";

const store = configureStore({
    reducer:{
        userRed: userReducer,

              
    }
})
export default store