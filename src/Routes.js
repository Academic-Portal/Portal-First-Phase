import { BrowserRouter, Route, Redirect } from "react-router-dom";


import Home from './home/Home';

import Issues from "./issues/Issues";
import DiscussionThread from './issues/DiscussionThread/DiscussionThread';

import StudyMaterial from './study_material/StudyMaterial';

function Routes() {
    return(
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
    )
}

export default Routes;

