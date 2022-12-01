import React, {useState} from 'react';
import {Button, Row, Col, Card, Table} from 'react-bootstrap';
import useCollapse from 'react-collapsed';
import SignUpModal from './SignUpModal';
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
  

  const signUpModal = displaySignUp ? (<SignUpModal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id}/>): null

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.get('/attendees', {params: {
      event_id : event.id,
    }}).then(res =>{ 
            setAttendees(res.data)
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
        <Card.Text> 
                <Row>
                  <Col><strong>Category: </strong> {item.category}</Col>
                  <Col><strong>Location : </strong>{item.location}</Col>
                </Row>
        </Card.Text>
        <Card.Text>
          <Row>
            <Col><strong>Start date : </strong>{numToDay[item.week_day]} {numToMonth[item.start_date.split("/")[1]]} {item.start_date.split("/")[2]}</Col>
            <Col><strong>Created by :</strong> {item.creator}</Col>
          </Row>
        </Card.Text>
        <Card.Text>
          <Row>
            <Col><strong>Start time : </strong>{item.start_time}</Col>
            <Col><strong>Number of attendees :</strong> {item.signup_number}/{item.maxcap}</Col>
          </Row>
        </Card.Text>
        <Card.Text>
          <Row>
            <Col><strong>End time : </strong>{item.end_time}</Col>
            <Col><strong>Estimated Cost : </strong>$ {item.cost} </Col>
          </Row>
        </Card.Text>
        <Card.Text>
          <Row>
            <Col><p {...getCollapseProps()}>
                        <strong>Description: </strong>{item.description}
                 
                           </p> </Col>

          <Col>
          {(!ownerView && !signUpsView) ? (<p {...getCollapseProps()}>
                        <Button  
                        variant="warning"
                        onClick={handleSignUp} disabled={item.signup_number === item.maxcap}>Sign Up</Button>            
                           </p>) : null }   {(!ownerView && signUpsView) ? (<p {...getCollapseProps()}>
                        <Button 
                        variant="warning"
                        class = "buttonShift" onClick={handleCancellation}>Cancel</Button>            
                           </p>) : null }
            </Col>
          </Row>
          </Card.Text>
          <Card.Text>
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
          <Button
          variant="warning"
        {...getToggleProps({
          onClick: () =>{ setExpanded((prevExpanded) => !prevExpanded)
        get_attendees(item)},
        })}
      >
        {isExpanded ? 'Less Details' : 'More Details'}
      </Button>
      </Card.Text>
      </Card.Body>
    
    </Card>
    {signUpModal}
    </>
  )
}

export default XDSCard
