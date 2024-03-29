import React, {useState} from 'react';
import EditEventDialog from "./EditEventDialog";
import {Button, Row, Col, Card, Table} from 'react-bootstrap';
import useCollapse from 'react-collapsed';
import SignUpModal from './SignUpModal';
import DeleteEventModal from './DeleteEventModal'
import CancelSignUpModal from './CancelSignUpModal';
import "./Home.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

const XDSCard = ({item, getEvents, setEvents, setPaginatedEvents, setLoading, getSignUps, pageSize, ownerView, signUpsView,name, phone, email, tagColor, username, setSignUpSuccess}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [eventTitle, setEventTitle] = useState('')
   // const [events, setEvents] = useState([])
    const [displayModal, setDisplayModal] = useState(false)
   //const [loading, setLoading] = useState(false)
    const [id, setEventId] = useState('')
    const [attendees, setAttendees] = useState([])
    const [displayCancel, setDisplayCancel] = useState(false)
    const [displayDelete, setDisplayDelete] = useState(false)
    const [isCurrUserSignedUp, setIsCurrUserSignedUp] = useState(false)
    const backgroundColor = tagColor
    let stHourTime = item.start_time.split(':')[0]
    let stMinTime = item.start_time.split(':')[1]
    let stAmPm = 'AM'
    let enHourTime = item.end_time.split(':')[0]
    let enMinTime = item.end_time.split(':')[1]
    let enAmPm = 'AM'

    console.log('num of attendees original: ', item.signup_number)
    if (stHourTime > 12) {
      stAmPm = 'PM'
    }
    if (enHourTime > 12) {
      enAmPm = 'PM'
    }

    stHourTime = stHourTime % 12
    enHourTime = enHourTime % 12

    console.log('XDS card props: ', setSignUpSuccess)

    const navigate = useNavigate()
   // const [activityData, setActivityData] = useState(["","","","","","","",""])
  //  const [displayEditModal, setDisplayEditModal] = useState(false)
    const closedText = "(CLOSED)"

    // console.log(item.event_name, 'color: ', tagColor)


    const numToDay = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 
    3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}

    const numToMonth = {1: "Jan.", 2: "Feb.", 3: "Mar.", 4: "Apr.", 5: "May",  
    6: "June", 7: "July", 8: "Aug.", 9: "Sept.", 10: "Oct.", 11: "Nov.", 12: "Dec."}

    
  const handleSignUp = ()=>{
    setDisplaySignUp(true)
    setEventTitle(item.event_name)
    setEventId(item.id)
    get_attendees(item.id)
    setExpanded(false)
  
  }


  const handleCancellation = () => {
    console.log("canceling sign-up")
    console.log(item.id)
    console.log(item.event_name)
    setDisplayCancel(true)
    setEventTitle(item.event_name)
    setEventId(item.id)
    setIsCurrUserSignedUp(false) 
  }

  const handleEdit = ()=>{
    console.log("editing event")
    console.log(item.id)
    console.log(item.event_name)
    setDisplayModal(true);
    console.log("display modal state: ", displayModal)
    setExpanded(false)
  }

  const handleDelete = ()=>{
    console.log("delete clicked")
    console.log(item.id)
    console.log(item.event_name)
    setDisplayDelete(true);
    setEventTitle(item.event_name)
    setEventId(item.id)
    console.log("display modal state: ", displayDelete)
    setExpanded(false)
  }
  
  const editModal = displayModal ? (<EditEventDialog setOpenModal = {setDisplayModal} getEvents = {getEvents} setLoading ={setLoading} setEvents ={setEvents} 
    setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize} events = {item} username={username}/>) : null 

  const deleteModal = displayDelete ? (<DeleteEventModal setOpenDeleteModal = {setDisplayDelete} getEvents = {getEvents} setLoading = {setLoading} setEvents ={setEvents} 
    event_id={id} title = {eventTitle} setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize}/>) : null 

      
  const signUpModal = displaySignUp ? (<SignUpModal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id} setSignUpSuccess = {setSignUpSuccess}
    username={username}
    name={name}
    phone={phone}
    email={email}
    />): null

   const cancelModal = displayCancel ? (<CancelSignUpModal setOpenCancelModal={setDisplayCancel} setLoading = {setLoading} setEvents ={setEvents} getSignUps = {getSignUps}
      event_id={id} title = {eventTitle} setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize}/>) : null 

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.get('/api/attendees', {params: {
      event_id : event.id,
    }}).then(res =>{ 
            setAttendees(res.data)
            let isSignedUp = false
            console.log("Iterating thorugh attendees:", res.data)
            console.log("looking to match username:", username)
            for (const attendee of res.data) {
              console.log("Attendee:", attendee)
              if (attendee["netid"] === username){
                isSignedUp = true
              }
              console.log("set current user's signed up status to", isSignedUp)
              setIsCurrUserSignedUp(isSignedUp)
            }     
    }).catch(err =>{
      console.log("Inside XDSCard.js error receiveing attendees:", err)
      navigate("/error")
    
    })
  }
  const closed = attendees.length === item.maxcap && !(attendees.length ===1 && attendees[0]["netid"] === "No Sign Ups Yet") ? (<p>{closedText}</p>) : null

  return (
    <>
    <Card className='customized-card'>
      <Card.Body>
        <Card.Title> <h2>{item.event_name}{closed}</h2></Card.Title>
        <Card.Subtitle> <h5><a className='tag' style={{'backgroundColor': backgroundColor}}><text className='white'>{item.category}</text></a></h5></Card.Subtitle>
        <Card.Text> 
                <Row>
                <h5 className='date'><strong>{numToDay[item.start_week_day]} {numToMonth[parseInt(item.start_date.split("/")[1])]} {item.start_date.split("/")[2]}, {stHourTime}:{stMinTime} {stAmPm}</strong></h5>
                </Row>
                <Row>
          <Col><strong>End time : </strong>{numToDay[item.end_week_day]} {numToMonth[parseInt(item.end_date.split("/")[1])]} {item.end_date.split("/")[2]}, {enHourTime}:{enMinTime} {enAmPm}</Col>
          <Col><strong>Location : </strong>{item.location}</Col>
            
          </Row>
        </Card.Text>
        <Row>
            <Col><p {...getCollapseProps()}><strong>Number of attendees :</strong> {
            attendees.length ===1 && attendees[0]["netid"] === "No Sign Ups Yet"? 0:attendees.length
            }/{item.maxcap}</p></Col>
            <Col><p {...getCollapseProps()}><strong>Estimated Cost : </strong>$ {item.cost}</p></Col>
          </Row>
        <Card.Text>
          <Row>
            <Col><p {...getCollapseProps()}>
        
                        <strong>Description: </strong>{item.description}
                 
                           </p> </Col>

          <Col>
          {(!ownerView && !signUpsView) ? (<p {...getCollapseProps()}>
                        {isCurrUserSignedUp?
                        <Button variant="success" disabled>Signed Up</Button>
                        :
                         <Button  
                         variant="warning"
                         onClick={handleSignUp} disabled={
                          attendees.length ===1 && attendees[0]["netid"] === "No Sign Ups Yet"? false: 
                          attendees.length === item.maxcap}>Sign Up</Button> 
                        
                        }
                                  
                           </p>) : null }  
         
            </Col>
          </Row>
          <Row>
              <Col>
              {ownerView ? (
                            <p {...getCollapseProps()}>
                                <strong>Attendees</strong> :
                                <Table  responsive="sm" striped bordered hover variant="light">
                                  <thead>
                                  <tr>
                                  <th> Name</th>
                                  <th>NetId</th>
                                  <th>Email</th>
                                  <th>Phone Number</th>
                                </tr>
                                  {attendees.map((attendee)=>{
                                    return (
                                      <tr key ={attendee.netid}>
                                        <td>{attendee.name}</td>
                                        <td>{attendee.netid}</td>
                                        <td>{attendee.email}</td>
                                        <td>{attendee.number}</td>
                                      </tr>
                                    )
                                  })}
                                  </thead>
                                </Table>
                            </p>) : null }
              </Col>
            </Row>
          </Card.Text>
          <Card.Text>
            <Row>
          <Col><Button className='Button'
          variant="warning"
        {...getToggleProps({
          onClick: () =>{ setExpanded((prevExpanded) => !prevExpanded)
        get_attendees(item)},
        })}
      >
        {isExpanded ? 'Less Details' : 'More Details'}
        
      </Button></Col>
      <Col>
      <Col></Col>
      </Col>

            <Col>{!ownerView ? (<p {...getCollapseProps()} className = "creator">
              <strong>Created by : {item.creator}</strong></p>):null}
              {ownerView ? (<Button variant="warning" onClick={handleEdit}> Edit</Button>):null} </Col>
             <Col> {ownerView ? (<Button variant="warning" class = "buttonShift" onMouseEnter={(e) => e.target.style.background = 'red'} onClick={handleDelete}
              onMouseLeave={(e) => e.target.style.background = ''}>Delete</Button>):null}
               {(!ownerView && signUpsView) ? (
                        <Button 
                        variant="warning"
                        class = "buttonShift" onMouseEnter={(e) => e.target.style.background = 'red'}  onClick={(handleCancellation)} onMouseLeave={(e) => e.target.style.background = ''} >Cancel</Button>
                           ) : null 
                           }
              </Col>
            </Row> 
      </Card.Text>
      </Card.Body>
    
    </Card>
    {signUpModal}
    {editModal}
    {cancelModal}
    {deleteModal}
    </>
  )
}

export default XDSCard