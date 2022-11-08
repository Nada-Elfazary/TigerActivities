import React, {useState} from "react";
import "./Home.css";
import axios from 'axios';

// importing Link from react-router-dom to navigate to 
// different end points.
  
export default function  Home() : React.ReactNode {
  const [clickedActivites, setClickedActivities] = useState(false)
  const [events, setEvents] = useState([])

const activitesClicked= ()=>{
  setClickedActivities(true)
  getEvents()
  check()
}
const check= ()=>{
  console.log(events)
}

const getEvents =()=> {
  axios({
    method: "GET",
    url:"/home",
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

  const title = <h1><i>TigerActivities </i></h1>
  const activities = <button className="button" onClick={activitesClicked}>Activities</button>
  const myActivities = <button className="button">My Activities</button>
  const displayEvents = events.map((event)=> (
    /*
    <div className="center">
  <table>
    <tbody>
    <tr>
      <td><strong>Event Name</strong></td>
      <td><strong>Category</strong></td>
      <td><strong>Creator</strong></td>

    </tr>
    <tr key={event.category+" "+ event.id}>
      <td>
        <strong>{event.event_name}</strong>
      </td>
      <td>
      {event.category}
      </td>
      <td>
        {event.creator}
      </td>
      <td><button onClick={()=>{
      }}>Sign Up</button></td>
    </tr>
    </tbody>
  </table>
  </div>
  */
 <div className="center">
  here
 </div>
  ) 
)

const showResults = clickedActivites? (
 
    displayEvents
  

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
        {showResults}
       </div>
      </div>

  );
};
  
// export default Home;