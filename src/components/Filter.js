import React, {useState} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';

import "./Filter.css";
export default function Filter(props) : React.ReactNode {
    const [title, setTitle] = useState("")
    const [day, setDay] = useState("")
    const [category, setCategory] = useState("")
    const [cost, setCost] = useState("")
    const [capCondition, setCapCondition] = useState("")
    const [cap, setCap] = useState("")
    const [attendeesNum, setAttendeesNum] = useState(0)

    // const leqAttendeeFilter

    const dayToNumber = {"Monday": 0, "Tuesday":1, "Wednesday":2, 
    "Thursday":3, "Friday":4, "Saturday":5, "Sunday":6}

    // getEvents takes in query parameters and returns event respecting
    // all params
    const handleSelect = (key, event, filterTitle) => {
        console.log("Event data & key:", event.nativeEvent.target.firstChild.data, key)
        if (filterTitle == "dayFilter") {
            setDay(event.nativeEvent.target.firstChild.data)
            props.getEvents(false, title, 
                //dayToNumber[event.nativeEvent.target.firstChild.data], category, cost)  
                 dayToNumber[event.nativeEvent.target.firstChild.data], category, cost, capCondition)
        }
        else if (filterTitle == "categoryFilter"){
            setCategory(event.nativeEvent.target.firstChild.data)
            props.getEvents(false, title, dayToNumber[day],
                //event.nativeEvent.target.firstChild.data, cost)
               event.nativeEvent.target.firstChild.data, cost, capCondition, cap)
        }
        

    }

    const dayFilterButton = day === "" ? null : <button 
    className= "FilterX" 
    onClick={() => {
        setDay("")
       // props.getEvents(false, title, "", category, cost)
         props.getEvents(false, title, "", category, cost, capCondition)
        }}>
        X
    </button>

    const categoryFilterButton = category === "" ? null : <button 
    className= "FilterX" 
    onClick={() => {
        setCategory("")
      //  props.getEvents(false, title, dayToNumber[day], "", cost)
         props.getEvents(false, title, dayToNumber[day], "", cost, capCondition)
        }}>
        X
</button> 
    // console.log("handle select day:", handleSelectDay)

    return (
        <div className="filterSurround">
            <div className="filterContainer">
                <div className="titleFilter">
                    <label>Event Title</label>
                    <div className="alignFilter">
                   
                    <input value={title} name="title" onChange={(event) => {
                        setTitle(event.target.value)
                        console.log("Title value:", event, event.target.value, title)
                        props.getEvents(false, event.target.value, dayToNumber[day], category, cost)
                    }}></input>
                    <br/>
                    </div>
                </div>
                <div className="dayFilter">
                    <label>Day</label>
                    <div className="alignFilter">
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
                        {dayFilterButton}
                    </div>
                </div>

                <div className="categoryFilter">
                    <label>Category</label>
                    <div className="alignFilter">
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
                        </DropdownButton>
                        {categoryFilterButton}
                    </div>
                </div>

                <div className="costFilter">
                    <label>Maximum Cost ($)</label>
                    <div className="alignFilter">
                    
                    <div>
                    <input value={cost} name="cost" placeholder= "Enter a positive integer" onChange={(event) => {
                        setCost(event.target.value)
                        console.log("Cost value:", event, event.target.value, cost)
                        props.getEvents(false, title, dayToNumber[day], category, event.target.value)
                    }}></input>
                    <br/>
                </div>
                    </div>
                </div>                             
               {/* <label for="leq"> Less than or equal to</label></td>
                   <td> <input type = "radio" id= "leq" value= "<=" name="condition" onChange={(event) => {
                        setCapCondition(event.target.value)
                        console.log("Cap value:", event, event.target.value, title)
                        props.getEvents(false, title, dayToNumber[day], category, cost, event.target.value, cap)
                    }}></input></td>
                    </tr>
                    <tr>
                    <td><label for="leq">Greater than or equal to</label></td>
                    <td><input type = "radio" value= ">=" name="condition" onChange={(event) => {
                        setCapCondition(event.target.value)
                        console.log("Cap value:", event, event.target.value, title)
                        props.getEvents(false, title, dayToNumber[day], category, cost, event.target.value, cap)
                    }}></input></td>
                    <td><input id= "cap" placeholder= "Enter a positive integer" name="leq" onChange={(event) => {
                        setCap(event.target.value)
                        console.log("Cap value:", event, event.target.value, title)
                        props.getEvents(false, title, dayToNumber[day], category, cost, capCondition, event.target.value)
                    }}></input></td>
                    </tr>
                    </tbody>
                    </table>
                    
                    <br/>
                </div> */}
                <div className="capFilter">
                
                <label>Number of Attendees Range</label>
                <div className="alignFilter">
                
                <label>From: </label>
                    <input class = "inputBox"></input>
                    <label>To: </label>
                    <input class = "inputBox"></input>
                      
                    <br/>
                    </div>
                </div>

            </div>
        </div>
        
    );
};

