import React, { Component } from 'react';
import Auth from './Authentication/containers/auth/Auth';
import {Route, Switch} from 'react-router-dom';

export class App extends Component {

  render() {
    console.log('app render')
    return (
      <div>

          <Switch>

          <Route exact path="/">
            <Auth/>
          </Route>

        </Switch> 
      </div>
    )
  }
}

export default App;

