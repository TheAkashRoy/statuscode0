import Landing from './components/Landing';
import './App.css';
import bg from "../src/assets/bg.png";
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <div className=' bg-cover bg-no-repeat bg-center h-screen hide-scrollbar '	
    style={{ backgroundImage: `url(${bg})` }}>
       
      
    
    <Routes>
      <Route path="/" element={<Landing />} />
      </Routes>
      </div>
    </>
   
  );
}

export default App;
