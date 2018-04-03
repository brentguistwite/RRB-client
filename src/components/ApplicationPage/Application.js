import React from 'react';
import { connect, } from 'react-redux';
import RequiresLogin from '../LandingPage/RequiresLogin';
import { fetchProtectedData, } from '../../actions/ProtectedData';
import Room from './Room';
import RoomCreate from './RoomCreate';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    const { match, } = this.props;

    if (match.url === '/dashboard') {
      return <RoomCreate />;
    }

    else {
      return <Room />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.auth.currentUser.username,

    name: `${state.auth.currentUser.firstName} ${state.auth.currentUser.lastName}`,
    protectedData: state.protectedData.data,
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Dashboard));