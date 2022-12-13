import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, InputGroup, Container, NavItem} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import "bootstrap/dist/css/bootstrap.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import axios from 'axios';
import "./CreateEventDialog.css"
import "./Home.css";
import _ from "lodash"


function EditEventDialog(props) {
    const backendStartDate = props.events.start_date.split("/")
    const startDate = backendStartDate[0] + " " + backendStartDate[1] + " " + backendStartDate[2] + " " + String(props.events.start_time)
    const backendEndDate = props.events.end_date.split("/")
    const endDate = backendEndDate[0] + " " + backendEndDate[1] + " " + backendEndDate[2] + " " + String(props.events.end_time)
    console.log("start date: ", startDate)
    console.log("end date: ", endDate)
    const MAX_NO_DAYS = 5
    const DEFAULT_CREATOR = "Reuben"
    const DEFAULT_CATEGORY = "Sports"
    const DEFAULT_SIGNUP_NR = 0
    const[eventTitle, setEventTitle] = useState(props.events.event_name)
    const[eventLocation, setEventLocation] = useState(props.events.location)
    const [eventCategory, setEventCategory] = useState(props.events.category)
    const[maxAttendeeCount, setMaxAttendeeCount] = useState(props.events.maxcap)
    const [disableSubmitForm, setDisableSubmitForm] = useState(false)
    const [startTime, setStartTime] = useState(new Date(startDate))
    console.log ("startTime: ", startTime)
    console.log("start date", startDate)
    const [endTime, setEndTime] = useState(new Date(endDate))
    //let startTime = new Date()
    //let endTime = new Date()
    const [cost, setCost] = useState(props.events.cost)
    const [description, setDescription] = useState(props.events.description)
    const [saving, setSaving] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    console.log("edit props: ", props)
    // const curr_time = new Date()
    // console.log("Current time", curr_time.getTime())
    // const five_days_in_future = curr_time.setDate(curr_time.getDate() + MAX_NO_DAYS) 
    // console.log("Max time in future",five_days_in_future)
    
    const currLogin = "Reuben"

    console.log("props: ", props)
    //console.log("start date: ", props.events.start_date.split("/")[0], props.events.start_date.split("/")[1], props.events.start_date.split("/")[2],  props.events.start_time.split(":")[0], props.events.start_time.split(":")[1])

  
    const getEvents =  (ownerView, name, day, category, cost, capMin, capMax)=> {
      props.setLoading(true)
  
  // axios.get('https://tigeractivities.onrender.com/events').then(res =>{
    axios.get('/events', {params: {title: name, day: day, category: category, cost: cost, capMin:capMin, capMax: capMax}}).then(res =>{
    console.log("Events received from db:", res)
    console.log("Setting events to:", res.data)
    props.setEvents([])
    if (ownerView === true) {
      let filtered = res.data.filter(event => event.creator === currLogin)
      console.log("length: ", filtered.length)
      if (filtered.length !== 0) {
        console.log("in if")
        console.log("filtered get: ", filtered)
        props.setEvents(filtered)
        props.setPaginatedEvents(_(filtered).slice(0).take(props.pageSize).value())
      }
      else {
        console.log("No events created by owner")
      }
    } else {
      props.setEvents(res.data)
      props.setPaginatedEvents(_(res.data).slice(0).take(props.pageSize).value())
    }
    props.setLoading(false)

  }).catch(err =>{
    console.log("Error receiving event from db:", err)
  })
}
   
    const submitForm = ()=>{
        setDisableSubmitForm(true)
        console.log(disableSubmitForm)
        console.log('editing')
        axios.post('/edit-activity', {
          // create_id
            event_id:      props.events.id,
            event_name:    eventTitle,
            start_time:    startTime.toString(),
            end_time:      endTime.toString(),
            maxcap:        maxAttendeeCount,
            creator:       DEFAULT_CREATOR,
            category:      eventCategory,
            location:      eventLocation,
            description:   description,
            cost:          cost,
            signup_number: DEFAULT_SIGNUP_NR,

          })
          .then((response) =>{
            console.log("response after axios", response);
            setSaving(true)
            getEvents(true, "")
            props.setOpenModal(false)
          }, (error) => {
            console.log(error)
            setErrorMsg(error)
            setSaving(false)
            // setShowErrorMsg(true)
          })
    }

    const failureCallBack = (error)=>{
    setErrorMsg(error)
     setShowErrorMsg(true)
     console.log("error")
    }
    const successCallBack = ()=>{
      console.log("success")
     setShowErrorMsg(false) 
     setErrorMsg(null)
      // setSaving(true)
      console.log(eventTitle)
      console.log(description)
      console.log(eventLocation)
      submitForm()
      
      // props.setClickMyActivities(true)
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
                        setEventTitle(event.target.value)
                        document.getElementById('title').classList.remove("error");
                        console.log(eventTitle)
                    }}></Form.Control>
</Col>
            </Row>
            
          </Form.Group>
          <Form.Group>
            <Row>
              <Col><Form.Label>Location:</Form.Label></Col>
              <Col><Form.Control type="text" id = "location" name="Location" value ={eventLocation} onChange={(event)=>{
                        setEventLocation(event.target.value)
                        document.getElementById('location').classList.remove("error");
                    }}></Form.Control></Col>
            </Row>
            
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Category:</Form.Label>
              </Col>
              <Col><Form.Select type="text" id = "category" name="Category" value ={eventCategory} onChange={(event)=>{
                        document.getElementById('category').classList.remove("error");
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
                     onChange={(event) => 
                     {
                        console.log("event: ", event)
                      //  console.log("date:" +  startTime)
                        document.getElementById('start-time').classList.remove("error");
                        setStartTime(new Date(event))
                        console.log("start: ", startTime)
                      //  console.log("date after:", event)
                     }} /></Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>End Time:</Form.Label></Col>
              <Col><Flatpickr
                     data-enable-time 
                      id = "end-time"
                      class = "customFlatpickr"
                    value={endTime} 
                    defaultValue = {endDate}
                     onChange={(event) => 
                     {
                        console.log("event:", event)
                        setEndTime(new Date(event))
                        event.target.value = endTime
                        document.getElementById('end-time').classList.remove("error");
                        console.log("end: ", endTime)
                       // console.log("date:", event)
                     }} /> </Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Max Attendee Count:</Form.Label></Col>
              <Col><Form.Control type="text" id = "cap" name="Attendee Count" value={maxAttendeeCount} onChange={(event) =>
                        {
                          document.getElementById('cap').classList.remove("error");
                            setMaxAttendeeCount(event.target.value)
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
                          console.log("cost: ", event.target.value)
                        setCost(event.target.value)
                        }}/>
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup></Col>
            </Row>
          </Form.Group><Form.Group>
            <Row>
              <Col><Form.Label>Description:</Form.Label></Col>
              <Col><Form.Control as="textarea" id = "descrip" name ="description" value={description} onChange={(event) =>
                      {
                      setDescription(event.target.value)
                      document.getElementById('descrip').classList.remove("error");
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
        <Button variant="primary" onClick={()=>{
          let error = 0;
          let errorMsg = []
        console.log("end time", endTime.getTime())
        console.log(startTime.getTime())
        if(eventTitle.length === 0 ){
//              error.push("Title field cannot be empty")
          // setShowErrorMsg(true)
          document.getElementById('title').classList.add("error");
          document.getElementById('title').placeholder = "title cannot be empty";

          error = 1;
        }
        if(eventLocation.length === 0){
     //     error.push("Location field cannot be empty \n")
          document.getElementById('location').classList.add("error");
          document.getElementById('location').placeholder = "location cannot be empty";

          error = 1;
        }
        if(eventCategory.length === 0){
          document.getElementById('category').classList.add("error");
          error = 1;
        }

       if(endTime.getTime() <= startTime.getTime()){
          console.log("wrong dates")
          errorMsg.push("End Date before or equal to start date. Please fix this \n")
          document.getElementById('start-time').classList.add("error")
          document.getElementById('start-time').value = "Start date after or equal to end date"
          document.getElementById('end-time').classList.add("error")
          document.getElementById('end-time').value = "End date before or equal to start date"
          // setShowErrorMsg(true)
          // failureCallBack("End Date before start date. Please fix this")
          
        }
         if(cost < 0){
        //  errorMsg.push("Cost involved cannot be negative")
          // setShowErrorMsg(true)
          document.getElementById('cost').classList.add("error");
          document.getElementById('cost').value = "Cost involved cannot be negative";

          error = 1;
        }
        else if(!/^[0-9]+$/.test(cost)){
          //  errorMsg.push("Cost involved cannot be negative")
            // setShowErrorMsg(true)
            document.getElementById('cost').classList.add("error");
            document.getElementById('cost').value = "Cost involved must be an integer";
  
            error = 1;
          }

        if(maxAttendeeCount < 0){
      //    error.push("Max Attendee Count cannot be negative")
          // setShowErrorMsg(true)
          document.getElementById('cap').classList.add("error");
          document.getElementById('cap').value = "Max Attendee Count cannot be negative";

          error = 1;
        }

        if(description.length == 0){
          //    error.push("Max Attendee Count cannot be negative")
              // setShowErrorMsg(true)
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