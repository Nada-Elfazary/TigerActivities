import React from 'react';
import { Modal, Container } from 'react-bootstrap';
import checkmrk from './checkmark.png';

import CreateEventModalDraggable from './CreateEventModalDraggable';

const SuccessModal = (props) => {
    console.log("in success modal")
    console.log('success modal props: ', props)
    const successModal = <Container fluid> <Modal show={true} dialogAs={CreateEventModalDraggable} onHide={()=>{
        props.setOpenSuccessModal(false)
      }} size="sm-2"
      aria-labelledby="contained-modal-title-center"
      centered>
        <Modal.Header closeButton  style={{
             display: "flex",
             justifyContent: "center",
            }}>
            </Modal.Header>
            <Modal.Body className='success'>
            <center><img alt="" src={checkmrk} width="60" height="60"
                className="d-inline-block align-top"
                /> </center>
                <strong><center>You have successfully signed up!</center></strong>
            </Modal.Body>
       
        </Modal>
        </Container>
    
  return (
    <div>
      {successModal}
      
    </div>
  )
}

export default SuccessModal
