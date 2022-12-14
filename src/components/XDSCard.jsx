import React, {useState} from 'react';
import EditEventDialog from "./EditEventDialog";
import {Button, Row, Col, Card, Table} from 'react-bootstrap';
import useCollapse from 'react-collapsed';
import SignUpModal from './SignUpModal';
import CancelSignUpModal from './CancelSignUpModal';
import "./Home.css";
import axios from 'axios';
import { propTypes } from 'react-bootstrap/esm/Image';

const XDSCard = ({item, setEvents, setPaginatedEvents, setLoading, pageSize, ownerView, signUpsView,name, phone, email, tagColor, username}) => {
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
    const [isCurrUserSignedUp, setIsCurrUserSignedUp] = useState(false)
    const backgroundColor = tagColor

    
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
  }
  
  const editModal = displayModal ? (<EditEventDialog setOpenModal = {setDisplayModal} setLoading ={setLoading} setEvents ={setEvents} 
    setPaginatedEvents = {setPaginatedEvents} pageSize = {pageSize} events = {item} />) : null 

  const signUpModal = displaySignUp ? (<SignUpModal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id}
    name={name}
    phone={phone}
    email={email}
    />): null

   const cancelModal = displayCancel ? (<CancelSignUpModal setOpenCancelModal={setDisplayCancel} setLoading = {setLoading} setEvents ={setEvents} 
      event_id={id} title = {eventTitle} />) : null 

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.get('/attendees', {params: {
      event_id : event.id,
    }}).then(res =>{ 
            setAttendees(res.data)
            console.log("Iterating thorugh attendees:", res.data)
            for (const attendee of res.data) {
              console.log("Attendee:", attendee)
              if (attendee["netid"] === username){
                setIsCurrUserSignedUp(true)
              }
            }     
    }).catch(err =>{
      console.log(err)
    
    })
  }
  get_attendees(id)
  const closed = item.signup_number === item.maxcap ? (<p>{closedText}</p>) : null

  return (
    <>
    <Card className='customized-card'>
      <Card.Body>
        <Card.Title> <h2>{item.event_name}{closed}</h2></Card.Title>
        <Card.Subtitle> <h5><a className='tag' style={{'backgroundColor': backgroundColor}}><text className='white'>{item.category}</text></a></h5></Card.Subtitle>
        <Card.Text> 
                <Row>
                <h5 className='date'><strong>{numToDay[item.week_day]} {numToMonth[item.start_date.split("/")[1]]} {item.start_date.split("/")[2]}, {item.start_time}</strong></h5>
                </Row>
                <Row>
          <Col><strong>End time : </strong>{item.end_time}</Col>
          <Col><strong>Location : </strong>{item.location}</Col>
            
          </Row>
        </Card.Text>
        <Row>
            <Col><p {...getCollapseProps()}><strong>Number of attendees :</strong> {item.signup_number}/{item.maxcap}</p></Col>
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
                         onClick={handleSignUp} disabled={item.signup_number === item.maxcap}>Sign Up</Button> 
                        
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
              {ownerView ? (<Button variant="warning" onClick={handleEdit}> Edit</Button>):null}
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
    </>
  )
}

export default XDSCard