import React, { Component } from 'react';

export default class User extends Component {
  constructor(props) {
    super(props);

    const { id, gender, name } = props;
    this.state = {
      id,
      gender,
      name,
      isEditable: false,
    }
  }

  inputHandler = (value, name) => {
    this.setState({ [name]: value })
  }

  renderContent = () => {
    const { isEditable, gender, name } = this.state

    if (isEditable) {
      return (
        <React.Fragment>
          <input value={ name } onChange={ e => this.inputHandler(e.target.value, 'name') } />
          <select value={ gender } onChange={ e => this.inputHandler(e.target.value, 'gender') }>
            <option value={ false }>Male</option>
            <option value={ true }>Female</option>
          </select>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <b>Name: </b> { this.props.name } <br />
        <b>Gender: </b> { this.props.gender ? 'Female' : 'Male' }
      </React.Fragment>
    )
  }

  toggleEdit = () => {
    const { id, gender, name } = this.state
    if (this.state.isEditable) {
      this.props.updateHandler({ id, gender, name })
        .then(() => this.setState({ isEditable: false }))
    } else {
      this.setState({ isEditable: true })
    }
  }

  render() {
    const { isEditable } = this.state
    const { id } = this.props

    return (
      <div className="user">
        <button onClick={ this.toggleEdit }>
          { isEditable ? 'Save' : 'Edit' }
        </button>
        <b>Id: </b> { id } <br />
        { this.renderContent() }
      </div>
    )
  }
}
