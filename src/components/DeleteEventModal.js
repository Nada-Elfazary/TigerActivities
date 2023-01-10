import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import _ from "lodash"
import { useNavigate } from "react-router-dom";
import "./Modal.css";

function DeleteEventModal(props) {
    console.log("delete props: ", props)
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
  
  const submitForm= () =>
  {
    console.log("deleting")
    console.log("props.id", props.id)
    axios.post('/api/delete-activity', {
        event_id : props.event_id,
      }).then(res =>{
        console.log(res)
        setSaving(true)
        props.getEvents(true, "")
        props.setOpenDeleteModal(false)
      }).catch(err =>{
        console.log(err)
        navigate("/error")
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

  const cancelModal = <Container fluid> <Modal show={props.setOpenDeleteModal} dialogAs={CreateEventModalDraggable} onHide={()=>{
    props.setOpenDeleteModal(false)
  }} size="sm-5"
  aria-labelledby="contained-modal-title-center"
  centered>
    <Modal.Header closeButton  style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title>Are you sure you want to delete "{props.title}"?</Modal.Title>
        </Modal.Header>
    
        <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
       <Button id="cancelBtn" variant="secondary" onClick={() => {
              props.setOpenDeleteModal(false);
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

export default DeleteEventModal;