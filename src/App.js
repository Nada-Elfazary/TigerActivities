import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
//import 'bootstrap/dist/css/bootstrap.min.css';

function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route path ="/" element={<Welcome/>}/>
      <Route path = '/login' component={()=>{
        window.location.href = 'https://fed.princeton.edu/cas/login?service=https%3A//tigeractivities-iqwe.onrender.com/'
      } }/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
   </div>
  );
}

export default App;