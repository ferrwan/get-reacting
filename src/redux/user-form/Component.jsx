import React, { Component } from 'react'

export default class UserForm extends Component {
  static defaultProps = {
    loading: false
  }

  state = {
    gender: true,
    name: ''
  }

  inputHandler = (value, name) => {
    this.setState({
      [name]: value
    })
  }

  submitHandler = (e) => {
    const { name, gender } = this.state
    e.preventDefault()

    this.props.submitUser({ gender, name })
  }

  render() {
    const { gender, name } = this.state
    const { loading } = this.props

    return (
      <div className="redux__form">
        <h3>Add User</h3>
        <form onSubmit={ this.submitHandler }>
          <div>
            <label>Name: </label>
            <input value={ name } onChange={ e => this.inputHandler(e.target.value, 'name') } />
          </div>

          <div>
            <label>Gender: </label>
            <select value={ gender } onChange={ e => this.inputHandler(e.target.value, 'gender') }>
              <option value={ false }>Male</option>
              <option value={ true }>Female</option>
            </select>
          </div>

          <div>
            <button disabled={ loading || !name.trim() }>Add</button>
          </div>
        </form>
      </div>
    )
  }
}
