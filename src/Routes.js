import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Axios from "axios";
import UserContext from './context/UserContext';

import Navbar from './NavBar';

import Home from './home/Home';

import Login from './auth/Login';
import Register from './auth/Register';

import Issues from "./issues/Issues";
import DiscussionThread from './issues/DiscussionThread/DiscussionThread';

import StudyMaterial from './study_material/StudyMaterial';

    export default function Routes() {

      const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");

            if(token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }
            const tokenRes = await Axios.post(
            "http://localhost:5000/users/tokenIsValid",
            null,
            {headers: {"x-auth-token": token}}
            );

            if (tokenRes.data) {
                const userRes = await Axios.get("http://localhost:5000/users/", 
                {headers: {"x-auth-token": token},
            });
            
            setUserData({
                token,
                user: userRes.data,
            });

            }
        }

        checkLoggedIn();

    }, []);
    return(
      <>
        <BrowserRouter>
            <UserContext.Provider value={{userData, setUserData}}>
                <Navbar />
                <Switch>
                    {/* home */}
                    <Route exact path="/" component={Home} />
                    {/* Auth */}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/* Issues  */}
                    <Route path="/issues" component={Issues} />
                    <Route path="/discussionthread" component={DiscussionThread} />
                    <Route path="/studymaterial" component={StudyMaterial} />
                </Switch>
            </UserContext.Provider>
        </BrowserRouter>
    </>
    )
}



