import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Button, Navbar, Form, NavbarBrand, Row, Col} from 'react-bootstrap';

import "./Filter.css";
export default function Filter(props) : React.ReactNode {
    const [title, setTitle] = useState("")
    const [day, setDay] = useState("")
    const [category, setCategory] = useState("")
    const [cost, setCost] = useState("")
    const [capCondition, setCapCondition] = useState("")
    const [cap, setCap] = useState("")
    const [attendeesNum, setAttendeesNum] = useState(0)
    const [capMin, setCapMin] = useState("")
    const [capMax, setCapMax] = useState("")
    const dayToNumber = {"Monday": 0, "Tuesday":1, "Wednesday":2, 
    "Thursday":3, "Friday":4, "Saturday":5, "Sunday":6}

    const handleSelect = (key, event, filterTitle) => {
        console.log("Event data & key:", event.nativeEvent.target.firstChild.data, key)
        if (filterTitle == "dayFilter") {
            setDay(event.nativeEvent.target.firstChild.data)
            props.getEvents(false, title, 
                 dayToNumber[event.nativeEvent.target.firstChild.data], category, cost, capMin, capMax)
        }
        else if (filterTitle == "categoryFilter"){
            setCategory(event.nativeEvent.target.firstChild.data)
            props.getEvents(false, title, dayToNumber[day],
                //event.nativeEvent.target.firstChild.data, cost)
               event.nativeEvent.target.firstChild.data, cost, capCondition, capMin, capMax)
        }
        

    }

    const dayFilterButton = day === "" ? null : <button 
    className= "FilterX" 
    onClick={() => {
        setDay("")
       // props.getEvents(false, title, "", category, cost)
         props.getEvents(false, title, "", category, cost, capMin, capMax)
        }}>
        X
    </button>

    const categoryFilterButton = category === "" ? null : <button 
    className= "FilterX" 
    onClick={() => {
        setCategory("")
      //  props.getEvents(false, title, dayToNumber[day], "", cost)
         props.getEvents(false, title, dayToNumber[day], "", cost, capMin, capMax)
        }}>
        X
</button> 
    // console.log("handle select day:", handleSelectDay)

    return (
        <Navbar className="bootstrapFilter">
       <Navbar.Brand>
        <Form>
            <Form.Group>
                <Form.Label>Event Title</Form.Label>
                <Form.Control type="text" name="title" onChange={(event) => {
                        setTitle(event.target.value)
                        console.log("Title value:", event, event.target.value, title)
                        props.getEvents(false, event.target.value, dayToNumber[day], category, cost)
                    }} ></Form.Control>
            </Form.Group>
        </Form>
        
       </Navbar.Brand>
     
                   
       <Navbar.Brand>  <Form.Group><Form.Label>Day</Form.Label>
                    
                    <DropdownButton 
                        title= {day == "" || null ? "Day" : day}
                        variant="warning"
                        onSelect={(key, event) => 
                            handleSelect(key, event, "dayFilter")}
                    >
                        <Dropdown.Item>Monday</Dropdown.Item>
                        <Dropdown.Item>Tuesday</Dropdown.Item>
                        <Dropdown.Item>Wednesday</Dropdown.Item>
                        <Dropdown.Item>Thursday</Dropdown.Item>
                        <Dropdown.Item>Friday</Dropdown.Item>
                        <Dropdown.Item>Saturday</Dropdown.Item>
                        <Dropdown.Item>Sunday</Dropdown.Item>
                    </DropdownButton>
                    </Form.Group>
                    {dayFilterButton}
                    </Navbar.Brand>
                    
        <Navbar.Brand>
        <Form.Group><Form.Label>Category</Form.Label>
                    
            <DropdownButton 
            title= {category == "" || null ? "Category" : category} 
            variant="warning"
            onSelect={(key,event) => 
                handleSelect(key, event, "categoryFilter")}
        >
            <Dropdown.Item>Sports</Dropdown.Item>
            <Dropdown.Item>Entertainment</Dropdown.Item>
            <Dropdown.Item>Academic</Dropdown.Item>
            <Dropdown.Item>Off-campus</Dropdown.Item>
            <Dropdown.Item>Outdoors</Dropdown.Item>
            <Dropdown.Item>Meals/Coffee Chats</Dropdown.Item>
            <Dropdown.Item>Nassau Street</Dropdown.Item>
            <Dropdown.Item>Social</Dropdown.Item>
        </DropdownButton>
        {categoryFilterButton}
                    </Form.Group>
                    
        </Navbar.Brand>

        <Navbar.Brand>
        <Form.Group>
                <Form.Label>Maximum Cost ($)</Form.Label>
                <Form.Control type = "text" value={cost} name="cost" id = "cost" placeholder= "Enter a positive integer" onChange={(event) => {
                    document.getElementById('cost').classList.remove("error");
                    if(/^[0-9]+$/.test(event.target.value)) {
                        setCost(event.target.value)
                        console.log("Cost value:", event, event.target.value, cost)
                        props.getEvents(false, title, dayToNumber[day], category, event.target.value, capMin, capMax)
                    } else {
                        document.getElementById('cost').classList.add("error");             
                    }

                    }}></Form.Control>
        </Form.Group>
        </Navbar.Brand>
        <Navbar.Brand>
            <Form.Group>
                <Form.Label>
                Number of Attendees Range
                </Form.Label>
                <Row>
                    <Col>  <Form.Label>From:</Form.Label></Col>

                    <Col>       
                <Form.Control type="text" className = "inputBox" id = "min" value = {capMin} onChange={(event) => {
                    document.getElementById('min').classList.remove("error");
                    if(/^[0-9]+$/.test(event.target.value)) {
                        setCapMin(event.target.value)
                        console.log("capMin value:", event, event.target.value, capMin)
                        props.getEvents(false, title, dayToNumber[day], category, cost, event.target.value, capMax)
                    } else {
                        document.getElementById('min').classList.add("error");             
                    }
                        
                    }}></Form.Control> </Col>
                     <Col>  <Form.Label>To:</Form.Label></Col>
                    <Col><Form.Control type="text" className = "inputBox" id = "max" value = {capMax} onChange={(event) => {
                        document.getElementById('max').classList.remove("error");
                        if(/^[0-9]+$/.test(event.target.value)) {
                            setCapMax(event.target.value)
                            console.log("capMax value:", event, event.target.value, capMax)
                            props.getEvents(false, title, dayToNumber[day], category, cost, capMin, event.target.value)
                        } else {
                            document.getElementById('max').classList.add("error");             
                        }
                    }}></Form.Control></Col>

                </Row>

       
            </Form.Group>
        </Navbar.Brand>


       </Navbar>

    );
};

