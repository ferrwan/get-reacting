import { connect } from 'react-redux';

import User from './Component.jsx';

import { userRequest, userSelector, userUpdate } from '../user-reducer.js';

const mapStateToProps = state => ({
  users: userSelector(state, 'users'),
})

const mapDispatchToProps = dispatch => ({
  updateUser(formData) {
    const fPromise = () => new Promise((resolve, reject) => {
      setTimeout(() => resolve(formData), 2000);
    }) 

    dispatch(userRequest());

    return fPromise()
      .then(res => dispatch(userUpdate(res)))
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(User);

export default Container;
