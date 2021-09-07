import React,{useReducer} from 'react'
import axios from 'axios';
//import { v4 as uuidv4 } from 'uuid';
import AuthContext from './authContext';
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken';
import {
     REGISTER_SUCCESS,
     REGISTER_FAIL,
     USER_LOADED,
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL,
     LOGOUT,
     CLEAR_ERRORS
    
}
from '../types'

const AuthState = props  =>{
    const initialState={
        token:localStorage.getItem('token'),
        isAuthenticated:null,
        user:null,
        loading:true,
        error:null
}

    const [state,dispatch]=useReducer(authReducer,initialState)

    //Load User
    const loadUser= async() =>{
        //@todo --load token into global header
        console.log('data...',localStorage)
        setAuthToken(localStorage.token);
        try {
            const res=await axios.get('http://localhost:5001/api/auth')
            console.log('ress..',res)
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:AUTH_ERROR,
                //payload:res.data
            })
        }
    }

    //Register User
    const register =async formData =>{
        const config={
        headers:{
            'Content-Type':'application/json'
        }
        }
        try {
            const res=await axios.post('http://localhost:5001/api/users',formData,config);
            console.log('response from post..',res)
            //console.log('MYTOKEN',localStorage.getItem('access-token'));
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            loadUser();
        } catch (error) {
            console.log('error..',error)
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
        }
    }

    //Login User
    const login= async formData =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
            }
            try{
const res=await axios.post('http://localhost:5001/api/auth',formData,config)
console.log('login response',res); 
dispatch({
    type:LOGIN_SUCCESS,
    payload:res.data
})
loadUser()
            }
            catch(error){
                dispatch({
                    type:LOGIN_FAIL,
                    payload:error.response.data.msg
                })                
            }

    }
    //Logout User
    const logout= () =>{
        console.log('logout'
    }
    //Clear Errors
    const clearError= () =>dispatch({type:CLEAR_ERRORS})
    

    return(
        <AuthContext.Provider
        value={{
          token:state.token,
          isAuthenticated:state.isAuthenticated,
          loading:state.loading,
          error:state.error ,
          user:state.user,
          register,
          login,logout,loadUser,clearError
        }}>
        {props.children}
        </AuthContext.Provider>
    )    
    
}
export default AuthState;