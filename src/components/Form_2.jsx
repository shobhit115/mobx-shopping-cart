import {useState} from 'react';

export default function From_2(){
    const [firstName,setFirstName] = useState("Rohan");
    const [lastName,setLastName] = useState("Singh");

    const fullName = firstName + ' ' + lastName;

    function handleFirstNameChange(e){
        setFirstName(e.target.value);
    }
    function handleLastNameChange(e){
        setLastName(e.target.value);
    }
    return (
        <>
            <h1>Enter your Full Name</h1>
            <form>
                <label>
                    First Name:{' '}
                    <input  
                        value ={firstName}
                        onChange={handleFirstNameChange}
                    />

                </label>
                <br/>
                <br/>
                <label>
                    Last Name:{' '}
                    <input  
                        value ={lastName}
                        onChange={handleLastNameChange}
                    />

                </label>
            </form>

            <p>
                Your Full name is : <b>{fullName}</b>
            </p>
        </>
    )
}