import React, {useState} from "react";
import CreateEventDialog from "./CreateEventDialog";
import DetailsModal from "./DetailsModal";
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

const activitesClicked= ()=>{
  setClickedActivities(true)
  getEvents()
}
const myActivitesClicked= ()=>{
  setClickedMyActivities(true)
  getEvents()
}

const handleCreateEvent = ()=>{
  setDisplayModal(true);
}
const getEvents =()=> {
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
  console.log(res)
  setEvents(res.data)
}).catch(err =>{
  console.log(err)

})

}
const handleMoreDetails = (event)=>{
  setDisplayMoreDetails(true)
  setEvent(event)
}

  const title = <h1><i>TigerActivities </i></h1>
  const activities = <button className="button" onClick={activitesClicked}>Activities</button>
  const myActivities = <button className="button" onClick={myActivitesClicked}>My Activities</button>
  const createEventButton = <button onClick={handleCreateEvent}>Create Activity</button>
  const modal = displayModal ? (<CreateEventDialog setOpenModal = {setDisplayModal}/>) : null
  const details = displayMoreDetails ? (<DetailsModal setOpenModal = {setDisplayMoreDetails} event = {event}/>):null

  const displayEvents = events.map((event)=> (
    <div className="content" key ={event.id + " " + event.category}>
  <table>
    <tbody className="body">
    <tr>
      <td></td>
      <td><strong>{event.event_name}</strong> </td>

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

  const showOwnerButton = clickedMyActivites? (

    createEventButton
  

  ): null

  return (
    <div>
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
       {showOwnerButton}
       </tr>
        {showResults}
        </table> 
        
       </div>
       {modal}
       {details}
      </div>
    
  );
};
  
// export default Home;