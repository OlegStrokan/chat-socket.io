import React from 'react';
import socket from '../socket';
import {Button, makeStyles, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '10px 25px'
  },
}));

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const classes = useStyles();

  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue('');
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={(e) => setMessageValue(e.target.value)}
              value={messageValue}
          />
          <Button onClick={onSendMessage} variant="contained" color="primary" className={classes.button}>
            Отправить
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
