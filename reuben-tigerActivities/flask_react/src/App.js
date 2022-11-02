import axios from "axios";
import logo from './logo.svg';
import './App.css';

import Welcome from './components/welcome'


function App(): React.ReactNode {

  
    const welcome = (<Welcome />)  

  return (
    
   <div>
    {welcome}
   </div>
  );
}

export default App;