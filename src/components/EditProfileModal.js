import axios from "axios";
import React, { useState } from "react";
import {Button, Modal, Form, Row, Col, Container, Card} from 'react-bootstrap';
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

// import "./Modal.css";
import SignUpModal from "./SignUpModal";

function EditProfileModal(props) {
    console.log("Props in edit modal:", props)
    // const [dbName, setDbName] = useState(props.name)
    const [prefilledName, setPrefilledName] = useState(props.userDetails[0])
    // const [dbPhone, setDbPhone] = useState(props.phone)
    const [prefilledPhone, setPrefilledPhone] = useState(props.userDetails[1])
    // const [dbEmail,setDbEmail] = useState(props.email)
    const [prefilledEmail, setPrefilledEmail] = useState(props.userDetails[2])
    console.log("Update values:", prefilledName, prefilledPhone, prefilledEmail)
    const [errorMsg, setErrorMsg] = useState("")
    const [showErrorMsg, setShowErrorMsg] = useState(false)
  //  const [showEditModal, setShowEditModal] = useState(false)
   
    const failureCallBack = (error)=>{
        setErrorMsg(error)
         setShowErrorMsg(true)
         console.log("error")
    }

    const navigate = useNavigate()

    // React.useEffect(() => {
    //   setDbName(props.name)
    //   setDbEmail(props.email)
    //   setDbPhone(props.phone)
    // }, [])


    const successCallBack = ()=>{
      console.log("success")
      setShowErrorMsg(false) 
      setErrorMsg(null)

      submitForm()
      }


      //   submits the edit form once user is done updaing infomation
    const submitForm= () =>
    {
        axios.post('/api/update-profile', {
        name: updateName,
        phone: updatePhone,
        email: updateEmail,
        })
        .then((response) => {
        console.log("Response:", response)
        console.log("Props:", props)
        setOpenModal(false)
        props.getProfileData(props.netid)
        
        }, (error) => {
        console.log("Inside Profile.js. Error recieved updating profile:", error)
        navigate("/error")
        })
    }

    const errorM  = showErrorMsg? <strong className="error">{errorMsg}</strong> : null
    const editProfileModal = <Container fluid> <Modal show={showModal}  onHide={()=>{
        setOpenModal(false)
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
                          if (event.target.value.length <= 100) {
                            setUpdateName(event.target.value)
                          }
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
                          if (event.target.value <= 100) {
                            setUpdateEmail(event.target.value)
                          }
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
                 setShowModal(false);
                }}>Cancel</Button>
            <Button variant="primary" onClick={()=>{
                 let error = 0;
                 let errorMsg = []
       
               if(updateName.length === 0 ){
         
                 document.getElementById('name').classList.add("error");
                 document.getElementById('name').placeholder = "Name field cannot be empty";
       
                 error = 1;
               }
               if(updatePhone.length === 0){
            //     error.push("Number field cannot be empty \n")
                 document.getElementById('num').classList.add("error");
                 document.getElementById('num').placeholder = "Phone number field cannot be empty";
       
                 error = 1;
               } else if(!/^[0-9]{10}$/.test(updatePhone)){
                console.log("inside invalid phone")
                document.getElementById('num').classList.add("error");
              //  document.getElementById('num').setAttribute("value", 'Invalid phone number')
                setShowErrorMsg(true)
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
               // document.getElementById('email').value="Email address is invalid";
                error = 1;
              }
    
              error !== 0 ? failureCallBack("Please fix errors above") : successCallBack()             
              }}>Submit</Button>
    
            </Modal.Footer>
       
        </Modal>
        </Container>

        return (
            <div>
            {editProfileModal}
            </div>
        );

}

export default EditProfileModal;


