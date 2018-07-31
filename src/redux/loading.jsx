import React from 'react';
import { connect } from 'react-redux';

import { userSelector } from  './user-reducer.js';

const Loading = (props) => {
  const { loading } = props
  if (loading) {
    return <div><div className="loading" /></div>
  }

  return null;
}

const Container = connect(
  (state => ({
    loading: userSelector(state, 'loading')
  }))
)(Loading);

export default Container;
