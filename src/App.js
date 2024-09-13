import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home'
import LogIn from './Components/LogIn/LogIn';
import Detail from './Components/Home/Detail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000}}>
          <Navbar />
        </div>
        <div style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<LogIn/>} />
            <Route path="/Home" element={<Home/>}/>
            <Route path="/LogIn" element={<LogIn></LogIn>} />
            <Route path="/detail" element={<Detail></Detail>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
