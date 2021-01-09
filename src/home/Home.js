import React, {useEffect, useContext} from "react";

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';

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
            <div>
                <h1>Home</h1>
            </div>
        </div>
    )
}

export default Home;