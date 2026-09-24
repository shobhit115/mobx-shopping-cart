import { useState } from "react";

export default function Messenger(){
    const [to,setTo] = useState(contacts[0]);
    return(
        <>
            <h1>Messanger App</h1>
            <ContactList contacts={contacts} selectedContact={to} onselect={contact => setTo(contact)}/>
            
            <Chat key={to.email} contact={to}/>
        </>
    )
}

function ContactList({contacts,selectedContact,onselect}){
    return(
       <section className="contactList" >
                <ul>
                    {contacts.map(contact => <li><button onClick={()=>{onselect(contact)}}>{contact.name}</button></li>)}
                </ul>
       </section>
    )
}

function Chat({contact}){
    const [text,setText] = useState('');

    return (
        <section className="chat">
            <textarea value={text} placeholder={"chat to "+contact.name} onChange={e=>setText(e.target.value)}>

            </textarea>
            <br></br>
            <button>send to {contact.email}</button>
        </section>
    )
}

const contacts = [
  { name: 'Taylor', email: 'taylor@mail.com' },
  { name: 'Alice', email: 'alice@mail.com' },
  { name: 'Bob', email: 'bob@mail.com' }
];

