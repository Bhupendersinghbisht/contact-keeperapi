import React,{Fragment,useContext,useEffect} from 'react'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ContactItem from './contactItem';
import ContactContext from '../../context/contact/contentContext'
import Spinner from '../layout/Spinner.js'
const Contacts = () => {

    const contactContext= useContext(ContactContext);
    const {contacts,filtered,getContacts,loading}=contactContext;
    useEffect(() =>{
        getContacts();
        // eslint-disable-next-line
    },[])
    if(contacts !== null && contacts.length === 0 && !loading){
        return <h4>Please add a contact</h4>
    }
    
    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                {filtered !== null ? filtered.map(contact => (
                <CSSTransition key ={contact._id} timeout={500} className="item">
                (<ContactItem  contact={contact} />
                    </CSSTransition>
                ))
                :contacts.map(contact => (
                    <CSSTransition key ={contact._id} timeout={500} className="item">   
                    <ContactItem contact={contact} />
                    </CSSTransition>
                    ))}
    
                {/* {contacts.map(contact => (            
                <ContactItem key ={contact.id} contact={contact} />
                ))} */}
                </TransitionGroup>
            ) : <Spinner />}
            
        </Fragment>
    )
}

export default Contacts
