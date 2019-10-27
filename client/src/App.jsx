import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import NavBar from './components/main/NavBar';
import History from './components/history/History';
import EntryPage from './components/entry/EntryPage';
import Resources from './components/resources/Resources';
import Trends from './components/trends/Trends';
import User from './components/user/User';
import Home from './components/main/Home';


function App() {
  const [index, setIndex] = useState(0);

  return (
    <Router>
      <div className='App'>

        <Switch>

          <Route exact path="/"> <Home /> </Route>

          <Route path="/history"> <History /> </Route>

          <Route path="/trends"> <Trends /> </Route>

          <Route path='/entry'> <EntryPage index={index} setIndex={setIndex} /> </Route>

          <Route path='/user' > <User /> </Route>

          <Route path='/resources'> <Resources /> </Route>

        </Switch>

        <NavBar index={index} setIndex={setIndex} />

      </div>
    </Router>
  );
}

export default App;
