import React, { Component } from 'react';
import { connect } from 'react-redux';
import alertify from 'alertifyjs';

import * as actions from '../../store/actions/actionsIndex';
import MemberCard from '../../components/Cards/MemberCard/MemberCard';
import Pagination from '../../components/UI/Pagination';
import classnames from 'classnames';
class Lists extends Component {
  state = { currentPage: 1, pageSize: 4, likesParam: 'Likers' };

  componentDidMount() {
    const { currentPage, pageSize, likesParam } = this.state;

    this.props
      .onGetUsers(currentPage, pageSize, likesParam)
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

  loadUsers = (page, likesParam) => {
    const { pageSize } = this.state;
    this.props.onGetUsers(page, pageSize, likesParam).then(() => {
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
    this.loadUsers(this.state.currentPage, likesParam);
  };

  handlePageChange = page => {
    this.loadUsers(page, this.state.likesParam);
  };

  handleSendLike = user => {
    alertify.warning('Come on! You already like ' + user.knownAs);
  };

  handleRedirectToDetail = id => {
    this.props.history.push('/members/' + id);
  };

  render() {
    const { likesParam, currentPage } = this.state;
    const { users, pagination } = this.props;

    let memberCardArea = <p>No matching users</p>;
    if (users) {
      memberCardArea = users.map(user => (
        <div key={user.id} className='col-lg-2 col-md-3 col-sm-6'>
          <MemberCard
            user={user}
            sendLike={this.handleSendLike}
            toDetail={this.handleRedirectToDetail}
          />
        </div>
      ));
    }

    let paginationInfoArea = <h2>Your likes/likees - 0 - found</h2>;
    let paginationArea = <p>Pagination</p>;
    if (pagination) {
      const { itemsPerPage, totalItems, totalPages } = pagination;

      paginationInfoArea = (
        <h2>
          {likesParam === 'Likers'
            ? 'Members who like me'
            : "Members who I've Liked"}
          : {pagination.totalItems}
        </h2>
      );
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
        <div className='text-center mt-3'>{paginationInfoArea}</div>
        <div className='container mt-3'>
          <div className='row'>
            <div className='btn-group'>
              <button
                className={classnames({
                  btn: true,
                  'btn-primary': likesParam === 'Likers',
                  'btn-outline-primary': likesParam === 'Likees'
                })}
                onClick={() => this.handlerSearchCriteria('Likers')}
              >
                Members who like me
              </button>
              <button
                className={classnames({
                  btn: true,
                  'btn-primary': likesParam === 'Likees',
                  'btn-outline-primary': likesParam === 'Likers'
                })}
                onClick={() => this.handlerSearchCriteria('Likees')}
              >
                Members who I like
              </button>
            </div>
          </div>
          <br />
          <div className='row'>{memberCardArea}</div>
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
    onGetUsers: (page, itemsPerPage, likesParam) =>
      dispatch(actions.getUsers(page, itemsPerPage, null, likesParam))
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(Lists);
