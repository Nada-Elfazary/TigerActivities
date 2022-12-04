import './App.css';
import React, { useState } from 'react'
import { useEffect } from 'react';

import CreateEventDialog  from './CreateEventDialog';
import RulesModal from './RulesModal';
import {useNavigate } from 'react-router-dom';
import logo from './princeton_tigers_logo.png';
import axios from 'axios';

export default function Welcome(): React.ReactNode{
    const [clickedDisplayEvents, setClickedDisplayEvents] = useState(false)
    const [events, setEvents] = useState([])
    const [eventState, setEventState] = useState(null)
    const [clickedCreateEvent, setClickedCreateEvent] = useState(false)
    const [checked, setChecked] = useState(false)
    const [logInClicked, setLogInClicked] = useState(false)
    const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

 
  const validate = (ticket) => {
    const url = 'https://tigeractivities-iqwe.onrender.com'
    let valUrl = 'https://fed.princeton.edu/cas/validate?service='
    valUrl += encodeURI(url)+'&ticket=' +  encodeURI(ticket)
    axios.get('https://tigeractivities.onrender.com/validate', {params:{url: valUrl}}).then(
      resp =>{
        console.log("resp", resp)
      }
    ).catch(
      err=>{
        console.log("err", err)
        navigate('/')
      }
    )
  
// result: { data: Buffer, res: Response }
    // console.log('status: %s, body size: %d, headers: %j', res.statusCode, data.length, res.headers);
  // console.log("data: ", decodeURI(data))
  }
/*
  useEffect(() => {
    console.log("broswer url: ", window.location.href)
    if (window.location.href.includes('ticket=')) {
    // let ticket = window.location.href('ticket=')[1]
    const ticket = new URL(window.location.href).searchParams.get('ticket')
    console.log('ticket', ticket)
    navigate('/home')
    //validate(ticket)
  }
   }, [])*/
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
        

return (
  <div> 
    {/* <div> */}
      <div className='App'>
        {/* {title} */}
      </div>
      {/* {displayEventsButton} */}
      {/* {createEventButton} */}
      {/* {showResults} */}

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