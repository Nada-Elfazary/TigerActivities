import {React, useEffect} from 'react'
export default function CasPage(props){
    
        useEffect(() => {
         window.location.replace('https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities-iqwe.onrender.com/');
        }, [])
      
        // Render some text when redirecting
        // You can use a loading gif or something like that
        return <div>
          <h3>Redirecting...</h3>
        </div>
      
}