import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import Login from './Login';
import './Navigation.css';
import { roles } from '../../config/roles';
import auth from '../../services/authService';

class Navigation extends Component {
  state = {
    dropdownOpen: false
  };

  toogleHandler = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { decodedToken, currentUser, isAuthenticated, logout } = this.props;

    const welcomeMsg = 'Welcome ';

    let toolBarMenu = null;
    if (isAuthenticated) {
      toolBarMenu = (
        <Nav navbar>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/members'>
              Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/lists'>
              Lists
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/actividades'>
              Actividades
            </NavLink>
          </NavItem>
          {auth.roleMatch(roles) ? (
            <NavItem>
              <NavLink tag={NavLinkRouter} exact to='/admin'>
                Admin
              </NavLink>
            </NavItem>
          ) : null}
        </Nav>
      );
    }

    let userInfoArea = isAuthenticated ? (
      <div className='dropdown'>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toogleHandler}
        >
          <img
            className='UserPhoto'
            src={
              currentUser.photoUrl
                ? currentUser.photoUrl
                : require('../../assets/user.png')
            }
            alt={currentUser && currentUser.username}
          />
          <DropdownToggle caret color='primary'>
            {welcomeMsg}
            {decodedToken.unique_name}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={NavLinkRouter} exact to='/member/edit'>
              <i className='fa fa-user' /> Edit Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={logout}>
              <i className='fa fa-sign-out' /> Logout
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    ) : (
      <Login />
    );

    return (
      <div>
        <Navbar
          className='navbar navbar-expand-md navbar-dark bg-primary'
          light
          expand='md'
        >
          <NavbarBrand tag={NavLinkRouter} exact to='/'>
            findYourMatch.com
          </NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>{toolBarMenu}</Collapse>
          {userInfoArea}
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
