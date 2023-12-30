import {createSlice} from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name:"userReducer",
    initialState:{
        isAuthenticatd:false,
        loading:false,
        error:"",
        user:{}
    },
       reducers:{
        LoadUserRequest : (state)=>{
            state.loading = true;
        },
        LoadUserSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticatd = true
            state.user = action.payload
        },
        LoadUserFail :(state,action)=>{
            state.loading= false
            state.error = action.payload
            state.isAuthenticatd = false
        },
        clearErrors:(state)=>{
            state.error = null;
        }
    }
})

export const {LoadUserRequest,LoadUserSuccess,LoadUserFail,clearErrors} = userReducer.actions

export default userReducer.reducer