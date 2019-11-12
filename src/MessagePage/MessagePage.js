import React from "react";
import "./style.css";
import axios from "axios";
const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  },
  {
    senderId: "Junlan",
    text: "hello"
  }
];
class MessagePage extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props.location;
    console.log("print data");
    console.log(data);
    this.state = {
      fake_messages: DUMMY_DATA,
      messages: [],
      roomId: data._id
    };
  }

  /*Getting messages from the backend every 1 second */
  componentDidMount() {
    var self = this;
    const { data } = this.props.location;
    setInterval(function() {
      axios
        .get("http://localhost:5000/api/getMessageList", {
          params: {
            roomId: data._id
          }
        })
        .then(response => {
          self.setState({
            messages: response.data
          });
        });
    }, 1000);
  }

  render() {
    return (
      <div className="app">
        <Title />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages} //dummy data change later
        />
        <SendMessageForm roomId={this.state.roomId} />
      </div>
    );
  }
}
class MessageList extends React.Component {
  render() {
    return (
      <ul className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <li key={message.id} className="message">
              <div>{message._id}</div>
              <div>{message.message}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    const roomId = this.props.roomId;
    console.log("print roomId");
    console.log(roomId);

    this.state = {
      message: "",
      roomId: roomId
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var new_messages = this.state.message;
    console.log(new_messages);

    const roomId = this.state.roomId;
    console.log("print roomId");
    console.log(this.state.roomId);

    axios
      .get("http://localhost:5000/api/sendMessage", {
        params: {
          messages: new_messages,
          roomId: roomId
        }
      })
      .then(response => {
        //get from backend
        console.log(response);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

function Title() {
  return <p className="title">My Chat Room</p>;
}
export default MessagePage;
