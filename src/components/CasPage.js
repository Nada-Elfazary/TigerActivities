import {React, useEffect} from 'react'
export default function CasPage(props){
    
        useEffect(() => {
          window.location.replace(props.url);
        }, [])
      
        // Render some text when redirecting
        // You can use a loading gif or something like that
        return <div>
          <h3>Redirecting...</h3>
        </div>
      
}