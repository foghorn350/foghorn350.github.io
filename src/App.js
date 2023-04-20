
import { useEffect, useState } from 'react';
import Coin from './components/Coin';
import axios from 'axios';
import Iframe from 'react-iframe';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import { StytchProvider } from '@stytch/react';
import { StytchHeadlessClient } from '@stytch/vanilla-js/headless';

function App() {

  const stytchClient = new StytchHeadlessClient( "public-token-test-551c23e2-88b6-4902-b4fa-87a64c1d9961" );
  
  return(
    <div className="App">
      
      <Router>
      <StytchProvider stytch={stytchClient}>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/main" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
        </Routes>
        </StytchProvider>
      </Router>
    </div>
  )
}

export default App;



