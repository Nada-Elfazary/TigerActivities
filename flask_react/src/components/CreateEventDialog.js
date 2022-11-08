import React, { useState } from "react";
import "./Modal.css";
import axios from 'axios';

function CreateEventDialog(props) {
    const[eventTitle, setEventTitle] = useState('')
    const[eventLocation, setEventLocation] = useState('')
    const[maxAttendeeCount, setMaxAttendeeCount] = useState(5)
    const [disableSubmitForm, setDisableSubmitForm] = useState(false)

    const submitForm = ()=>{
        setDisableSubmitForm(true)
        console.log(disableSubmitForm)
        axios.post('/create-event', {
            title: eventTitle,
            location: eventLocation,
            MaxAttendeeCount: maxAttendeeCount
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              {props.setOpenModal(false);}
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>Create A TigerActivity </h2>
        </div>
        <div className="body">
          <p>
            <form action='/createEvent' method = "get">
            <table>
                    <tr>
                    <td ><label>Event Title:</label></td>
                    <td><input type="text" name="title"  value={eventTitle} onChange={(event)=>{
                        setEventTitle(event.target.value)
                        console.log(eventTitle)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td ><label>Location:</label></td>
                    <td><input type="text" name="Location" value ={eventLocation} onChange={(event)=>{
                        setEventLocation(event.target.value)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td ><label>Max Attendee Count:</label></td>
                    <td><input type="text" name="Attendee Count" value={maxAttendeeCount} onChange={(event) =>
                        {
                            setMaxAttendeeCount(event.target.value)
                        }} /> </td>
                    </tr>
                </table>
                </form>
                </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button disabled={disableSubmitForm} onClick={submitForm}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventDialog;