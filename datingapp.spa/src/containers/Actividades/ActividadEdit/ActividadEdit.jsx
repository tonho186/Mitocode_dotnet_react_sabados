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
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/actionsIndex';
import ActividadCard from '../../../components/Cards/ActividadCard/ActividadCard';
import EditActividad from './EditActividad';
import './ActividadEdit.css';
import PhotoEditor from './../PhotoEditor/PhotoEditor';
import alertify from 'alertifyjs';

class ActividadEdit extends Component {
  state = {
    activeTab: '1',
    actividadInfo: {
      descripcion: ''
    }
  };

  async componentDidMount() {
    const currentUser = this.props.decodedToken;

    await this.props.onGetActividad(currentUser.id);
    const { actividad } = this.props;
    const actividadInfo = { ...this.state.actividadInfo };

    if (actividad) {
      actividadInfo.descripcion = !actividad.descripcion ? '' : actividad.descripcion;
      this.setState({ actividadInfo });
    }
  }

  toggleHandler = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  handleUpdateActividad = () => {
    const currentUser = this.props.decodedToken;
    const { actividadInfo: updatedActividad } = this.state;
    const { actividad } = this.props;

    actividad.descripcion = updatedActividad.descripcion;

    this.props.onUpdateActividad(currentUser.nameid, actividad).then(() => {
      if (this.props.error)
        alertify.warning('You need to modify some fields before update');
      else alertify.success('Profile updated succesfully');
    });
  };

  handleChange = event => {
    const actividadInfo = { ...this.state.actividadInfo };
    actividadInfo[event.target.name] = event.target.value;

    this.setState({ actividadInfo });
  };

  render() {
    const { actividad } = this.props;
    const { actividadInfo } = this.state;

    let actividadCard = <p>Nothing to see</p>;
    let editActividad = <p>Edit Actividad Area</p>;
    if (actividad) {
      actividadCard = (
        <ActividadCard save={this.handleUpdateActividad} actividad={actividad} type={'save'} />
      );
      editProfile = (
        <EditActividad
          actividad={actividadInfo}
          handleSubmit={this.handleUpdateActividad}
          handleChange={this.handleChange}
        />
      );
    }

    return (
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-sm-4'>
            <h1>Your Actividad</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>{actividadCard}</div>
          <div className='col-sm-8'>
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
                  Edit Actividad
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
                  Edit Photos
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId='1'>
                <Row>
                  <Col sm='12'>{editActividad}</Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    actividad: state.actividad.actividad,
    decodedToken: state.auth.decodedToken,
    error: state.actividad.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetActividad: id => dispatch(actions.getActividad(id)),
    onUpdateActividad: (id, actividad) => dispatch(actions.updateActividad(id, actividad))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActividadEdit);
