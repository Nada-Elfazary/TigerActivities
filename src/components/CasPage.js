import {React, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Home from './Home'
export default function CasPage(props){
    const navigate = useNavigate()

        useEffect(() => {
         window.location.replace('https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities-iqwe.onrender.com/')
         console.log("broswer url: ", window.location.href)
         if (window.location.href.includes('ticket=')) {
          navigate("/home")
         }
         
        }, [])
      
        // Render some text when redirecting
        // You can use a loading gif or something like that
        return <div>
          <h3>Redirecting...</h3>
        </div>
      
}