import './App.css';
import {Route, Routes} from 'react-router-dom'
import Welcome from './components/welcome'
import Home from "./components/Home"

function App(): React.ReactNode {

  return (
    
   <div>
      <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path ="/" element={<Welcome/>}/>
    </Routes>
   </div>
  );
}

export default App;