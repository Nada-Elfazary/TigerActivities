import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container, Card} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";

// import "./Modal.css";
import SignUpModal from "./SignUpModal";

export default function Profile(props) {
    const [dbName, setDbName] = useState(props.name)
    const [updateName, setUpdateName] = useState(dbName)
    const [dbPhone, setDbPhone] = useState(props.phone)
    const [updatePhone, setUpdatePhone] = useState(dbPhone)
    const [dbEmail,setDbEmail] = useState(props.email)
    const [updateEmail, setUpdateEmail] = useState(dbEmail)
    const[classYear,setClassYear] = useState(props.classYear)
    const[showModal, setShowModal] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    console.log("Props in Profile:", props)
    console.log("Values in Profile:", dbName, dbPhone, dbEmail, classYear)
    const failureCallBack = (error)=>{
        setErrorMsg(error)
         setShowErrorMsg(true)
         console.log("error")
    }

    React.useEffect(() => {
      setDbName(props.name)
      setDbEmail(props.email)
      setDbPhone(props.phone)
      setClassYear(props.classYear)
    }, [])


    const successCallBack = ()=>{
    console.log("success")
       setShowErrorMsg(false) 
       setErrorMsg(null)
        // setSaving(true)
     //   console.log(eventTitle)
     //   console.log(description)
     //   console.log(eventLocation)
          submitForm()
          setShowModal(false)
          updateProfileInformation()
        // props.setClickMyActivities(true)
      }

      const updateProfileInformation = () => {
        setDbName(updateName)
        setDbEmail(updateEmail)
        setDbPhone(updatePhone)
      }

      //   submits the edit form once user is done updaing infomation
        const submitForm= () =>
        {
            axios.post('/update-profile', {
            netid: props.netid,
            name: updateName,
            phone: updatePhone,
            email: updateEmail,
            })
            .then((response) => {
            console.log(response)
            }, (error) => {
            console.log(error)
            })
        }

    const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null
    const editProfileModal = <Container fluid> <Modal show={showModal}  onHide={()=>{
    setShowModal(false)
  }} size="sm-5"
  aria-labelledby="contained-modal-title-center"
  centered>
    <Modal.Header closeButton  style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title> Edit Profile Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
            <Row>
              <Col><Form.Label>Name: </Form.Label></Col>
              <Col><Form.Control type="text"  id = "name" name="name" placeholder = "Full Name" value={updateName} onChange={(event) =>

                    { document.getElementById('name').classList.remove("error");
                    setUpdateName(event.target.value)
                    }}
                ></Form.Control>
                </Col>
            </Row>
            </Form.Group>
            <Form.Group>
            <Row>
              <Col><Form.Label>Phone Number: </Form.Label></Col>
              <Col><Form.Control type="text" id = "num" name="Number" placeholder = "Only digits allowed" value={updatePhone} onChange={(event) =>
                    {
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
              <Col><Form.Control type="text" id = "email" name="Email" placeholder = "Email Address" value={updateEmail} onChange={(event) =>
                    {
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
              props.setOpenSignUpModal(false);
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
        //    if(phone.length === 0){
        // //     error.push("Location field cannot be empty \n")
        //      document.getElementById('num').classList.add("error");
        //      document.getElementById('num').placeholder = "Phone number field cannot be empty";
   
        //      error = 1;
        //    }
         
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


    return (
        <div>
            <h1>Profile</h1>
            <Card>
                <Card.Title></Card.Title>
                <Card.Text>
                    <Row>
                        <Col><strong>Name:</strong> {dbName} </Col>
                    </Row>
                    <Row>
                        <Col><strong>Netid:</strong> {props.netid}</Col>
                    </Row>
                    <Row>
                        <Col><strong>Phone:</strong> {dbPhone}</Col>
                    </Row>
                    <Row>
                        <Col><strong>Email:</strong> {dbEmail}</Col>
                    </Row>
                    <Row>
                        <Col><strong>Class Year:</strong> {classYear}</Col>
                    </Row>
                </Card.Text>
            </Card>
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