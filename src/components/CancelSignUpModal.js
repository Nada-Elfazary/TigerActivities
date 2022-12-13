import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";

import "./Modal.css";

function CancelSignUpModal(props) {
    console.log("cancel props: ", props)
    const [saving, setSaving] = useState(true)
  //  const [events, setEvents] = useState([])
   // const [loading, setLoading] = useState(false)
  /*
  React.useEffect(() => {
    setName(props.name)
    setEmail(props.email)
    setPhone(props.phone)
  }, [])
  */
  const currLogin = "Reuben"

  const getSignUps =  ()=> {
    props.setLoading(true)
    axios.get('/user-sign-ups').then((res) =>{
      console.log("in sign-up")
      console.log(res.data)
      props.setEvents([])
      props.setEvents(res.data)
      props.setLoading(false)
    }).catch(err =>{
      
      console.log("Error receiving event from db:", err)
    })
}

  const submitForm= () =>
  {
    console.log("props.id", props.id)
    axios.post('/cancel-sign-up', {
        event_id : props.event_id,
      }).then(res =>{
        console.log(res)
        setSaving(true)
        getSignUps()
        props.setOpenCancelModal(false)
      }).catch(err =>{
        console.log(err)
      
      })
  }


    const successCallBack = ()=>{
      console.log("success")
      // setSaving(true)
   //   console.log(eventTitle)
   //   console.log(description)
   //   console.log(eventLocation)
        submitForm()
      // props.setClickMyActivities(true)
    }

  const cancelModal = <Container fluid> <Modal show={props.setOpenCancelModal} dialogAs={CreateEventModalDraggable} onHide={()=>{
    props.setOpenCancelModal(false)
  }} size="sm-5"
  aria-labelledby="contained-modal-title-center"
  centered>
    <Modal.Header closeButton  style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title>Are you sure you want to cancel your sign up for {props.title}?</Modal.Title>
        </Modal.Header>
    
        <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
       <Button id="cancelBtn" variant="secondary" onClick={() => {
              props.setOpenCancelModal(false);
            }}>Cancel</Button>
        <Button variant="primary" onClick={()=>{
            successCallBack()             
          }}>Cancel Sign Up</Button>

        </Modal.Footer>
   
    </Modal>
    </Container>
  return (
    <>
    {cancelModal}
    </>
  );
}

export default CancelSignUpModal;