import './App.css';
import React, { useState } from 'react'
import { useEffect } from 'react';

import Modal from './Modal'
import CreateEventDialog  from './CreateEventDialog';
import RulesModal from './RulesModal';
import {useNavigate } from 'react-router-dom';
import logo from './princeton_tigers_logo.png';
import axios from 'axios';

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
  // const { request } = require('urllib');

  /*
  const validate = (ticket) => {
    valUrl = 'https://fed.princeton.edu/cas/validate?service='
    valUrl += 'https%3A//tigeractivities-iqwe.onrender.com&ticket=' + ticket

  
   const { data, res } = {(async () => {
      await request(valUrl);
   })(); 
  
// result: { data: Buffer, res: Response }
    console.log('status: %s, body size: %d, headers: %j', res.statusCode, data.length, res.headers);
  console.log("data: ", decodeURI(data))
  }
*/
  useEffect(() => {
    console.log("broswer url: ", window.location.href)
    if (window.location.href.includes('ticket=')) {
    let ticket = window.location.href('ticket=')[1]
    axios.post('/validate', {
      url: window.location.href,
      ticket : ticket,
    }).then(res=>{
      let val_res = res
      if (val_res !== "Not valid"){
        navigate('/home')

      }
    }).catch(err=>{
      console.log("validation error", err)
      navigate('/login')
    })
    }
    
   }, [])
    const handleOnClickedDisplayEvents =()=>{
        setClickedDisplayEvents(true)
        // setDisabledDisplayEvents(true)
    //    getEvents()
     }
     const handleOnClickedCreateEvent=()=>{

     }
  
     
   
    const displayRules = logInClicked ? (<RulesModal setOpenModal={setLogInClicked}  setRedirect = {setRedirect}/>) : null
    // const red = redirect ? (navigate('/home')) : null
    const title = <h1>Welcome to TigerActivities </h1>
    const logInButton = <button disabled={logInClicked} className='button' onClick={()=>{
      setLogInClicked(true)}}>Log In</button>



    //const displayEventsButton = <button onClick={handleOnClickedDisplayEvents} disabled={clickedDisplayEvents}> Display Events</button>
    //const createEventButton = <button onClick={handleOnClickedCreateEvent} disabled={clickedCreateEvent}>Create Event</button>
    /*
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
        
      */
        

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
    {/* <div> */}
      <div className='App'>
        {/* {title} */}
      </div>
      {/* {displayEventsButton} */}
      {/* {createEventButton} */}
      {/* {showResults} */}
      {modal}
      {/* {createEventModal} */}
    {/* </div> */}
    <div>
      <div className='center-screen'>
        <div className='title'>
        <img alt="" src={logo} width="150" height="150"></img>
          {title}
        <div className='logIn'>
          {logInButton}
        </div>
        </div>
      </div>
      {displayRules}
    </div>
  </div>
  );
}