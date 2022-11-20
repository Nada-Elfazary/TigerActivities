import React, {useState} from 'react';
import useCollapse from 'react-collapsed';
import Modal from './Modal';
import "./Home.css";
import axios from 'axios';

const XDSCard = ({item, ownerView}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [eventTitle, setEventTitle] = useState('')
    const [id, setEventId] = useState('')
    const [attendees, setAttendees] = useState([])


  const handleSignUp = ()=>{
    setDisplaySignUp(true)
    setEventTitle(item.event_name)
    setEventId(item.id)
  
  }
  const signUpModal = displaySignUp ? (<Modal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id}/>): null

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.post('/attendees', {
      event_id : event.id,
    }).then(res =>{
        if(res.data.length === 0){
            setAttendees("No sign ups yet")
        }
        else{
            setAttendees(res.data)
        }
    }).catch(err =>{
      console.log(err)
    
    })
  }
  return (
    <>
     <div className='card'>
        <div className='card-body'>
            <h2>{item.event_name}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                        Category: {item.category}
                        </td>
                        <td>Location : {item.location}</td>
                    </tr>
                    <tr>
                        <td>Start time : {item.start_time}</td>
                        <td>Created by : {item.creator}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Number of attendees : {item.signup_number}/{item.maxcap}</td>
                    </tr>
                    <tr>
                        <td><p {...getCollapseProps()}>
                        Description: {item.description}
                 
                           </p>     
                        </td>
                        <td>{!ownerView ? (<p {...getCollapseProps()}>
                        <button onClick={handleSignUp}>Sign Up</button>            
                           </p>) : null }   
                        </td>
                    </tr>
                    <tr>
                        <td>{ownerView ? (
                            <p {...getCollapseProps()}>
                                Attendees : {attendees}
                            </p>) : null }
                        </td>
                    </tr>
                </tbody>
            </table>
            <button
        {...getToggleProps({
          onClick: () =>{ setExpanded((prevExpanded) => !prevExpanded)
        get_attendees(item)},
        })}
      >
        {isExpanded ? 'Less Details' : 'More Details'}
      </button>
     
     </div>
        {signUpModal}
      
</div>
    </>
  )
}

export default XDSCard
