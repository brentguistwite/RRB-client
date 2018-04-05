import './Room.css';
import React from 'react';
import { connect, } from 'react-redux';
import io from 'socket.io-client';
import { withRouter, } from 'react-router';
import EditorView from './EditorView';
import { setCreateInput, } from '../../actions/Application';
import { fetchDocsFromDb, saveDocsToDb, } from '../../actions/Editor';
import { API_BASE_URL, } from '../../config';
import WebCam from './WebCam';
export const socket = io(API_BASE_URL);


export class Room extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchDocsFromDb(this.props.match.params.roomName));
  }

  componentDidMount() {
    this.props.dispatch(setCreateInput(this.props.match.params.roomName));
    socket.emit('join room', { room: this.props.match.params.roomName, user: this.props.username, });
    const doc = {
      code: this.props.codeEditorText,
      word: this.props.wordEditorText,
      whiteBoard: this.props.whiteBoardEditorText,
    };
    this.interval = setInterval(this.props.dispatch(saveDocsToDb(doc)), 30000);
  }

  componentWillUnmount() {
    socket.emit('leave room', { room: this.props.match.params.roomName, user: this.props.username, });
    clearInterval(this.interval);
  }

  render() {
    return (
      <section className="room">
        <EditorView className="editors" />
        <WebCam className="webcam" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  roomName: state.applicationReducer.roomName,
  codeEditorText: state.editorReducer.codeEditorText,
  wordEditorText: state.editorReducer.wordEditorText,
  whiteBoardEditorText: state.editorReducer.whiteBoardEditorText,
});

export default withRouter((connect)(mapStateToProps)(Room));
