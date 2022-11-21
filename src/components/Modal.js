import axios from "axios";
import React, { useState } from "react";
import "./Modal.css";

function Modal(props) {

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  
  const submitForm= () =>
  {
    axios.post('https://tigeractivities.onrender.com/sign-up', {
      name: name,
      phone: phone,
      email: email,
      user_id:"rand_usr",
      event_id:props.event_id,
    })
    .then((response) => {
      console.log(response)
    }, (error) => {
      console.log(error)
    })
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenSignUpModal(false);
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>Want to sign up for {props.title} ?</h2>
        </div>
        <div className="body">
  
            <table>
              <tbody>

            
                    <tr>
                    <td ><label>Name:</label></td>
                    <td><input type="text" name="name" value={name} onChange={(event) =>
                    {
                      setName(event.target.value)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td ><label>Phone Number:</label></td>
                    <td><input type="text" name="Number" value={phone} onChange={(event) =>
                    {
                      setPhone(event.target.value)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td><label>Email:</label></td>
                    <td><input type="text" name="Email" value={email} onChange={(event) =>
                    {
                      setEmail(event.target.value)
                    }}/></td>
                    </tr>
                    </tbody>
                </table>

        </div>
        <div className="footer">
          <button
            id="cancelBtn"  onClick={() => {
              props.setOpenSignUpModal(false);
            }}
          >
            Cancel
          </button>
          <button onClick={()=>{
             submitForm()
             props.setOpenSignUpModal(false)
          }}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;