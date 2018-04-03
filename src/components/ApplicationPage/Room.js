import './Room.css';
import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import { withRouter, } from 'react-router';
import EditorView from './EditorView';
import { setCreateInput, } from '../../actions/Application';
import { API_BASE_URL, } from '../../config';
import WebCam from './WebCam';
export const socket = io(API_BASE_URL);
export class Room extends React.Component {
  componentDidMount() {
    this.props.dispatch(setCreateInput(this.props.match.params.roomName));
    socket.emit('join room', { room: this.props.match.params.roomName, user: this.props.username, });
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.match.params.roomName, user: this.props.username, });
  }

  render() {
    return (
      <section className="room">
        <EditorView className="editors" />
        <WebCam className="webCam" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
});

export default withRouter((connect)(mapStateToProps)(Room));