import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";

import "./Modal.css";

function SignUpModal(props) {

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  
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
    }, (error) => {
      console.log(error)
    })
  }

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
              <Col><Form.Control type="text"  name="name" value={name} onChange={(event) =>
                    {
                      setName(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
            <Form.Group>
            <Row>
              <Col><Form.Label>Phone Number: </Form.Label></Col>
              <Col><Form.Control type="text" name="Number" value={phone} onChange={(event) =>
                    {
                      setPhone(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
            <Form.Group>
            <Row>
              <Col><Form.Label>Email: </Form.Label></Col>
              <Col><Form.Control type="text" name="Email" value={email} onChange={(event) =>
                    {
                      setEmail(event.target.value)
                    }}
            ></Form.Control>
</Col>
            </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer  style={{
          display: "flex",
          justifyContent: "center",
        }}>
       <Button id="cancelBtn" variant="secondary" onClick={() => {
              props.setOpenSignUpModal(false);
            }}>Cancel</Button>
        <Button variant="primary" onClick={()=>{
             submitForm()
             props.setOpenSignUpModal(false)
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