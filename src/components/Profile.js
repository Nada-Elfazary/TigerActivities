
import React, { useState } from "react";
import {Button, Row, Col, Card} from 'react-bootstrap';
import "./Profile.css"
import "./EditProfileModal.js"

// import "./Modal.css";
import SignUpModal from "./SignUpModal";
import EditProfileModal from "./EditProfileModal";

export default function Profile(props) {
    console.log("Props before declaration:", props)

    const[showModal, setShowModal] = useState( false)
    
    console.log("Props in Profile:", props)
    console.log("Name in Profile:", props.profileData[0])
    
    const editProfileModal = showModal?
    <EditProfileModal 
    profileData={props.profileData}
    setShowModal={setShowModal}
    showModal={showModal}
    />:
    null

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
