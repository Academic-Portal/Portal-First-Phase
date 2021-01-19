import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from './home/Home';

import Navbar from './NavBar';

import Login from './auth/Login';
import Register from './auth/Register';

import Issues from "./issues/Issues";
import DiscussionThread from './issues/DiscussionThread/DiscussionThread';

import StudyMaterial from './study_material/StudyMaterial';
import UploadMetadata from './study_material/UploadMetadata';
import GoogleCallback from './study_material/GoogleCallback';

function Routes() {
    return(
      <div>
    <BrowserRouter>
      {/* <Switch> */}
      <Navbar />
        <Route exact path="/" component={Home} />

        {/* Home component */}
        {/* <Route path="/" component={ Home } /> */}

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Issues component */}
        <Route path="/Issues" component={Issues} />
        <Route path="/discussionThread" component={DiscussionThread} />

        {/* StudyMaterial component */}
        <Route path="/StudyMaterial" component={ StudyMaterial } />
        <Route path="/UploadMetadata" component={ UploadMetadata } />
        <Route path="/GoogleCallback" component={ GoogleCallback } />

      {/* </Switch> */}
    </BrowserRouter>
    </div>
    )
}

export default Routes;
