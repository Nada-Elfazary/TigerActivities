import React, {useState} from 'react';
import useCollapse from 'react-collapsed';
import Modal from './Modal';
import "./Home.css";
import axios from 'axios';

const XDSCard = ({item, ownerView, signUpsView}) => {
    const [isExpanded, setExpanded] = useState(false)
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded })
    const [displaySignUp, setDisplaySignUp] = useState(false)
    const [eventTitle, setEventTitle] = useState('')
    const [id, setEventId] = useState('')
    const [attendees, setAttendees] = useState([])
    const closedText = "(CLOSED)"

  const handleSignUp = ()=>{
    setDisplaySignUp(true)
    setEventTitle(item.event_name)
    setEventId(item.id)
  
  }

  const handleCancellation = ()=>{
    console.log("canceling sign-up")
    console.log(item.id)
    console.log(item.event_name)

     axios.post('/cancel-sign-up', {
      event_id : item.id,
    }).then(res =>{
      console.log(res)
    }).catch(err =>{
      console.log(err)
    
    })
  }
  

  const signUpModal = displaySignUp ? (<Modal setOpenSignUpModal={setDisplaySignUp} title ={eventTitle} event_id={id}/>): null

  const get_attendees = (event)=>{
    console.log("inside get attendees")
    axios.get('/attendees', {params: {
      event_id : event.id,
    }}).then(res =>{
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
  const closed = item.signup_number === item.maxcap ? (<p>{closedText}</p>) : null
  return (
    <>
     <div className='customized-card'>
        <div className='customized-card-body'>
            <h2>{item.event_name}{closed} </h2>
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
                        <td>{(!ownerView && !signUpsView) ? (<p {...getCollapseProps()}>
                        <button onClick={handleSignUp} disabled={item.signup_number === item.maxcap}>Sign Up</button>            
                           </p>) : null }   {(!ownerView && signUpsView) ? (<p {...getCollapseProps()}>
                        <button onClick={handleCancellation} disabled={item.signup_number === item.maxcap}>Cancel</button>            
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
