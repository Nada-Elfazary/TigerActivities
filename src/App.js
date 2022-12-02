import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"
import HomeTo from "./components/HomeTo"
import CasPage from './components/CasPage';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route path ="/" element={<Welcome/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path = '/login' element={<CasPage />}/>
      <Route path="/homeTo" element={<HomeTo />}/>
    </Routes>
   </div>
  );
}

export default App;