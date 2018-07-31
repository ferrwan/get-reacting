import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import './App.css';
import logo from './logo.svg';
import reduxLogo from './redux1.png';
import Board from './components/Board.jsx';
import Diffing from './components/Diffing.jsx';
import ReduxApp from './redux/index.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <header className="App-header">
              <Switch>
                <Route path="/redux" render={ () => (
                    <React.Fragment>
                      <h1>Welcome To Redux</h1>
                      <img src={reduxLogo} className="App-logo" alt="logo" />
                    </React.Fragment>
                  ) }
                />
                <Route path="/" render={ () => (
                    <React.Fragment>
                      <h1>Welcome To React</h1>
                      <img src={logo} className="App-logo" alt="logo" />
                    </React.Fragment>
                  ) }
                />
              </Switch>
            </header>

            <div className="app__content">
              <div className="app__link">
                <NavLink exact to="/">HOME</NavLink>
                <NavLink to="/diffing">DIFFING</NavLink>
                <NavLink to="/redux">REDUX</NavLink>
              </div>
              <div>
                <Route exact path="/" component={ Board } />
                <Route path="/diffing" component={ Diffing } />
                <Route path="/redux" component={ ReduxApp } />
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
        <hr />
      </div>
    );
  }
}

export default App;
