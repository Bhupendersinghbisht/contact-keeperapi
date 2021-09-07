import React,{useReducer} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contentContext'
import contactReducer from './contactReducer'
import {
    GET_CONTACTS,
    CLEAR_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR
}
from '../types'

const ContactState = props  =>{
    const initialState={
        contacts:null,
        current:null,
        filtered:null,
        error:null
        //     {
        //     id:1,
        //     name:'fsdjflk',
        //     email:'sdf@dsfd.com',
        //     phone:'23432423',
        //     type:'personal'
        // },
        // {
        //     id:2,
        //     name:'ppiipoew',
        //     email:'sqwq@dsfd.com',
        //     phone:'000909',
        //     type:'professional'
        // },
        // {
        //     id:3,
        //     name:'wwerwe',
        //     email:'wew@dsfd.com',
        //     phone:'1123432423',
        //     type:'personal'
        // }
        
    
    
}

    const [state,dispatch]=useReducer(contactReducer,initialState)

    //GET_CONTACTS
    const getContacts= async() =>{
        // const config={
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // }
        try {   
            const response=await axios.get('http://localhost:5001/api/contacts')
            dispatch({type:GET_CONTACTS,payload:response.data})
            
        } catch (error) {
            dispatch({type:CONTACT_ERROR,payload:error.response.msg})
        }
    }
    //Add Contact
    const addContact=async contact =>{
     const config={
         headers:{
             'Content-Type':'application/json'
         }
     }
     try {
         const response=await axios.post('http://localhost:5001/api/contacts',contact,config)
         dispatch({type:ADD_CONTACT,payload:response.data})
     } catch (error) {
        dispatch({
                type:CONTACT_ERROR,
                payload:error.response.msg
            })
     }
        // contact.id=uuidv4();
        // dispatch({
        //     type:ADD_CONTACT,
        //     payload:contact
        // })
    }
    //Delete Contact   
    const deleteContact=id =>{
        dispatch({
            type:DELETE_CONTACT,
            payload:id
        })
    }

    //clear contacts
    const clearContacts =() =>{
        dispatch({type: CLEAR_CONTACTS})
    }
    //Set Current Contact
    const setCurrent=contact =>{
        console.log('here',contact);
        dispatch({
            type:SET_CURRENT,
            payload:contact
        })
    }
    

    //Clear Current Contact
    const clearCurrent=() =>{
        dispatch({
            type:CLEAR_CURRENT
            
        })
    }

    //Update Contact
    const updateContact=contact =>{
        dispatch({
            type:UPDATE_CONTACT,
            payload:contact
        })
    }
    
    //Filter Contacts
    const filterContacts=text =>{
        dispatch({
            type:FILTER_CONTACT,
            payload:text
        })
    }
    //Clear Filter
    const clearFilter=() =>{
        dispatch({
            type:CLEAR_FILTER
            
        })
    }


    return(
        <contactContext.Provider
        value={{
            contacts:state.contacts,
            current:state.current,
            filtered:state.filtered,
            error:state.error,
            addContact,
            deleteContact,            
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            getContacts,
            clearContacts
        }}>
        {props.children}
        </contactContext.Provider>
    )    
    
}
export default ContactState;