import React,{useReducer} from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import contactContext from './contentContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
}
from '../types'

const ContactState = props  =>{
    const initialState={
        contacts:[
            {
            id:1,
            name:'fsdjflk',
            email:'sdf@dsfd.com',
            phone:'23432423',
            type:'personal'
        },
        {
            id:2,
            name:'ppiipoew',
            email:'sqwq@dsfd.com',
            phone:'000909',
            type:'professional'
        },
        {
            id:3,
            name:'wwerwe',
            email:'wew@dsfd.com',
            phone:'1123432423',
            type:'personal'
        }
        
    ],
    current:null,
    filtered:null
}

    const [state,dispatch]=useReducer(contactReducer,initialState)

    //Add Contact
    const addContact=contact =>{
        contact.id=uuidv4();
        dispatch({
            type:ADD_CONTACT,
            payload:contact
        })
    }
    //Delete Contact   
    const deleteContact=id =>{
        dispatch({
            type:DELETE_CONTACT,
            payload:id
        })
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
            addContact,
            deleteContact,            
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
        {props.children}
        </contactContext.Provider>
    )    
    
}
export default ContactState;