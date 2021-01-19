import React, {useEffect, useContext} from "react";

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';

import CarouselHome from './CarouselHome/CarouselHome'
import './Home.css';

function Home() {

    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!userData.user) {
            history.push("/login");
        }
    });


    return (
      <div>
          <CarouselHome />
      </div>
    )
}

export default Home;
