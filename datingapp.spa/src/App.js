import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/actionsIndex';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onTrySignUp();
  }

  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTrySignUp: () => dispatch(actions.trySignUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
