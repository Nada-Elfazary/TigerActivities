import React, {useState} from 'react';
import {Button, Form, Row, Col, Card} from 'react-bootstrap';
import useCollapse from 'react-collapsed';
import Modal from './Modal';
import "./Home.css";
import axios from 'axios';

const XDSCard = ({item, ownerView, signUpsView}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [eventTitle, setEventTitle] = useState('')
    const [id, setEventId] = useState('')
    const [attendees, setAttendees] = useState([])
    const closedText = "(CLOSED)"

    const numToDay = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 
    3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}

    const numToMonth = {1: "Jan.", 2: "Feb.", 3: "Mar.", 4: "Apr.", 5: "May",  
    6: "June", 7: "July", 8: "Aug.", 9: "Sept.", 10: "Oct.", 11: "Nov.", 12: "Dec.",  
  }
    
  const handleSignUp = ()=>{
    setDisplaySignUp(true)
    setEventTitle(item.event_name)
    setEventId(item.id)
  
  }

  const handleCancellation = ()=>{
    console.log("canceling sign-up")
    console.log(item.id)
    console.log(item.event_name)

     axios.post('/cancel-sign-up', {
      event_id : item.id,
    }).then(res =>{
      console.log(res)
    }).catch(err =>{
      console.log(err)
    
    })
  }
  

  const signUpModal = displaySignUp ? (<Modal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id}/>): null

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.get('/attendees', {params: {
      event_id : event.id,
    }}).then(res =>{
        if(res.data.length === 0){
            setAttendees("No sign ups yet")
        }
        else{
            setAttendees(res.data)
        }
    }).catch(err =>{
      console.log(err)
    
    })
  }
  const closed = item.signup_number === item.maxcap ? (<p>{closedText}</p>) : null
  return (
    <>
    <Card className='customized-card'>
      <Card.Body>
        <Card.Title> <h2>{item.event_name}{closed} </h2></Card.Title>
      </Card.Body>
    </Card>
    </>
  )
}

export default XDSCard
