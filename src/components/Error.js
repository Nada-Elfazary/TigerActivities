import './Error.css';
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';



// takes in te error message that should be displayed
export default function Error(props) : React.ReactNode {
        return (
            <Card className="errorBackground">
                <div className="errMsgContainer">
                    <Card.Title>{props.errMsg}</Card.Title>
                    <Card.Body>
                    <Card.Link href="/" className='card-link-css'> Navigate to the Homepage</Card.Link>
                    </Card.Body>
                </div>
            </Card>

        )
};