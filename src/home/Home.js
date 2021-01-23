import React, {useEffect, useState} from "react";

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import Review from './AboutUsHome/Review'
import CarouselHome from './CarouselHome/CarouselHome'
import './Home.css';
import Navbar from '../NavBar';

function Home() {

    const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();

    useEffect(() => {
        if(!userData.user) {
            history.push("/login");
        }
    });


    return (
      <div>
          <Navbar />
          <CarouselHome />
          <Review/>
      </div>
    )
}

export default Home;
