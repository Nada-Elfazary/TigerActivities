import React, { useState } from "react";
import  {useNavigate} from "react-router-dom";
import axios from "axios";
import CasPage from "./CasPage";

import "./Modal.css";

export default function RulesModal(props) : React.ReactNode {
    // let checked = useRef(false)
    const [saving, setSaving] = useState(false)
    const [checked, setChecked] = useState(false)
    const [showErrorMsg, setShowErrorMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()

  

    const cas = ()=>{
    // #axios.get('https://tigeractivities.onrender.com/dummy').then(res=>{
      //let url = res
      // console.log("url", url)
        navigate('/login')
      /* const config = {
        headers: {
         "Access-Control-Allow-Origin" : "true"
        }
      /* }
      // axios.get('https://tigeractivities.onrender.com/dummy').then(res=>{
      //let url = res
      //console.log("url", url)
        //navigate('/homeTo')
      
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
      //navigate('https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities.onrender.com/dummy')
      // navigate('https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities-iqwe.onrender.com/')
     //navigate('/login')
     // navigate('/home')
    }
    const handleChecked = (event)=>{
        setChecked(event.target.checked)
        setShowErrorMsg(!checked)
        setSaving(event.target.checked)
    }

    let error = ""

    const handleContinue = ()=>{
      console.log("inside here")
        // errorMsg = !saving ? <h3>Sth</h3> : null 
    }
    

    
    

    const cancelBtn =  (<button 
      onClick={() => {
        props.setOpenModal(false);
      }}
      id="cancelBtn"
    >
      Cancel
    </button>)

    // errorMsg = showErrorMsg ? <strong className="error">Read Our Terms and Agreements before proceeding</strong> : null
    const errorM  = showErrorMsg!= null ? <strong className="error">{errorMsg}</strong> : null
    let footer = null
    footer = (<div className="footer">
    {cancelBtn}
    <button onClick={()=>{
      setSaving(checked)
      setShowErrorMsg(!checked)
      if(!saving){
        console.log("show error msg")
        error = "Read Our Terms and Conditions carefully before proceeding"
        failureCallBack(error)
      }
      else{
       // navigate("https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities-iqwe.onrender.com/")
        setSaving(true)
        successCallback()
      }
      handleContinue()
    }}>Continue</button>
      {errorM}

  </div>)

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>  Carefully Read Our Community Guidelines Below:</h2>
        </div>
        <div className="body">
      
           <ol type= "1">
            <li>
            Use appropriate language when creating activities. Inappropriate activities or behavior could result 
            in banning from this platform
           </li>
           <li>
            Be respectful of your peer's time
           </li>
           <li>
            Keep your attendees updated on changes in activities
           </li>
           <li>
            Keep safe. Enjour our platform. Cheers!
            </li>
           </ol>
        </div>
        <div>
        <input type="checkbox"  onChange={handleChecked}/>
           <span>Agree with terms and conditions</span>
        </div>
        {footer}
      </div>
    </div>
  );
}

// export default RulesModal;