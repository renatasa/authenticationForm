import React, { Component } from 'react';
import Auth from './Authentication/containers/auth/Auth';
import Todos from './Todos/containers/Todo/todo';
import {Route, Switch} from 'react-router-dom';
export class App extends Component {

  render() {
    return (
      <div>
          <Switch>
          <Route exact path="/todos">
            <Todos/>
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

