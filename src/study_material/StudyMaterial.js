import React, {useEffect, useContext} from "react";

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';


function StudyMaterial() {

    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!userData.user) {
            history.push("/login");
        }
    });


    return(
        <div>
            <h1>StudyMaterial</h1>
        </div>
    );
}

export default StudyMaterial;