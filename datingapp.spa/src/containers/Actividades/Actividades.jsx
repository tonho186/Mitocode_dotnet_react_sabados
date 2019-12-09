import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';

import * as actions from '../../store/actions/actionsIndex';
import ActividadCard from '../../components/Cards/ActividadCard/ActividadCard';
import Pagination from '../../components/UI/Pagination';
import classnames from 'classnames';
class Actividades extends Component {
  state = { currentPage: 1, pageSize: 4, likesParam: 'Likers' };

  componentDidMount() {
    const { currentPage, pageSize, likesParam } = this.state;

    this.props
      .onGetActividades(currentPage, pageSize, likesParam)
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
    this.props.onGetActividades(page, pageSize, likesParam).then(() => {
      this.setState({
        currentPage: this.props.pagination.currentPage,
        likesParam
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

  handleDeleteActividad = user => {
    alertify.warning('Are you sure you want to delete this message?');
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
    currentUser: state.auth.currentUser,
    pagination: state.user.pagination,
    error: state.user.error
  };
};

const mapDispacthToProps = dispatch => {
  return {
    onGetActividades: (page, itemsPerPage, likesParam) =>
      dispatch(actions.getActividades(page, itemsPerPage))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Actividades);
