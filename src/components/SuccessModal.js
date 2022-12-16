import React from 'react';
import { Modal, Container } from 'react-bootstrap';
//import {BsCheckLg} from 'react-icons/bs';
import CreateEventModalDraggable from './CreateEventModalDraggable';

const SuccessModal = (props) => {
    console.log("in success modal")
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
                Successfully signed up! 
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
