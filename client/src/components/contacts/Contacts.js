import React,{Fragment,useContext} from 'react'
import {CSSTransition,TransitionGroup} from 'react-transition-group'
import ContactItem from './contactItem';
import ContactContext from '../../context/contact/contentContext'

const Contacts = () => {

    const contactContext= useContext(ContactContext);
    const {contacts,filtered}=contactContext;
    if(contacts.length === 0){
        return <h4>Please add a contact</h4>
    }
    return (
        <Fragment>
            <TransitionGroup>
            {filtered !== null ? filtered.map(contact => (
            <CSSTransition key ={contact.id} timeout={500} className="item">
            (<ContactItem  contact={contact} />
                </CSSTransition>
            ))
            :contacts.map(contact => (
                <CSSTransition key ={contact.id} timeout={500} className="item">   
                <ContactItem contact={contact} />
                </CSSTransition>
                ))}

            {/* {contacts.map(contact => (            
            <ContactItem key ={contact.id} contact={contact} />
            ))} */}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts