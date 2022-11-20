import React, {useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
// import DetailsModal from "./DetailsModal";
import XDSCard from "./XDSCard"
import "./Home.css";
import axios from 'axios';


// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [clickedActivites, setClickedActivities] = useState(false)
  const [clickedMyActivites, setClickedMyActivities] = useState(false)
  const [events, setEvents] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  // const [displayMoreDetails, setDisplayMoreDetails] = useState(false)
  // const [event, setEvent] = useState(null)
  let currLogin = "Reuben"
const activitesClicked= ()=>{
  if(clickedActivites) {
    setEvents([])
  } 
    setClickedActivities(true)
    setClickedMyActivities(false)
    getEvents(false)
  
}
const myActivitesClicked= ()=>{
  if(clickedMyActivites) {
    setEvents([])
  } 
  setClickedMyActivities(true)
  // setEvent([])
  console.log(">>Clicked my activities<<, events:", events.length, events)
  setClickedActivities(false)
  getEvents(true)
}

const handleCreateEvent = ()=>{
  setDisplayModal(true);
}
const getEvents =(ownerView)=> {
axios.get('/events').then(res =>{
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
}).catch(err =>{
  console.log("Error receiving event from db:", err)
})

}

/*
const handleMoreDetails = (event)=>{
  setDisplayMoreDetails(true)
  setEvent(event)
 get_attendees(event)
 console.log("inside handle")
}

*/

  const title = <h1><i>TigerActivities </i></h1>
  const activities = <button className="button" onClick={activitesClicked}>Activities</button>
  const myActivities = <button className="button" onClick={myActivitesClicked}>My Activities</button>
  const createEventButton = <button className="buttonStyle" onClick={handleCreateEvent}>Create Activity</button>
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal}/>) : null

  // const details = displayMoreDetails ? (<DetailsModal setOpenModal = {setDisplayMoreDetails} event = {event} attendees ={attendees}/>):null

  /*
  const displayEvents = events.map((event)=> (
    <div className="content" key ={event.id + " " + event.category}>
  <table>
    <tbody className="body">
      <tr className="eventName">
        <td></td>
        <td><strong>{event.event_name}</strong> </td>
        <td>id : {event.id}</td>
      </tr>
      <tr key={event.category+" "+ event.id}>
        <td>
          Category:{event.category}
        </td>
        <td></td>
        <td className="location">
        Location : {event.location}
        </td>
      </tr>
    <tr>
   <td> Start time:{event.start_time}</td>
   <td></td>
   <td>   Created By: {event.creator}</td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td> Number Of Attendees:{event.signup_number}/{event.maxcap}</td>
    </tr>
    {moredetails}
    <tr>
      <td></td>
      <td> <button className="moredetails" onClick={()=>{
        handleMoreDetails(event)
      }}>More Details</button></td>
    </tr>
    </tbody>
  </table>
  </div>
  ) 
)
*/

// const displayEvents = events.map((event)=> (
// <div className="content" key ={event.id + " " + event.category}>
//   <div className="event-title-conatiner">
//     <p classname="event-title">{event.event_name}</p>
//   </div>
//   <div classname="category-location-container">
//     <p classname= "event-category">Category : {event.category}</p>
//     <p classname= "event-location">Location : {event.location}</p>
//   </div>
// </div>))

const displayEvents =  events.map((event, index)=>{
  return (
    <XDSCard key ={index} item ={event} ownerView={false}/>
  )
})
const displayOwnerEvents = events.map((event, index)=>{
  return (
    <XDSCard key ={index} item={event} ownerView={true} />
  )
})

/*
const displayOwnerEvents = events.map((event)=> (
  <div className="contents" key ={event.id + " " + event.category}>
<table>
  <tbody className="body">
    <tr className="eventName">
      <td></td>
      <td><strong>{event.event_name}</strong> </td>
      <td>id : {event.id}</td>
    </tr>
    <tr key={event.category+" "+ event.id}>
      <td>
        Category:{event.category}
      </td>
      <td></td>
      <td className="location">
      Location : {event.location}
      </td>
    </tr>
  <tr>
 <td> Start time:{event.start_time}</td>
 <td></td>
 <td>   Created By: {event.creator}</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td> Number Of Attendees:{event.signup_number}/{event.maxcap}</td>
  </tr>
  <tr>
    <td></td>
    <td> <button className="moredetails" onClick={()=>{
      handleMoreDetails(event)
    }}>More Details</button></td>
  </tr>
  </tbody>
</table>
</div>
) 
)
*/

const showResults = clickedActivites? (
 
    displayEvents
  

  ): null

  const showCreateEventButton = clickedMyActivites? (

    createEventButton
  

  ): null

  const showOwnerActivities = clickedMyActivites? (
    displayOwnerEvents

  ): null

  return (
    <div className = "pageContainer">
     <div className='HomeContainer-1'>
     <div className='title'>
          {title}
        
        </div>

      </div>   

      <div className = "LeftNavContainer-1">
        <div className="btn">
        {activities}
        {myActivities}
        </div>
        </div>  
        
        <div className="content">
          {showCreateEventButton}
          {showResults}
          {showOwnerActivities}
          {modal}
         </div>
    </div>
    
  );
};
  
// export default Home;