import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, InputGroup, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import "bootstrap/dist/css/bootstrap.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import axios from 'axios';
import "./CreateEventDialog.css"
import { useNavigate } from "react-router-dom";
import _ from "lodash"

function EditEventDialog(props) {
    console.log('edit dialog props', props)
    const backendStartDate = props.events.start_date.split("/")
    const startDate = backendStartDate[0] + " " + backendStartDate[1] + " " + backendStartDate[2] + " " + String(props.events.start_time)
    const backendEndDate = props.events.end_date.split("/")
    const endDate = backendEndDate[0] + " " + backendEndDate[1] + " " + backendEndDate[2] + " " + String(props.events.end_time)
    const DEFAULT_SIGNUP_NR = 0
    const[eventTitle, setEventTitle] = useState(props.events.event_name)
    const[eventLocation, setEventLocation] = useState(props.events.location)
    const [eventCategory, setEventCategory] = useState(props.events.category)
    const[maxAttendeeCount, setMaxAttendeeCount] = useState(props.events.maxcap)
    const [startTime, setStartTime] = useState(new Date(startDate))
    const [endTime, setEndTime] = useState(new Date(endDate))
    const [cost, setCost] = useState(props.events.cost)
    const [description, setDescription] = useState(props.events.description)
    const [saving, setSaving] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)



    const navigate = useNavigate()
  /*  const getEvents =  (ownerView, name, day, category, cost, capMin, capMax)=> {
      props.setLoading(true)
  
  // axios.get('https://tigeractivities.onrender.com/events').then(res =>{
    axios.get('/api/events', {params: {title: name, day: day, category: category, cost: cost, capMin:capMin, capMax: capMax}}).then(res =>{
    props.setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === props.username)
      if (filtered.length !== 0) {
      props.setEvents(filtered)
      props.setPaginatedEvents(_(filtered).slice(0).take(props.pageSize).value())
      }
      else {
        props.setEvents([])
        props.setPaginatedEvents([])
      }
    } else {
      let filtered = res.data.filter(event => event.creator !== props.username)
      props.setEvents(filtered)
      props.setPaginatedEvents(_(filtered).slice(0).take(props.pageSize).value())
    }
    props.setLoading(false)

  }).catch(err =>{
    navigate("/error")
  })
}*/
   
    const submitForm = ()=>{
        axios.post('/api/edit-activity', {
            event_id:      props.events.id,
            event_name:    eventTitle,
            start_time:    startTime.toString(),
            end_time:      endTime.toString(),
            maxcap:        maxAttendeeCount,
            category:      eventCategory,
            location:      eventLocation,
            description:   description,
            cost:          cost,
            signup_number: DEFAULT_SIGNUP_NR,

          })
          .then((response) =>{
            props.getEvents(true, "")
            props.setOpenModal(false)
          }, (error) => {
            setErrorMsg(error)
            navigate("/error")
          })
    }

    const failureCallBack = (error)=>{
    setErrorMsg(error)
     setShowErrorMsg(true)
    }
    const successCallBack = ()=>{
     setShowErrorMsg(false) 
     setErrorMsg(null)
      setSaving(true)
      submitForm()
          }
    const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null
    
    const createEventModal =<Container fluid> <Modal show={props.setOpenModal} dialogAs={CreateEventModalDraggable} onHide={()=>{
      props.setOpenModal(false)
    }} size="sm-5"
    aria-labelledby="contained-modal-title-center"
    centered>
      <Modal.Header closeButton  style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title>Edit Your TigerActivity</Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
          <Row><Col><strong><text className="error">Note: It is your responsibility to contact previously 
          signed up users and notify them of the changes made</text></strong></Col></Row>
          <br></br>
            <Row>
              <Col><Form.Label>Title: </Form.Label></Col>
              
              <Col><Form.Control type="text" id = "title" name="title" value={eventTitle} onChange={(event)=>{
                       document.getElementById('title').classList.remove("error");
                       document.getElementById('title').placeholder = '';
                       if (event.target.value.length <= 100) {
                             setEventTitle(event.target.value)
                       }
                    }}></Form.Control>
</Col>
            </Row>
            
          </Form.Group>
          <Form.Group>
            <Row>
              <Col><Form.Label>Location:</Form.Label></Col>
              <Col><Form.Control type="text" id = "location" name="Location" value ={eventLocation} onChange={(event)=>{
                        document.getElementById('location').classList.remove("error");
                        document.getElementById('location').placeholder = '';
                       if(event.target.value.length <= 100) {
                        setEventLocation(event.target.value)
                    }
                    }}></Form.Control></Col>
            </Row>
            
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Category:</Form.Label>
              </Col>
              <Col><Form.Select type="text" id = "category" name="Category" value ={eventCategory} onChange={(event)=>{
                        document.getElementById('category').classList.remove("error");
                        document.getElementById('category').placeholder = '';
                        if (event.target.value === "Select a Category"){
                          setEventCategory("")
                        }
                        else {
                          setEventCategory(event.target.value)
                        }
                    }}>
                      <option>Select a Category</option>
                      <option>Sports</option>
                      <option>Entertainment</option>
                      <option>Academic</option>
                      <option>Off-campus</option>
                      <option>Outdoors</option>
                      <option>Meals/Coffee Chats</option>
                      <option>Nassau Street</option>
                      <option>Social</option>
                    </Form.Select>
                </Col>
            </Row>
            
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Start Time:</Form.Label> </Col>
              <Col><Flatpickr 
                    
                     data-enable-time 
                     id = "start-time"
                     class = "customFlatpickr"
                     value={startTime} 
                     defaultValue = {startDate}
                     options={ { minDate: "today" ,
                     maxDate: new Date().fp_incr(5)
                   } } 
                     onChange={(event) => 
                     {
                        document.getElementById('start-time').classList.remove("error");
                        document.getElementById('start-time').placeholder = '';
                        setStartTime(new Date(event))
                     }} /></Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>End Time:</Form.Label></Col>
              <Col><Flatpickr
                     data-enable-time 
                      id = "end-time"
                      class = "customFlatpickr"
                    defaultValue = {endDate}

                     onChange={(event) => 
                     {
                        setEndTime(new Date(event))
                        event.target.value = endTime
                        document.getElementById('end-time').classList.remove("error");
                        document.getElementById('end-time').placeholder = '';
                     }} /> </Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Max Attendee Count:</Form.Label></Col>
              <Col><Form.Control type="text" id = "cap" name="Attendee Count" value={maxAttendeeCount} onChange={(event) =>
                        {
                          document.getElementById('cap').classList.remove("error");
                          document.getElementById('cap').placeholder = '';
                          if(event.target.value.length <= 4) {
                            setMaxAttendeeCount(event.target.value)
                          }
                        }}></Form.Control></Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col><Form.Label>Cost:</Form.Label></Col>
              <Col><InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <Form.Control aria-label="Amount (to the nearest dollar)" id= "cost" name="Cost" value={cost} onChange={(event) =>
                        {
                          document.getElementById('cost').classList.remove("error");
                          if(event.target.value.length <= 4) {
                          setCost(event.target.value)
                          } 
                        }}/>
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup></Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Description:</Form.Label></Col>
              <Col><Form.Control as="textarea" id = "descrip" name ="description" value={description} onChange={(event) =>
                      {
                        document.getElementById('descrip').classList.remove("error");
                        if(event.target.value.length <= 1000) {
                        setDescription(event.target.value)
                        } 
                      }}></Form.Control></Col>
            </Row>
          </Form.Group>
          <Form.Group>{errorM}</Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <Button   id="cancelBtn" variant="secondary" onClick={()=>{props.setOpenModal(false)}}>Close</Button>
        <Button variant="primary" disabled = {saving} onClick={()=>{
          let error = 0;
          let errorMsg = []
        if(eventTitle.length === 0 ){
          document.getElementById('title').classList.add("error");
          document.getElementById('title').placeholder = "title cannot be empty";

          error = 1;
        }
        if(eventLocation.length === 0){
          document.getElementById('location').classList.add("error");
          document.getElementById('location').placeholder = "location cannot be empty";

          error = 1;
        }
        if(eventCategory.length === 0){
          document.getElementById('category').classList.add("error");
          error = 1;
        }

        if (isNaN(endTime.getTime)) {
          errorMsg.push("End Date can not be empty. Please fix this \n")
          document.getElementById('end-time').classList.add("error")
          document.getElementById('end-time').value = "End date cannot be empty"
          error = 1;
        }

        if (isNaN(startTime.getTime)) {
          errorMsg.push("Start Date can not be empty. Please fix this \n")
          document.getElementById('start-time').classList.add("error")
          document.getElementById('start-time').value = "Start date cannot be empty"
          error = 1;
        }

       if(!isNaN(endTime.getTime) &&  !isNaN(startTime.getTime) && endTime.getTime() <= startTime.getTime()){
          errorMsg.push("End Date before or equal to start date. Please fix this \n")
          document.getElementById('start-time').classList.add("error")
          document.getElementById('start-time').value = "Start date after or equal to end date"
          document.getElementById('end-time').classList.add("error")
          document.getElementById('end-time').value = "End date before or equal to start date"   
          error = 1;       
        }
         if(cost < 0){
          setCost("")
          document.getElementById('cost').classList.add("error");
          document.getElementById('cost').placeholder = "Cost involved cannot be negative";

          error = 1;
        }
        else if(!/^[0-9]+$/.test(cost)){
            setCost("")
            document.getElementById('cost').classList.add("error");
            document.getElementById('cost').placeholder = "Cost involved must be an integer";
  
            error = 1;
          } else if(cost.length > 4){
            setCost("")
            document.getElementById('cost').classList.add("error");
            document.getElementById('cost').placeholder = "Maximum cost is 9999$.";
            error = 1;
          }

          if(maxAttendeeCount <= 0){
                document.getElementById('cap').classList.add("error");
                setMaxAttendeeCount("")
                document.getElementById('cap').placeholder = "Count negative or zero";
                error = 1;
              } else if (!/^[0-9]+$/.test(maxAttendeeCount)) {
                document.getElementById('cap').classList.add("error");
                setMaxAttendeeCount("")
                document.getElementById('cap').placeholder = "Max is invalid";
                error = 1;
          }

        if(description.length === 0){
              document.getElementById('descrip').classList.add("error");
              document.getElementById('descrip').placeholder = "Description cannot be empty";
    
              error = 1;
            }
       error !== 0 ? failureCallBack("Please fix errors above") : successCallBack()

        }} >Save Changes</Button>
      </Modal.Footer>
    </Modal>
    </Container>
  return (
    <div>
  {createEventModal}
    </div>
  );
}

export default EditEventDialog;