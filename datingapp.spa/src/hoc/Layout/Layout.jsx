import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Routes from '../Routes';
import Navigation from '../../components/Navigation/Navigation';
import * as actions from '../../store/actions/actionsIndex';

class Layout extends Component {
  logoutHandler = () => {
    this.props.onLogout();
    this.props.history.push('/');
    window.location.reload();
  };

  render() {
    const { currentUser, decodedToken, isAuthenticated } = this.props;
    return (
      <div>
        <Navigation
          decodedToken={decodedToken}
          currentUser={currentUser}
          isAuthenticated={isAuthenticated}
          logout={this.logoutHandler}
        />
        <main className='container'>
          <Routes isAuthenticated={isAuthenticated} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    decodedToken: state.auth.decodedToken,
    isAuthenticated: state.auth.token != null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
