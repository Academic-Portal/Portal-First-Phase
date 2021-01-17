import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Axios from "axios";

import Navbar from './NavBar';

import Home from './home/Home';

import Login from './auth/Login';
import Register from './auth/Register';

import Issues from "./issues/Issues";
import DiscussionThread from './issues/DiscussionThread/DiscussionThread';

import StudyMaterial from './study_material/StudyMaterial';

    export default function Routes() {
    

    return(
      <>
        <BrowserRouter>
                <Navbar />
                <Switch>
                    {/* home */}
                    <Route exact path="/" component={Home} />
                    {/* Auth */}
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/* Issues  */}
                    <Route path="/issues" component={Issues} />
                    <Route path="/:id" component={DiscussionThread} />
                    <Route path="/studymaterial" component={StudyMaterial} />
                </Switch>
        </BrowserRouter>
    </>
    )
}



