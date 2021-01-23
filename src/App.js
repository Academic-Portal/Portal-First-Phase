import './App.css';

import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import Issues from "./issues/Issues";
import Home from './home/Home';
import DiscussionThread from './issues/DiscussionThread/DiscussionThread';
import StudyMaterial from './study_material/StudyMaterial';

function App() {
  return (
    <BrowserRouter>
      <div>

        <Route exact path="/">
          <Redirect to="/Home"></Redirect>
        </Route>
        
        {/* Home component */}
        <Route path="/Home" component={ Home } />

        {/* Issues component */}
        <Route path="/Issues" component={ Issues } />
        <Route path="/DiscussionThread" component={ DiscussionThread } />

        {/* StudyMaterial component */}
        <Route path="/StudyMaterial" component={ StudyMaterial } />

      </div>
    </BrowserRouter>
  );
}

export default App;
