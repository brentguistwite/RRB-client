import React from 'react';
import { connect, } from 'react-redux';

import { socket, } from './Room';
import { updateChatLog, } from './../../actions/Chat';
import './Chat.css';


export class Chat extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(updateChatLog(this.input.value));
    this.input.value = '';
  }

  generateChatList() {
    const chatList = this.props.chatLogs
      .map(message =>
        <li>{message}</li>
      );
    return chatList;
  }

  render() {
    console.log(this.props, 'these are props');
    return (
      <section className="chat-wrapper">
        <div className="chat-display">
          <ul className="chat-messages">
            fsffdfsd
            {this.generateChatList()}
          </ul>
        </div>
        <form
          onSubmit={(event) => {
            this.handleSubmit(event);
          }}>
          <input
            className="chat-user-input"
            placeholder="Type here..."
            ref={(input) => {
              this.input = input;
            }}
          />
          <button>
            Send
          </button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { chatLogs: state.chat.chatLogs, };
};

export default connect(mapStateToProps)(Chat);
