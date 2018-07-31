import { connect } from 'react-redux';

import UserForm from './Component.jsx';

import { userFail, userRequest, userSelector, userSuccess } from '../user-reducer.js'

const mapStateToProps = state => ({
  loading: userSelector(state, 'loading'),
})

const mapDispatchToProps = dispatch => ({
  submitUser(formData) {
    const aPromise = () => new Promise((resolve, reject) => {
      setTimeout(() => resolve(formData), 2000);
    })

    dispatch(userRequest())
    aPromise()
      .then(res => dispatch(userSuccess(res)));
  }
})

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

export default Container;
