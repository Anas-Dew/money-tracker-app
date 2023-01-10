import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Account from './components/Account';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
import Footer from './components/Footer';
function App() {

  const [alert, setalert] = useState('')

  const showAlert = (bold, message, type) =>{
    setalert({
      bold: bold,
      message: message,
      type: type,
    })

    setTimeout(()=>{
      setalert('')
    }, 2500)
  }
  return (  
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar title='Frinance' />
          {/* <Alert bold='h' message='s' type='success'/> */}
          <Alert alert={alert}/>
          <div className='container d-flex flex-column'>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/account" element={<Account />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
