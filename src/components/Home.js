import React, {useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import DetailsModal from "./DetailsModal";
// import Modal from "./Modal";
import "./Home.css";
import axios from 'axios';


// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [clickedActivites, setClickedActivities] = useState(false)
  const [clickedMyActivites, setClickedMyActivities] = useState(false)
  const [events, setEvents] = useState([])
  const [displayModal, setDisplayModal] = useState(false)
  const [displayMoreDetails, setDisplayMoreDetails] = useState(false)
  const [event, setEvent] = useState(null)
  const [attendees, setAttendees] = useState([])

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
/*
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
  })
  */
  

  

axios.get('/events').then(res =>{
  console.log("Events received from db:", res)
  console.log("Setting events to:", res.data)
  setEvents([])
  if (ownerView === true) {
    setEvents(res.data.filter(event => event.creator == currLogin))
  } else {
    setEvents(res.data)
  }
}).catch(err =>{
  console.log("Error receiving event from db:", err)
})

}
const get_attendees = (event)=>{
  console.log("inside get atte")
  axios.post('/attendees', {
    event_id : event.id,
  }).then(res =>{
    setAttendees(res.data)
  }).catch(err =>{
    console.log(err)
  
  })
}

const handleMoreDetails = (event)=>{
  setDisplayMoreDetails(true)
  setEvent(event)
 get_attendees(event)
}

  const title = <h1><i>TigerActivities </i></h1>
  const activities = <button className="button" onClick={activitesClicked}>Activities</button>
  const myActivities = <button className="button" onClick={myActivitesClicked}>My Activities</button>
  const createEventButton = <button className="buttonStyle" onClick={handleCreateEvent}>Create Activity</button>
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal}/>) : null
  const details = displayMoreDetails ? (<DetailsModal setOpenModal = {setDisplayMoreDetails} event = {event} attendees ={attendees}/>):null

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


let currLogin = "DefaultCreator"
const displayOwnerEvents = events.filter(event => event.creator === currLogin).map((event)=> (
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
          <table className="center">
            <tr>
          <td>{showCreateEventButton}</td>
          </tr>
          <tr>
          <td>
            {showResults}
            </td> </tr>
            <tr><td>
            {showOwnerActivities}
            </td></tr>
            </table> 
        </div>
       {modal}
       {details}
    </div>
    
  );
};
  
// export default Home;