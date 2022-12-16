import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


export default function EditProfileModal(props){
    // const [dbName, setDbName] = useState(props.name)
    const [updateName, setUpdateName] = useState(props.profileData[0])
    // const [dbPhone, setDbPhone] = useState(props.phone)
    const [updatePhone, setUpdatePhone] = useState(props.profileData[1])
    // const [dbEmail,setDbEmail] = useState(props.email)
    const [updateEmail, setUpdateEmail] = useState(props.profileData[2]) 
    
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    console.log("Update values:", updateName, updatePhone, updateEmail)
    const navigate= useNavigate()

    const failureCallBack = (error)=>{
      setErrorMsg(error)
       setShowErrorMsg(true)
       console.log("error")
  }

    const successCallBack = ()=>{
      console.log("success")
      setShowErrorMsg(false) 
      setErrorMsg(null)
      submitForm()
      props.setShowModal(false)
      props.getProfileData(props.netid)
      // updateProfileInformation()
      // props.setClickMyActivities(true)
      }

      const submitForm= () =>
      {
          axios.post('/api/update-profile', {
        //  netid: props.netid,
          name: updateName,
          phone: updatePhone,
          email: updateEmail,
          })
          .then((response) => {
          console.log("Response:", response)
          console.log("Props:", props)
          // props.updateProfileMsg("")
          }, (error) => {
          console.log("Inside Profile.js. Error recieved updating profile:", error)
          navigate("/error")
          })
      }
      
const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null
return (
  <Container fluid> <Modal show={props.showModal}  onHide={()=>{
  props.setShowModal(false)
  }} size="sm-5"
  aria-labelledby="contained-modal-title-center"
  centered>
  <Modal.Header closeButton  style={{
      display: "flex",
      justifyContent: "center",
      }}>
      <Modal.Title>Edit Profile Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
          <Row>
            <Col><Form.Label>Name: </Form.Label></Col>
            <Col><Form.Control type="text"  id = "name" name="name" placeholder = {updateName.length===0?"Full Name":updateName} value={updateName} onChange={(event) =>
                  {
                    console.log("Inside editProfile Modal. Name before typing: ", updateName)
                    document.getElementById('name').classList.remove("error");
                    setUpdateName(event.target.value)
                  }}
              ></Form.Control>
              </Col>
          </Row>
          </Form.Group>
          <Form.Group>
          <Row>
            <Col><Form.Label>Phone Number: </Form.Label></Col>
            <Col><Form.Control type="text" id = "num" name="Number" placeholder = {updatePhone.length===0?"Only digits allowed":updatePhone} value={updatePhone} onChange={(event) =>
                  {
                    console.log("Inside editProfile Modal. Phone num before typing: ", updatePhone)
                    document.getElementById('num').classList.remove("error");
                    setUpdatePhone(event.target.value)
                  }}
              ></Form.Control>
              </Col>
          </Row>
          </Form.Group>
          <Form.Group>
          <Row>
            <Col><Form.Label>Email: </Form.Label></Col>
            <Col><Form.Control type="text" id = "email" name="Email" placeholder = {updateEmail.length===0?"Email Address":updatePhone} value={updateEmail} onChange={(event) =>
                  {
                    console.log("Email befrore typing:", updateEmail)
                    document.getElementById('email').classList.remove("error");
                    setUpdateEmail(event.target.value)
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
          props.setShowModal(false);
          }}>Cancel</Button>
      <Button variant="primary" onClick={()=>{
          let error = 0;
          let errorMsg = []
        // console.log(endTime.getTime())
        // console.log(startTime.getTime())
        if(updateName.length === 0 ){
          // error.push("Title field cannot be empty")
          // setShowErrorMsg(true)
          document.getElementById('name').classList.add("error");
          document.getElementById('name').placeholder = "Name field cannot be empty";

          error = 1;
        }
        if(updatePhone.length === 0){
      //     error.push("Number field cannot be empty \n")
          document.getElementById('num').classList.add("error");
          document.getElementById('num').placeholder = "Phone number field cannot be empty";

          error = 1;
        }
      
        if(updateEmail.length === 0){
          document.getElementById('email').classList.add("error");
          document.getElementById('email').placeholder = "Email field cannot be empty";
          error = 1;
        }
        
        if(!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(updateEmail)){
          console.log("email state:", updateEmail)
          document.getElementById('email').classList.add("error");
          document.getElementById('email').value="Email address is invalid";
          error = 1;
        }

        error !== 0 ? failureCallBack("Please fix errors above") : successCallBack()             
        }}>Submit</Button>

      </Modal.Footer>

  </Modal>
  </Container>
)

};
