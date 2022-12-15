import './Error.css';
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';



// takes in te error message that should be displayed
export default function Error(props) : React.ReactNode {
        return (
            <Card className="error">
                <div className="errMsgContainer">
                    <Card.Title>A server error has occured.</Card.Title>
                    <Card.Body>
                    <Card.Link href="/home" className='card-link-css'> Navigate to the Homepage</Card.Link>
                    </Card.Body>
                </div>
            </Card>

        )
};