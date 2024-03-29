import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import _ from "lodash"
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function CancelSignUpModal(props) {
    console.log("cancel props: ", props)
    const [saving, setSaving] = useState(false)
  //  const [events, setEvents] = useState([])
   // const [loading, setLoading] = useState(false)
  /*
  React.useEffect(() => {
    setName(props.name)
    setEmail(props.email)
    setPhone(props.phone)
  }, [])
  */

  const navigate = useNavigate()
 /* const getSignUps =  ()=> {
    props.setLoading(true)
    axios.get('/api/user-sign-ups').then((res) =>{
      console.log("in sign-up")
      console.log(res.data)
      props.setEvents([])
      props.setEvents(res.data)
      props.setPaginatedEvents([])
      props.setPaginatedEvents(_(res.data).slice(0).take(props.pageSize).value())
      props.setLoading(false)
    }).catch(err =>{
      console.log("Inside Cancel SignPp Modal. Error receiving event from db:", err)
      navigate("/error")
    })
}*/

  const submitForm= () =>
  {
    console.log("props.id", props.id)
    axios.post('/api/cancel-sign-up', {
        event_id : props.event_id,
      }).then(res =>{
        console.log(res)
        setSaving(true)
        props.getSignUps()
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
        <Modal.Title>Are you sure you want to cancel your sign up for "{props.title}"?</Modal.Title>
        </Modal.Header>
    
        <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
       <Button id="cancelBtn" variant="secondary" onClick={() => {
              props.setOpenCancelModal(false);
            }}>No</Button>
        <Button variant="primary" onClick={()=>{
            successCallBack()             
          }}>Yes</Button>

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