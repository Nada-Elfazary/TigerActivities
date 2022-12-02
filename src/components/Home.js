import React, {useEffect, useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import {Button, Navbar} from 'react-bootstrap'
import XDSCard from "./XDSCard";
import Dropdown from "./Dropdown";
import tiger from './tiger.jpeg';
import Filter from './Filter';
import Profile from "./Profile";
import "./Home.css";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'
import "./App.css"

// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [initialState, setInitialState] = useState(true)
  const [clickedActivites, setClickedActivities] = useState(false)
  const [clickedMyActivites, setClickedMyActivities] = useState(false)
  const [clickedMySignUps, setClickedMySignUps] = useState(false)
  const [clickedProfile, setClickedProfile] = useState(false)
  const [events, setEvents] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(["","","",""])
  let currLogin = "Reuben"
  let currNetid = "ragogoe"

  useEffect(()=>{
    setRefresh(true)
    activitesClicked()
    setEvents([])
    // getEvents(false, "")
    
    
}, [])


const mySignUpsClicked= () => {
  if(clickedMySignUps) {
    setEvents([])
  }
  setInitialState(false)
  setClickedMySignUps(true)
  setClickedActivities(false)
  setClickedMyActivities(false)
  setClickedProfile(false)
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
  setInitialState(false)
  setClickedActivities(true)
  setClickedMyActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(false)
  setRefresh(false)
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
  setInitialState(false)
  setClickedMyActivities(true)
  console.log("Clicked 'My Activities'. Events:", events.length, events)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(false)
  setRefresh(false)

  getEvents(true, "")
}

const profileClicked= () =>{
  setInitialState(false)
  setClickedMyActivities(false)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(true)
  getProfileData(currNetid)
  console.log("Inside clickedProfile set Clicked Profile to true.")
}

const handleCreateEvent = () =>{
  setDisplayModal(true);
}

const getEvents = (ownerView, name, day, category, cost, capMin, capMax)=> {
  axios.get('/events', {params: {title: name, day: day, category: category, cost: cost, capMin: capMin, capMax: capMax}}).then(res =>{
    console.log("Events received from db:", res)
    setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === currLogin)
      console.log("length: ", filtered.length)
      if (filtered.length !== 0) {
        console.log("Setting events to:", filtered)
        setEvents(filtered)
      }
      else {
        console.log("No events created by owner")
      }
    } else {
      console.log("Setting events to:", res.data)
      setEvents(res.data)
    }
    setLoading(false)
  }).catch(err =>{
    console.log("Error receiving event from db:", err)
  })
}

const getProfileData = (netid) => {
  axios.get('/profile', {params:{
          netid: netid
      }
  })
  .then((response) => {
      if (response.length === 0) {
          setProfileData(["", "", "", ""])
      }
      else {
          console.log("Response is:",response)
          setProfileData([response.data.name, response.data.phone, response.data.email, response.data.class_year])
          console.log("Profile Data:", profileData)
      }
  }).catch(err =>{
      console.log("Error received from db:", err)
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

    <XDSCard key ={index} item ={event} ownerView={false} signUpsView = {false} 
    name={profileData[0]}
    phone={profileData[1]}
    email={profileData[2]}/>
  )
}): <h1 className = "center-screen">"No events created yet"</h1>
const displayOwnerEvents = events.length !== 0 ? events.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} ownerView={true} signUpsView = {false}/>
  )
}): <h1 className = "center-screen">"No events created yet"</h1>
const displaySignUps = events.length !== 0 ? events.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} ownerView={false} signUpsView = {true}/>
  )
}): <h1 className = "center-screen">No current sign-ups</h1>

const topNav = 
 <Navbar className="Navbar">
  <Navbar.Brand><img alt="" src={tiger} width="60" height="60"
                className="d-inline-block align-top"
                /> {' '}</Navbar.Brand>
  <Navbar.Brand>{title}</Navbar.Brand>

  <div className = "buttonsSec">
  <Navbar.Brand><Button onClick={activitesClicked}>Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={myActivitesClicked}>My Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={mySignUpsClicked}>My Sign-Ups</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={profileClicked}>Profile</Button></Navbar.Brand>
  </div>
</Navbar>

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

  const showFilter = clickedActivites || initialState ? (
    // <input value={nameFilter} name="title" onChange={handleFilter} />
    
    <Filter getEvents={getEvents} />

  ): null

  const showProfile = clickedProfile ? <Profile 
    name={profileData[0]}
    netid={currNetid}
    phone={profileData[1]}
    email={profileData[2]}
    classYear={profileData[3]}
    /> : null

  const dropDowns = (filter, items) => (
    <Dropdown filter = {filter} items = {items}></Dropdown>
  )

  const showLoading = <ClipLoader loading={loading} size={200}/>
  return (
    <div className = "pageContainer">   
    {topNav}
        <div className="content">
          {showCreateEventButton}
          {showFilter}
          {showProfile}
            <div className="events">
            {!loading ? results : showLoading}
            {showResults}
            {!loading ? showOwnerActivities : showLoading}
            {showSignUps}
            {modal}
          </div>
        </div>
    </div>
    
  );
};