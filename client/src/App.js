import React from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Game from './Game';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:uuid" component={Game} />
        <Route path="*">
          <Redirect to={uuidv4()}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
