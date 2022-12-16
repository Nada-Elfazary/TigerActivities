import './App.css';
import {Route, Routes, Router} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
import CasPage from './components/CasPage';
import CreateEventModalDraggable from './components/CreateEventModalDraggable';
import SignUpModal from './components/SignUpModal';
import Error from "./components/Error"
// import 'bootstrap/dist/css/bootstrap.min.css';
function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route exact path ="/" element={<Welcome/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path = '/login' element={<CasPage />}/>
      <Route exact path="/error" element={<Error errMsg={"A server error has occured."}/>}/>
      <Route path="/*" element={<Error errMsg={"Web Page not found."}/>} />
      {/* <Route path="/profile" element={<SignUpModal />} /> */}
    </Routes>
   </div>
  );
}

export default App;