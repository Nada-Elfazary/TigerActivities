import React, {useEffect, useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import {Button, Navbar, Container, Pagination} from 'react-bootstrap'
import XDSCard from "./XDSCard";
import Dropdown from "./Dropdown";
import tiger from './tiger.jpeg';
import Filter from './Filter';
import Profile from "./Profile";
import "./Home.css";
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'
import "./App.css"
import _ from "lodash"

// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [initialState, setInitialState] = useState(true)
  const [clickedActivities, setClickedActivities] = useState(false)
  const [clickedMyActivities, setClickedMyActivities] = useState(false)
  const [clickedMySignUps, setClickedMySignUps] = useState(false)
  const [clickedProfile, setClickedProfile] = useState(false)
  const [events, setEvents] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(["","","",""])
  const [paginatedEvents, setPaginatedEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 1;
 
  let currLogin = "elfazaryyy\n"

  const categoryToColor = {'Sports': "cyan", 'Entertainment': "purple", 'Academic': "darkorange", 'Off-campus': "olive", 'Outdoors': "navy",  
  'Meals/Coffee Chats': "maroon", 'Nassau Street': "green"} 

  useEffect(()=>{
    setRefresh(true)
    activitiesClicked()
    setEvents([])
    
}, [])

const pageCount = events ? Math.ceil(events.length/ pageSize) : 0
const pagination = (pageNo)=>{
  setCurrentPage(pageNo)
  const startIndex = (pageNo -1) *pageSize
  const paginatedEvent = _(events).slice(startIndex).take(pageSize).value()
  console.log("paginated",paginatedEvent)
  setPaginatedEvents(paginatedEvent)
}
const pages = _.range(1, pageCount+1)
const displayPagination = <Pagination className="paginate">
 { pages.map((page)=>{
   return <Pagination.Item  active={page === currentPage}>
    <Button className="page-link" onClick={()=>{ pagination(page)
    }}>{page}</Button>
    </Pagination.Item>
}) 
}
</Pagination>

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
  setCurrentPage(1)
  console.log("Requesting user signups")
  setLoading(true)
  axios.get('/user-sign-ups', {params: {username: currLogin}}).then((res) =>{
    console.log("in sign-up")
    console.log(res.data)
    setEvents(res.data)
    setLoading(false)
  }).catch(err =>{
    
    console.log("Error receiving event from db:", err)
  })
}

const activitiesClicked= () => {
  
  if(clickedActivities) {
    setEvents([])
  }
  
  setInitialState(false)
  setClickedActivities(true)
  setClickedMyActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(false)
  setRefresh(false)
  setCurrentPage(1)
  getEvents(false, "")
  
}

const myActivitiesClicked= ()=>{
  if(clickedMyActivities) {
    setEvents([])
  } 
  setInitialState(false)
  setClickedMyActivities(true)
  console.log("Clicked 'My Activities'. Events:", events.length, events)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(false)
  setRefresh(false)
  setCurrentPage(1)
  getEvents(true, "")
}

const profileClicked= () =>{
  setInitialState(false)
  setClickedMyActivities(false)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(true)
  getProfileData(currLogin)
  console.log("Inside clickedProfile set Clicked Profile to true.")
}

const handleCreateEvent = () =>{
  setDisplayModal(true);
}


const getEvents = (ownerView, name, day, category, cost, capMin, capMax)=> {
  setLoading(true)
  axios.get('/events', {params: {title: name, day: day, category: category, cost: cost, capMin: capMin, capMax: capMax}}).then(res =>{
    console.log("Events received from db:", res)
    setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === currLogin)
      console.log("length: ", filtered.length)
      if (filtered.length !== 0) {
        console.log("Setting events to:", filtered)
        setEvents(filtered)
        setPaginatedEvents(_(filtered).slice(0).take(pageSize).value())
      }
      else {
        console.log("No events created by owner")
      }
    } else {
      console.log("Setting events to:", res.data)
      let explore = res.data.filter(event => event.creator !== currLogin)
      setEvents(explore)
      setPaginatedEvents(_(explore).slice(0).take(pageSize).value())
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



  const title =  <h1><i>TigerActivities </i></h1>
 
  const activities = (
    <>
    <Button class = 'button'id = "act" onClick={activitiesClicked}>Activities</Button>
    <br/>
  </>
  )
  const myActivities = (
    <>
  <Button onClick={myActivitiesClicked}>My Activities</Button>
  <br/>
  </>
  )
  const mySignUps = <Button onClick={mySignUpsClicked}>My Sign-Ups</Button>
  const createEventButton = <Button className="buttonStyle" onClick={handleCreateEvent}>Create Activity</Button>
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal} setLoading ={setLoading} setEvents ={setEvents}
  />) : null 


const displayEvents = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
  return (

    <XDSCard key ={index} item ={event} ownerView={false} signUpsView = {false} setLoading = {setLoading}
    username={currLogin}
    name={profileData[0]}
    phone={profileData[1]}
    email={profileData[2]}
    tagColor = {categoryToColor[event.category]}
    username={currLogin}/>
  )
}): null 
// <h1 className = "center-screen">"No events created yet"</h1>
const displayOwnerEvents = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} setEvents = {setEvents} setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize} ownerView={true} signUpsView = {false} 
    tagColor = {categoryToColor[event.category]} setLoading = {setLoading} username={currLogin}/>
  )
}): null 
// <h1 className = "center-screen">"No events created yet"</h1>
const displaySignUps = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} setEvents = {setEvents} ownerView={false} signUpsView = {true}
    tagColor = {categoryToColor[event.category]} setLoading = {setLoading} username={currLogin}/>
  )
}): null
//<h1 className = "center-screen">No current sign-ups</h1>

const topNav = 
 <Navbar className="Navbar">
  <Navbar.Brand><Button onClick = {activitiesClicked} id = "logo"><img alt="" src={tiger} width="60" height="60"
                className="d-inline-block align-top"
                /> {' '}</Button></Navbar.Brand>
  <Navbar.Brand ><Button className="titleLink" onClick={activitiesClicked}>{title}</Button> </Navbar.Brand>

  <div className = "buttonsSec">
  <Navbar.Brand><Button onClick={activitiesClicked}>Explore Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={myActivitiesClicked}>My Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={mySignUpsClicked}>My Sign-Ups</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={profileClicked}>Profile</Button></Navbar.Brand>
  </div>
</Navbar>

const results = refresh ? (displayEvents) : null

const showResults = clickedActivities? (
 
    displayEvents
  

  ): null

  const showCreateEventButton = clickedMyActivities? (

    createEventButton
  

  ): null

  const showOwnerActivities = clickedMyActivities ? (
    displayOwnerEvents

  ): null
  const showSignUps = clickedMySignUps ? (
    displaySignUps
  ): null

  const showFilter = clickedActivities || initialState ? (
  
          <Filter getEvents={getEvents} />



  ): null

  const showNote = !clickedProfile ? (
    <h3><text className = 'note'>Note: The activities shown are the ones within the next 5 days</text></h3>
  ): null

  const showProfile = clickedProfile ? <Profile 
    // name={profileData[0]}
    netid={currLogin}
    // phone={profileData[1]}
    // email={profileData[2]}
    // classYear={profileData[3]}
    profileData={profileData}
    getProfileData={getProfileData}
    /> : null

  const dropDowns = (filter, items) => (
    <Dropdown filter = {filter} items = {items}></Dropdown>
  )

  const showLoading = loading ? <ClipLoader loading={loading} size={200}/> : null
 
  return (
    <div className="page">
      {topNav}
      {showFilter}
      {showCreateEventButton}
      {showNote}
      <div className="content"> 
        {showResults}
        {showProfile}
        {results}
        {!loading ? showOwnerActivities : showLoading}
            {showSignUps}
            {modal}
      </div>
      {!clickedProfile?  displayPagination : null}
    </div>
    
  );
};