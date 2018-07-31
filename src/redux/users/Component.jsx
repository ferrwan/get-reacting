import React, { Component } from 'react';

import User from './User.jsx';

export default class Users extends Component {
  render() {
    const { users, updateUser } = this.props
    const userNodes = users.map(user => (
      <User
        key={ user.id }
        updateHandler={ updateUser }
        { ...user }
      />
    ))

    return (
      <div className="users">
        { userNodes }
      </div>
    )
  }
}
