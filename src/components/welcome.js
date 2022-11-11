import './App.css';
import React, { useState } from 'react'
import axios from 'axios';

import Modal from './Modal'
import CreateEventDialog  from './CreateEventDialog';
import RulesModal from './RulesModal';
import {useNavigate } from 'react-router-dom';

export default function Welcome(): React.ReactNode{
    const [clickedDisplayEvents, setClickedDisplayEvents] = useState(false)
    const [events, setEvents] = useState([])
    const [onSignUp, setOnSignUp] = useState(false)
    const [eventState, setEventState] = useState(null)
    const [clickedCreateEvent, setClickedCreateEvent] = useState(false)
    const [checked, setChecked] = useState(false)
    const [logInClicked, setLogInClicked] = useState(false)
    const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

    const handleOnClickedDisplayEvents =()=>{
        setClickedDisplayEvents(true)
        // setDisabledDisplayEvents(true)
        getEvents()
     }
     const handleOnClickedCreateEvent=()=>{

     }
   
    const displayRules = logInClicked ? (<RulesModal setOpenModal={setLogInClicked}  setRedirect = {setRedirect}/>): null

    // const red = redirect ? (navigate('/home')) : null
    const title = <h1>Welcome to TigerActivities </h1>
    const logInButton = <button disabled={logInClicked} className='button' onClick={()=>{
      setLogInClicked(true)}}>Log In</button>



    const displayEventsButton = <button onClick={handleOnClickedDisplayEvents} disabled={clickedDisplayEvents}> Display Events</button>
    const createEventButton = <button onClick={handleOnClickedCreateEvent} disabled={clickedCreateEvent}>Create Event</button>
    




      const getEvents =()=> {
        axios({
          method: "GET",
          url:"/events",
        })
        .then((response) => {
          const res =response.data
          console.log("inside get data")
          setEvents(res)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

    const displayEvents = events.map((event)=> (

          <tr key={event.category+" "+ event.id}>
            <td>
              {event.event_name}
            </td>
            <td>
            {event.category}
            </td>
            <td>
              {event.creator}
            </td>
            <td><button onClick={()=>{
                    setOnSignUp(true)
                    setEventState(event)
            }}>Sign Up</button></td>
          </tr>
        )
       
      )
    const showResults = clickedDisplayEvents? (
    <div className="center">
    <table>
      <tbody>
      <tr>
        <td><strong>Event Name</strong></td>
        <td><strong>Category</strong></td>
        <td><strong>Creator</strong></td>

      </tr>
      {displayEvents}
            
      </tbody>
    </table>
    </div>

    ): null

const modal = onSignUp ? (
  <Modal setOpenModal={setOnSignUp} event={eventState} />
): null

const createEventModal = clickedCreateEvent ? ( <CreateEventDialog setOpenModal ={setClickedCreateEvent} />): null

    return (
      /*
      <div>
    <div className='App'>
   {title}
  
   </div>
   {displayEventsButton}
   {createEventButton}
   {showResults}
   {modal}
   {createEventModal}
   </div>
 */
      <div>
      <div className='AppContainer-1'>
        <div className='title'>
          {title}
        </div>
        <div className='logIn'>
          {logInButton}
        </div>
      </div>
      {displayRules}
      </div>
    );
}
