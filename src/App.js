import React, { Component } from 'react';
import Auth from './Authentication/containers/auth/Auth';
import LogedIn from './Authentication/components/LogedIn/LogedIn';
import {Route, Switch} from 'react-router-dom';

export class App extends Component {

  render() {
    return (
      <div>

          <Switch>
          <Route exact path="/logedin">
            <LogedIn/>
          </Route>

          <Route exact path="/">
            <Auth/>
          </Route>

        </Switch> 
      </div>
    )
  }
}

export default App;

