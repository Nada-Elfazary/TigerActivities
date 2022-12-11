import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";

import "./Modal.css";

function SignUpModal(props) {

  const [name,setName] = useState(props.name)
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState(props.email)
  const [errorMsg, setErrorMsg] = useState("")
  const [showErrorMsg, setShowErrorMsg] = useState(false)

  /*
  React.useEffect(() => {
    setName(props.name)
    setEmail(props.email)
    setPhone(props.phone)
  }, [])

  */
  const submitForm= () =>
  {
    axios.post('/sign-up', {
      name: name,
      phone: phone,
      email: email,
      user_id:"rand_usr",
      event_id:props.event_id,
    })
    .then((response) => {
      console.log(response)
      if(response.data === 'FULL'){
        setErrorMsg("This event is full. Please refresh the page to get the current updates")
        setShowErrorMsg(true)
      }
      else {
        props.setOpenSignUpModal(false)
      }
    }, (error) => {
      console.log(error)
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
   //   console.log(eventTitle)
   //   console.log(description)
   //   console.log(eventLocation)
        submitForm()
      // props.setClickMyActivities(true)
    }

  const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null
  const signUpModal = <Container fluid> <Modal show={props.setOpenSignUpModal} dialogAs={CreateEventModalDraggable} onHide={()=>{
    props.setOpenSignUpModal(false)
  }} size="sm-5"
  aria-labelledby="contained-modal-title-center"
  centered>
    <Modal.Header closeButton  style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title>Want to sign up for {props.title} ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
            <Row>
              <Col><Form.Label>Name: </Form.Label></Col>
              <Col><Form.Control type="text"  id = "name" name="name" placeholder = "Full Name" value={name} onChange={(event) =>
          
                    { document.getElementById('name').classList.remove("error");
                      setName(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
            <Form.Group>
            <Row>
              <Col><Form.Label>Phone Number: </Form.Label></Col>
              <Col><Form.Control type="text" id = "num" name="Number" placeholder = "Only digits allowed" value={phone} onChange={(event) =>
                    {
                      document.getElementById('num').classList.remove("error");
                      setPhone(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
            <Form.Group>
            <Row>
              <Col><Form.Label>Email: </Form.Label></Col>
              <Col><Form.Control type="text" id = "email" name="Email" placeholder = "Email Address" value={email} onChange={(event) =>
                    {
                      document.getElementById('email').classList.remove("error");
                      setEmail(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
            <Form.Group>{errorM}</Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
       <Button id="cancelBtn" variant="secondary" onClick={() => {
              props.setOpenSignUpModal(false);
            }}>Cancel</Button>
        <Button variant="primary" disabled={showErrorMsg} onClick={()=>{
             let error = 0;
             let errorMsg = []
 
           if(name.length === 0 ){
   
             document.getElementById('name').classList.add("error");
             document.getElementById('name').placeholder = "Name field cannot be empty";
   
             error = 1;
           }
           if(phone.length === 0){
            console.log("inside phone === 0")
             document.getElementById('num').classList.add("error");
             document.getElementById('num').value = "Phone number field cannot be empty";
   
             error = 1;
           }
           else if(!/^[0-9]{10}$/.test(phone)){
            console.log("inside invalid phone")
            document.getElementById('num').classList.add("error");
            document.getElementById('num').setAttribute("value", 'Invalid phone number')
            setShowErrorMsg(true)
            error = 1;
          }
           if(email.length === 0){
             document.getElementById('email').classList.add("error");
             document.getElementById('email').placeholder = "Email field cannot be empty";
             error = 1;
           }
           
           else if(!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email)){
            console.log("email state:", email)
            document.getElementById('email').classList.add("error");
            document.getElementById('email').value="Email address is invalid";
            error = 1;
          }
           /*
          if( endTime.getTime() <= startTime.getTime()){
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
              // document.getElementById('cost').classList.add("error");
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
                // document.getElementById('descrip').classList.add("error");
                 document.getElementById('descrip').placeholder = "Description cannot be empty";
       
                 error = 1;
               }*/
          error !== 0 ? failureCallBack("Please fix errors above") : successCallBack()             
          }}>Sign Up</Button>

        </Modal.Footer>
   
    </Modal>
    </Container>
  return (
    <>
    {signUpModal}
    </>
  );
}

export default SignUpModal;