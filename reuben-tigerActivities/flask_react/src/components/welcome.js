import './App.css';
import React, { useState } from 'react'
import axios from 'axios';

import Modal from './Modal'
import CreateEventDialog  from './CreateEventDialog';

export default function Welcome(): React.ReactNode{
    const [clickedDisplayEvents, setClickedDisplayEvents] = useState(false)
    const [disabledCreateEvent, setCreateEvent] = useState(false)
    const [events, setEvents] = useState([])
    const [onSignUp, setOnSignUp] = useState(false)
    const [eventState, setEventState] = useState(null)
    const [clickedCreateEvent, setClickedCreateEvent] = useState(false)
    
    const handleOnClickedDisplayEvents =()=>{
        setClickedDisplayEvents(true)
        // setDisabledDisplayEvents(true)
        getEvents()
     }
     const handleOnClickedCreateEvent = ()=>{
        setClickedCreateEvent(true)
     }

    const title = <h1  className='App'>Welcome to TigerActivities</h1>
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
      <div>
        <div className='App'>
   {title}
   {displayEventsButton}
   {createEventButton}
   </div>
   {showResults}
   {modal}
   {createEventModal}
   </div>
 
   
    );
}
