import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
import HomeTo from "./components/HomeTo"
import CasPage from './components/CasPage';
import CreateEventModalDraggable from './components/CreateEventModalDraggable';
import SignUpModal from './components/SignUpModal';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route exact path ="/" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path = '/login' element={<CasPage />}/>
      <Route path="/homeTo" element={<HomeTo />}/>
      {/* <Route path="/profile" element={<SignUpModal />} /> */}
    </Routes>
   </div>
  );
}

export default App;