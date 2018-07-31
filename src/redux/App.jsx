import React, { Component } from 'react';

import Loading from './loading.jsx';
import UserForm from './user-form/Container.jsx';
import Users from './users/Container.jsx';

import "../styles/Redux.css";

export default class App extends Component {
  render() {
    return (
      <div className="redux">
        <h1>Simple Redux</h1>
        <Loading />
        <hr />
        <UserForm />
        <hr />

        <div style={ { textAlign: 'left' } }>
          <h3>User List</h3>
          <Users />
        </div>
      </div>
    )
  }
}
