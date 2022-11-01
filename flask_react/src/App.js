import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/home",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        id: res.id,
        event_name: res.event_name,
        start_time: res.start_time,
        end_time: res.end_time,
        maxcap:res.maxcap,
        creator:res.creator,
        category:res.category,
        location:res.location,
        description:res.description,
        cost:res.cost,
        day:res.day,
        signup_number:res.singup_number
      }))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>To display one event:</p>
        <buton onClick={getData}>Click me</buton>
        {
          profileData && <div>
            <p>Category: {profileData.category}</p>
            <p>Location: {profileData.location}</p>
            <p>Start Time: {profileData.start_time}, {profileData.day}</p>
            <p>Created By: {profileData.creator}</p>
            <p>Nr. of Attendees: {profileData.signup_number}</p>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
