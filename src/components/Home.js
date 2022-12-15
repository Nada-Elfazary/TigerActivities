import React, {useEffect, useState} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import CreateEventDialog from "./CreateEventDialog";
import {Button, Navbar, Container, Pagination, Card} from 'react-bootstrap'
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
  const [clickedActivites, setClickedActivities] = useState(false)
  const [clickedMyActivites, setClickedMyActivities] = useState(false)
  const [clickedMySignUps, setClickedMySignUps] = useState(false)
  const [clickedProfile, setClickedProfile] = useState(false)
  const [events, setEvents] = useState([])
  const [username, setUserName] = useState("")
  const [displayModal, setDisplayModal] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [nameFilter, setNameFilter] = useState('')
  // let currLogin = "Nada"
  const [profileData, setProfileData] = useState(["","",""])
  const [paginatedEvents, setPaginatedEvents] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // const [updateProfileMsg, setUpdateProfileMsg] = useState("")
  const pageSize = 9;
 //let profileData = ['', '', '', '']
  const navigate = useNavigate()

  const categoryToColor = {'Sports': "DeepSkyBlue", 'Entertainment': "slateblue", 'Academic': "orange", 'Off-campus': "olive", 'Outdoors': "navy",  
  'Meals/Coffee Chats': "maroon", 'Nassau Street': "green", 'Social': "tomato"} 

  useEffect(()=>{
    cas()
    // setRefresh(true)
    activitesClicked()
    setEvents([])
    getProfileData()
    // console.log("user on page is", user)
    
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
  axios.get('https://tigeractivities.onrender.com/user-sign-ups').then((res) =>{
    console.log("in sign-up")
    setEvents(res.data)
    setPaginatedEvents(_(res.data).slice(0).take(pageSize).value())
    setLoading(false)
  }).catch(err =>{
    console.log("Inside Home.js. Error receiving user sign ups:", err)
    navigate("/error")
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
  setCurrentPage(1)
  getEvents(false, '')
  
  
}

// const updateProfileMessage= (msg) => {
//   setUpdateProfileMsg(msg)
// }

const cas = ()=>{ 
  console.log("inside cas")
  fetch('https://tigeractivities.onrender.com/authenticate').then((resp)=>
    {return resp.text();}).then((data) => {
    let response = JSON.parse(data)
    console.log('data from cas: ', data)
    if(response.username === ''){
      console.log('redirect url')
      window.location.replace(response.redirect);
      console.log('username: ', response.username)
    } else {
      setUserName(response.username)
      console.log("Username after being set:", username, "real username:", response.username)
      activitesClicked()
    }
  }).catch(err=>{
    console.log(err)
  })
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
  setCurrentPage(1)
  getEvents(true, "")
}

const profileClicked= () =>{
  setInitialState(false)
  setClickedMyActivities(false)
  setClickedActivities(false)
  setClickedMySignUps(false)
  setClickedProfile(true)
  getProfileData(username)
  console.log("Inside profileClicked: set clickedProfile to true.")
}

const handleCreateEvent = () =>{
  setDisplayModal(true);
}


const getEvents = (ownerView, name, day, category, cost, capMin, capMax)=> {
  setLoading(true)
  axios.get('https://tigeractivities.onrender.com/events', {params: {title: name, day: day, category: category, cost: cost, capMin: capMin, capMax: capMax}}).then(res =>{
    console.log("Events received from db:", res)
    setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === username)
      console.log("length: ", filtered.length)
      if (filtered.length !== 0) {
        console.log("Setting events to:", filtered)
        setEvents(filtered)
        setPaginatedEvents(_(filtered).slice(0).take(pageSize).value())
      }
      else {
        console.log("No events created by owner")
        setPaginatedEvents([])
      }
    } else {
      let explored = res.data.filter(event => event.creator !== username)
      console.log("Setting events to:", explored)
      console.log("username in get events", username)
      setEvents(explored)
      setPaginatedEvents(_(explored).slice(0).take(pageSize).value())
    }
    setLoading(false)
  }).catch(err =>{
    console.log("Inside Home.js. Error receiving event from db:", err)
    navigate("/error")
  })
}

const getProfileData = (netid) => {
  axios.get('https://tigeractivities.onrender.com/profile', {params:{
          netid: netid
      }
  })
  .then((response) => {
      if (response.length === 0 || response.data.email==="") {
          setProfileData(["", "", ""])
          // redirect to profile page and set some kind of warning
          // setUpdateProfileMsg("Please update your profile information.")
          // profileClicked()

      }
      else {
          console.log("Response is:",response)
          console.log(response.data)
          setProfileData ([response.data.name, response.data.phone, response.data.email])
          // setUpdateProfileMsg("")
          console.log("Profile Data in axios:", profileData)
      }
  }).catch(err =>{
      console.log("Inside Home.js. Error receiveing profile information from db for user:",netid, err)
      navigate("/error")
  })

}


const handleLogout = ()=>{
  axios.get('/logoutapp').then(res =>{
    console.log(res)
    let response = res.data
    console.log("logged out")
    window.location.replace(response.redirect)
  }).catch(
    err=>{
      console.log("Inside Home.js. Error recieving logout info from db:", err)
      navigate("/error")
    }
  )
}


  const title = <h1><b>TigerActivities </b></h1>
 
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
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal} setLoading ={setLoading} setEvents ={setEvents} setPaginatedEvents = {setPaginatedEvents}
    pageSize = {pageSize} username={username} />) : null 


  const displayEvents = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
    return (
  
      <XDSCard key ={index} item ={event} ownerView={false} signUpsView = {false} setLoading = {setLoading}
      name={profileData[0]}
      phone={profileData[1]}
      email={profileData[2]}
      tagColor = {categoryToColor[event.category]}/>
    )
  }): <h1 className = "center-screen">No events created yet</h1>
  const displayOwnerEvents = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
    return (
      <XDSCard key ={index} item={event} setEvents = {setEvents} setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize} ownerView={true} signUpsView = {false} 
      tagColor = {categoryToColor[event.category]} setLoading = {setLoading} username={username}/>
    )
  }): <h1 className = "center-screen">No events created yet</h1>
  const displaySignUps = paginatedEvents.length !== 0 ? paginatedEvents.map((event, index)=>{
    return (
      <XDSCard key ={index} item={event} setEvents = {setEvents} setPaginatedEvents = {setPaginatedEvents} ownerView={false} signUpsView = {true}
      tagColor = {categoryToColor[event.category]} setLoading = {setLoading} pageSize={pageSize}/>
    )
  }): <h1 className = "center-screen">No current sign-ups</h1>

const topNav = 

 <Navbar className="Navbar">
  <Navbar.Brand><Button onClick = {activitesClicked} id = "logo"><img alt="" src={tiger} width="60" height="60"
                className="d-inline-block align-top"
                /> {' '}</Button></Navbar.Brand>
  <Navbar.Brand><Button className="titleLink" onClick={activitesClicked}>{title}</Button></Navbar.Brand>

  <div className = "buttonsSec">
  <Navbar.Brand><strong>{username}</strong></Navbar.Brand>
  <Navbar.Brand><Button onClick={activitesClicked}>Explore Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={myActivitesClicked}>My Activities</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={mySignUpsClicked}>My Sign-Ups</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={profileClicked}>Profile</Button></Navbar.Brand>
  <Navbar.Brand><Button onClick={handleLogout}>Logout</Button></Navbar.Brand>
  </div>
</Navbar>
// const results = refresh ? (displayEvents) : null

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

  // const showNote = !clickedProfile ? (
  //   <h3><text className = 'note'>Note: The activities shown are the ones within the next 5 days</text></h3>
  // ): null

  const showProfile = clickedProfile ? <Profile 
    netid={username}
    profileData={profileData}
    getProfileData={getProfileData}
    // updateProfileMsg={updateProfileMessage}
    /> : null


  const dropDowns = (filter, items) => (
    <Dropdown filter = {filter} items = {items}></Dropdown>
  )

  // const showUpdateProfile = updateProfileMsg!==""?
  // <Card className="updateProfileMessage" variant="Info">
  //   <Card.Title>{updateProfileMsg}</Card.Title>
  // </Card>:null

  const showLoading = <ClipLoader loading={loading} size={200}/>

  return (
    <div className="page">
      {topNav}
      {showFilter}
      {/* {showUpdateProfile} */}
      {showCreateEventButton}
      {/* {showNote} */}
      <div className="content"> 
        {showResults}
        {showProfile}
        {/*!loading ? results : showLoading*/}
        {!loading ? showOwnerActivities : showLoading}
            {showSignUps}
            {modal}
      </div>
      {!clickedProfile?  displayPagination : null}
    </div>
    
  );
};