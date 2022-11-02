import './App.css';
import React, { useState } from 'react'
import axios from 'axios';

import Modal from './Modal'

export default function Welcome(): React.ReactNode{
     const [clicked, setClicked] = useState(false)
     const [disabled, setDisabled] = useState(false)
     const [events, setEvents] = useState([])
    const [onSignUp, setOnSignUp] = useState(false)
    const [eventState, setEventState] = useState(null)
     const handleOnClicked =()=>{
        setClicked(true)
        setDisabled(true)
        getEvents()

     }
     const handleSignUp= ()=>{
      setOnSignUp(true)
     }
    const title = <h1  className='App'>Welcome to TigerActivities</h1>
    const displayEventsButton = <button onClick={handleOnClicked} disabled={disabled}> Display Events</button>
     


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

          <tr key={event.category+" " + event.id}>
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
    
    const showResults = clicked? (
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
  <Modal setOpenModal={onSignUp} event={eventState} />
): null
    return (
      <div>
        <div className='App'>
   {title}
   {displayEventsButton}
   </div>
   {showResults}
   {modal}
   </div>
 
   
    );
}
