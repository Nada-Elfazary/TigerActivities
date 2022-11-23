import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import axios from 'axios';
import "./CreateEventDialog.css"


function CreateEventDialog(props) {
    const MAX_NO_DAYS = 5
    const DEFAULT_CREATOR = "Reuben"
    const DEFAULT_CATEGORY = "Sports"
    const DEFAULT_SIGNUP_NR = 0
    const[eventTitle, setEventTitle] = useState('')
    const[eventLocation, setEventLocation] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const[maxAttendeeCount, setMaxAttendeeCount] = useState(5)
    const [disableSubmitForm, setDisableSubmitForm] = useState(false)
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [cost, setCost] = useState(0)
    const [description, setDescription] = useState("")
    const [saving, setSaving] = useState(true)
    const [errorMsg, setErrorMsg] = useState([])
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    // const curr_time = new Date()
    // console.log("Current time", curr_time.getTime())
    // const five_days_in_future = curr_time.setDate(curr_time.getDate() + MAX_NO_DAYS) 
    // console.log("Max time in future",five_days_in_future)
    /*
    const currLogin = "Reuben"
    const getEvents =(ownerView)=> {
      axios.get('/events').then(res =>{
        console.log("Events received from db:", res)
        console.log("Setting events to:", res.data)
        props.setEvents([])
        if (ownerView === true) {
          let filtered = res.data.filter(event => event.creator === currLogin)
          console.log("length: ", filtered.length)
          if (filtered.length !== 0) {
          props.setEvents(filtered)
          }
          else {
            console.log("No events created by owner")
          }
        } else {
          props.setEvents(res.data)
          console.log(res.data)
        }
      }).catch(err =>{
        console.log("Error receiving event from db:", err)
      })
      
      }
      */
    const submitForm = ()=>{
        setDisableSubmitForm(true)
        console.log(disableSubmitForm)
        axios.post('/create-event', {
          // create_id
            event_name:    eventTitle,
            start_time:    startTime,
            end_time:      endTime,
            maxcap:        maxAttendeeCount,
            creator:       DEFAULT_CREATOR,
            category:      eventCategory,
            location:      eventLocation,
            description:   description,
            cost:          cost,
            signup_number: DEFAULT_SIGNUP_NR,

          })
          .then((response) =>{
            console.log(response);
            setSaving(true)
            props.setOpenModal(false)
          }, (error) => {
            console.log(error)
            setErrorMsg(error)
            setSaving(false)
            // setShowErrorMsg(true)
          })
    }

    const failureCallBack = (error)=>{
    //  setErrorMsg(error)
     // setShowErrorMsg(true)
     console.log("error")
    }
    const successCallBack = ()=>{
      console.log("success")
     setShowErrorMsg(false) 
     setErrorMsg(null)
      // setSaving(true)
      console.log(eventTitle)
      console.log(description)
      console.log(eventLocation)
      submitForm()
      // getEvents(true)
      
      // props.setClickMyActivities(true)
    }
    const errorM  = showErrorMsg? errorMsg.map(error => <li key={error}><strong  className="error">{error}</strong></li>) : null

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false)
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>Create A TigerActivity </h2>
        </div>
        <div className="body">

            <form action='/createEvent' method = "get">
            <table>
              <tbody>
                    <tr>
                    <td >Title:</td>
                    <td><input id = "title" type="text" name="title" value={eventTitle} onChange={(event)=>{
                        setEventTitle(event.target.value)
                        console.log(eventTitle)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td >Location:</td>
                    <td><input id = "location" type="text" name="Location" value ={eventLocation} onChange={(event)=>{
                        setEventLocation(event.target.value)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td >Category:</td>
                    <td><input type="text" name="Category" value ={eventCategory} onChange={(event)=>{
                        setEventCategory(event.target.value)
                    }}/> </td>
                    </tr>
                    <tr>
                      <td>Start Time</td>
                     <td><Flatpickr
                     data-enable-time 
                     value={startTime} 
                     onChange={(event) => 
                     {
                        console.log("date:" +  startTime)
                        setStartTime(new Date(event))
                        console.log("date after:", event)
                     }} /> </td>
                    </tr>
                    <tr>
                    <td> End Time</td>
                    <td><Flatpickr
                     data-enable-time 
                     value={endTime} 
                     onChange={(event) => 
                     {
                        setEndTime(new Date(event))
                        console.log("date:", event)
                     }} /> </td>     
                    </tr>
                    <tr>
                    <td >Max Attendee Count:</td>
                    <td><input id = "cap" type="text" name="Attendee Count" value={maxAttendeeCount} onChange={(event) =>
                        {
                            setMaxAttendeeCount(event.target.value)
                        }} /> </td>
                    </tr>
                    <tr>
                      <td>Approximate Cost Involved (in $)</td>
                      <td><input id= "cost" type="text" name="Cost" value={cost} onChange={(event) =>
                        {
                        setCost(event.target.value)
                        }} /></td>
                    </tr>
                    <tr>
                      <td>Description: </td>
                      <td><textarea id = "descrip" name ="description" value={description} onChange={(event) =>
                      {
                      setDescription(event.target.value)
                      }}></textarea></td>
                    </tr>
                    </tbody>
                </table>
                </form>
                {errorM}
                {!saving ? (errorMsg): null}
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
          <button disabled={disableSubmitForm} onClick={()=>{
              let error = 0;
              let errorMsg = []
            console.log(endTime.getTime())
            console.log(startTime.getTime())
            if(eventTitle.length === 0 ){
//              error.push("Title field cannot be empty")
              // setShowErrorMsg(true)
              document.getElementById('title').classList.add("error");
              document.getElementById('title').placeholder = "title cannot be empty";
    
              error = 1;
            }
            if(eventLocation.length === 0){
         //     error.push("Location field cannot be empty \n")
              document.getElementById('location').classList.add("error");
              document.getElementById('location').placeholder = "location cannot be empty";

              error = 1;
            }
           if( endTime.getTime() <= startTime.getTime()){
              console.log("wrong dates")
              errorMsg.push("End Date before or equal to start date. Please fix this \n")
              // setShowErrorMsg(true)
              // failureCallBack("End Date before start date. Please fix this")
              
            }
             if(cost < 0){
            //  errorMsg.push("Cost involved cannot be negative")
              // setShowErrorMsg(true)
              document.getElementById('cost').classList.add("error");
              document.getElementById('cost').value = "Cost involved cannot be negative";
    
              error = 1;
            }
            if(maxAttendeeCount < 0){
          //    error.push("Max Attendee Count cannot be negative")
              // setShowErrorMsg(true)
              document.getElementById('cap').classList.add("error");
              document.getElementById('cap').value = "Max Attendee Count cannot be negative";
    
              error = 1;
            }

            if(description.length == 0){
              //    error.push("Max Attendee Count cannot be negative")
                  // setShowErrorMsg(true)
                  document.getElementById('descrip').classList.add("error");
                  document.getElementById('descrip').value = "Description cannot be empty";
        
                  error = 1;
                }
           error !== 0 ? failureCallBack(error) : successCallBack()

          }}>Create</button>
   
          
        </div>
      </div>
    </div>
  );
}

export default CreateEventDialog;