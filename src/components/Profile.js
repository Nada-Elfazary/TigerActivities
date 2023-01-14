import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container, Card} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

// import "./Modal.css";
import SignUpModal from "./SignUpModal";
import EditProfileModal from "./EditProfileModal";

export default function Profile(props) {
    console.log("Props before declaration:", props)
    // const [dbName, setDbName] = useState(props.name)
    const [updateName, setUpdateName] = useState(props.profileData[0])
    // const [dbPhone, setDbPhone] = useState(props.phone)
    const [updatePhone, setUpdatePhone] = useState(props.profileData[1])
    // const [dbEmail,setDbEmail] = useState(props.email)
    const [updateEmail, setUpdateEmail] = useState(props.profileData[2])
    console.log("Update values:", updateName, updatePhone, updateEmail)
    const[showModal, setShowModal] = useState( false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
  //  const [showEditModal, setShowEditModal] = useState(false)
    console.log("Props in Profile:", props)
    console.log("Name in Profile:", props.profileData[0])

    
    const editProfileModal = showModal ? (<EditProfileModal setOpenModal = {setShowModal}  userDetails = {props.profileData}/>) : null 


    return (
        <div className = "profileDisplay">
            <h1>Profile</h1>
            <div className= "outerProfileContainer">
              <Card className= "innerProfileContainer">
                  <Card.Title></Card.Title>
                  <Card.Text>
                      <Row>
                          <Col><strong>Name:</strong> {props.profileData[0]} </Col>
                      </Row>
                      <Row>
                          <Col><strong>Netid:</strong> {props.netid}</Col>
                      </Row>
                      <Row>
                          <Col><strong>Phone:</strong> {props.profileData[1]}</Col>
                      </Row>
                      <Row>
                          <Col><strong>Email:</strong> {props.profileData[2]}</Col>
                      </Row>
                  </Card.Text>
              </Card>
            </div>
            <Button
                variant="warning"
                onClick={() => setShowModal(true)}
            >
                    Edit
            </Button>
            {editProfileModal}
        </div>
    )
}