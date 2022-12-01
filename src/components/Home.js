import React, {useEffect, useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import {Button, Navbar} from 'react-bootstrap'
import XDSCard from "./XDSCard";
import Dropdown from "./Dropdown";
import tiger from './tiger.jpeg';
import Filter from './Filter';
import "./Home.css";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'

// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [clickedActivites, setClickedActivities] = useState(true)
  const [clickedMyActivites, setClickedMyActivities] = useState(false)
  const [events, setEvents] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  const [clickedMySignUps, setClickedMySignUps] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  let currLogin = "Reuben"

  useEffect(()=>{
    getEvents(false, "")
    setRefresh(true)
}, [])


const mySignUpsClicked= () => {
  if(clickedMySignUps) {
    setEvents([])
  }
  setClickedMySignUps(true)
  setClickedActivities(false)
  setClickedMyActivities(false)
  setRefresh(false)
  console.log("Requesting user signups")

  axios.get('/user-sign-ups').then((res) =>{
    console.log("in sign-up")
    setEvents(res.data)
  }).catch(err =>{
    console.log("Error receiving event from db:", err)
  })
}

const activitesClicked= () => {
  if(clickedActivites) {
    setEvents([])
  }
  setClickedActivities(true)
  setClickedMyActivities(false)
  setClickedMySignUps(false)
  setRefresh(false)

  console.log("Requesting Dummy Data")
  /*
  axios({
    method: "GET",
    url:"https://tigeractivities.onrender.com/dummy",
  })
  .then((response) => {
    const res = response.data
    console.log("Recieved Dummy Response:", res)
  }).catch((error) => {
    if (error.response) {
      console.log("Recevived dummy Error:", error.response)
      console.log(error.response.status)
      console.log(error.response.headers)
      }
  })
  */
  getEvents(false, "")
  
}

const myActivitesClicked= ()=>{
  if(clickedMyActivites) {
    setEvents([])
  } 
  setClickedMyActivities(true)
  console.log("Clicked 'My Activities'. Events:", events.length, events)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setRefresh(false)

  getEvents(true, "")
}

const handleCreateEvent = ()=>{
  setDisplayModal(true);
}

const getEvents =  (ownerView, name, day, category, cost, capCond, cap)=> {
  /*
  axios({
    method: "POST",
    url:"https://tigeractivities.onrender.com/events",
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
  })
  */

// axios.get('https://tigeractivities.onrender.com/events').then(res =>{
  setLoading(true)
  axios.get('/events', {params: {title: name, day: day, category: category, cost: cost, capCond: capCond, cap: cap}}).then(res =>{
    console.log("Events received from db:", res)
    console.log("Setting events to:", res.data)
    setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === currLogin)
      console.log("length: ", filtered.length)
      if (filtered.length !== 0) {
      setEvents(filtered)
      }
      else {
        console.log("No events created by owner")
      }
    } else {
      setEvents(res.data)
    }
    setLoading(false)
  }).catch(err =>{
    console.log("Error receiving event from db:", err)
  })
}


  const title = <h1><i>TigerActivities </i></h1>
 
  const activities = (
    <>
    <Button class = 'button'id = "act" onClick={activitesClicked}>Activities</Button>
    <br/>
  </>
  )
  const myActivities = (
    <>
  <Button onClick={myActivitesClicked}>My Activities</Button>
  <br/>
  </>
  )
  const mySignUps = <Button onClick={mySignUpsClicked}>My Sign-Ups</Button>
  const createEventButton = <Button className="buttonStyle" onClick={handleCreateEvent}>Create Activity</Button>
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal} setLoading ={setLoading} setEvents ={setEvents}
  />) : null 


const displayEvents = events.length !== 0 ? events.filter((event)=>event.creator !== currLogin).map((event, index)=>{
  return (

    <XDSCard key ={index} item ={event} ownerView={false} signUpsView = {false}/>
  )
}): "No events created yet"
const displayOwnerEvents = events.length !== 0 ? events.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} ownerView={true} signUpsView = {false}/>
  )
}): "No events created yet"
const displaySignUps = events.length !== 0 ? events.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} ownerView={false} signUpsView = {true}/>
  )
}): "No current sign-ups"

const topNav = 
 <Navbar className="Navbar">
  <Navbar.Brand><img alt="" src={tiger} width="60" height="60"
                className="d-inline-block align-top"
                /> {' '}</Navbar.Brand>
  <Navbar.Brand>{title}</Navbar.Brand>
</Navbar>

const handleFilter = (event) => {
    setNameFilter(event.target.value)
    console.log(event.target.value)
    getEvents(false, event.target.value)
}
const results = refresh ? (displayEvents) : null

const showResults = clickedActivites? (
 
    displayEvents
  

  ): null

  const showCreateEventButton = clickedMyActivites? (

    createEventButton
  

  ): null

  const showOwnerActivities = clickedMyActivites ? (
    displayOwnerEvents

  ): null
  const showSignUps = clickedMySignUps ? (
    displaySignUps
  ): null

  const showFilter = clickedActivites ? (
    // <input value={nameFilter} name="title" onChange={handleFilter} />
    <Filter getEvents={getEvents} />

  ): null

  const dropDowns = (filter, items) => (
    <Dropdown filter = {filter} items = {items}></Dropdown>
  )

  const showLoading = <ClipLoader loading={loading} size={200}/>
  return (
    <div className = "pageContainer">
    
    {topNav}
      <div className = "LeftNavContainer-1">
        <div className="btn">
        {activities}
        {myActivities}
        {mySignUps}
        </div>
        </div>  
      
        <div className="content">
          {showCreateEventButton}
          {showFilter}
          {!loading ? results : showLoading}
          {showResults}
          {!loading ? showOwnerActivities : showLoading}
          {showSignUps}
          {modal}
         </div>
    </div>
    
  );
};