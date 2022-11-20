import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import axios from 'axios';


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
    const [saving, setSaving] = useState(false)
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
        axios.post('https://tigeractivities.onrender.com/create-event', {
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
          }, (error) => {
            console.log(error)
            setErrorMsg("Can not create event")
            setShowErrorMsg(true)
          })
    }

    const failureCallBack = (error)=>{
      setSaving(false)
      setErrorMsg(error)
      setShowErrorMsg(true)
    }
    const successCallBack = ()=>{
      console.log("success")
     setShowErrorMsg(false) 
     setErrorMsg(null)
      setSaving(true)
      console.log(eventTitle)
      console.log(description)
      console.log(eventLocation)
      submitForm()
      // getEvents(true)
      props.setOpenModal(false)
      // props.setClickMyActivities(true)
    }
    const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null

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
                    <td><input type="text" name="title"  value={eventTitle} onChange={(event)=>{
                        setEventTitle(event.target.value)
                        console.log(eventTitle)
                    }}/> </td>
                    </tr>
                    <tr>
                    <td >Location:</td>
                    <td><input type="text" name="Location" value ={eventLocation} onChange={(event)=>{
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
                    <td><input type="text" name="Attendee Count" value={maxAttendeeCount} onChange={(event) =>
                        {
                            setMaxAttendeeCount(event.target.value)
                        }} /> </td>
                    </tr>
                    <tr>
                      <td>Approximate Cost Involved (in $)</td>
                      <td><input type="text" name="Cost" value={cost} onChange={(event) =>
                        {
                        setCost(event.target.value)
                        }} /></td>
                    </tr>
                    <tr>
                      <td>Description: </td>
                      <td><textarea name ="description" value={description} onChange={(event) =>
                      {
                      setDescription(event.target.value)
                      }}></textarea></td>
                    </tr>
                    </tbody>
                </table>
                </form>
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
            console.log(endTime.getTime())
            console.log(startTime.getTime())
            if( endTime.getTime() < startTime.getTime()){
              console.log("wrong dates")
              failureCallBack("End Date before start date. Please fix this")
            }
            else {
             successCallBack()
            }

          }}>Create</button>{errorM}
        </div>
      </div>
    </div>
  );
}

export default CreateEventDialog;