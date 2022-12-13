import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
import CreateEventModalDraggable from './components/CreateEventModalDraggable';
import SignUpModal from './components/SignUpModal';
import HomeTo from './components/HomeTo';
import Error from "./components/Error"
function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route path ="/" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/homeTo' element={<HomeTo/>}/>
      <Route path="/error" element={<Error/>}/>
    </Routes>
   </div>
  );
}

export default App;