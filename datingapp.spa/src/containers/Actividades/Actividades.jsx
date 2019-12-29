import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';

import * as actions from '../../store/actions/actionsIndex';
import ActividadCard from '../../components/Cards/ActividadCard/ActividadCard';
import Pagination from '../../components/UI/Pagination';
import userService from '../../services/userService.js';
import auth from '../../services/authService.js';

class Actividades extends Component {
  state = { actividades: [], currentPage: 1, pageSize: 4, likesParam: 'Likers' };

  componentDidMount() {
    const { currentPage, pageSize } = this.state;
    const { decodedToken } = this.props;
    this.props
      .onGetActividades(decodedToken.id, currentPage, pageSize)
      .then(() => {
        const { pagination } = this.props;
        this.setState({ currentPage: pagination.currentPage });
      })
      .catch(error => {
        if (this.props.error) {
          alertify.error('Problem retrieving data');
          alertify.warning(this.props.error.response.statusText);
          this.props.history.push('/home');
        }
      });
  }

  loadActividades = (page, likesParam) => {
    const { pageSize } = this.state;
    const { decodedToken } = this.props;
    this.props.onGetActividades(decodedToken.id,page, pageSize).then(() => {
      this.setState({
        currentPage: this.props.pagination.currentPage
      });
    });
    if (this.props.error) {
      alertify.error('Problem retrieving data');
    }
  };

  handlerSearchCriteria = likesParam => {
    this.loadActividades(this.state.currentPage, likesParam);
  };

  handlePageChange = page => {
    this.loadActividades(page, this.state.likesParam);
  };

  handleDeleteActividad = actividadId => {
  //  alertify.warning('Are you sure you want to delete this message?');
    const { currentUser } = this.props;
    const originalActividades = this.state.actividades;
    const actividades = this.state.actividades;

    const { unique_name: username } = auth.getDecodedToken();
    alertify.confirm(
      `Mr. ${username}`,
      'Are you sure you want to delete this message?',
      async () => {
        actividades.splice(actividades.findIndex(p => p.id === actividadId), 1);
        this.setState({ actividades });

        await userService
          .deleteActividad(currentUser.id, actividadId)
          .then(() => {
            alertify.warning('The activity was rejected');
          })
          .catch(error => {
            alertify.warning(error);
            this.setState({ actividades: originalActividades });
          });
      },
      () => {}
    );
  };

  handleEditActividad = id => {
    this.props.history.push('/actividades/' + id);
  };

  render() {
    const { likesParam, currentPage } = this.state;
    const { actividades, pagination } = this.props;

    let actividadCardArea = <p>No matching users</p>;
    if (actividades) {
      actividadCardArea = actividades.map(actividad => (
        <div key={actividad.id} className='col-lg-2 col-md-3 col-sm-6'>
          <ActividadCard
            actividad={actividad}
            actEdit={this.handleEditActividad}
            actDelete={this.handleDeleteActividad}
          />
        </div>
      ));
    }

    let paginationArea = <p>Pagination</p>;
    if (pagination) {
      const { itemsPerPage, totalItems, totalPages } = pagination;

      paginationArea = (
        <Pagination
          itemsCount={totalItems}
          pageSize={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={this.handlePageChange}
        />
      );
    }

    return (
      <div>
        <div className='container mt-3'>
          <div className='row'>{actividadCardArea}</div>
        </div>
        <div className='d-flex justify-content-center'>{paginationArea}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    decodedToken: state.auth.decodedToken,
    currentUser: state.auth.currentUser,
    pagination: state.user.pagination,
    error: state.user.error
  };
};

const mapDispacthToProps = dispatch => {
  return {
    onGetActividades: (userId, page, itemsPerPage) =>
      dispatch(actions.getActividades(userId, page, itemsPerPage))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Actividades);
