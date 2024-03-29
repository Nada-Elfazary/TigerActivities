import React, { useState } from "react";
import  {useNavigate} from "react-router-dom";
import CreateEventModalDraggable from "./CreateEventModalDraggable";
import "./Modal.css";
import { Container, Modal, Button, Form, ListGroup } from "react-bootstrap";

export default function RulesModal(props) : React.ReactNode {
    const [saving, setSaving] = useState(false)
    const [checked, setChecked] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

    const cas = ()=>{ 
      console.log("inside cas")
      fetch('https://tigeractivities.onrender.com/api/authenticate').then((resp) =>
        {return resp.text();}).then((data) => {
        let response = JSON.parse(data)
        console.log('data from cas: ', data)
        if(response.username === ''){
          console.log('redirect url')
          window.location.replace(response.redirect);
          console.log('username: ', response.username)
        }
        else{
          console.log('username: ', response.username)
          navigate('/home', {
            state:{
              username: response.username
            }
          })
        }
      }).catch(err=>{
        console.log(err)
      })
  }

    const failureCallBack = (error)=>{
      // errorMsg = <strong className="error">error</strong>
      console.log(checked)
      setErrorMsg(error)
      setShowErrorMsg(true)
    }
    const successCallback = ()=>{
      console.log("success")
      console.log(checked)
      setShowErrorMsg(false)
      setErrorMsg(null)
      props.setOpenModal(false)
      props.setRedirect(true)
      cas()
      //navigate('/home')

    }
    const handleChecked = (event)=>{
        setChecked(event.target.checked)
        setShowErrorMsg(!checked)
        setSaving(event.target.checked)
    }

    let error = ""

 

  const errorM  = showErrorMsg ? <strong className="error">{errorMsg}</strong> : null

  
  const rulesModal = (<Container fluid>
    <Modal show={true} dialogAs={CreateEventModalDraggable} onHide={()=>{
    props.setOpenModal(false)
  }} >
      <Modal.Header closeButton style={{
         display: "flex",
         justifyContent: "center",
        }}>
        <Modal.Title><h2>Carefully Read Our Community Guidelines Below:</h2></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup as = "ol" numbered>
          <ListGroup.Item>  Use appropriate language when creating activities. Inappropriate activities or behavior could result 
            in banning from this platform</ListGroup.Item>
          <ListGroup.Item>Be respectful of your peer's time</ListGroup.Item>
          <ListGroup.Item>Keep your attendees updated on changes in activities</ListGroup.Item>
          <ListGroup.Item>Keep safe. Enjoy our platform. Cheers!</ListGroup.Item>
          </ListGroup>
        <Form.Check type="checkbox" label = "Agree with terms and conditions" onChange={handleChecked}/>
      </Modal.Body>
      <Modal.Footer style={{
          display: "flex",
          justifyContent: "center",
        }}>
          {errorM}
        <Button variant="secondary"  onClick={() => {
        props.setOpenModal(false);
      }}
      id="cancelBtn" >Cancel</Button>
        <Button variant="primary" onClick={()=>{
      setSaving(checked)
      setShowErrorMsg(!checked)
      if(!saving){
        console.log("show error msg")
        error = "Read Our Terms and Conditions carefully before proceeding"
        failureCallBack(error)
      }
      else{
        setSaving(true)
        successCallback()
      }
    }}>Contine</Button>
      </Modal.Footer>
    </Modal>
  </Container>)

  return (
    <>
       {rulesModal}
    </>
  );
}

// export default RulesModal;