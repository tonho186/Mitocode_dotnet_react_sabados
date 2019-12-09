import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';

import PhotoManagement from './PhotoManagment/PhotoManagment';

class AdminPanel extends Component {
  state = {
    activeTab: '1'
  };

  toggleHandler = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    return (
      <div className='container mt-5'>
        <h2 className='text-center'>Admin Panel</h2>
        <div className='col-sm-12'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: this.state.activeTab === '1'
                  },
                  {
                    'navlink-active': this.state.activeTab === '1'
                  }
                )}
                onClick={() => {
                  this.toggleHandler('1');
                }}
              >
                User Managment
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames(
                  {
                    active: this.state.activeTab === '2'
                  },
                  {
                    'navlink-active': this.state.activeTab === '2'
                  }
                )}
                onClick={() => {
                  this.toggleHandler('2');
                }}
              >
                Photo Managment
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId='1'>
              <Row>
                <Col sm='12'>
                  <p>User Managment Area</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='2'>
              <Row>
                <Col sm='12'>
                  <PhotoManagement />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
