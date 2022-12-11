import './App.css';
import {Route, Routes, Router} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
import HomeTo from "./components/HomeTo"
import CasPage from './components/CasPage';
import CreateEventModalDraggable from './components/CreateEventModalDraggable';
import SignUpModal from './components/SignUpModal';
//import 'bootstrap/dist/css/bootstrap.min.css';
import HomeTo from './components/HomeTo';
function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route exact path ="/" element={<Welcome/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path = '/login' element={<CasPage />}/>
      <Route exact path="/homeTo" element={<HomeTo />}/>
      {/* <Route path="/profile" element={<SignUpModal />} /> */}
    </Routes>
   </div>
  );
}

export default App;