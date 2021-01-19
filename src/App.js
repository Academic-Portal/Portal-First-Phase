import './App.css';

import React, { useState } from "react";

import Navbar from "./NavBar";
import Routes from "./Routes";

import UserContext from './context/UserContext';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

const userInfo = {userData, setUserData};

  return (
    <div>
      <UserContext.Provider value={userInfo}>
       
        <Routes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
