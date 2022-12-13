import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, InputGroup, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import "bootstrap/dist/css/bootstrap.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_orange.css";
import axios from 'axios';
import "./CreateEventDialog.css"
import { useNavigate } from "react-router-dom";


function CreateEventDialog(props) {
    const MAX_NO_DAYS = 5
    const DEFAULT_CREATOR = "Reuben"
    const DEFAULT_CATEGORY = "Sports"
    const DEFAULT_SIGNUP_NR = 0
    const[eventTitle, setEventTitle] = useState('')
    const[eventLocation, setEventLocation] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const[maxAttendeeCount, setMaxAttendeeCount] = useState(0)
    const [disableSubmitForm, setDisableSubmitForm] = useState(false)
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [cost, setCost] = useState(0)
    const [description, setDescription] = useState("")
    const [saving, setSaving] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    // const curr_time = new Date()
    // console.log("Current time", curr_time.getTime())
    // const five_days_in_future = curr_time.setDate(curr_time.getDate() + MAX_NO_DAYS) 
    // console.log("Max time in future",five_days_in_future)
    
  const currLogin = "neww"
  const navigate = useNavigate()
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
        props.setEvents(filtered)
      }
      else {
        console.log("No events created by owner")
      }
    } else {
      props.setEvents(res.data)
    }
    props.setLoading(false)
    

  }).catch(err =>{
    console.log("Error receiving event from db:", err)
    navigate("/error")
  })
}
   
    const submitForm = ()=>{
        console.log("start time before axios: ", startTime)
        console.log("End time before axios: ",  endTime)
        setDisableSubmitForm(true)
        console.log(disableSubmitForm)
        axios.post('/create-event', {
          // create_id
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
            console.log(response);
            setSaving(true)
            getEvents(true, "")
            props.setOpenModal(false)
          }, (error) => {
            // add some kind of message at the top as to why the error occured
            console.log(error)
            setErrorMsg(error)
            setSaving(false)
            navigate("/error")
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
        <Modal.Title>Create a TigerActivity</Modal.Title>
          </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
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
                     onChange={(event) => 
                     {
                        console.log("date:" +  startTime)
                        document.getElementById('start-time').classList.remove("error");
                        setStartTime(new Date(event))
                        console.log("date after:", event)
                        console.log("date wih new date:", new Date(event))
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
                     onChange={(event) => 
                     {
                        setEndTime(new Date(event))
                        document.getElementById('end-time').classList.remove("error");
                        console.log("date:", event)
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
        
        // console.log(endTime.getTime())
        // console.log(startTime.getTime())
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
        if (endTime === ""){
          errorMsg.push("End Date can not be empty. Please fix this \n")
          document.getElementById('end-time').classList.add("error")
          document.getElementById('end-time').placeholder = "End date can not be empty"
        }
        if (startTime === ""){
          errorMsg.push("Start Date can not be empty. Please fix this \n")
          document.getElementById('start-time').classList.add("error")
          document.getElementById('start-time').placeholder = "Start date can not be empty"
        }
       if(startTime !=="" && endTime !=="" && endTime.getTime() <= startTime.getTime()){
          console.log("wrong dates")
          errorMsg.push("End Date before or equal to start date. Please fix this \n")
          document.getElementById('start-time').classList.add("error")
          document.getElementById('start-time').value = "Start date after or equal to end date"
          document.getElementById('end-time').classList.add("error")
          document.getElementById('end-time').value = "End date before or equal to start date"
          // setShowErrorMsg(true)
          // failureCallBack("End Date before start date. Please fix this")
          
        }

        if(cost.length === 0){
          //  errorMsg.push("Cost involved cannot be negative")
            // setShowErrorMsg(true)
            document.getElementById('cost').classList.add("error");
            document.getElementById('cost').placeholder = "Empty cost";
          
            error = 1;
          }

          if(!/^[0-9]+$/.test(cost)){
            //  errorMsg.push("Cost involved cannot be negative")
              // setShowErrorMsg(true)
              document.getElementById('cost').classList.add("error");
              document.getElementById('cost').placeholder = "Invalid input";
              setCost("")
              error = 1;
            }



         if(cost < 0){
        //  errorMsg.push("Cost involved cannot be negative")
          // setShowErrorMsg(true)
          document.getElementById('cost').classList.add("error");
          document.getElementById('cost').placeholder = "Negative cost!";
          setCost("")


          error = 1;
        }






        if(!/^[0-9]+$/.test(maxAttendeeCount)){
          //  errorMsg.push("Cost involved cannot be negative")
            // setShowErrorMsg(true)
            document.getElementById('cap').classList.add("error");
            document.getElementById('cap').placeholder = "Invalid input";
            setMaxAttendeeCount("")


            error = 1;
          }

          if(maxAttendeeCount < 0){
            //    error.push("Max Attendee Count cannot be negative")
                // setShowErrorMsg(true)
                document.getElementById('cap').classList.add("error");
                setMaxAttendeeCount("")
                document.getElementById('cap').placeholder = "Count cannot be negative";
                error = 1;
              }
  
        if(maxAttendeeCount.length === 0){
          //    error.push("Max Attendee Count cannot be negative")
              // setShowErrorMsg(true)
              document.getElementById('cap').classList.add("error");
              document.getElementById('cap').placeholder = "Empty count";
              error = 1;
            }




        if(description.length === 0){
          //    error.push("Max Attendee Count cannot be negative")
              // setShowErrorMsg(true)
              document.getElementById('descrip').classList.add("error");
              document.getElementById('descrip').placeholder = "Description cannot be empty";
    
              error = 1;
            }
       error !== 0 ? failureCallBack("Please fix errors above") : successCallBack()

        }} >Create</Button>
      </Modal.Footer>
    </Modal>
    </Container>
  return (
    <div>
  {createEventModal}
    </div>
  );
}

export default CreateEventDialog;